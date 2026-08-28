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

    // Retell envía de forma estructurada los datos del agente telefónico o custom arguments
    const callData = payload.call || payload;
    const args = payload.args || callData.custom_analysis_data || {};

    const orderRecord = {
      id: `ord_${callData.call_id || Date.now()}`,
      customer_name: args.customer_name || payload.customer_name || 'Cliente Telefónico',
      phone: args.phone || callData.from_number || payload.phone || 'Desconocido',
      date: args.date || payload.date || new Date().toISOString().split('T')[0],
      time: args.time || payload.time || 'A confirmar',
      party_size: Number(args.party_size || payload.party_size || 2),
      order_items: args.order_items || payload.order_items || [],
      notes: args.notes || payload.notes || 'Pedido registrado desde agente telefónico Retell AI',
      total: Number(args.total || payload.total || 0),
      agent_call_id: callData.call_id || payload.agent_call_id || `retell_${Date.now()}`,
      created_at: new Date().toISOString(),
      status: callData.call_analysis?.call_successful ? 'CONFIRMADO' : 'NUEVO'
    };

    // Guardar en Cloudflare D1
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO retell_orders (id, customer_name, phone, date, time, party_size, order_items, notes, total, agent_call_id, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        orderRecord.id,
        orderRecord.customer_name,
        orderRecord.phone,
        orderRecord.date,
        orderRecord.time,
        orderRecord.party_size,
        typeof orderRecord.order_items === 'string' ? orderRecord.order_items : JSON.stringify(orderRecord.order_items),
        orderRecord.notes,
        orderRecord.total,
        orderRecord.agent_call_id,
        orderRecord.created_at,
        orderRecord.status
      ).run();
    }

    return new Response(JSON.stringify({ success: true, order_id: orderRecord.id }), {
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
