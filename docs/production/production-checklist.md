# Checklist de ProducciÃ³n OYISHI

Esta lista de comprobaciÃ³n asegura que el entorno de producciÃ³n estÃ© correctamente configurado antes del lanzamiento oficial.

## 1. Dominio y Servidor
- [ ] El dominio `oyishi.es` apunta correctamente a los DNS del nuevo hosting.
- [ ] Certificado SSL (HTTPS) activado y forzando redirecciÃ³n automÃ¡tica de HTTP a HTTPS.
- [ ] Reglas SPA configuradas (todas las rutas no encontradas devuelven `index.html` con estado 200/rewrite).
- [ ] ConfiguraciÃ³n de cachÃ© (los assets en `assets/` y archivos versionados tienen expiraciÃ³n larga; `index.html` tiene cache-control `no-cache`).

## 2. SEO y Rendimiento
- [ ] Etiquetas Canonical y Meta Description inyectadas correctamente en cada pÃ¡gina de forma dinÃ¡mica.
- [ ] Open Graph (`og:image`) configurado, usando imagen vÃ¡lida `oyishi-sushi-poster.webp`.
- [ ] `sitemap.xml` accesible en `/sitemap.xml` y contiene sÃ³lo rutas de producciÃ³n.
- [ ] `robots.txt` permite rastreo a todos y referencia el sitemap.
- [ ] Google Search Console configurado con el dominio final (`oyishi.es`).

## 3. AnalÃ­tica y Redes
- [ ] Variable de entorno `VITE_GA_MEASUREMENT_ID` aÃ±adida al panel del hosting (Vercel, Pages, etc) con el ID real (solo cuando exista un ID oficial).
- [ ] Enlaces a redes sociales eliminados temporalmente del pie de pÃ¡gina hasta que OYISHI confirme cuentas oficiales.

## 4. Formularios, Datos y Contacto
- [ ] TelÃ©fono principal y secundario verificados (918 626 221 / 699 365 212). Ninguna referencia al telÃ©fono de prueba.
- [ ] Correo electrÃ³nico verificado (`info@oyishi.es`).
- [ ] Formulario de reservas: Enrutado a sistema de reservas nativo o gestionado vÃ­a CTA telefÃ³nico por ahora.

## 5. Cuestiones Legales
- [ ] Textos de Aviso Legal revisados (Pendiente de aprobaciÃ³n definitiva por el equipo legal de OYISHI).
- [ ] Textos de PolÃ­tica de Privacidad revisados (Pendiente de aprobaciÃ³n definitiva).
- [ ] Textos de PolÃ­tica de Cookies revisados (Pendiente de aprobaciÃ³n definitiva).
- [ ] **Nota:** *Los textos legales actuales deben ser validados por un profesional jurÃ­dico antes de asumir cualquier compromiso comercial.*

## 6. QA Final en ProducciÃ³n
- [ ] Responsive UI verificada en mÃ³vil y tablet (Safari iOS, Chrome Android).
- [ ] Comprobar que los videos Hero (`.mp4`) reproducen silenciosamente sin bloquear ancho de banda crÃ­tico.
- [ ] Rutas legacy (`oyishi.es/reservation.php`, `menu.php`) estÃ¡n redirigidas al inicio `/` o devuelven 404 manejado, evitando indexaciÃ³n legacy.
- [ ] Comprobar pÃ¡gina interna genÃ©rica de "No encontrada" (Error 404 interno) visitando `/ruta-inventada`.

## 7. Mantenimiento y Rollback
- [ ] El cÃ³digo estÃ¡ respaldado en repositorio Git.
- [ ] Procedimiento de Rollback documentado (volver a commit anterior en el hosting).
