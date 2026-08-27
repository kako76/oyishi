# OYISHI — Entrega Comercial del Nuevo Proyecto Digital

> **Documento preparado para:** Propietario de OYISHI Gastronomía Japonesa
> **Fecha de entrega:** Agosto 2026
> **Carácter:** Confidencial · Uso interno

---

## ÍNDICE

1. [Situación Anterior](#1-situación-anterior)
2. [La Nueva Web](#2-la-nueva-web)
3. [Beneficios para OYISHI](#3-beneficios-para-oyishi)
4. [Guion de Demo — 5 Minutos](#4-guion-de-demo--5-minutos)
5. [Desarrollos Futuros](#5-desarrollos-futuros)
6. [Propuesta de Soporte y Mantenimiento](#6-propuesta-de-soporte-y-mantenimiento)
7. [Checklist de Entrega al Cliente](#7-checklist-de-entrega-al-cliente)

---

## 1. Situación Anterior

La web anterior de OYISHI fue construida en un momento en el que las prioridades y los recursos disponibles eran distintos. Cumplió su función durante su ciclo de vida y contiene información válida sobre el restaurante. Sin embargo, con el tiempo fueron acumulándose ciertas limitaciones que hoy resultan difíciles de ignorar.

### Áreas de mejora identificadas

**Diseño visual**
La estética general respondía a patrones web de hace varios años. La tipografía, los colores y la composición de las páginas no transmitían con suficiente claridad el nivel gastronómico que OYISHI ofrece. Un cliente que visitara la web antes de acudir al restaurante podría llevarse una impresión que no correspondía con la experiencia real.

**Experiencia en dispositivos móviles**
Más del 60–70 % del tráfico de restaurantes proviene de búsquedas desde el teléfono. La web anterior no estaba diseñada con el móvil como prioridad, lo que podía dificultar la lectura de la carta, el acceso al teléfono o la localización del restaurante en pantallas pequeñas.

**Navegación fragmentada**
El sitio estaba estructurado en páginas separadas con carga completa al cambiar de sección. Esto generaba tiempos de espera visibles, inconsistencias visuales entre páginas y una sensación de sitio "compartimentado" en lugar de una experiencia de marca unificada.

**Carta digital**
La carta estaba presentada en un formato que hacía difícil la exploración. No había manera de buscar un plato concreto, filtrar por tipo de producto, ni visualizar de manera clara el catálogo completo de lo que OYISHI ofrece.

**Coherencia visual entre secciones**
Cada página tenía un estilo ligeramente diferente, lo que impedía que el visitante percibiera una identidad visual única y reconocible de marca.

**Dependencia de tecnología antigua**
El sitio funcionaba sobre scripts PHP independientes (menu.php, reservation.php, contact.php, points.php), lo que limitaba la capacidad de evolución, dificultaba el mantenimiento y hacía imposible garantizar una experiencia de usuario moderna.

---

## 2. La Nueva Web

El nuevo proyecto digital de OYISHI es una propuesta integral: no es una actualización de lo anterior, sino una construcción desde cero pensada para reflejar el nivel real del restaurante.

### Una nueva identidad visual

La nueva web tiene una identidad propia: paleta de color oscura con detalles dorados, tipografía display de alta jerarquía y una estética que evoca la cultura gastronómica japonesa contemporánea sin recurrir a clichés. El resultado es una imagen de marca coherente, premium y diferenciada.

### Navegación SPA (Single Page Application)

La web funciona sin recargas de página. Al navegar entre secciones, el cambio es instantáneo y fluido, como una aplicación nativa. Esto elimina los tiempos de espera y proporciona una experiencia percibida de mayor calidad.

### Home editorial

La página de inicio no es un listado de información, sino una experiencia curada: un hero cinematográfico, una selección de productos estrella, y una presentación de la identidad del restaurante que invita a explorar y quedarse.

### Carta independiente — 155 productos reales, 17 categorías

La carta ha sido extraída y verificada directamente desde oyishi.es. Todos los productos, nombres, precios y categorías son datos reales del restaurante. La carta está organizada en 17 familias de producto y presenta los 155 platos disponibles con fotografía cuando está disponible.

### Buscador y filtros

El visitante puede escribir el nombre de cualquier plato o ingrediente y el resultado aparece al instante, sin esperas. También puede filtrar por categoría con un solo clic. La exploración de la carta es ahora intuitiva y rápida.

### Carrito / Comanda

El cliente puede seleccionar platos desde la carta y construir una comanda, que puede usar como referencia para comunicarla al restaurante. Esta funcionalidad mejora el recorrido del cliente y sienta las bases para integraciones más avanzadas en el futuro.

### Páginas completas

El sitio incluye las siguientes secciones:

| Sección | Contenido |
|---|---|
| **Home** | Página editorial de presentación de marca |
| **La Carta** | Catálogo completo con buscador, filtros y comanda |
| **Quiénes Somos** | Historia, valores y equipo del restaurante |
| **Reservas** | Formulario de solicitud de reserva |
| **Contacto** | Datos de contacto, teléfono, mapa y formulario |
| **Aviso Legal** | Textos legales del sitio |
| **Política de Privacidad** | Tratamiento de datos personales |
| **Política de Cookies** | Gestión de cookies |

### SEO técnico

El sitio está preparado con estructura semántica HTML correcta, metadatos por página (título, descripción, Open Graph), sitemap XML y robots.txt configurados. Esta base permite a Google indexar el sitio correctamente desde el primer día.

### Responsive y accesible

El diseño está pensado desde el móvil. Cada elemento —botones, textos, imágenes, formularios— ha sido adaptado para funcionar en cualquier tamaño de pantalla. Los elementos interactivos cumplen los estándares de accesibilidad (WCAG), con áreas táctiles adecuadas y etiquetas correctas para lectores de pantalla.

### Optimización de rendimiento

Las páginas se cargan de forma diferida (lazy loading): solo se descarga el código de la sección que el usuario visita. Las imágenes se cargan progresivamente. El resultado es una web rápida y eficiente incluso en conexiones de datos móvil.

### Analítica preparada

El sitio está preparado para conectar con Google Analytics y Google Search Console. Estas herramientas permiten conocer cuántas personas visitan la web, desde dónde llegan, qué páginas consultan y cómo interactúan con la carta.

---

## 3. Beneficios para OYISHI

Traduciendo cada mejora técnica a lo que significa para el negocio:

### 🍱 Mejor presentación del producto

La carta digital presenta cada plato con nombre, precio, descripción y fotografía cuando está disponible. El cliente puede ver qué va a pedir antes de llegar o incluso antes de decidir a qué restaurante ir. Una carta bien presentada influye directamente en la percepción del valor de lo que se sirve.

### 📱 Más facilidad para consultar la carta

En el móvil, la carta anterior podía resultar difícil de navegar. La nueva carta está diseñada para el teléfono: scroll fluido, buscador de texto, filtros por categoría y tarjetas de producto claras. El cliente encuentra lo que busca en segundos.

### 🌟 Mejor imagen de marca

La nueva web proyecta una imagen coherente con la calidad gastronómica del restaurante. El diseño transmite seriedad, cuidado y diferenciación. Esto importa: la primera impresión digital de un restaurante condiciona la decisión de visitarlo.

### 📅 Más facilidad para reservar y contactar

El formulario de reservas es claro, directo y funciona en cualquier dispositivo. La página de contacto muestra el teléfono, el correo, el horario y la ubicación de forma inmediata. Menos fricciones para que el cliente llegue al restaurante.

### 🔍 Mejor base SEO

La nueva web está estructurada para que Google la entienda y la indexe correctamente. A medio plazo, esto puede mejorar la posición de OYISHI en búsquedas locales como "restaurante japonés Fuenlabrada" o "sushi Fuenlabrada", atrayendo visitas orgánicas sin inversión publicitaria adicional.

### 🔧 Arquitectura preparada para evolucionar

La web está construida sobre tecnología moderna y mantenible. Agregar nuevas funcionalidades, cambiar contenidos o conectar servicios externos en el futuro es significativamente más sencillo que con la arquitectura anterior.

---

## 4. Guion de Demo — 5 Minutos

> Este guion está pensado para ser presentado en una pantalla o proyector, navegando en tiempo real por la web.

---

### ⏱ 0:00 — Apertura (30 segundos)

**Acción:** Abrir la web en el navegador. Dejar que cargue el Home.

**Qué decir:**
> "Esta es la nueva web de OYISHI. Lo primero que ve cualquier cliente cuando busca el restaurante. Fíjate en la primera impresión."

Señalar el contraste de la pantalla: oscuridad, tipografía, el logo. Dejar unos segundos en silencio para que el propietario absorba el impacto visual.

---

### ⏱ 0:30 — Hero (30 segundos)

**Acción:** Hacer scroll lento hacia abajo desde el hero.

**Qué decir:**
> "La entrada al sitio funciona como un escaparate premium. Sin distracciones, sin ruido visual. La identidad de OYISHI ocupa el primer plano."

---

### ⏱ 1:00 — Sección Explora (30 segundos)

**Acción:** Continuar el scroll hasta la sección de exploración del Home.

**Qué decir:**
> "Desde el inicio ya puedes explorar la propuesta gastronómica. El cliente sabe inmediatamente lo que OYISHI ofrece antes de abrir la carta."

---

### ⏱ 1:30 — Selección / Productos Destacados (30 segundos)

**Acción:** Scroll hasta los productos destacados del Home.

**Qué decir:**
> "Aquí mostramos una selección curada de los platos más representativos. No está toda la carta: está lo que queremos que el cliente vea primero."

---

### ⏱ 2:00 — La Carta (1 minuto)

**Acción:** Navegar a `/carta` desde el menú.

**Qué decir:**
> "Esta es la carta completa. 155 productos reales, organizados en 17 categorías. Todo extraído directamente de oyishi.es."

Señalar:
- Las tarjetas de producto con nombre, precio y fotografía.
- Los filtros por categoría en la parte superior.

---

### ⏱ 2:30 — Buscador (30 segundos)

**Acción:** Escribir "salmón" o "California" en el buscador.

**Qué decir:**
> "El cliente puede buscar cualquier plato o ingrediente. El resultado es inmediato, sin esperas, sin recargar la página."

Borrar la búsqueda para volver al catálogo completo.

---

### ⏱ 3:00 — Filtros y Carrito (30 segundos)

**Acción:** Hacer clic en una categoría (por ejemplo, "MAKIS"). Luego añadir un producto al carrito.

**Qué decir:**
> "El cliente puede filtrar por tipo de producto y construir su comanda antes de llamar o llegar. Esto facilita el pedido y reduce el tiempo de atención."

Mostrar brevemente el modal del carrito.

---

### ⏱ 3:30 — Quiénes Somos (30 segundos)

**Acción:** Navegar a `/quienes-somos`.

**Qué decir:**
> "Esta sección cuenta la historia de OYISHI. Para muchos clientes, conocer quién está detrás de un restaurante es clave en la decisión de visitarlo."

---

### ⏱ 4:00 — Reservas y Contacto (30 segundos)

**Acción:** Navegar a `/reservas`, mostrar el formulario. Luego navegar a `/contacto`.

**Qué decir:**
> "El formulario de reservas es claro y funciona en cualquier dispositivo. En Contacto, el cliente encuentra todo de forma inmediata: teléfono, email, horario y mapa."

---

### ⏱ 4:30 — Mobile (30 segundos)

**Acción:** Reducir el navegador a tamaño móvil (o abrir en el teléfono).

**Qué decir:**
> "Y esto es lo más importante: la gran mayoría de tus clientes llegan desde el móvil. La web funciona igual de bien en cualquier pantalla."

Mostrar el Home, la Carta y el menú hamburguesa en móvil.

---

### ⏱ 5:00 — Cierre

**Qué decir:**
> "Todo lo que has visto está listo para publicarse. Solo necesitamos confirmar algunos detalles de entrega que vemos juntos ahora."

---

## 5. Desarrollos Futuros

Las funcionalidades que se describen a continuación **no forman parte del proyecto actual**. Son extensiones posibles que pueden incorporarse en fases posteriores, una vez consolidada la base actual.

Se presentan aquí como hoja de ruta potencial para que el propietario pueda planificar la evolución digital del restaurante con perspectiva.

---

### 🗓 Reserva nativa con backend

Sistema de reservas propio con confirmación automática por email o SMS, gestión del aforo y calendario de disponibilidad en tiempo real. Actualmente el formulario de reservas dirige la solicitud al restaurante, pero no gestiona disponibilidad de forma automática.

### 🛒 Pedido online completo

Integración de un flujo de pedido end-to-end: selección de productos, confirmación del pedido, comunicación directa con cocina y gestión de estados (recibido, en preparación, listo). Diferente al carrito actual, que es una herramienta de comanda orientativa.

### 💳 Pago online

Integración de pasarela de pago para permitir el pago anticipado de pedidos o reservas. Requiere desarrollo de backend y alta en un proveedor de pago (Stripe, Redsys, etc.).

### 🎁 Fidelización y puntos

Sistema de puntos por consumo que recompense a los clientes habituales. La web anterior ya tenía una sección `/points.php` que indica que es una funcionalidad deseada por el negocio, pero que requiere un backend completo para gestionarse correctamente.

### 👤 Área de cliente

Registro e inicio de sesión de clientes para acceder a su historial de pedidos, puntos acumulados y preferencias. Requiere sistema de autenticación e infraestructura de base de datos.

### 📊 CRM básico

Panel de administración para gestionar clientes registrados, reservas recibidas y pedidos. Herramienta de gestión interna para el equipo del restaurante.

### 📣 Campañas y comunicaciones

Sistema para enviar comunicaciones segmentadas a la base de clientes: novedades de carta, promociones, eventos especiales. Puede integrarse con herramientas como Mailchimp, Brevo o similares.

### ⚙️ Automatizaciones

Flujos automáticos que respondan a acciones del cliente: confirmación de reserva, recordatorio 24 horas antes, encuesta de satisfacción post-visita. Ahorro de tiempo en gestión y mejora de la experiencia del cliente.

---

## 6. Propuesta de Soporte y Mantenimiento

Una vez publicada la web, se propone un servicio de mantenimiento mensual que garantice el correcto funcionamiento del sitio y su evolución gradual.

### Qué puede incluir

**Soporte técnico**
Resolución de incidencias, revisión del funcionamiento del sitio y atención a consultas del equipo del restaurante sobre el uso de la web.

**Cambios pequeños de contenido**
Actualización de textos, horarios, información de contacto, imágenes de sección u otros contenidos del sitio que puedan cambiar a lo largo del tiempo.

**Actualización de la carta**
Alta, baja o modificación de productos en el catálogo de 155 platos. Actualización de categorías, descripciones o fotografías de producto.

**Actualización de precios**
Cambio de precios en el catálogo cuando el restaurante actualice su tarifa.

**Actualización de fotografías**
Sustitución o incorporación de nuevas imágenes de producto o de la sección de marca (Home, Quiénes Somos).

**Supervisión técnica**
Revisión periódica del estado de la web: velocidad de carga, errores en consola, disponibilidad del sitio y comportamiento en diferentes dispositivos.

**Analytics mensual**
Revisión de los datos de Google Analytics: visitas, páginas más visitadas, tráfico por canal, comportamiento en la carta y conversiones hacia reservas y contacto. Informe breve con los datos más relevantes para el negocio.

**SEO técnico básico**
Mantenimiento de la configuración técnica de SEO: revisión de indexación en Google Search Console, corrección de posibles errores de rastreo y actualización del sitemap si se incorporan nuevas secciones.

> Las condiciones económicas específicas de este servicio se acordarán por separado.

---

## 7. Checklist de Entrega al Cliente

Este checklist recoge todos los elementos necesarios para publicar la web en producción y traspasar la titularidad digital al propietario de OYISHI.

### 🌐 Dominio

- [ ] Confirmar dominio de publicación (oyishi.es u otro)
- [ ] Verificar titularidad y datos de renovación del dominio
- [ ] Configurar DNS para apuntar al nuevo hosting

### 🖥 Hosting

- [ ] Seleccionar plataforma de publicación (Cloudflare Pages, Vercel, Netlify u otra)
- [ ] Alta y configuración del servicio de hosting
- [ ] Configurar dominio personalizado en el hosting
- [ ] Verificar certificado SSL (HTTPS) activo

### 🔑 Accesos

- [ ] Entregar credenciales de acceso al panel de hosting
- [ ] Entregar acceso al registro de dominio
- [ ] Documentar qué accesos existen y a qué corresponden

### 📊 Google Analytics

- [ ] Alta o verificación de cuenta de Google Analytics (GA4)
- [ ] Configurar propiedad para el dominio de producción
- [ ] Verificar que el código de seguimiento está activo en la web publicada
- [ ] Conceder acceso de propietario a la cuenta del cliente

### 🔍 Google Search Console

- [ ] Alta o acceso a Google Search Console
- [ ] Verificar propiedad del dominio (DNS o archivo de verificación)
- [ ] Enviar sitemap (sitemap.xml) a Google
- [ ] Comprobar que no hay errores de indexación

### ⚖️ Aprobación de textos legales

- [ ] Revisión y aprobación del Aviso Legal por parte del cliente
- [ ] Revisión y aprobación de la Política de Privacidad
- [ ] Revisión y aprobación de la Política de Cookies
- [ ] Si el cliente tiene abogado o asesoría, validación con ellos antes de publicar

### 📱 Redes sociales oficiales

- [ ] Verificar que el enlace a Instagram en el Footer es el perfil oficial de OYISHI
- [ ] Verificar que el enlace a Facebook (si aplica) es correcto
- [ ] Confirmar que el botón de WhatsApp usa el número correcto

### 🖼 Material gráfico

- [ ] Confirmar que el logotipo en la web es la versión oficial y actualizada
- [ ] Confirmar que las imágenes de la sección Quiénes Somos son las definitivas
- [ ] Confirmar que las fotografías de producto en la carta son las aprobadas
- [ ] Verificar que no hay imágenes de placeholder en producción

### 🚀 Puesta en producción

- [ ] Build de producción generado y validado sin errores
- [ ] Subida de archivos a la plataforma de hosting
- [ ] Verificación manual de todas las rutas: `/`, `/carta`, `/quienes-somos`, `/reservas`, `/contacto`, `/aviso-legal`, `/privacidad`, `/cookies`
- [ ] Verificación en móvil (iOS y Android) y en escritorio (Chrome, Safari, Firefox)
- [ ] Verificar que los formularios de reserva y contacto funcionan correctamente
- [ ] Verificar que el teléfono y el correo de contacto son los correctos
- [ ] Verificar que el enlace de Google Maps apunta a la dirección correcta
- [ ] Confirmación formal de go-live por parte del cliente

---

*Documento preparado por el equipo de desarrollo · OYISHI Gastronomía Japonesa · Agosto 2026*
