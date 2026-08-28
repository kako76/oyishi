interface Env {
  ADMIN_PASSWORD?: string;
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
      const token = `oyishi_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
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
