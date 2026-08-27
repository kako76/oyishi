# Configuración de Routing SPA en Producción

Dado que OYISHI es una Single Page Application (SPA) gestionada con React, es obligatorio configurar el servidor/hosting para que todas las peticiones a rutas internas (ej: `/carta`, `/reservas`) devuelvan el archivo `index.html`. De lo contrario, el usuario verá un error 404 al recargar la página en una ruta interna.

A continuación se detallan las configuraciones para los entornos de despliegue más habituales.

## 1. Cloudflare Pages
Crea un archivo llamado `_redirects` en la carpeta `public` o configúralo en las reglas de Pages:
```text
/* /index.html 200
```

## 2. Vercel
Crea un archivo `vercel.json` en la raíz del proyecto:
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
Si usas un servidor tradicional con Apache, añade este `.htaccess` a la carpeta `dist` / raíz pública:
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
Si usas Nginx, modifica el bloque `location /` en la configuración de tu sitio:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
