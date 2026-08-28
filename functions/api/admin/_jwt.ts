function base64UrlEncode(buffer: ArrayBuffer | string): string {
  const bytes = typeof buffer === 'string'
    ? new TextEncoder().encode(buffer)
    : new Uint8Array(buffer);

  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(base64Url: string): Uint8Array {
  // Pad the string with '=' so it's a multiple of 4
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function signJWT(payload: object, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64UrlEncode(signature);

  return `${data}.${encodedSignature}`;
}

export async function verifyJWT(token: string, secret: string): Promise<any> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Token format invalid');

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBytes = base64UrlDecode(encodedSignature);
  const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, new TextEncoder().encode(data));

  if (!isValid) throw new Error('Signature invalid');

  const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedPayload)));

  // Validate expiration
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    throw new Error('Token expired');
  }

  // Validate algorithm in header just in case
  const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(encodedHeader)));
  if (header.alg !== 'HS256') {
      throw new Error('Algorithm not supported');
  }

  return payload;
}
