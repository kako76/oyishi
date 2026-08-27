# Integración con Google Search Console

Este documento detalla los pasos necesarios para conectar el proyecto OYISHI a Google Search Console una vez se disponga del dominio oficial en producción (`https://oyishi.es`).

## Requisitos
- Acceso de administrador o propietario al dominio `oyishi.es`.
- Proyecto web desplegado y funcional en producción.
- `sitemap.xml` accesible en `https://oyishi.es/sitemap.xml`.

## Pasos de Verificación y Configuración

1. **Añadir Propiedad:**
   - Inicia sesión en [Google Search Console](https://search.google.com/search-console).
   - Haz clic en "Añadir propiedad".
   - Introduce el dominio exacto: `https://oyishi.es`.

2. **Verificar Dominio:**
   - La forma más robusta es la verificación mediante registro DNS (TXT) o mediante meta etiqueta HTML.
   - Sigue las instrucciones proporcionadas por Google en esa pantalla. *Nota: NO introducir tokens inventados.*

3. **Enviar Sitemap:**
   - Una vez verificada la propiedad, navega a la sección **Sitemaps** en el panel izquierdo.
   - Introduce la URL del sitemap: `https://oyishi.es/sitemap.xml`.
   - Haz clic en "Enviar" y comprueba que el estado cambie a "Correcto".

4. **Comprobar Indexación:**
   - Usa la herramienta de "Inspección de URLs" en Search Console.
   - Introduce `https://oyishi.es` y solicita la indexación manual de la página de inicio para acelerar el proceso inicial.
   - Repite el proceso para `https://oyishi.es/carta` y `https://oyishi.es/reservas`.
