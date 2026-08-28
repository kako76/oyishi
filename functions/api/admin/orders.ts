interface Env {
  ORDERS_KV?: KVNamespace;
  DB?: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Si D1 está configurado:
    if (env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM retell_orders ORDER BY created_at DESC LIMIT 100").all();
      return new Response(JSON.stringify({ orders: results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Si KV está configurado:
    if (env.ORDERS_KV) {
      const raw = await env.ORDERS_KV.get('orders_list');
      const orders = raw ? JSON.parse(raw) : [];
      return new Response(JSON.stringify({ orders }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Respuesta por defecto si la BD aún no ha sido conectada vía wrangler bindings
    return new Response(JSON.stringify({ orders: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error consultando pedidos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id, status } = await request.json() as { id: string; status: string };

    if (!id || !status) {
      return new Response(JSON.stringify({ error: 'ID y estado son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.DB) {
      await env.DB.prepare("UPDATE retell_orders SET status = ? WHERE id = ?").bind(status, id).run();
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env.ORDERS_KV) {
      const raw = await env.ORDERS_KV.get('orders_list');
      const orders = raw ? JSON.parse(raw) : [];
      const updated = orders.map((o: any) => o.id === id ? { ...o, status } : o);
      await env.ORDERS_KV.put('orders_list', JSON.stringify(updated));
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error actualizando estado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
