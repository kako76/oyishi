import { verifyJWT } from './_jwt';

interface Env {
  DB?: D1Database;
  JWT_SECRET?: string;
}

function normalizeOrderItems(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    if (!value.trim()) return [];
    try {
      let parsed = JSON.parse(value);
      if (typeof parsed === 'string') {
        // En caso de doble serialización
        parsed = JSON.parse(parsed);
      }
      if (Array.isArray(parsed)) return parsed;
      if (parsed && typeof parsed === 'object') return [parsed];
      return [];
    } catch (err) {
      console.warn("Aviso: order_items no es un JSON válido en D1:", value);
      return [{ name: value, quantity: 1 }];
    }
  }
  if (value && typeof value === 'object') return [value];
  return [];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'No autorizado: Falta token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.substring(7);
  if (!env.JWT_SECRET) {
    return new Response(JSON.stringify({ error: 'Configuración de servidor incompleta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado: Rol inválido' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'No autorizado: Token inválido o expirado' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (env.DB) {
      const { results } = await env.DB.prepare("SELECT * FROM retell_orders ORDER BY created_at DESC LIMIT 100").all();
      
      const normalizedOrders = results.map((order: any) => ({
        ...order,
        order_items: normalizeOrderItems(order.order_items)
      }));

      return new Response(JSON.stringify({ orders: normalizedOrders }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
    return new Response(JSON.stringify({ error: 'No autorizado: Falta token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.substring(7);
  if (!env.JWT_SECRET) {
    return new Response(JSON.stringify({ error: 'Configuración de servidor incompleta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'No autorizado: Rol inválido' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'No autorizado: Token inválido o expirado' }), {
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

