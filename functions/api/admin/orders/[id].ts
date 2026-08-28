import { verifyJWT } from '../_jwt';

interface Env {
  DB?: D1Database;
  JWT_SECRET?: string;
}

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
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

  const id = params.id;
  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'ID de pedido inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    if (env.DB) {
      const result = await env.DB.prepare("DELETE FROM retell_orders WHERE id = ?").bind(id).run();
      
      if (result.meta.changes === 0) {
        return new Response(JSON.stringify({ error: 'No se encontró el pedido o ya fue eliminado' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({ success: true, message: 'Pedido eliminado correctamente' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Base de datos no disponible' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error eliminando pedido' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
