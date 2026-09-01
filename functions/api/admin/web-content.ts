import { verifyJWT } from './_jwt';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'No autorizado: Falta token' }), { status: 401 });
  }

  const token = authHeader.substring(7);
  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('Rol inválido');
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'No autorizado: Token inválido' }), { status: 401 });
  }

  try {
    const body = await request.json<any>();
    
    // Basic validation of body structure
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: 'Formato inválido. Se esperaba un objeto JSON.' }), { status: 400 });
    }

    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Base de datos D1 no vinculada.' }), { status: 500 });
    }

    // Convert object back to string for storage
    const configString = JSON.stringify(body);

    await env.DB.prepare(
      `INSERT INTO web_content (id, config_json, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET config_json = excluded.config_json, updated_at = CURRENT_TIMESTAMP`
    ).bind(configString).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error actualizando contenidos de la web' }), { status: 500 });
  }
};
