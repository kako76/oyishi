# OYISHI â€” Entrega Comercial del Nuevo Proyecto Digital

> **Documento preparado para:** Propietario de OYISHI GastronomÃ­a Japonesa
> **Fecha de entrega:** Agosto 2026
> **CarÃ¡cter:** Confidencial Â· Uso interno

---

## ÃNDICE

1. [SituaciÃ³n Anterior](#1-situaciÃ³n-anterior)
2. [La Nueva Web](#2-la-nueva-web)
3. [Beneficios para OYISHI](#3-beneficios-para-oyishi)
4. [Guion de Demo â€” 5 Minutos](#4-guion-de-demo--5-minutos)
5. [Desarrollos Futuros](#5-desarrollos-futuros)
6. [Propuesta de Soporte y Mantenimiento](#6-propuesta-de-soporte-y-mantenimiento)
7. [Checklist de Entrega al Cliente](#7-checklist-de-entrega-al-cliente)

---

## 1. SituaciÃ³n Anterior

La web anterior de OYISHI fue construida en un momento en el que las prioridades y los recursos disponibles eran distintos. CumpliÃ³ su funciÃ³n durante su ciclo de vida y contiene informaciÃ³n vÃ¡lida sobre el restaurante. Sin embargo, con el tiempo fueron acumulÃ¡ndose ciertas limitaciones que hoy resultan difÃ­ciles de ignorar.

### Ãreas de mejora identificadas

**DiseÃ±o visual**
La estÃ©tica general respondÃ­a a patrones web de hace varios aÃ±os. La tipografÃ­a, los colores y la composiciÃ³n de las pÃ¡ginas no transmitÃ­an con suficiente claridad el nivel gastronÃ³mico que OYISHI ofrece. Un cliente que visitara la web antes de acudir al restaurante podrÃ­a llevarse una impresiÃ³n que no correspondÃ­a con la experiencia real.

**Experiencia en dispositivos mÃ³viles**
MÃ¡s del 60â€“70 % del trÃ¡fico de restaurantes proviene de bÃºsquedas desde el telÃ©fono. La web anterior no estaba diseÃ±ada con el mÃ³vil como prioridad, lo que podÃ­a dificultar la lectura de la carta, el acceso al telÃ©fono o la localizaciÃ³n del restaurante en pantallas pequeÃ±as.

**NavegaciÃ³n fragmentada**
El sitio estaba estructurado en pÃ¡ginas separadas con carga completa al cambiar de secciÃ³n. Esto generaba tiempos de espera visibles, inconsistencias visuales entre pÃ¡ginas y una sensaciÃ³n de sitio "compartimentado" en lugar de una experiencia de marca unificada.

**Carta digital**
La carta estaba presentada en un formato que hacÃ­a difÃ­cil la exploraciÃ³n. No habÃ­a manera de buscar un plato concreto, filtrar por tipo de producto, ni visualizar de manera clara el catÃ¡logo completo de lo que OYISHI ofrece.

**Coherencia visual entre secciones**
Cada pÃ¡gina tenÃ­a un estilo ligeramente diferente, lo que impedÃ­a que el visitante percibiera una identidad visual Ãºnica y reconocible de marca.

**Dependencia de tecnologÃ­a antigua**
El sitio funcionaba sobre scripts PHP independientes (menu.php, reservation.php, contact.php, points.php), lo que limitaba la capacidad de evoluciÃ³n, dificultaba el mantenimiento y hacÃ­a imposible garantizar una experiencia de usuario moderna.

---

## 2. La Nueva Web

El nuevo proyecto digital de OYISHI es una propuesta integral: no es una actualizaciÃ³n de lo anterior, sino una construcciÃ³n desde cero pensada para reflejar el nivel real del restaurante.

### Una nueva identidad visual

La nueva web tiene una identidad propia: paleta de color oscura con detalles dorados, tipografÃ­a display de alta jerarquÃ­a y una estÃ©tica que evoca la cultura gastronÃ³mica japonesa contemporÃ¡nea sin recurrir a clichÃ©s. El resultado es una imagen de marca coherente, premium y diferenciada.

### NavegaciÃ³n SPA (Single Page Application)

La web funciona sin recargas de pÃ¡gina. Al navegar entre secciones, el cambio es instantÃ¡neo y fluido, como una aplicaciÃ³n nativa. Esto elimina los tiempos de espera y proporciona una experiencia percibida de mayor calidad.

### Home editorial

La pÃ¡gina de inicio no es un listado de informaciÃ³n, sino una experiencia curada: un hero cinematogrÃ¡fico, una selecciÃ³n de productos estrella, y una presentaciÃ³n de la identidad del restaurante que invita a explorar y quedarse.

### Carta independiente â€” 155 productos reales, 17 categorÃ­as

La carta ha sido extraÃ­da y verificada directamente desde oyishi.es. Todos los productos, nombres, precios y categorÃ­as son datos reales del restaurante. La carta estÃ¡ organizada en 17 familias de producto y presenta los 155 platos disponibles con fotografÃ­a cuando estÃ¡ disponible.

### Buscador y filtros

El visitante puede escribir el nombre de cualquier plato o ingrediente y el resultado aparece al instante, sin esperas. TambiÃ©n puede filtrar por categorÃ­a con un solo clic. La exploraciÃ³n de la carta es ahora intuitiva y rÃ¡pida.

### Carrito / Comanda

El cliente puede seleccionar platos desde la carta y construir una comanda, que puede usar como referencia para comunicarla al restaurante. Esta funcionalidad mejora el recorrido del cliente y sienta las bases para integraciones mÃ¡s avanzadas en el futuro.

### PÃ¡ginas completas

El sitio incluye las siguientes secciones:

| SecciÃ³n | Contenido |
|---|---|
| **Home** | PÃ¡gina editorial de presentaciÃ³n de marca |
| **La Carta** | CatÃ¡logo completo con buscador, filtros y comanda |
| **QuiÃ©nes Somos** | Historia, valores y equipo del restaurante |
| **Reservas** | Formulario de solicitud de reserva |
| **Contacto** | Datos de contacto, telÃ©fono, mapa y formulario |
| **Aviso Legal** | Textos legales del sitio |
| **PolÃ­tica de Privacidad** | Tratamiento de datos personales |
| **PolÃ­tica de Cookies** | GestiÃ³n de cookies |

### SEO tÃ©cnico

El sitio estÃ¡ preparado con estructura semÃ¡ntica HTML correcta, metadatos por pÃ¡gina (tÃ­tulo, descripciÃ³n, Open Graph), sitemap XML y robots.txt configurados. Esta base permite a Google indexar el sitio correctamente desde el primer dÃ­a.

### Responsive y accesible

El diseÃ±o estÃ¡ pensado desde el mÃ³vil. Cada elemento â€”botones, textos, imÃ¡genes, formulariosâ€” ha sido adaptado para funcionar en cualquier tamaÃ±o de pantalla. Los elementos interactivos cumplen los estÃ¡ndares de accesibilidad (WCAG), con Ã¡reas tÃ¡ctiles adecuadas y etiquetas correctas para lectores de pantalla.

### OptimizaciÃ³n de rendimiento

Las pÃ¡ginas se cargan de forma diferida (lazy loading): solo se descarga el cÃ³digo de la secciÃ³n que el usuario visita. Las imÃ¡genes se cargan progresivamente. El resultado es una web rÃ¡pida y eficiente incluso en conexiones de datos mÃ³vil.

### AnalÃ­tica preparada

El sitio estÃ¡ preparado para conectar con Google Analytics y Google Search Console. Estas herramientas permiten conocer cuÃ¡ntas personas visitan la web, desde dÃ³nde llegan, quÃ© pÃ¡ginas consultan y cÃ³mo interactÃºan con la carta.

---

## 3. Beneficios para OYISHI

Traduciendo cada mejora tÃ©cnica a lo que significa para el negocio:

### ðŸ± Mejor presentaciÃ³n del producto

La carta digital presenta cada plato con nombre, precio, descripciÃ³n y fotografÃ­a cuando estÃ¡ disponible. El cliente puede ver quÃ© va a pedir antes de llegar o incluso antes de decidir a quÃ© restaurante ir. Una carta bien presentada influye directamente en la percepciÃ³n del valor de lo que se sirve.

### ðŸ“± MÃ¡s facilidad para consultar la carta

En el mÃ³vil, la carta anterior podÃ­a resultar difÃ­cil de navegar. La nueva carta estÃ¡ diseÃ±ada para el telÃ©fono: scroll fluido, buscador de texto, filtros por categorÃ­a y tarjetas de producto claras. El cliente encuentra lo que busca en segundos.

### ðŸŒŸ Mejor imagen de marca

La nueva web proyecta una imagen coherente con la calidad gastronÃ³mica del restaurante. El diseÃ±o transmite seriedad, cuidado y diferenciaciÃ³n. Esto importa: la primera impresiÃ³n digital de un restaurante condiciona la decisiÃ³n de visitarlo.

### ðŸ“… MÃ¡s facilidad para reservar y contactar

El formulario de reservas es claro, directo y funciona en cualquier dispositivo. La pÃ¡gina de contacto muestra el telÃ©fono, el correo, el horario y la ubicaciÃ³n de forma inmediata. Menos fricciones para que el cliente llegue al restaurante.

### ðŸ” Mejor base SEO

La nueva web estÃ¡ estructurada para que Google la entienda y la indexe correctamente. A medio plazo, esto puede mejorar la posiciÃ³n de OYISHI en bÃºsquedas locales como "restaurante japonÃ©s Fuenlabrada" o "sushi Fuenlabrada", atrayendo visitas orgÃ¡nicas sin inversiÃ³n publicitaria adicional.

### ðŸ”§ Arquitectura preparada para evolucionar

La web estÃ¡ construida sobre tecnologÃ­a moderna y mantenible. Agregar nuevas funcionalidades, cambiar contenidos o conectar servicios externos en el futuro es significativamente mÃ¡s sencillo que con la arquitectura anterior.

---

## 4. Guion de Demo â€” 5 Minutos

> Este guion estÃ¡ pensado para ser presentado en una pantalla o proyector, navegando en tiempo real por la web.

---

### â± 0:00 â€” Apertura (30 segundos)

**AcciÃ³n:** Abrir la web en el navegador. Dejar que cargue el Home.

**QuÃ© decir:**
> "Esta es la nueva web de OYISHI. Lo primero que ve cualquier cliente cuando busca el restaurante. FÃ­jate en la primera impresiÃ³n."

SeÃ±alar el contraste de la pantalla: oscuridad, tipografÃ­a, el logo. Dejar unos segundos en silencio para que el propietario absorba el impacto visual.

---

### â± 0:30 â€” Hero (30 segundos)

**AcciÃ³n:** Hacer scroll lento hacia abajo desde el hero.

**QuÃ© decir:**
> "La entrada al sitio funciona como un escaparate premium. Sin distracciones, sin ruido visual. La identidad de OYISHI ocupa el primer plano."

---

### â± 1:00 â€” SecciÃ³n Explora (30 segundos)

**AcciÃ³n:** Continuar el scroll hasta la secciÃ³n de exploraciÃ³n del Home.

**QuÃ© decir:**
> "Desde el inicio ya puedes explorar la propuesta gastronÃ³mica. El cliente sabe inmediatamente lo que OYISHI ofrece antes de abrir la carta."

---

### â± 1:30 â€” SelecciÃ³n / Productos Destacados (30 segundos)

**AcciÃ³n:** Scroll hasta los productos destacados del Home.

**QuÃ© decir:**
> "AquÃ­ mostramos una selecciÃ³n curada de los platos mÃ¡s representativos. No estÃ¡ toda la carta: estÃ¡ lo que queremos que el cliente vea primero."

---

### â± 2:00 â€” La Carta (1 minuto)

**AcciÃ³n:** Navegar a `/carta` desde el menÃº.

**QuÃ© decir:**
> "Esta es la carta completa. 155 productos reales, organizados en 17 categorÃ­as. Todo extraÃ­do directamente de oyishi.es."

SeÃ±alar:
- Las tarjetas de producto con nombre, precio y fotografÃ­a.
- Los filtros por categorÃ­a en la parte superior.

---

### â± 2:30 â€” Buscador (30 segundos)

**AcciÃ³n:** Escribir "salmÃ³n" o "California" en el buscador.

**QuÃ© decir:**
> "El cliente puede buscar cualquier plato o ingrediente. El resultado es inmediato, sin esperas, sin recargar la pÃ¡gina."

Borrar la bÃºsqueda para volver al catÃ¡logo completo.

---

### â± 3:00 â€” Filtros y Carrito (30 segundos)

**AcciÃ³n:** Hacer clic en una categorÃ­a (por ejemplo, "MAKIS"). Luego aÃ±adir un producto al carrito.

**QuÃ© decir:**
> "El cliente puede filtrar por tipo de producto y construir su comanda antes de llamar o llegar. Esto facilita el pedido y reduce el tiempo de atenciÃ³n."

Mostrar brevemente el modal del carrito.

---

### â± 3:30 â€” QuiÃ©nes Somos (30 segundos)

**AcciÃ³n:** Navegar a `/quienes-somos`.

**QuÃ© decir:**
> "Esta secciÃ³n cuenta la historia de OYISHI. Para muchos clientes, conocer quiÃ©n estÃ¡ detrÃ¡s de un restaurante es clave en la decisiÃ³n de visitarlo."

---

### â± 4:00 â€” Reservas y Contacto (30 segundos)

**AcciÃ³n:** Navegar a `/reservas`, mostrar el formulario. Luego navegar a `/contacto`.

**QuÃ© decir:**
> "El formulario de reservas es claro y funciona en cualquier dispositivo. En Contacto, el cliente encuentra todo de forma inmediata: telÃ©fono, email, horario y mapa."

---

### â± 4:30 â€” Mobile (30 segundos)

**AcciÃ³n:** Reducir el navegador a tamaÃ±o mÃ³vil (o abrir en el telÃ©fono).

**QuÃ© decir:**
> "Y esto es lo mÃ¡s importante: la gran mayorÃ­a de tus clientes llegan desde el mÃ³vil. La web funciona igual de bien en cualquier pantalla."

Mostrar el Home, la Carta y el menÃº hamburguesa en mÃ³vil.

---

### â± 5:00 â€” Cierre

**QuÃ© decir:**
> "Todo lo que has visto estÃ¡ listo para publicarse. Solo necesitamos confirmar algunos detalles de entrega que vemos juntos ahora."

---

## 5. Desarrollos Futuros

Las funcionalidades que se describen a continuaciÃ³n **no forman parte del proyecto actual**. Son extensiones posibles que pueden incorporarse en fases posteriores, una vez consolidada la base actual.

Se presentan aquÃ­ como hoja de ruta potencial para que el propietario pueda planificar la evoluciÃ³n digital del restaurante con perspectiva.

---

### ðŸ—“ Reserva nativa con backend

Sistema de reservas propio con confirmaciÃ³n automÃ¡tica por email o SMS, gestiÃ³n del aforo y calendario de disponibilidad en tiempo real. Actualmente el formulario de reservas dirige la solicitud al restaurante, pero no gestiona disponibilidad de forma automÃ¡tica.

### ðŸ›’ Pedido online completo

IntegraciÃ³n de un flujo de pedido end-to-end: selecciÃ³n de productos, confirmaciÃ³n del pedido, comunicaciÃ³n directa con cocina y gestiÃ³n de estados (recibido, en preparaciÃ³n, listo). Diferente al carrito actual, que es una herramienta de comanda orientativa.

### ðŸ’³ Pago online

IntegraciÃ³n de pasarela de pago para permitir el pago anticipado de pedidos o reservas. Requiere desarrollo de backend y alta en un proveedor de pago (Stripe, Redsys, etc.).

### ðŸŽ FidelizaciÃ³n y puntos

Sistema de puntos por consumo que recompense a los clientes habituales. La web anterior ya tenÃ­a una secciÃ³n `/points.php` que indica que es una funcionalidad deseada por el negocio, pero que requiere un backend completo para gestionarse correctamente.

### ðŸ‘¤ Ãrea de cliente

Registro e inicio de sesiÃ³n de clientes para acceder a su historial de pedidos, puntos acumulados y preferencias. Requiere sistema de autenticaciÃ³n e infraestructura de base de datos.

### ðŸ“Š CRM bÃ¡sico

Panel de administraciÃ³n para gestionar clientes registrados, reservas recibidas y pedidos. Herramienta de gestiÃ³n interna para el equipo del restaurante.

### ðŸ“£ CampaÃ±as y comunicaciones

Sistema para enviar comunicaciones segmentadas a la base de clientes: novedades de carta, promociones, eventos especiales. Puede integrarse con herramientas como Mailchimp, Brevo o similares.

### âš™ï¸ Automatizaciones

Flujos automÃ¡ticos que respondan a acciones del cliente: confirmaciÃ³n de reserva, recordatorio 24 horas antes, encuesta de satisfacciÃ³n post-visita. Ahorro de tiempo en gestiÃ³n y mejora de la experiencia del cliente.

---

## 6. Propuesta de Soporte y Mantenimiento

Una vez publicada la web, se propone un servicio de mantenimiento mensual que garantice el correcto funcionamiento del sitio y su evoluciÃ³n gradual.

### QuÃ© puede incluir

**Soporte tÃ©cnico**
ResoluciÃ³n de incidencias, revisiÃ³n del funcionamiento del sitio y atenciÃ³n a consultas del equipo del restaurante sobre el uso de la web.

**Cambios pequeÃ±os de contenido**
ActualizaciÃ³n de textos, horarios, informaciÃ³n de contacto, imÃ¡genes de secciÃ³n u otros contenidos del sitio que puedan cambiar a lo largo del tiempo.

**ActualizaciÃ³n de la carta**
Alta, baja o modificaciÃ³n de productos en el catÃ¡logo de 155 platos. ActualizaciÃ³n de categorÃ­as, descripciones o fotografÃ­as de producto.

**ActualizaciÃ³n de precios**
Cambio de precios en el catÃ¡logo cuando el restaurante actualice su tarifa.

**ActualizaciÃ³n de fotografÃ­as**
SustituciÃ³n o incorporaciÃ³n de nuevas imÃ¡genes de producto o de la secciÃ³n de marca (Home, QuiÃ©nes Somos).

**SupervisiÃ³n tÃ©cnica**
RevisiÃ³n periÃ³dica del estado de la web: velocidad de carga, errores en consola, disponibilidad del sitio y comportamiento en diferentes dispositivos.

**Analytics mensual**
RevisiÃ³n de los datos de Google Analytics: visitas, pÃ¡ginas mÃ¡s visitadas, trÃ¡fico por canal, comportamiento en la carta y conversiones hacia reservas y contacto. Informe breve con los datos mÃ¡s relevantes para el negocio.

**SEO tÃ©cnico bÃ¡sico**
Mantenimiento de la configuraciÃ³n tÃ©cnica de SEO: revisiÃ³n de indexaciÃ³n en Google Search Console, correcciÃ³n de posibles errores de rastreo y actualizaciÃ³n del sitemap si se incorporan nuevas secciones.

> Las condiciones econÃ³micas especÃ­ficas de este servicio se acordarÃ¡n por separado.

---

## 7. Checklist de Entrega al Cliente

Este checklist recoge todos los elementos necesarios para publicar la web en producciÃ³n y traspasar la titularidad digital al propietario de OYISHI.

### ðŸŒ Dominio

- [ ] Confirmar dominio de publicaciÃ³n (oyishi.es u otro)
- [ ] Verificar titularidad y datos de renovaciÃ³n del dominio
- [ ] Configurar DNS para apuntar al nuevo hosting

### ðŸ–¥ Hosting

- [ ] Seleccionar plataforma de publicaciÃ³n (Cloudflare Pages, Vercel, Netlify u otra)
- [ ] Alta y configuraciÃ³n del servicio de hosting
- [ ] Configurar dominio personalizado en el hosting
- [ ] Verificar certificado SSL (HTTPS) activo

### ðŸ”‘ Accesos

- [ ] Entregar credenciales de acceso al panel de hosting
- [ ] Entregar acceso al registro de dominio
- [ ] Documentar quÃ© accesos existen y a quÃ© corresponden

### ðŸ“Š Google Analytics

- [ ] Alta o verificaciÃ³n de cuenta de Google Analytics (GA4)
- [ ] Configurar propiedad para el dominio de producciÃ³n
- [ ] Verificar que el cÃ³digo de seguimiento estÃ¡ activo en la web publicada
- [ ] Conceder acceso de propietario a la cuenta del cliente

### ðŸ” Google Search Console

- [ ] Alta o acceso a Google Search Console
- [ ] Verificar propiedad del dominio (DNS o archivo de verificaciÃ³n)
- [ ] Enviar sitemap (sitemap.xml) a Google
- [ ] Comprobar que no hay errores de indexaciÃ³n

### âš–ï¸ AprobaciÃ³n de textos legales

- [ ] RevisiÃ³n y aprobaciÃ³n del Aviso Legal por parte del cliente
- [ ] RevisiÃ³n y aprobaciÃ³n de la PolÃ­tica de Privacidad
- [ ] RevisiÃ³n y aprobaciÃ³n de la PolÃ­tica de Cookies
- [ ] Si el cliente tiene abogado o asesorÃ­a, validaciÃ³n con ellos antes de publicar

### ðŸ“± Redes sociales oficiales

- [ ] Verificar que el enlace a Instagram en el Footer es el perfil oficial de OYISHI
- [ ] Verificar que el enlace a Facebook (si aplica) es correcto
- [ ] Confirmar que el botÃ³n de WhatsApp usa el nÃºmero correcto

### ðŸ–¼ Material grÃ¡fico

- [ ] Confirmar que el logotipo en la web es la versiÃ³n oficial y actualizada
- [ ] Confirmar que las imÃ¡genes de la secciÃ³n QuiÃ©nes Somos son las definitivas
- [ ] Confirmar que las fotografÃ­as de producto en la carta son las aprobadas
- [ ] Verificar que no hay imÃ¡genes de placeholder en producciÃ³n

### ðŸš€ Puesta en producciÃ³n

- [ ] Build de producciÃ³n generado y validado sin errores
- [ ] Subida de archivos a la plataforma de hosting
- [ ] VerificaciÃ³n manual de todas las rutas: `/`, `/carta`, `/quienes-somos`, `/reservas`, `/contacto`, `/aviso-legal`, `/privacidad`, `/cookies`
- [ ] VerificaciÃ³n en mÃ³vil (iOS y Android) y en escritorio (Chrome, Safari, Firefox)
- [ ] Verificar que los formularios de reserva y contacto funcionan correctamente
- [ ] Verificar que el telÃ©fono y el correo de contacto son los correctos
- [ ] Verificar que el enlace de Google Maps apunta a la direcciÃ³n correcta
- [ ] ConfirmaciÃ³n formal de go-live por parte del cliente

---

*Documento preparado por el equipo de desarrollo Â· OYISHI GastronomÃ­a Japonesa Â· Agosto 2026*
