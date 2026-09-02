import oyishiData from '../../../src/data/oyishi/products.json';

interface Env {
  RETELL_WEBHOOK_SECRET?: string;
  DB?: D1Database;
}

function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function extractOrderFromRetellPayload(payload: any, catalog: any[]) {
  // Buscamos los datos de forma robusta en el payload de Retell
  const callData = payload.data || payload.call || payload;
  const analysisData = callData.call_analysis || payload.call_analysis || {};
  const customData =
    analysisData.custom_analysis_data ||
    callData.custom_analysis_data ||
    payload.args ||
    payload.custom_analysis_data ||
    {};

  console.log('[OYISHI] Extrayendo datos. customData:', JSON.stringify(customData));

  const customer_name = String(customData.customer_name || payload.customer_name || '').trim();
  const phone = String(customData.phone || callData.from_number || payload.phone || payload.from_number || '').trim();
  const date = String(customData.date || payload.date || '').trim();
  const time = String(customData.time || payload.time || '').trim();
  
  let tipo_pedido = String(customData.tipo_pedido || customData.order_type || payload.tipo_pedido || payload.order_type || 'recoger').toLowerCase().trim();
  if (tipo_pedido.includes('delivery') || tipo_pedido.includes('domicilio')) tipo_pedido = 'domicilio';
  else if (tipo_pedido.includes('mesa') || tipo_pedido.includes('local')) tipo_pedido = 'mesa';
  else tipo_pedido = 'recoger';

  let party_size: number = 0;
  if (tipo_pedido === 'mesa') {
    let ps = customData.party_size !== undefined ? customData.party_size : payload.party_size;
    if (ps !== undefined && ps !== null && ps !== '') {
      party_size = Number(ps);
    }
    if (party_size <= 0 || isNaN(party_size)) party_size = 2;
  }

  let rawItems = customData.order_items || payload.order_items;
  let hasMissingProducts = false;

  const findBeverageOfficialName = (rawName: string): string | null => {
    const n = rawName.toLowerCase();
    
    if (n.includes('coca cola zero') || n.includes('coca-cola zero')) return 'Lata coca cola zero';
    if (n.includes('coca cola') || n.includes('coca-cola') || n.includes('cola cola')) return 'Lata coca cola';
    
    if (n.includes('fanta naranja')) return 'Lata fanta naranja';
    if (n.includes('fanta limon') || n.includes('fanta limón')) return 'Lata fanta limon';
    
    if (n.includes('nestea')) return 'Lata nestea';
    
    if (n.includes('aquarius naranja')) return 'Lata aquarius naranja';
    if (n.includes('aquarius')) return 'Lata aquarius';
    
    if (n.includes('agua')) return 'Agua';
    if (n.includes('cerveza')) return 'Lata cerveza';
  
    return null;
  };

  let normalizedItems: Array<{
    reference?: string;
    name: string;
    quantity: number;
    price?: number;
    _isOfficial?: boolean;
  }> = [];

  const normalizeItem = (item: any) => {
    const rawRef = item?.reference ? String(item.reference).trim().toUpperCase() : undefined;
    const rawName = item?.name ? String(item.name).trim() : '';
    const quantity = Number(item?.quantity) || 1;

    console.log(`\n[OYISHI] Item recibido:`);
    console.log(`reference=${rawRef}`);
    console.log(`name="${rawName}"`);

    let finalRef = rawRef;
    let finalName = rawName;
    let finalPrice = Number(item?.price) || 0;
    let isOfficial = false;
    let official = null;
    let resolutionMethod = 'Ninguno (REVISIÓN)';

    const isCoherent = (rawN: string, product: any) => {
      const normalizeText = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/ig, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
      const n = normalizeText(rawN);
      const o = normalizeText(product.name);
      
      if (n === o || n.includes(o) || o.includes(n)) return true;
      
      const nWords = n.split(' ').filter(w => w.length > 0);
      const oWords = o.split(' ').filter(w => w.length > 0);
      
      const r = String(product.reference || '').toLowerCase().trim();
      if (r && r !== 'undefined' && r !== 'null' && nWords.includes(r)) return true;
      
      const genericWords = ['lata', 'bandeja', 'racion', 'porcion', 'de', 'con', 'y', 'el', 'la', 'los', 'las', 'un', 'una'];
      const significantN = nWords.filter(w => !genericWords.includes(w) && w.length > 2);
      const significantO = oWords.filter(w => !genericWords.includes(w) && w.length > 2);
      
      const common = significantN.filter(w => significantO.includes(w));
      return common.length > 0;
    };

    const nameLower = rawName.toLowerCase();
    
    // Buscar candidatos por referencia, nombre estricto y alias
    const candByRef = (rawRef && rawRef !== 'UNDEFINED' && rawRef !== 'NULL') 
      ? catalog.find((p: any) => p.reference && String(p.reference).toUpperCase() === rawRef) 
      : null;
      
    const candByName = catalog.find((p: any) => p.name.toLowerCase() === nameLower);
    
    let candByAlias = null;
    const bevMatch = findBeverageOfficialName(rawName);
    if (bevMatch) {
      candByAlias = catalog.find((p: any) => p.name.toLowerCase() === bevMatch.toLowerCase());
    }

    const isIncompatible = (rawN: string, product: any) => {
      // 0. Si no hay nombre, confiamos ciegamente en la referencia
      if (!rawN) return false;

      // 1. Si el alias dice que es una bebida específica pero el producto por ref no lo es
      if (candByAlias && candByAlias.id !== product.id) return true;
      
      const normalizeText = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/ig, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
      const n = normalizeText(rawN);
      const o = normalizeText(product.name);
      
      // 2. Si el nombre de uno contiene al otro, NO es incompatible (ej. "bandeja" en "bandeja maki")
      if (n === o || n.includes(o) || o.includes(n)) return false;
      
      const nWords = n.split(' ').filter(w => w.length > 0);
      const oWords = o.split(' ').filter(w => w.length > 0);
      
      // 3. Si la referencia oficial está literalmente mencionada en el nombre, NO es incompatible
      const r = String(product.reference || '').toLowerCase().trim();
      if (r && r !== 'undefined' && r !== 'null' && nWords.includes(r)) return false;
      
      const genericWords = ['lata', 'bandeja', 'racion', 'porcion', 'de', 'con', 'y', 'el', 'la', 'los', 'las', 'un', 'una', 'ref', 'referencia'];
      const significantN = nWords.filter(w => !genericWords.includes(w) && w.length > 2);
      const significantO = oWords.filter(w => !genericWords.includes(w) && w.length > 2);
      
      // 4. Si el usuario usó un nombre puramente genérico (ej. "Bandeja"), confiamos en la referencia (no hay palabras para declarar incompatibilidad)
      if (significantN.length === 0) return false;
      
      // 5. Si hay palabras significativas comunes, NO es incompatible
      const common = significantN.filter(w => significantO.includes(w));
      if (common.length > 0) return false;
      
      // 6. Si hay palabras significativas pero ninguna coincide con el producto, ES incompatible
      return true;
    };

    // Evaluación de conflictos con nueva regla
    if (candByRef) {
      if (!isIncompatible(rawName, candByRef)) {
         official = candByRef;
         resolutionMethod = 'Referencia oficial (+ Nombre coherente/genérico)';
      } else {
         console.log(`[OYISHI] Reference conflict:`);
         console.log(`${rawRef} -> ${candByRef.name} IS INCOMPATIBLE WITH name -> ${rawName}`);
         
         // No confiamos en la referencia. Intentamos por nombre/alias.
         if (candByAlias) {
           official = candByAlias;
           resolutionMethod = 'Alias (Ignorando Ref errónea)';
           console.log(`[OYISHI] Resuelto por alias: "${rawName}" -> "${official.name}"`);
         } else if (candByName) {
           official = candByName;
           resolutionMethod = 'Nombre (Ignorando Ref errónea)';
           console.log(`[OYISHI] Resuelto por nombre estricto: "${rawName}" -> "${official.name}"`);
         } else {
           console.log(`[OYISHI] Conflicto irreconciliable. Se marca para REVISIÓN.`);
         }
      }
    } else {
      // No hay coincidencia por referencia (referencia desconocida, inventada o sin referencia)
      if (candByAlias) {
        official = candByAlias;
        resolutionMethod = 'Alias (Ref desconocida o vacía)';
        console.log(`[OYISHI] Resuelto por alias: "${rawName}" -> "${official.name}"`);
      } else if (candByName) {
        official = candByName;
        resolutionMethod = 'Nombre (Ref desconocida o vacía)';
        console.log(`[OYISHI] Resuelto por nombre estricto: "${rawName}" -> "${official.name}"`);
      } else {
        console.log(`[OYISHI] Sin matches. Se marca para REVISIÓN.`);
      }
    }

    if (official) {
      finalRef = official.reference; 
      finalName = official.name;
      finalPrice = official.price;
      isOfficial = true;
      console.log(`[OYISHI] MATCH OFICIAL (${resolutionMethod}): ${finalName} (${finalPrice.toFixed(2)} €)`);
    } else {
      hasMissingProducts = true;
      console.log(`[OYISHI] SIN MATCH OFICIAL. Manteniendo precio provisional: ${finalPrice.toFixed(2)} €`);
    }

    return {
      reference: finalRef,
      name: finalName,
      quantity,
      price: finalPrice,
      _isOfficial: isOfficial,
    };
  };

  if (Array.isArray(rawItems)) {
    normalizedItems = rawItems.map(normalizeItem);
  } else if (typeof rawItems === 'string') {
    try {
      const parsed = JSON.parse(rawItems);
      if (Array.isArray(parsed)) {
        normalizedItems = parsed.map(normalizeItem);
      } else if (parsed && typeof parsed === 'object') {
        normalizedItems = [normalizeItem(parsed)];
      }
    } catch {
      console.log('❌ [OYISHI] Error haciendo JSON.parse de order_items string');
    }
  } else if (rawItems && typeof rawItems === 'object') {
    normalizedItems = [normalizeItem(rawItems)];
  }

  const direccion = String(customData.direccion || customData.address || payload.direccion || payload.address || '');
  const localidad = String(customData.localidad || customData.city || payload.localidad || payload.city || '');
  const codigo_postal = String(customData.codigo_postal || customData.zip_code || payload.codigo_postal || payload.zip_code || '');

  let deliveryInfo = `[ TIPO DE PEDIDO: ${tipo_pedido.toUpperCase()} ]\n`;
  if (tipo_pedido === 'domicilio') {
    if (direccion) deliveryInfo += `Dirección: ${direccion}\n`;
    if (localidad) deliveryInfo += `Localidad: ${localidad}\n`;
    if (codigo_postal) deliveryInfo += `C.P.: ${codigo_postal}\n`;
  }
  deliveryInfo += `\n`;

  let notes = customData.notes || payload.notes || '';
  notes = deliveryInfo + notes;

  if (analysisData.call_summary) {
    const summaryHeader = '=== RESUMEN LLAMADA (RETELL AI) ===';
    notes = notes ? `${notes}\n\n${summaryHeader}\n${analysisData.call_summary}` : `${summaryHeader}\n${analysisData.call_summary}`;
  }

  // NO CONFIAR CIEGAMENTE EN EL TOTAL DE ANDREA
  // El backend recalcula sum(quantity * price) SOLO con los precios oficiales
  let total = 0;
  for (const item of normalizedItems) {
    if (item._isOfficial && item.price && !isNaN(item.price)) {
      total += item.price * item.quantity;
    }
  }
  
  const agent_total = Number(customData.total || payload.total || 0);
  console.log(`[OYISHI] Total recalculado: ${total} € (Total del agente: ${agent_total} €)`);

  const call_id = callData.call_id || payload.call_id;
  const agent_call_id = String(call_id || `unknown_${Date.now()}`);

  const call_successful = analysisData.call_successful ?? payload.call_successful ?? false;
  let status = call_successful ? 'CONFIRMADO' : 'NUEVO';

  if (hasMissingProducts) {
    status = 'REVISIÓN';
    notes = `⚠️ ATENCIÓN: El agente añadió productos desconocidos. El precio total oficial podría no estar completo.\nEl agente calculó un total de ${agent_total.toFixed(2)} €.\n\n` + notes;
  }

  const debug_info = {
    event_type: payload.event,
    call_id: agent_call_id,
    found_customer_name: !!customData.customer_name,
    found_phone: !!(customData.phone || callData.from_number),
    found_date: !!customData.date,
    found_time: !!customData.time,
    found_tipo_pedido: !!(customData.tipo_pedido || customData.order_type),
    found_party_size: party_size !== null,
    found_order_items: normalizedItems.length > 0,
    final_status: status,
  };

  return {
    orderRecord: {
      id: `ord_${agent_call_id}`,
      customer_name,
      phone,
      date,
      time,
      party_size,
      order_items: JSON.stringify(normalizedItems),
      notes: notes.trim(),
      total,
      agent_call_id,
      created_at: new Date().toISOString(),
      status,
    },
    debug_info,
    normalizedItems
  };
}

