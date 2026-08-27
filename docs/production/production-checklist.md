# Checklist de Producción OYISHI

Esta lista de comprobación asegura que el entorno de producción esté correctamente configurado antes del lanzamiento oficial.

## 1. Dominio y Servidor
- [ ] El dominio `oyishi.es` apunta correctamente a los DNS del nuevo hosting.
- [ ] Certificado SSL (HTTPS) activado y forzando redirección automática de HTTP a HTTPS.
- [ ] Reglas SPA configuradas (todas las rutas no encontradas devuelven `index.html` con estado 200/rewrite).
- [ ] Configuración de caché (los assets en `assets/` y archivos versionados tienen expiración larga; `index.html` tiene cache-control `no-cache`).

## 2. SEO y Rendimiento
- [ ] Etiquetas Canonical y Meta Description inyectadas correctamente en cada página de forma dinámica.
- [ ] Open Graph (`og:image`) configurado, usando imagen válida `oyishi-sushi-poster.webp`.
- [ ] `sitemap.xml` accesible en `/sitemap.xml` y contiene sólo rutas de producción.
- [ ] `robots.txt` permite rastreo a todos y referencia el sitemap.
- [ ] Google Search Console configurado con el dominio final (`oyishi.es`).

## 3. Analítica y Redes
- [ ] Variable de entorno `VITE_GA_MEASUREMENT_ID` añadida al panel del hosting (Vercel, Pages, etc) con el ID real (solo cuando exista un ID oficial).
- [ ] Enlaces a redes sociales eliminados temporalmente del pie de página hasta que OYISHI confirme cuentas oficiales.

## 4. Formularios, Datos y Contacto
- [ ] Teléfono principal y secundario verificados (918 626 221 / 699 365 212). Ninguna referencia al teléfono de prueba.
- [ ] Correo electrónico verificado (`info@oyishi.es`).
- [ ] Formulario de reservas: Enrutado a sistema de reservas nativo o gestionado vía CTA telefónico por ahora.

## 5. Cuestiones Legales
- [ ] Textos de Aviso Legal revisados (Pendiente de aprobación definitiva por el equipo legal de OYISHI).
- [ ] Textos de Política de Privacidad revisados (Pendiente de aprobación definitiva).
- [ ] Textos de Política de Cookies revisados (Pendiente de aprobación definitiva).
- [ ] **Nota:** *Los textos legales actuales deben ser validados por un profesional jurídico antes de asumir cualquier compromiso comercial.*

## 6. QA Final en Producción
- [ ] Responsive UI verificada en móvil y tablet (Safari iOS, Chrome Android).
- [ ] Comprobar que los videos Hero (`.mp4`) reproducen silenciosamente sin bloquear ancho de banda crítico.
- [ ] Rutas legacy (`oyishi.es/reservation.php`, `menu.php`) están redirigidas al inicio `/` o devuelven 404 manejado, evitando indexación legacy.
- [ ] Comprobar página interna genérica de "No encontrada" (Error 404 interno) visitando `/ruta-inventada`.

## 7. Mantenimiento y Rollback
- [ ] El código está respaldado en repositorio Git.
- [ ] Procedimiento de Rollback documentado (volver a commit anterior en el hosting).
