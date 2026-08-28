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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const expectedSecret = env.RETELL_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return new Response(JSON.stringify({ error: 'Webhook Secret no configurado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const signatureHeader = request.headers.get('x-retell-signature');
  if (!signatureHeader) {
    return new Response(JSON.stringify({ error: 'Firma requerida' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let digest = '';

  for (const part of parts) {
    if (part.startsWith('v=')) timestamp = part.slice(2);
    if (part.startsWith('d=')) digest = part.slice(2);
  }

  if (!timestamp || !digest) {
    return new Response(JSON.stringify({ error: 'Formato de firma inválido' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const tsNum = parseInt(timestamp, 10);
  if (isNaN(tsNum)) {
    return new Response(JSON.stringify({ error: 'Timestamp inválido' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (Math.abs(Date.now() - tsNum) > 5 * 60 * 1000) {
    return new Response(JSON.stringify({ error: 'Firma expirada' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const rawBody = await request.text();
  const encoder = new TextEncoder();

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(expectedSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const digestBytes = hexToUint8Array(digest);
    const dataToVerify = encoder.encode(rawBody + timestamp);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      digestBytes,
      dataToVerify
    );

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Firma inválida' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error verificando firma' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // A partir de aquí, la firma es correcta
  try {
    const payload = JSON.parse(rawBody);

    // Modo diagnóstico manual para pruebas
    if (payload.diagnostic) {
      return new Response(JSON.stringify({ diagnostic: true, payload }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (payload.event && payload.event !== 'call_analyzed') {
      return new Response(JSON.stringify({ success: true, message: 'Evento ignorado' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Extracción robusta de cualquier estructura
    const callData = payload.data || payload.call || payload;
    const args = payload.args || callData.call_analysis?.custom_analysis_data || callData.custom_analysis_data || {};

    const customer_name = args.customer_name || payload.customer_name;
    const phone = args.phone || callData.from_number || payload.phone;
    const date = args.date || payload.date;
    const time = args.time || payload.time;
    const party_size = args.party_size || payload.party_size;
    const rawItems = args.order_items || payload.order_items;
    const notes = args.notes || payload.notes || '';
    const total = args.total || payload.total || 0;
    // IDs y Estados
    const call_id = callData.call_id || payload.call_id || `unknown_${Date.now()}`;
    const call_successful = callData.call_analysis?.call_successful ?? payload.call_successful ?? false;

    // Validar campos obligatorios (NO inventar datos)
    const missingFields = [];
    if (!customer_name) missingFields.push('customer_name');
    if (!phone) missingFields.push('phone');
    if (!date) missingFields.push('date');
    if (!time) missingFields.push('time');
    if (!party_size) missingFields.push('party_size');

    if (missingFields.length > 0) {
      // Devolvemos 200 para no forzar reintentos infinitos, pero adjuntamos el diagnóstico
      return new Response(JSON.stringify({
        success: false,
        message: 'Faltan campos obligatorios. Pedido descartado para no inyectar datos falsos.',
        missing_fields: missingFields,
        extracted_keys: Object.keys(args),
        debug_payload: payload
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Normalización de order_items a [{ name, quantity, price }]
    let normalizedItems: Array<{name: string, quantity: number, price?: number}> = [];
    if (Array.isArray(rawItems)) {
      normalizedItems = rawItems.map(item => ({
        name: item?.name || String(item || 'Producto desconocido'),
        quantity: Number(item?.quantity) || 1,
        price: item?.price ? Number(item.price) : undefined
      }));
    } else if (typeof rawItems === 'string') {
      try {
        const parsed = JSON.parse(rawItems);
        if (Array.isArray(parsed)) {
          normalizedItems = parsed.map(item => ({
            name: item?.name || String(item || 'Producto desconocido'),
            quantity: Number(item?.quantity) || 1,
            price: item?.price ? Number(item.price) : undefined
          }));
        } else {
          normalizedItems = [{ name: rawItems, quantity: 1 }];
        }
      } catch {
        normalizedItems = [{ name: rawItems, quantity: 1 }];
      }
    } else if (rawItems && typeof rawItems === 'object') {
      normalizedItems = [{
        name: rawItems.name || JSON.stringify(rawItems),
        quantity: Number(rawItems.quantity) || 1,
        price: rawItems.price ? Number(rawItems.price) : undefined
      }];
    }

    const orderRecord = {
      id: `ord_${call_id}`,
      customer_name: String(customer_name),
      phone: String(phone),
      date: String(date),
      time: String(time),
      party_size: Number(party_size),
      order_items: JSON.stringify(normalizedItems),
      notes: String(notes),
      total: Number(total),
      agent_call_id: String(call_id),
      created_at: new Date().toISOString(),
      status: call_successful ? 'CONFIRMADO' : 'NUEVO'
    };

    // Guardar en Cloudflare D1
    if (env.DB) {
      await env.DB.prepare(`
        INSERT OR REPLACE INTO retell_orders (id, customer_name, phone, date, time, party_size, order_items, notes, total, agent_call_id, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
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
      ).run();
    }

    return new Response(JSON.stringify({
      success: true,
      order_id: orderRecord.id,
      diagnostic: {
        received_args: Object.keys(args),
        status_assigned: orderRecord.status
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error procesando webhook Retell' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
