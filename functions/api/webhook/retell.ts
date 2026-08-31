interface Env {
  RETELL_WEBHOOK_SECRET?: string;
  DB?: D1Database;
}

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function extractOrderFromRetellPayload(payload: any) {
  // Retell puede enviar los datos en distintas ubicaciones según la versión del agente
  const callData = payload.data || payload.call || payload;
  const analysisData = callData.call_analysis || payload.call_analysis || {};
  const customData =
    analysisData.custom_analysis_data ||
    callData.custom_analysis_data ||
    payload.args ||
    payload.custom_analysis_data ||
    {};

  console.log('[OYISHI] Extrayendo datos. callData keys:', Object.keys(callData));
  console.log('[OYISHI] analysisData keys:', Object.keys(analysisData));
  console.log('[OYISHI] customData:', JSON.stringify(customData));

  const customer_name = customData.customer_name || payload.customer_name || '';

  let phone =
    customData.phone ||
    callData.from_number ||
    payload.phone ||
    payload.from_number ||
    '';
  const date = customData.date || payload.date || '';
  const time = customData.time || payload.time || '';

  let party_size = 2;
  if (
    customData.party_size !== undefined &&
    customData.party_size !== null &&
    customData.party_size !== ''
  ) {
    party_size = Number(customData.party_size);
  } else if (
    payload.party_size !== undefined &&
    payload.party_size !== null &&
    payload.party_size !== ''
  ) {
    party_size = Number(payload.party_size);
  }
  if (isNaN(party_size) || party_size <= 0) party_size = 2;

  let rawItems = customData.order_items || payload.order_items || [];
  let normalizedItems: Array<{
    reference?: string;
    name: string;
    quantity: number;
    price?: number;
  }> = [];

  const normalizeItem = (item: any) => ({
    reference: item?.reference ? String(item.reference) : undefined,
    name: item?.name || String(item || 'Producto sin nombre'),
    quantity: Number(item?.quantity) || 1,
    price: item?.price ? Number(item.price) : undefined,
  });

  if (Array.isArray(rawItems)) {
    normalizedItems = rawItems.map(normalizeItem);
  } else if (typeof rawItems === 'string') {
    try {
      const parsed = JSON.parse(rawItems);
      if (Array.isArray(parsed)) {
        normalizedItems = parsed.map(normalizeItem);
      } else {
        normalizedItems = [normalizeItem(rawItems)];
      }
    } catch {
      normalizedItems = [normalizeItem(rawItems)];
    }
  } else if (rawItems && typeof rawItems === 'object') {
    normalizedItems = [normalizeItem(rawItems)];
  }

  const tipo_pedido = String(
    customData.tipo_pedido ||
      customData.order_type ||
      payload.tipo_pedido ||
      payload.order_type ||
      'recoger'
  );
  const direccion = String(
    customData.direccion ||
      customData.address ||
      payload.direccion ||
      payload.address ||
      ''
  );
  const localidad = String(
    customData.localidad ||
      customData.city ||
      payload.localidad ||
      payload.city ||
      ''
  );
  const codigo_postal = String(
    customData.codigo_postal ||
      customData.zip_code ||
      payload.codigo_postal ||
      payload.zip_code ||
      ''
  );

  let deliveryInfo = `[ TIPO DE PEDIDO: ${tipo_pedido.toUpperCase()} ]\n`;
  if (
    tipo_pedido.toLowerCase().includes('domicilio') ||
    tipo_pedido.toLowerCase().includes('delivery')
  ) {
    if (direccion) deliveryInfo += `Dirección: ${direccion}\n`;
    if (localidad) deliveryInfo += `Localidad: ${localidad}\n`;
    if (codigo_postal) deliveryInfo += `C.P.: ${codigo_postal}\n`;
  }
  deliveryInfo += `\n`;

  let notes = customData.notes || payload.notes || '';
  notes = deliveryInfo + notes;

  if (analysisData.call_summary) {
    const summaryHeader = '=== RESUMEN LLAMADA (RETELL AI) ===';
    notes = notes
      ? `${notes}\n\n${summaryHeader}\n${analysisData.call_summary}`
      : `${summaryHeader}\n${analysisData.call_summary}`;
  }

  let total = Number(customData.total || payload.total || 0);
  if (isNaN(total)) total = 0;

  const call_id = callData.call_id || payload.call_id;
  const agent_call_id = String(call_id || `unknown_${Date.now()}`);

  // Siempre guardar el pedido; si la llamada fue exitosa lo marcamos CONFIRMADO
  const call_successful =
    analysisData.call_successful ?? payload.call_successful ?? false;
  const status = call_successful ? 'CONFIRMADO' : 'NUEVO';

  const debug_info = {
    event_type: payload.event,
    call_id: agent_call_id,
    found_customer_name: !!customData.customer_name,
    found_phone: !!(customData.phone || callData.from_number),
    found_date: !!customData.date,
    found_time: !!customData.time,
    found_tipo_pedido: !!(customData.tipo_pedido || customData.order_type),
    found_party_size: customData.party_size !== undefined,
    found_order_items: normalizedItems.length > 0,
    final_status: status,
  };

  return {
    orderRecord: {
      id: `ord_${agent_call_id}`,
      customer_name: String(customer_name),
      phone: String(phone),
      date: String(date),
      time: String(time),
      party_size,
      order_items: JSON.stringify(normalizedItems),
      notes: String(notes),
      total,
      agent_call_id,
      created_at: new Date().toISOString(),
      status,
    },
    debug_info,
  };
}

