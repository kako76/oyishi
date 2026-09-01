export async function onRequest(context: any) {
  const { request, env, params } = context;

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const pathParams = params.path;
  if (!pathParams || !Array.isArray(pathParams) || pathParams.length === 0) {
    return new Response('Not Found', { status: 404 });
  }

  const key = pathParams.join('/');

  // Prevención de path traversal
  if (key.includes('../') || key.startsWith('/')) {
    return new Response('Invalid key', { status: 400 });
  }

  try {
    const object = await env.IMAGES_BUCKET.get(key);

    if (object === null) {
      return new Response('Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable'); // Cache aggressively

    return new Response(object.body, {
      headers,
    });
  } catch (e: any) {
    console.error('Error fetching image from R2:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
