# Despliegue en Cloudflare Pages â€” OYISHI

Este documento especifica la configuraciÃ³n exacta y recomendada para publicar la aplicaciÃ³n OYISHI como una Single Page Application (SPA) utilizando Cloudflare Pages.

## 1. Build command
El comando de construcciÃ³n para compilar la aplicaciÃ³n React con Vite y verificar la consistencia de los datos simultÃ¡neamente es:
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
1. DirÃ­gete a la configuraciÃ³n de tu proyecto en el panel de Cloudflare Pages.
2. Ve a la pestaÃ±a **Custom domains** (Dominios personalizados).
3. Selecciona "Set up a custom domain" e introduce `oyishi.es`.
4. Cloudflare detectarÃ¡ automÃ¡ticamente la zona DNS si la administras allÃ­, o te proporcionarÃ¡ el registro CNAME necesario si la gestionas con otro proveedor. Sigue las instrucciones y haz clic en "Activar".

## 4. HTTPS
Cloudflare Pages proporciona automÃ¡ticamente certificados SSL/TLS (HTTPS) para el dominio personalizado. Todo el trÃ¡fico HTTP serÃ¡ redirigido a HTTPS automÃ¡ticamente sin necesidad de aÃ±adir reglas manuales en el proyecto.

## 5. Environment variables
Para activar Google Analytics 4, es indispensable definir la siguiente variable de entorno en las "Settings > Environment variables" del proyecto en Cloudflare Pages, tanto para el entorno de ProducciÃ³n como para Preview:

* Variable: `VITE_GA_MEASUREMENT_ID`
* Valor: `G-XXXXXXXXXX` (Sustituir por el ID real de mediciÃ³n de GA4).

*Nota: Si esta variable se deja en blanco o no se define, el cÃ³digo de Google Analytics no se ejecutarÃ¡.*

## 6. Deploy
Al integrar Cloudflare Pages con tu repositorio de GitHub o GitLab, cada `git push` a la rama principal (usualmente `main` o `master`) desencadenarÃ¡ un proceso de *build* y posterior *deploy* automÃ¡tico a producciÃ³n.

## 7. Preview deployment
Cualquier Push o Pull Request hacia ramas secundarias (fuera de la principal) generarÃ¡ una URL temporal de visualizaciÃ³n (Preview). Ãštil para verificar cambios de rediseÃ±o o datos sin impactar a la web en vivo.

## 8. Production deployment
El despliegue de ProducciÃ³n estÃ¡ siempre atado a la rama principal. Se compila automÃ¡ticamente bajo la URL nativa de Pages (`oyishi.pages.dev`) y se propaga instantÃ¡neamente al dominio `oyishi.es`.

## 9. CÃ³mo comprobar /carta
Una vez en producciÃ³n, escribe manualmente en el navegador `https://oyishi.es/carta`. DeberÃ­as visualizar la pÃ¡gina del menÃº cargada instantÃ¡neamente, lo cual verifica que el enrutamiento SPA y la reescritura interna (`_redirects`) funcionan con cÃ³digo de estado HTTP 200, evitando errores 404 de servidor.

## 10. CÃ³mo comprobar /reservas
Escribe `https://oyishi.es/reservas` y confirma la apariciÃ³n de los detalles telefÃ³nicos verificados. Al recargar la pÃ¡gina (F5) no debe mostrar un error "Not Found".

## 11. CÃ³mo comprobar /contacto
Accede a `https://oyishi.es/contacto` directamente a travÃ©s de su URL. El componente de mapa integrado debe visualizarse sin problemas y la recarga forzada debe servir el estado correcto.

## 12. CÃ³mo comprobar sitemap
Abre `https://oyishi.es/sitemap.xml`. Debe devolverte un archivo XML bien formado incluyendo todas las rutas de primer nivel sin parÃ¡metros extra de bÃºsqueda ni pÃ¡ginas en fase de pruebas.

## 13. CÃ³mo comprobar robots
Abre `https://oyishi.es/robots.txt`. Debe mostrar que todos los rastreadores estÃ¡n permitidos (`User-agent: *`, `Allow: /`) y debe contener la ruta completa del Sitemap hacia `oyishi.es`.

## 14. CÃ³mo comprobar Hero
Al entrar a la portada (`https://oyishi.es/`), asegÃºrate de que el vÃ­deo cinematogrÃ¡fico carga eficientemente, de que `oyishi-sushi-build.mp4` entra en autoplay y no hay errores de consola. Comprueba que el `og:image` corresponde al `oyishi-sushi-poster.webp` extraÃ­do del proyecto.

## 15. CÃ³mo hacer rollback
Si se sube a producciÃ³n un commit con errores crÃ­ticos:
1. Accede al panel de Cloudflare Pages > Proyecto OYISHI.
2. Navega a **Deployments**.
3. Busca un despliegue anterior que tuviese estado correcto (Success).
4. Haz clic en "Retry deployment" o en los tres puntos > "Rollback" (o "Promote to production") para revertir el estado en vivo a la compilaciÃ³n anterior inmediatamente, restaurando la estabilidad.
