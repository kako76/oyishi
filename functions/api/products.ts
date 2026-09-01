import oyishiData from '../../../src/data/oyishi/products.json';

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare('SELECT * FROM products').all();
    
    if (results && results.length > 0) {
      const products = results.map(p => ({
        ...p,
        allergens: typeof p.allergens === 'string' ? JSON.parse(p.allergens) : [],
        verified: Boolean(p.verified),
        active: Boolean(p.active),
      }));
      
      return new Response(JSON.stringify({ source: 'D1', products }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error('D1 Error fetching products:', err);
  }

  // Fallback to JSON
  return new Response(JSON.stringify({ source: 'JSON', products: oyishiData.products }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
