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
    
    // We expect an array of schedule updates
    if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ error: 'Formato inválido. Se esperaba un array de horarios.' }), { status: 400 });
    }

    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Base de datos D1 no vinculada.' }), { status: 500 });
    }

    const stmts = body.map(s => {
      // Validate time format lightly (e.g. HH:MM)
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!s.is_closed) {
        if (s.open_time_1 && !timeRegex.test(s.open_time_1)) throw new Error(`Formato de hora inválido: ${s.open_time_1}`);
        if (s.close_time_1 && !timeRegex.test(s.close_time_1)) throw new Error(`Formato de hora inválido: ${s.close_time_1}`);
        if (s.open_time_2 && !timeRegex.test(s.open_time_2)) throw new Error(`Formato de hora inválido: ${s.open_time_2}`);
        if (s.close_time_2 && !timeRegex.test(s.close_time_2)) throw new Error(`Formato de hora inválido: ${s.close_time_2}`);
      }

      return env.DB.prepare(
        `UPDATE schedules SET 
          is_closed = ?,
          open_time_1 = ?,
          close_time_1 = ?,
          open_time_2 = ?,
          close_time_2 = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE day_id = ?`
      ).bind(
        s.is_closed ? 1 : 0,
        s.open_time_1 || null,
        s.close_time_1 || null,
        s.open_time_2 || null,
        s.close_time_2 || null,
        s.day_id
      );
    });

    await env.DB.batch(stmts);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error actualizando horarios' }), { status: 500 });
  }
};
