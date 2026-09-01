import { verifyJWT } from './_jwt';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
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

  try {
    const body = await request.json<any>();
    const { id, name, description, price, category, allergens, active, imageUrl } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Falta ID del producto' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Base de datos D1 no vinculada.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let allergensStr = allergens;
    if (Array.isArray(allergens)) {
      allergensStr = JSON.stringify(allergens);
    }

    await env.DB.prepare(
      `UPDATE products SET 
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        category = COALESCE(?, category),
        allergens = COALESCE(?, allergens),
        active = COALESCE(?, active),
        imageUrl = COALESCE(?, imageUrl),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
    ).bind(
      name, description, price, category, allergensStr, active !== undefined ? (active ? 1 : 0) : null, imageUrl, id
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error actualizando producto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
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
    const { name, description, price, category, reference, allergens, active, imageUrl } = body;

    if (!name || price === undefined || !category) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios (nombre, precio, categoría)' }), { status: 400 });
    }
    
    if (typeof price !== 'number' || price < 0) {
      return new Response(JSON.stringify({ error: 'El precio debe ser un número válido' }), { status: 400 });
    }

    if (reference) {
      const existing = await env.DB.prepare('SELECT id FROM products WHERE reference = ?').bind(reference).first();
      if (existing) {
        return new Response(JSON.stringify({ error: `La referencia ${reference} ya existe.` }), { status: 400 });
      }
    }

    const id = crypto.randomUUID();
    let allergensStr = allergens;
    if (Array.isArray(allergens)) allergensStr = JSON.stringify(allergens);

    await env.DB.prepare(
      `INSERT INTO products (id, reference, name, category, description, price, allergens, active, imageUrl, verified, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'oyishi.es')`
    ).bind(
      id, reference || null, name, category, description || null, price, allergensStr || '[]', active !== false ? 1 : 0, imageUrl || null
    ).run();

    return new Response(JSON.stringify({ success: true, id }), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error creando producto' }), { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return new Response(JSON.stringify({ error: 'Falta token' }), { status: 401 });
  
  const token = authHeader.substring(7);
  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('Rol inválido');
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Falta ID' }), { status: 400 });

    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error eliminando producto' }), { status: 500 });
  }
};
