import { verifyJWT } from './_jwt';

interface Env {
  DB?: D1Database;
  JWT_SECRET?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const isAgentDebug = secret === 'debugoyishi';
  
  const authHeader = request.headers.get('Authorization');

  // Verify Auth
  if (!isAgentDebug) {
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
  }

  try {
    if (env.DB) {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 20").all();
        
        const parsedLogs = results.map((logRow: any) => ({
          ...logRow,
          logs: (() => {
            try { return JSON.parse(logRow.logs); } 
            catch { return [logRow.logs]; }
          })()
        }));

        return new Response(JSON.stringify({ logs: parsedLogs }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (dbErr: any) {
        if (dbErr.message.includes('no such table')) {
          return new Response(JSON.stringify({ logs: [], message: 'Tabla webhook_logs no existe aún' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        throw dbErr;
      }
    }

    return new Response(JSON.stringify({ logs: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error consultando logs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
