# IntegraciÃ³n con Google Search Console

Este documento detalla los pasos necesarios para conectar el proyecto OYISHI a Google Search Console una vez se disponga del dominio oficial en producciÃ³n (`https://oyishi.es`).

## Requisitos
- Acceso de administrador o propietario al dominio `oyishi.es`.
- Proyecto web desplegado y funcional en producciÃ³n.
- `sitemap.xml` accesible en `https://oyishi.es/sitemap.xml`.

## Pasos de VerificaciÃ³n y ConfiguraciÃ³n

1. **AÃ±adir Propiedad:**
   - Inicia sesiÃ³n en [Google Search Console](https://search.google.com/search-console).
   - Haz clic en "AÃ±adir propiedad".
   - Introduce el dominio exacto: `https://oyishi.es`.

2. **Verificar Dominio:**
   - La forma mÃ¡s robusta es la verificaciÃ³n mediante registro DNS (TXT) o mediante meta etiqueta HTML.
   - Sigue las instrucciones proporcionadas por Google en esa pantalla. *Nota: NO introducir tokens inventados.*

3. **Enviar Sitemap:**
   - Una vez verificada la propiedad, navega a la secciÃ³n **Sitemaps** en el panel izquierdo.
   - Introduce la URL del sitemap: `https://oyishi.es/sitemap.xml`.
   - Haz clic en "Enviar" y comprueba que el estado cambie a "Correcto".

4. **Comprobar IndexaciÃ³n:**
   - Usa la herramienta de "InspecciÃ³n de URLs" en Search Console.
   - Introduce `https://oyishi.es` y solicita la indexaciÃ³n manual de la pÃ¡gina de inicio para acelerar el proceso inicial.
   - Repite el proceso para `https://oyishi.es/carta` y `https://oyishi.es/reservas`.
