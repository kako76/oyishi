

async function runTests() {
  const { onRequestPost } = await import('./functions/api/webhook/retell.ts');

  // Mock Request
  const createMockRequest = async (payload) => {
    const rawBody = JSON.stringify(payload);
    const timestamp = Date.now().toString();
    const secret = 'test-secret';
    
    // Generate HMAC
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const dataToSign = encoder.encode(rawBody + timestamp);
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, dataToSign);
    const signatureHex = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
      
    const signature = `v=${timestamp},d=${signatureHex}`;

    return new Request('https://oyishi.es/api/webhook/retell', {
      method: 'POST',
      headers: new Headers({
        'x-retell-signature': signature,
        'content-type': 'application/json'
      }),
      body: rawBody
    });
  };

  const env = {
    RETELL_WEBHOOK_SECRET: 'test-secret',
    DB: {
      prepare: () => ({ run: async () => {}, bind: () => ({ run: async () => {} }) })
    }
  };

  console.log('--- TEST 1: Pedido de Ejemplo ---');
  let req1 = await createMockRequest({
    name: 'calcular_pedido',
    tool_call_id: 'tool_123',
    args: {
      items: [
        { reference: '34', quantity: 1 },
        { reference: '35A', quantity: 1 },
        { reference: '28', quantity: 1 },
        { name: 'Coca-Cola', quantity: 1 }
      ]
    }
  });
  
  let res1 = await onRequestPost({ request: req1, env });
  console.log('Status:', res1.status);
  console.log(JSON.stringify(await res1.json(), null, 2));

  console.log('\n--- TEST 2: Protección Coca-Cola / 15 ---');
  let req2 = await createMockRequest({
    name: 'calcular_pedido',
    tool_call_id: 'tool_123',
    args: {
      items: [
        { reference: '15', name: 'Coca-Cola', quantity: 1 }
      ]
    }
  });
  let res2 = await onRequestPost({ request: req2, env });
  console.log('Status:', res2.status);
  console.log(JSON.stringify(await res2.json(), null, 2));
  
  console.log('\n--- TEST 3: Red Bull desconocido ---');
  let req3 = await createMockRequest({
    name: 'calcular_pedido',
    tool_call_id: 'tool_123',
    args: {
      items: [
        { reference: '999', name: 'Red Bull', price: 3.5, quantity: 1 }
      ]
    }
  });
  let res3 = await onRequestPost({ request: req3, env });
  console.log('Status:', res3.status);
  console.log(JSON.stringify(await res3.json(), null, 2));

}

runTests().catch(console.error);
