export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = '/index.html';
  const res = await context.env.ASSETS.fetch(url);
  const newRes = new Response(res.body, res);
  newRes.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  return newRes;
}
