interface Env {
  RETELL_WEBHOOK_SECRET?: string;
  ORDERS_KV?: KVNamespace;
  DB?: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Autenticación de seguridad mediante secreto de Webhook
  const retellSecret = request.headers.get('x-retell-secret');
  const expectedSecret = env.RETELL_WEBHOOK_SECRET;

  if (expectedSecret && retellSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Webhook Secret no válido' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload = await request.json() as any;

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
      status: 'NUEVO'
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
        JSON.stringify(orderRecord.order_items),
        orderRecord.notes,
        orderRecord.total,
        orderRecord.agent_call_id,
        orderRecord.created_at,
        orderRecord.status
      ).run();
    }

    // Guardar en Cloudflare KV como lista
    if (env.ORDERS_KV) {
      const raw = await env.ORDERS_KV.get('orders_list');
      const currentList = raw ? JSON.parse(raw) : [];
      currentList.unshift(orderRecord);
      await env.ORDERS_KV.put('orders_list', JSON.stringify(currentList));
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
