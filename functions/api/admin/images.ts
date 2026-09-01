import { verifyJWT } from './_jwt';

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Verificar JWT
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    await verifyJWT(token, env.JWT_SECRET);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unauthorized or expired token' }), { status: 401 });
  }

  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const folder = formData.get('folder') as string || 'web'; // products, web, hero, etc.

      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
      }

      // Validar tamaño: 5MB
      if (file.size > 5 * 1024 * 1024) {
        return new Response(JSON.stringify({ error: 'File too large, max 5MB' }), { status: 400 });
      }

      // Validar Mime Type
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
      if (!allowedMimes.includes(file.type)) {
        return new Response(JSON.stringify({ error: 'Invalid file type. Only JPG, PNG, WEBP and AVIF are allowed.' }), { status: 400 });
      }

      // Generar nombre seguro
      const ext = file.type.split('/')[1];
      const uuid = crypto.randomUUID();
      const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
      const key = `${safeFolder}/${uuid}.${ext}`;

      // Subir a R2
      await env.IMAGES_BUCKET.put(key, file.stream(), {
        httpMetadata: { contentType: file.type }
      });

      const url = `/api/images/${key}`;

      return new Response(JSON.stringify({ success: true, url, key }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e: any) {
      console.error('Upload Error:', e);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }

  if (request.method === 'DELETE') {
    try {
      const { key } = await request.json();
      if (!key) {
        return new Response(JSON.stringify({ error: 'No key provided' }), { status: 400 });
      }
      
      // Evitar path traversal
      if (key.includes('../') || key.startsWith('/')) {
        return new Response(JSON.stringify({ error: 'Invalid key' }), { status: 400 });
      }

      await env.IMAGES_BUCKET.delete(key);

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
}
