import { signJWT } from './_jwt';

interface Env {
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = await request.json() as { password?: string };

    const expectedPassword = env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return new Response(JSON.stringify({
        success: false,
        error: 'ADMIN_PASSWORD no configurada en las variables de entorno de Cloudflare Pages'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (body?.password && body.password === expectedPassword) {
      if (!env.JWT_SECRET) {
        return new Response(JSON.stringify({ success: false, error: 'JWT_SECRET no configurada' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const payload = {
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      };
      const token = await signJWT(payload, env.JWT_SECRET);

      return new Response(JSON.stringify({ success: true, token }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Credenciales inválidas' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Error del servidor procesando autenticación' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
