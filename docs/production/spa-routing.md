# ConfiguraciÃ³n de Routing SPA en ProducciÃ³n

Dado que OYISHI es una Single Page Application (SPA) gestionada con React, es obligatorio configurar el servidor/hosting para que todas las peticiones a rutas internas (ej: `/carta`, `/reservas`) devuelvan el archivo `index.html`. De lo contrario, el usuario verÃ¡ un error 404 al recargar la pÃ¡gina en una ruta interna.

A continuaciÃ³n se detallan las configuraciones para los entornos de despliegue mÃ¡s habituales.

## 1. Cloudflare Pages
Crea un archivo llamado `_redirects` en la carpeta `public` o configÃºralo en las reglas de Pages:
```text
/* /index.html 200
```

## 2. Vercel
Crea un archivo `vercel.json` en la raÃ­z del proyecto:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 3. Netlify
Crea un archivo `_redirects` en la carpeta `public` (igual que Cloudflare):
```text
/* /index.html 200
```

## 4. Servidor Apache (.htaccess)
Si usas un servidor tradicional con Apache, aÃ±ade este `.htaccess` a la carpeta `dist` / raÃ­z pÃºblica:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 5. Nginx
Si usas Nginx, modifica el bloque `location /` en la configuraciÃ³n de tu sitio:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