const ACCEPTED_EVENTS = new Set(['call_analyzed', 'call_ended']);

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const logs: string[] = [];
  const log = (msg: string, ...args: any[]) => { 
    const line = [msg, ...args].map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
    console.log(line); 
    logs.push(line); 
  };

  log('A) [OYISHI] Webhook Retell recibido');

  let rawBody = '';
  try {
    rawBody = await request.text();
    log(`[OYISHI] rawBody length: ${rawBody.length}`);
  } catch(e: any) {
    log('Error leyendo rawBody:', e?.message);
  }

  const saveLogs = async () => {
    if (env.DB) {
      try {
        await env.DB.prepare(`CREATE TABLE IF NOT EXISTS webhook_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          created_at TEXT,
          logs TEXT,
          raw_body TEXT
        )`).run();
        
        await env.DB.prepare(`INSERT INTO webhook_logs (created_at, logs, raw_body) VALUES (?, ?, ?)`).bind(
          new Date().toISOString(),
          JSON.stringify(logs),
          rawBody
        ).run();
      } catch (e: any) {
        console.error('Error saving logs to D1:', e.message);
      }
    }
  };

  try {
    return await processWebhook(request, env, rawBody, log);
  } catch (err: any) {
    log('❌ Error no controlado en webhook:', err?.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  } finally {
    await saveLogs();
  }
};

