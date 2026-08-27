# Despliegue en Cloudflare Pages — OYISHI

Este documento especifica la configuración exacta y recomendada para publicar la aplicación OYISHI como una Single Page Application (SPA) utilizando Cloudflare Pages.

## 1. Build command
El comando de construcción para compilar la aplicación React con Vite y verificar la consistencia de los datos simultáneamente es:
```bash
npm run build
```

## 2. Output directory
El directorio donde Vite genera los archivos compilados es:
```
dist
```

## 3. Custom domain
Para conectar el dominio final:
1. Dirígete a la configuración de tu proyecto en el panel de Cloudflare Pages.
2. Ve a la pestaña **Custom domains** (Dominios personalizados).
3. Selecciona "Set up a custom domain" e introduce `oyishi.es`.
4. Cloudflare detectará automáticamente la zona DNS si la administras allí, o te proporcionará el registro CNAME necesario si la gestionas con otro proveedor. Sigue las instrucciones y haz clic en "Activar".

## 4. HTTPS
Cloudflare Pages proporciona automáticamente certificados SSL/TLS (HTTPS) para el dominio personalizado. Todo el tráfico HTTP será redirigido a HTTPS automáticamente sin necesidad de añadir reglas manuales en el proyecto.

## 5. Environment variables
Para activar Google Analytics 4, es indispensable definir la siguiente variable de entorno en las "Settings > Environment variables" del proyecto en Cloudflare Pages, tanto para el entorno de Producción como para Preview:

* Variable: `VITE_GA_MEASUREMENT_ID`
* Valor: `G-XXXXXXXXXX` (Sustituir por el ID real de medición de GA4).

*Nota: Si esta variable se deja en blanco o no se define, el código de Google Analytics no se ejecutará.*

## 6. Deploy
Al integrar Cloudflare Pages con tu repositorio de GitHub o GitLab, cada `git push` a la rama principal (usualmente `main` o `master`) desencadenará un proceso de *build* y posterior *deploy* automático a producción.

## 7. Preview deployment
Cualquier Push o Pull Request hacia ramas secundarias (fuera de la principal) generará una URL temporal de visualización (Preview). Útil para verificar cambios de rediseño o datos sin impactar a la web en vivo.

## 8. Production deployment
El despliegue de Producción está siempre atado a la rama principal. Se compila automáticamente bajo la URL nativa de Pages (`oyishi.pages.dev`) y se propaga instantáneamente al dominio `oyishi.es`.

## 9. Cómo comprobar /carta
Una vez en producción, escribe manualmente en el navegador `https://oyishi.es/carta`. Deberías visualizar la página del menú cargada instantáneamente, lo cual verifica que el enrutamiento SPA y la reescritura interna (`_redirects`) funcionan con código de estado HTTP 200, evitando errores 404 de servidor.

## 10. Cómo comprobar /reservas
Escribe `https://oyishi.es/reservas` y confirma la aparición de los detalles telefónicos verificados. Al recargar la página (F5) no debe mostrar un error "Not Found".

## 11. Cómo comprobar /contacto
Accede a `https://oyishi.es/contacto` directamente a través de su URL. El componente de mapa integrado debe visualizarse sin problemas y la recarga forzada debe servir el estado correcto.

## 12. Cómo comprobar sitemap
Abre `https://oyishi.es/sitemap.xml`. Debe devolverte un archivo XML bien formado incluyendo todas las rutas de primer nivel sin parámetros extra de búsqueda ni páginas en fase de pruebas.

## 13. Cómo comprobar robots
Abre `https://oyishi.es/robots.txt`. Debe mostrar que todos los rastreadores están permitidos (`User-agent: *`, `Allow: /`) y debe contener la ruta completa del Sitemap hacia `oyishi.es`.

## 14. Cómo comprobar Hero
Al entrar a la portada (`https://oyishi.es/`), asegúrate de que el vídeo cinematográfico carga eficientemente, de que `oyishi-sushi-build.mp4` entra en autoplay y no hay errores de consola. Comprueba que el `og:image` corresponde al `oyishi-sushi-poster.webp` extraído del proyecto.

## 15. Cómo hacer rollback
Si se sube a producción un commit con errores críticos:
1. Accede al panel de Cloudflare Pages > Proyecto OYISHI.
2. Navega a **Deployments**.
3. Busca un despliegue anterior que tuviese estado correcto (Success).
4. Haz clic en "Retry deployment" o en los tres puntos > "Rollback" (o "Promote to production") para revertir el estado en vivo a la compilación anterior inmediatamente, restaurando la estabilidad.
