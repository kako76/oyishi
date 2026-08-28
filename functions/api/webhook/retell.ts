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
  const callData = payload.data || payload.call || payload;
  const analysisData = callData.call_analysis || payload.call_analysis || {};
  const customData = analysisData.custom_analysis_data || callData.custom_analysis_data || payload.args || payload.custom_analysis_data || {};
  
  const customer_name = customData.customer_name || payload.customer_name || '';
  
  let phone = customData.phone || callData.from_number || payload.phone || payload.from_number || '';
  const date = customData.date || payload.date || '';
  const time = customData.time || payload.time || '';
  
  let party_size = 2; // Default de la aplicación
  if (customData.party_size !== undefined && customData.party_size !== null && customData.party_size !== '') {
    party_size = Number(customData.party_size);
  } else if (payload.party_size !== undefined && payload.party_size !== null && payload.party_size !== '') {
    party_size = Number(payload.party_size);
  }
  if (isNaN(party_size) || party_size <= 0) party_size = 2;

  let rawItems = customData.order_items || payload.order_items || [];
  let normalizedItems: Array<{name: string, quantity: number, price?: number}> = [];
  
  if (Array.isArray(rawItems)) {
    normalizedItems = rawItems.map((item: any) => ({
      name: item?.name || String(item || 'Producto sin nombre'),
      quantity: Number(item?.quantity) || 1,
      price: item?.price ? Number(item.price) : undefined
    }));
  } else if (typeof rawItems === 'string') {
    try {
      const parsed = JSON.parse(rawItems);
      if (Array.isArray(parsed)) {
        normalizedItems = parsed.map((item: any) => ({
          name: item?.name || String(item || 'Producto sin nombre'),
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

  let notes = customData.notes || payload.notes || '';
  if (analysisData.call_summary) {
    const summaryHeader = '=== RESUMEN LLAMADA (RETELL AI) ===';
    notes = notes ? `${notes}\n\n${summaryHeader}\n${analysisData.call_summary}` : `${summaryHeader}\n${analysisData.call_summary}`;
  }

  let total = Number(customData.total || payload.total || 0);
  if (isNaN(total)) total = 0;

  const call_id = callData.call_id || payload.call_id;
  const agent_call_id = String(call_id || `unknown_${Date.now()}`);

  const call_successful = analysisData.call_successful ?? payload.call_successful ?? false;
  const status = call_successful ? 'CONFIRMADO' : 'NUEVO';

  const debug_info = {
    event_type: payload.event,
    call_id: agent_call_id,
    found_customer_name: !!customData.customer_name,
    found_phone: !!(customData.phone || callData.from_number),
    found_date: !!customData.date,
    found_time: !!customData.time,
    found_party_size: customData.party_size !== undefined,
    found_order_items: normalizedItems.length > 0,
    final_status: status
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
      status
    },
    debug_info
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const expectedSecret = env.RETELL_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return new Response(JSON.stringify({ error: 'Webhook Secret no configurado' }), { status: 401 });
  }

  const signatureHeader = request.headers.get('x-retell-signature');
  if (!signatureHeader) {
    return new Response(JSON.stringify({ error: 'Firma requerida' }), { status: 401 });
  }

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let digest = '';

  for (const part of parts) {
    if (part.startsWith('v=')) timestamp = part.slice(2);
    if (part.startsWith('d=')) digest = part.slice(2);
  }

  if (!timestamp || !digest) {
    return new Response(JSON.stringify({ error: 'Formato de firma inválido' }), { status: 401 });
  }

  const tsNum = parseInt(timestamp, 10);
  if (isNaN(tsNum)) {
    return new Response(JSON.stringify({ error: 'Timestamp inválido' }), { status: 401 });
  }

  if (Math.abs(Date.now() - tsNum) > 5 * 60 * 1000) {
    return new Response(JSON.stringify({ error: 'Firma expirada' }), { status: 401 });
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

    const isValid = await crypto.subtle.verify('HMAC', key, digestBytes, dataToVerify);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Firma inválida' }), { status: 401 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error verificando firma' }), { status: 401 });
  }

  // FIRMA CORRECTA
  try {
    const payload = JSON.parse(rawBody);

    // Permitir test de diagnóstico explícito
    if (payload.diagnostic) {
      return new Response(JSON.stringify({ diagnostic: true, payload }), { status: 200 });
    }

    // IGNORAR cualquier evento que no sea el final (call_analyzed)
    // Esto previene duplicados en llamadas que inician (call_started) o terminan sin análisis aún (call_ended)
    if (payload.event && payload.event !== 'call_analyzed') {
      return new Response(JSON.stringify({ success: true, message: `Evento ${payload.event} ignorado. Esperando call_analyzed.` }), { status: 200 });
    }

    const { orderRecord, debug_info } = extractOrderFromRetellPayload(payload);

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
      debug_info,
      extracted_data: orderRecord
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error procesando webhook Retell' }), { status: 500 });
  }
};