async function processWebhook(request: Request, env: Env, rawBody: string, log: Function) {
  let context_catalog = oyishiData.products;
  try {
    if (env.DB) {
      const { results } = await env.DB.prepare('SELECT * FROM products').all();
      if (results && results.length > 0) {
        context_catalog = results.map(p => ({
          ...p,
          allergens: typeof p.allergens === 'string' ? JSON.parse(p.allergens) : [],
          verified: Boolean(p.verified),
          active: Boolean(p.active),
        }));
        log('[OYISHI] Catálogo cargado desde D1. Total productos: ' + context_catalog.length);
      }
    }
  } catch(e: any) {
    log('[OYISHI] Error leyendo catálogo D1, usando fallback JSON.', e?.message);
  }

  // ── 1. Variables de entorno ──────────────────────────────────────────────
  const expectedSecret = env.RETELL_WEBHOOK_SECRET;
  if (!expectedSecret) {
    log('❌ [OYISHI] RETELL_WEBHOOK_SECRET no configurada en Cloudflare');
    return new Response(
      JSON.stringify({ error: 'Webhook Secret no configurado en las variables de entorno' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 3. Verificar firma Retell ─────────────────────────────────────────────
  const signatureHeader = request.headers.get('x-retell-signature');
  if (!signatureHeader) {
    log('B) ❌ [OYISHI] Petición sin cabecera x-retell-signature');
    return new Response(
      JSON.stringify({ error: 'Firma requerida (x-retell-signature)' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const parts = signatureHeader.split(',');
  let timestamp = '';
  let digest = '';

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith('v=')) timestamp = trimmed.slice(2);
    if (trimmed.startsWith('d=')) digest = trimmed.slice(2);
  }

  if (!timestamp || !digest) {
    log('B) ❌ [OYISHI] Formato de firma inválido. Header:', signatureHeader);
    return new Response(
      JSON.stringify({ error: 'Formato de firma inválido. Esperado: v=<ts>,d=<hex>' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let tsNum = parseInt(timestamp, 10);
  if (isNaN(tsNum)) {
    log('B) ❌ [OYISHI] Timestamp inválido en firma');
    return new Response(
      JSON.stringify({ error: 'Timestamp inválido en firma' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (tsNum < 20000000000) {
    tsNum *= 1000;
  }

  const nowMs = Date.now();
  const diffMs = Math.abs(nowMs - tsNum);
  log('[OYISHI] Diff tiempo HMAC (ms):', diffMs);

  if (diffMs > 5 * 60 * 1000) {
    log('B) ❌ [OYISHI] Firma expirada. diffMs:', diffMs);
    return new Response(
      JSON.stringify({ error: 'Firma expirada (más de 5 minutos)' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 4. Verificar HMAC-SHA256 ──────────────────────────────────────────────
  try {
    const encoder = new TextEncoder();
    const secretBytes = encoder.encode(expectedSecret);
    
    log(`[OYISHI DIAGNOSTIC] Secret config length: ${expectedSecret.length} chars`);
    log(`[OYISHI DIAGNOSTIC] Timestamp extracted: ${timestamp}`);
    log(`[OYISHI DIAGNOSTIC] rawBody length: ${rawBody.length} chars`);
    log(`[OYISHI DIAGNOSTIC] Concat format for HMAC: rawBody + timestamp`);
    log(`[OYISHI DIAGNOSTIC] Crypto Algo: HMAC SHA-256`);

    const key = await crypto.subtle.importKey(
      'raw',
      secretBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const digestBytes = hexToUint8Array(digest);
    log(`[OYISHI DIAGNOSTIC] Received digest length: ${digestBytes.length} bytes`);

    const dataToVerify = encoder.encode(rawBody + timestamp);

    const isValid = await crypto.subtle.verify('HMAC', key, digestBytes, dataToVerify);
    log(`[OYISHI DIAGNOSTIC] crypto.subtle.verify() result: ${isValid}`);
    
    if (!isValid) {
      log('B) ❌ [OYISHI] Firma HMAC inválida');
      return new Response(
        JSON.stringify({ error: 'Firma HMAC inválida.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    log('B) ✅ [OYISHI] Firma HMAC Válida');
  } catch (err: any) {
    log('B) ❌ [OYISHI] Error verificando HMAC:', err?.message);
    return new Response(
      JSON.stringify({ error: 'Error interno verificando firma HMAC' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 5. Parsear payload ────────────────────────────────────────────────────
  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    log('❌ [OYISHI] Cuerpo JSON inválido');
    return new Response(
      JSON.stringify({ error: 'Cuerpo JSON inválido' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  log('C) [OYISHI] Evento recibido:', payload.event, '| call_id:', payload.data?.call_id || payload.call_id);

  if (payload.diagnostic) {
    log('Evento diagnóstico de Retell');
    return new Response(
      JSON.stringify({ diagnostic: true, message: 'Webhook OYISHI operativo', payload }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 5.5. Interceptar Tool Calls ──────────────────────────
  if (payload.type === 'tool_call' || payload.name === 'calcular_pedido' || payload.name === 'check_availability' || payload.name === 'confirm_reservation' || (payload.args && payload.tool_call_id)) {
    const toolName = payload.name || (payload.args?.agent_call_id ? 'confirm_reservation' : (payload.args?.date ? 'check_availability' : 'calcular_pedido'));

    if (toolName === 'check_availability') {
      log('--- TOOL CALL INTERCEPTADO: check_availability ---');
      const args = payload.args || {};
      const reqDate = args.date;
      const reqTime = args.time;
      const partySize = Number(args.party_size) || 2;

      if (!env.DB) {
        return new Response(JSON.stringify({ available: false, reason: "UNAVAILABLE", mensaje_para_agente: "No puedes confirmar esta reserva. No hay disponibilidad para esa hora o el aforo está completo." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (!reqDate || !reqTime || !/^\d{4}-\d{2}-\d{2}$/.test(reqDate) || !/^\d{2}:\d{2}$/.test(reqTime)) {
        return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "UNAVAILABLE", mensaje_para_agente: "No puedes confirmar esta reserva. Fecha u hora no válidas." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      try {
        const dateObj = new Date(reqDate);
        const jsDay = dateObj.getDay();
        const dbDay = jsDay === 0 ? 7 : jsDay;

        const { results: scheduleResults } = await env.DB.prepare('SELECT * FROM schedules WHERE day_id = ?').bind(dbDay).all();
        
        if (!scheduleResults || scheduleResults.length === 0) {
          return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "CLOSED", mensaje_para_agente: "No puedes confirmar esta reserva. El restaurante está cerrado ese día." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const schedule: any = scheduleResults[0];
        if (schedule.is_closed) {
          return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "CLOSED", mensaje_para_agente: "No puedes confirmar esta reserva. El restaurante está cerrado ese día." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const reqMins = (() => {
          const [h, m] = reqTime.split(':').map(Number);
          return h * 60 + (m || 0);
        })();

        const checkRange = (open: string, close: string) => {
          if (!open || !close) return false;
          const [oH, oM] = open.split(':').map(Number);
          const [cH, cM] = close.split(':').map(Number);
          return reqMins >= (oH * 60 + oM) && reqMins <= (cH * 60 + cM - 45);
        };

        if (!checkRange(schedule.open_time_1, schedule.close_time_1) && !checkRange(schedule.open_time_2, schedule.close_time_2)) {
          return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "OUT_OF_HOURS", mensaje_para_agente: "No puedes confirmar esta reserva. El horario solicitado está fuera del horario de servicio." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const MAX_PEOPLE_PER_SLOT = 40;
        const { results: resResults } = await env.DB.prepare(
          'SELECT SUM(party_size) as total FROM reservations WHERE date = ? AND time = ? AND status != ?'
        ).bind(reqDate, reqTime, 'CANCELADA').all();
        
        const currentTotal = Number(resResults?.[0]?.total || 0);
        
        if (currentTotal + partySize > MAX_PEOPLE_PER_SLOT) {
          return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "UNAVAILABLE", mensaje_para_agente: "No puedes confirmar esta reserva. No hay disponibilidad para esa hora o el aforo está completo." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ available: true, date: reqDate, time: reqTime, party_size: partySize, mensaje_para_agente: "Hay disponibilidad. Puedes confirmar la reserva al cliente." }), { status: 200, headers: { 'Content-Type': 'application/json' } });

      } catch (e: any) {
        log('❌ Error DB check_availability:', e.message);
        return new Response(JSON.stringify({ available: false, date: reqDate, time: reqTime, reason: "UNAVAILABLE", mensaje_para_agente: "No puedes confirmar esta reserva. No hay disponibilidad para esa hora o el aforo está completo." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }

    if (toolName === 'confirm_reservation') {
      log('--- TOOL CALL INTERCEPTADO: confirm_reservation ---');
      const args = payload.args || {};
      const reqDate = args.date;
      const reqTime = args.time;
      const partySize = Number(args.party_size) || 2;
      const customerName = args.customer_name || payload.customer_name || 'Desconocido';
      const phone = args.phone || payload.phone || payload.from_number || 'Desconocido';
      const call_id = payload.call?.call_id || payload.data?.call_id || payload.call_id;
      const agentCallId = String(args.agent_call_id || call_id || '').trim();

      if (!agentCallId || agentCallId === 'undefined' || agentCallId === 'null') {
        return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "Se requiere agent_call_id para procesar la reserva." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (!env.DB) {
        return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "Error interno del servidor (BD)." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      try {

        if (!reqDate || !reqTime || !/^\d{4}-\d{2}-\d{2}$/.test(reqDate) || !/^\d{2}:\d{2}$/.test(reqTime)) {
          return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "Fecha u hora no válidas." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const dateObj = new Date(reqDate);
        const jsDay = dateObj.getDay();
        const dbDay = jsDay === 0 ? 7 : jsDay;

        const { results: scheduleResults } = await env.DB.prepare('SELECT * FROM schedules WHERE day_id = ?').bind(dbDay).all();
        
        if (!scheduleResults || scheduleResults.length === 0 || (scheduleResults[0] as any).is_closed) {
          return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "El restaurante está cerrado ese día." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const schedule: any = scheduleResults[0];
        const reqMins = (() => {
          const [h, m] = reqTime.split(':').map(Number);
          return h * 60 + (m || 0);
        })();

        const checkRange = (open: string, close: string) => {
          if (!open || !close) return false;
          const [oH, oM] = open.split(':').map(Number);
          const [cH, cM] = close.split(':').map(Number);
          return reqMins >= (oH * 60 + oM) && reqMins <= (cH * 60 + cM - 45);
        };

        if (!checkRange(schedule.open_time_1, schedule.close_time_1) && !checkRange(schedule.open_time_2, schedule.close_time_2)) {
          return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "El horario solicitado está fuera del horario de servicio." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const MAX_PEOPLE_PER_SLOT = 40;
        const { results: resResults } = await env.DB.prepare(
          'SELECT SUM(party_size) as total FROM reservations WHERE date = ? AND time = ? AND status != ?'
        ).bind(reqDate, reqTime, 'CANCELADA').all();
        
        const currentTotal = Number(resResults?.[0]?.total || 0);
        
        if (currentTotal + partySize > MAX_PEOPLE_PER_SLOT) {
          return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "Lo siento, el aforo se ha completado hace unos instantes." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const resId = `res_${agentCallId}_${Date.now()}`;
        const createdAt = new Date().toISOString();
        
        try {
          await env.DB.prepare(
            `INSERT INTO reservations (id, date, time, party_size, customer_name, phone, status, source, created_at, updated_at, agent_call_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(
            resId, reqDate, reqTime, partySize, customerName, phone, 'CONFIRMADA', 'RETELL', createdAt, createdAt, agentCallId
          ).run();
        } catch(insertErr: any) {
          const errMsg = insertErr.message || '';
          if (errMsg.includes('has no column named agent_call_id') || errMsg.includes('no such column')) {
            log('[OYISHI] confirm_reservation: Falta migración agent_call_id. Abortando.');
            return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "DATABASE_NOT_READY" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          if (errMsg.includes('UNIQUE constraint failed') || errMsg.includes('UNIQUE constraint')) {
            log('[OYISHI] confirm_reservation: Reserva duplicada interceptada por índice UNIQUE. Éxito.');
            return new Response(JSON.stringify({ 
              confirmed: true,
              reservation_confirmed: true,
              reservation_id: resId, 
              message: "Reserva confirmada correctamente (reintento)." 
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
          }
          throw insertErr;
        }

        return new Response(JSON.stringify({ 
          confirmed: true,
          reservation_confirmed: true,
          reservation_id: resId, 
          message: "Reserva confirmada correctamente." 
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });

      } catch (e: any) {
        log('❌ Error DB confirm_reservation:', e.message);
        return new Response(JSON.stringify({ confirmed: false, reservation_confirmed: false, reason: "Error interno al guardar la reserva." }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }

    log('--- TOOL CALL INTERCEPTADO: calcular_pedido ---');
    
    // Extraemos los items recibidos de los argumentos de la herramienta
    const items = payload.args?.items || payload.args?.order_items || [];
    
    // Reutilizamos la robusta lógica de normalización enviándole un payload falso
    const { normalizedItems } = extractOrderFromRetellPayload({
      args: { order_items: items }
    }, context_catalog);

    let total = 0;
    const resultItems = normalizedItems.map(item => {
      const subtotal = (item._isOfficial && item.price) ? item.price * item.quantity : 0;
      total += subtotal;
      return {
        producto_oficial: item.name,
        reference: item.reference || 'desconocida',
        cantidad: item.quantity,
        precio_unitario: item.price,
        subtotal: subtotal,
        estado: item._isOfficial ? 'valido' : 'revision'
      };
    });

    const responseJson = {
      productos: resultItems,
      total_oficial: total,
      mensaje_para_agente: `El cálculo total es ${total.toFixed(2)} €. Debes decir exactamente este importe.`
    };

    log(`[OYISHI TOOL] Retornando cálculo al agente. Total: ${total.toFixed(2)} €`);

    // Retornar código 200 con el JSON de resultado para que Retell se lo pase al agente
    return new Response(JSON.stringify(responseJson), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // ── 6. Filtrar eventos relevantes ─────────────────────────────────────────
  if (payload.event && !ACCEPTED_EVENTS.has(payload.event)) {
    log(`C) ⚠️ [OYISHI] Evento ignorado: ${payload.event}`);
    return new Response(
      JSON.stringify({
        success: true,
        message: `Evento '${payload.event}' ignorado.`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 7. Extraer datos del pedido ───────────────────────────────────────────
  const { orderRecord, debug_info, normalizedItems } = extractOrderFromRetellPayload(payload, context_catalog);
  log(`D) [OYISHI] order_items encontrados: ${debug_info.found_order_items ? 'SI' : 'NO'}`);
  log(`D) [OYISHI] total recalculado: ${orderRecord.total}`);

  if (normalizedItems.length === 0) {
    log('D) ❌ [OYISHI] Error: No se encontraron order_items válidos. Abortando inserción.');
    return new Response(
      JSON.stringify({ error: 'Faltan order_items. No se creará pedido vacío.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── 8. Guardar en D1 ─────────────────────────────────────────────────────
  if (!env.DB) {
    log('E) ❌ [OYISHI] La binding DB (D1) no está disponible');
    return new Response(
      JSON.stringify({ error: 'Base de datos D1 no vinculada.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  log('E) [OYISHI] Intentando INSERT en D1...');
  try {
    await env.DB.prepare(
      `INSERT OR REPLACE INTO retell_orders
        (id, customer_name, phone, date, time, party_size,
         order_items, notes, total, agent_call_id, created_at, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        orderRecord.id,
        orderRecord.customer_name,
        orderRecord.phone,
        orderRecord.date,
        orderRecord.time,
        orderRecord.party_size,
        orderRecord.order_items,
        orderRecord.notes,
        orderRecord.total,
        orderRecord.agent_call_id,
        orderRecord.created_at,
        orderRecord.status
      )
      .run();

    log(`F) ✅ [OYISHI] Pedido guardado en D1 exitosamente: ${orderRecord.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderRecord.id,
        debug_info,
        extracted_data: orderRecord,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    log(`F) ❌ [OYISHI] Error guardando en D1: ${err?.message}`);
    return new Response(
      JSON.stringify({ error: `Error guardando pedido en D1: ${err?.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