// Eventos de Retell que contienen datos de pedido y deben guardarse
// Aceptamos tanto 'call_analyzed' (post-análisis) como 'call_ended' por si
// el agente está configurado sin análisis posterior.
const ACCEPTED_EVENTS = new Set(['call_analyzed', 'call_ended']);

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  console.log('[OYISHI] Webhook Retell recibido');

  // ── 1. Variables de entorno ──────────────────────────────────────────────
  const expectedSecret = env.RETELL_WEBHOOK_SECRET;
  if (!expectedSecret) {
    console.error('[OYISHI] RETELL_WEBHOOK_SECRET no configurada en Cloudflare');
    return new Response(
      JSON.stringify({ error: 'Webhook Secret no configurado en las variables de entorno' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 2. Leer body ANTES de verificar firma ─────────────────────────────────
  const rawBody = await request.text();
  console.log('[OYISHI] rawBody (primeros 300 chars):', rawBody.substring(0, 300));

  // ── 3. Verificar firma Retell ─────────────────────────────────────────────
  const signatureHeader = request.headers.get('x-retell-signature');
  console.log('[OYISHI] x-retell-signature:', signatureHeader);

  if (!signatureHeader) {
    // Sin firma → rechazar
    console.warn('[OYISHI] Petición sin cabecera x-retell-signature');
    return new Response(
      JSON.stringify({ error: 'Firma requerida (x-retell-signature)' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let digest = '';

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith('v=')) timestamp = trimmed.slice(2);
    if (trimmed.startsWith('d=')) digest = trimmed.slice(2);
  }

  console.log('[OYISHI] timestamp extraído:', timestamp, '| digest (16 chars):', digest.substring(0, 16));

  if (!timestamp || !digest) {
    console.error('[OYISHI] Formato de firma inválido. Header completo:', signatureHeader);
    return new Response(
      JSON.stringify({ error: 'Formato de firma inválido. Esperado: v=<ts>,d=<hex>' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const tsNum = parseInt(timestamp, 10);
  if (isNaN(tsNum)) {
    return new Response(
      JSON.stringify({ error: 'Timestamp inválido en firma' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ⚠️ CORRECCIÓN CRÍTICA: El timestamp de Retell está en MILISEGUNDOS.
  // Verificamos que la petición no tenga más de 5 minutos de antigüedad.
  const nowMs = Date.now();
  const diffMs = Math.abs(nowMs - tsNum);
  console.log('[OYISHI] Diff tiempo (ms):', diffMs, '| Límite:', 5 * 60 * 1000);

  if (diffMs > 5 * 60 * 1000) {
    console.error('[OYISHI] Firma expirada. tsNum:', tsNum, 'nowMs:', nowMs, 'diffMs:', diffMs);
    return new Response(
      JSON.stringify({ error: 'Firma expirada (más de 5 minutos)' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 4. Verificar HMAC-SHA256 ──────────────────────────────────────────────
  // Retell firma: HMAC-SHA256(rawBody + timestamp, secret)
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(expectedSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const digestBytes = hexToUint8Array(digest);
    const dataToVerify = encoder.encode(rawBody + timestamp);

    const isValid = await crypto.subtle.verify('HMAC', key, digestBytes, dataToVerify);
    console.log('[OYISHI] HMAC válido:', isValid);

    if (!isValid) {
      console.error('[OYISHI] Firma HMAC inválida');
      return new Response(
        JSON.stringify({ error: 'Firma HMAC inválida. Verifica RETELL_WEBHOOK_SECRET.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (err: any) {
    console.error('[OYISHI] Error verificando HMAC:', err?.message);
    return new Response(
      JSON.stringify({ error: 'Error interno verificando firma HMAC' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 5. Parsear payload ────────────────────────────────────────────────────
  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Cuerpo JSON inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  console.log('[OYISHI] event:', payload.event, '| call_id:', payload.data?.call_id || payload.call_id);

  // Test de diagnóstico explícito (para pruebas desde Retell dashboard)
  if (payload.diagnostic) {
    return new Response(
      JSON.stringify({ diagnostic: true, message: 'Webhook OYISHI operativo', payload }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 6. Filtrar eventos relevantes ─────────────────────────────────────────
  // Aceptamos: call_analyzed (con análisis IA) y call_ended (sin análisis)
  // Ignoramos: call_started (no hay datos aún)
  if (payload.event && !ACCEPTED_EVENTS.has(payload.event)) {
    console.log('[OYISHI] Evento ignorado:', payload.event);
    return new Response(
      JSON.stringify({
        success: true,
        message: `Evento '${payload.event}' ignorado. Sólo se procesan: ${[...ACCEPTED_EVENTS].join(', ')}.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 7. Extraer datos del pedido ───────────────────────────────────────────
  const { orderRecord, debug_info } = extractOrderFromRetellPayload(payload);
  console.log('[OYISHI] orderRecord extraído:', JSON.stringify(orderRecord));
  console.log('[OYISHI] debug_info:', JSON.stringify(debug_info));

  // ── 8. Guardar en D1 ─────────────────────────────────────────────────────
  if (!env.DB) {
    console.error('[OYISHI] La binding DB (D1) no está disponible');
    return new Response(
      JSON.stringify({ error: 'Base de datos D1 no vinculada. Verifica la configuración de Cloudflare Pages.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await env.DB.prepare(
      `INSERT OR REPLACE INTO retell_orders
        (id, customer_name, phone, date, time, party_size,
         order_items, notes, total, agent_call_id, created_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        orderRecord.id,
        orderRecord.customer_name,
        orderRecord.phone,
        orderRecord.date,
        orderRecord.time,
        orderRecord.party_size,
        orderRecord.order_items,
        orderRecord.notes,
        orderRecord.total,
        orderRecord.agent_call_id,
        orderRecord.created_at,
        orderRecord.status
      )
      .run();

    console.log('[OYISHI] ✅ Pedido guardado en D1:', orderRecord.id);

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderRecord.id,
        debug_info,
        extracted_data: orderRecord,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[OYISHI] ❌ Error guardando en D1:', err?.message);
    return new Response(
      JSON.stringify({ error: `Error guardando pedido en D1: ${err?.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
