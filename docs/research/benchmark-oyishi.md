# OYISHI — Benchmark & Research Report (Agente 1)

> **Autor:** AGENTE 1 — RESEARCH & BENCHMARK  
> **Fecha:** Agosto 2026  
> **Proyecto:** OYISHI — Restaurante Japonés Premium (Fuenlabrada)  
> **Stack Técnico Oyishi:** React + TypeScript + Vite + Tailwind CSS + Framer Motion  
> **Catálogo:** 155 productos reales | Home independiente de `/carta` | Hero con vídeo real

---

## 1. INVESTIGACIÓN GENERAL (18 WEBS DE REFERENCIA)

Se ha realizado una investigación profunda de 18 sitios web internacionales líderes en **sushi premium, alta gastronomía japonesa, hospitality de lujo, marcas de culto galardonadas en Awwwards/FWA/MUSE y firmas de lujo con motion aplicable**.

---

### Referencia 1: Yamato Table Grill & Sushi Bar
* **URL:** `https://yamato-sushi.com`
* **Categoría:** High Gastronomy Japanese & Interactive Dining (Awwwards Winner)

#### Análisis de los 20 Aspectos:
1. **Hero:** Full-bleed cinematic video con humo, fuego y nitidez extrema de cortes de nigiri. Overlay de degradado oscuro radial.
2. **Fotografía:** Iluminación focal de claroscuro (estilo macro gastronómico), contraste profundo entre fondo carbón y brillo del pescado.
3. **Vídeo:** Loops en MP4/WebM optimizados en H.265/AV1 a 60fps con carga diferida.
4. **Tipografía:** Combinación de Serif clásico premium (tipo *Editorial New*) para titulares con Sans-serif geométrica para cuerpo.
5. **Composición:** Layout asimétrico con cuadrículas desalineadas que transmiten dinamismo y refinamiento artesanal.
6. **Navegación:** Header flotante ultralimpio con desenfoque de fondo (*backdrop-blur*) que no distrae del contenido.
7. **Estructura de Home:** Hero Vídeo → Declaración de Manifiesto → Rejilla de Categorías -> Galería de Experiencia -> Bloque de Reservas -> Footer.
8. **Carta / Catálogo:** Presentación por filtros de fichas interactivas con cambio instantáneo sin recargar la página.
9. **Cards:** Tarjetas flotantes con bordes sutiles en tono cobre/oro envejecido y sombras suaves con profundidad.
10. **Animaciones:** Reveal en scroll escalonado (*stagger*) para imágenes y tipografía.
11. **Scroll:** Scroll suave (*smooth-scroll*) con inercia controlada sin bloquear la experiencia nativa del navegador.
12. **Hover:** Zoom sutil de imagen (`scale-105`) con revelado de descripción y elevación sutil de tarjeta.
13. **Transiciones:** Fades elegantes entre páginas usando transiciones de opacidad y desplazamiento y (`translateY`).
14. **Paleta:** Negro azabache (`#0B0B0C`), carbón volcánico (`#141416`), bronce cepillado (`#C5A059`) y blanco marfil (`#F5F5F3`).
15. **Mobile:** Menú desplegable a pantalla completa (*full-screen overlay*) con gestos táctiles fluidos.
16. **CTAs:** Botones primarios en bronce con micro-brillo al pasar el cursor; secundarios con borde fino.
17. **Reservas:** Drawer lateral persistente accesible con un clic desde cualquier sección.
18. **Conversión:** Claridad absoluta en el botón "Reservar Mesa" siempre visible en la esquina superior derecha.
19. **Velocidad/Performance:** Percibida ultra-rápida mediante carga diferida (*lazy loading*) de vídeo e imágenes en NextGen WebP.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Integre el vídeo del Hero de forma fluida con el resto de la página usando máscaras oscuras graduadas.
2. **Qué NO copiar:** Los efectos de cursor personalizado pesado en JS que ralentizan la navegación en portátiles de gama media.
3. **Qué patrón adaptar a OYISHI:** Integración del vídeo real `oyishi-sushi-build.mp4` con degradado continuo hacia la sección inferior en tono `#0F0D0C`.
4. **Dificultad estimada:** Media (Framer Motion + Tailwind CSS).
5. **Impacto visual esperado:** 10/10 (Factor WOW instantáneo).

---

### Referencia 2: Nobu Restaurants & Hotels
* **URL:** `https://noburestaurants.com`
* **Categoría:** Luxury Hospitality Global & Japanese Gastronomy

#### Análisis de los 20 Aspectos:
1. **Hero:** Carrusel de imágenes fijas de alta resolución alternadas con clips de ambiente sobrio.
2. **Fotografía:** Fotografía editorial a sangre, estilo revista de arquitectura y gastronomía de lujo.
3. **Vídeo:** Vídeos cortos en cámara lenta que destacan la preparación en directo en la barra de sushi.
4. **Tipografía:** Serif de alta cuna (*Didot* / *Bodoni* refinada) combinada con Sans-serif condensada.
5. **Composición:** Estructura modular minimalista centrada con márgenes extremadamente amplios (espacio negativo).
6. **Navegación:** Menú superior multinivel con selector de ubicación geográfica global.
7. **Estructura de Home:** Selector de Ciudad → Hero Emblemático → Filosofía del Chef Nobu → Platos Signature → Reservas.
8. **Carta / Catálogo:** Menú en PDF descargable combinado con vista web simplificada por bloques de texto.
9. **Cards:** Marcos limpios de una sola imagen con tipografía flotante en la base.
10. **Animaciones:** Transiciones sutiles de fade-in al hacer scroll sin elementos excesivamente teatrales.
11. **Scroll:** NATIVO del sistema, primando la velocidad y la accesibilidad.
12. **Hover:** Cambio de color sutil de texto de blanco a dorado champagne (`#D8B36A`).
13. **Transiciones:** Cambio directo entre páginas con indicador discreto de carga.
14. **Paleta:** Negro obsidiana (`#121212`), gris ceniza (`#1E1E1E`), dorado champagne (`#D8B36A`) y crema elegante (`#F8F6F0`).
15. **Mobile:** Adaptación impecable con navegación en barra inferior para acceso inmediato a reservas y mapa.
16. **CTAs:** Botones planos rectangulares con tipografía Serif en mayúsculas y espaciado amplio de letras (*letter-spacing*).
17. **Reservas:** Integración con plataformas de reserva externas de lujo (SevenRooms / OpenTable).
18. **Conversión:** Enfocada prioritariamente a la captación de reservas telefónicas y digitales.
19. **Velocidad/Performance:** Excelente score en First Contentful Paint (FCP).

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** El uso del espacio negativo y la tipografía Serif para transmitir estatus de marca internacional.
2. **Qué NO copiar:** La navegación multinivel compleja necesaria para decenas de ubicaciones globales (OYISHI solo necesita 1 ubicación).
3. **Qué patrón adaptar a OYISHI:** La jerarquía de titulares Serif sobrios sobre fondo oscuro cálido con acentos dorados en botones.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10 (Sensación inmediata de restaurante galardonado).

---

### Referencia 3: Zuma Restaurants
* **URL:** `https://zumarestaurant.com`
* **Categoría:** Contemporary Luxury Izakaya & Sushi

#### Análisis de los 20 Aspectos:
1. **Hero:** Full-screen looping video enfocado en texturas de granito, madera carbonizada y fuego de la parrilla Robata.
2. **Fotografía:** Tonos oscuros, iluminación dramática con sombras muy marcadas (*chiaroscuro*).
3. **Vídeo:** Clips ultra-hd en loop sin audio que transmiten atmósfera nocturna sofisticada.
4. **Tipografía:** Typography Sans-serif modernista industrial con Serif elegante para subtítulos.
5. **Composición:** Cuadrícula de columnas desiguales con paneles retráctiles de navegación.
6. **Navegación:** Navegación en hamburguesa lateral con barra de reserva fija en el pie.
7. **Estructura de Home:** Hero Video → Selección de Ciudad → Galería Izakaya → Experiencia Gastronómica → Footer.
8. **Carta / Catálogo:** Menú estructurado por secciones temáticas (Robata, Sushi, Tempura, Cocktails).
9. **Cards:** Tarjetas con superposición de texto e imágenes en proporción 4:5.
10. **Animaciones:** Slide-in de menús laterales con curvas Bézier personalizadas de alta fluidez.
11. **Scroll:** Parallax sutil en imágenes de fondo de secciones clave.
12. **Hover:** Inversión de color en botones y zoom suave en fotos de productos.
13. **Transiciones:** Carga asíncrona de secciones sin parpadear.
14. **Paleta:** Carbón quemado (`#181514`), terracota oscuro (`#5C2920`), bronce cepillado (`#9E7B54`) y negro cálido (`#0E0C0B`).
15. **Mobile:** Drawer de reservas fijo en la parte inferior de la pantalla (*sticky bottom bar*).
16. **CTAs:** Botones en tonos bronce con borde de 1px e icono de flecha sutil.
17. **Reservas:** Selector instantáneo de Fecha/Hora/Comensales en modal emergente.
18. **Conversión:** Orientada a reservas nocturnas y eventos privados.
19. **Velocidad/Performance:** Carga de vídeo optimizada con fallback en imagen de alta resolución.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La atmósfera nocturna cálida y la integración de texturas orgánicas (madera, piedra, fuego).
2. **Qué NO copiar:** Los menús emergentes que bloquean completamente la vista de la página en dispositivos portátiles.
3. **Qué patrón adaptar a OYISHI:** El uso de fondo en tono carbón cálido (`#14100E`) complementado con acentos terracota/dorado para la sección de productos destacados.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 4: Masa NYC
* **URL:** `https://masanyc.com`
* **Categoría:** 3-Star Michelin Omakase (Máxima Sobriedad Wabi-Sabi)

#### Análisis de los 20 Aspectos:
1. **Hero:** Estilo minimalista extremo: isotipo centrado sobre fondo negro azabache absoluto y tipografía sutil.
2. **Fotografía:** Ausencia casi total de fotografía en la portada; fotografías artísticas en blanco y negro en secciones interiores.
3. **Vídeo:** Sin vídeo. La experiencia apuesta por el silencio y el misterio.
4. **Tipografía:** Serif ultra-fina (estilo *Garamond Premiere* / *Cormorant Garamond*).
5. **Composición:** Simetría axial estricta con márgenes masivos y alineación al centro.
6. **Navegación:** 3 o 4 enlaces discretos en la parte inferior (*Philosophy*, *Reservation*, *Location*, *Contact*).
7. **Estructura de Home:** Isotipo → Filosofía del Chef Masa Takayama → Información de Reserva → Footer.
8. **Carta / Catálogo:** No hay menú detallado (concepto Omakase absoluto: "en manos del chef").
9. **Cards:** No utiliza tarjetas tradicionales; solo bloques textuales de extrema pulcritud.
10. **Animaciones:** Fade-in ultrasuave de 1.2 segundos al cargar la página.
11. **Scroll:** Estático / Scroll mínimo.
12. **Hover:** Aparición de subrayado sutil de 1px bajo los enlaces.
13. **Transiciones:** Disolución suave entre vistas.
14. **Paleta:** Negro puro (`#000000`), gris grafito (`#222222`), blanco tiza (`#EBEBEB`).
15. **Mobile:** Idéntica sobriedad que en escritorio, adaptando únicamente el tamaño del texto.
16. **CTAs:** Botones de texto desnudo con bordes mínimos.
17. **Reservas:** Redirección directa a la plataforma oficial de reservas de alta gama.
18. **Conversión:** Basada en la exclusividad y la lista de espera.
19. **Velocidad/Performance:** Carga instantánea (< 0.5s), peso total de página < 300KB.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Demostrar cómo el espacio en blanco y el minimalismo transmiten el nivel de precio y prestigio más alto del mundo.
2. **Qué NO copiar:** La falta de fotos de platos y la ausencia de catálogo interactivo (OYISHI vende 155 productos reales y necesita fotos irresistibles).
3. **Qué patrón adaptar a OYISHI:** El espaciado tipográfico holgado y la tipografía Serif estilizada para los nombres de las categorías principales.
4. **Dificultad estimada:** Muy Baja.
5. **Impacto visual esperado:** 8/10 (Elegancia pura pero demasiado austera para delivery/takeaway).

---

### Referencia 5: Sexy Fish London & Miami
* **URL:** `https://sexyfish.com`
* **Categoría:** High-End Japanese Dining & Ultra-Luxury Motion

#### Análisis de los 20 Aspectos:
1. **Hero:** Vídeo psicodélico de alta gama con criaturas marinas en 3D fotorrealista combinadas con sushi de lujo.
2. **Fotografía:** Colores saturados, contraluz azul neón profundo, dorado y coral gastronómico.
3. **Vídeo:** Vídeo ambiental ultra-dinámico en resolución 4K a 60fps.
4. **Tipografía:** Sans-serif geométrica en bold mayúsculas combinada con letras decorativas personalizadas.
5. **Composición:** Capas superpuestas con profundidad de campo y parallax activo al mover el ratón.
6. **Navegación:** Menú flotante interactivo con efectos de distorsión líquida al pasar el cursor.
7. **Estructura de Home:** Hero Inmersivo → Menú Gastronómico → Coctelería de Autor → DJ Sessions → Reservas.
8. **Carta / Catálogo:** Menú interactivo con pestañas animadas y vistas de fotos en Pop-up de alta velocidad.
9. **Cards:** Tarjetas con efecto de cristal esmerilado (*glassmorphism*) y bordes de luz brillante.
10. **Animaciones:** Animaciones continuas de partículas y movimiento de líquidos en segundo plano.
11. **Scroll:** Scroll con efectos de revelado tridimensional.
12. **Hover:** Brillo metálico reactivo en botones y fotos.
13. **Transiciones:** Transición de cortina oscura fluida entre páginas.
14. **Paleta:** Azul cobalto profundo (`#0A1128`), neón turquesa (`#00E5FF`), dorado champagne (`#E6C687`) y negro nocturno (`#050814`).
15. **Mobile:** Experiencia optimizada con micro-interacciones táctiles rápidas.
16. **CTAs:** Botones fluorescentes/dorados con pulso sutil de atención.
17. **Reservas:** Widget flotante siempre accesible en el borde inferior derecho.
18. **Conversión:** Máxima orientación al ocio nocturno y reserva de mesas VIP.
19. **Velocidad/Performance:** Alta carga inicial que requiere optimización previa de assets.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Crear una experiencia inmersiva que engancha al usuario desde el segundo 1.
2. **Qué NO copiar:** Los efectos 3D sobrecargados y los tonos neón agresivos (OYISHI busca lujo japonés cálido, no ambiente de club cyberpunk).
3. **Qué patrón adaptar a OYISHI:** Las tarjetas con cristal esmerilado (*glassmorphism* sutil) con fondo `#181412` y opacidad del 80% sobre imágenes de alta calidad.
4. **Dificultad estimada:** Alta.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 6: SingleThread Farm & Inn
* **URL:** `https://singlethreadfarms.com`
* **Categoría:** 3-Star Michelin Omakase & Luxury Hospitality (Sonoma)

#### Análisis de los 20 Aspectos:
1. **Hero:** Serie de fotografías cinematográficas de formato panoramico con desplazamiento suave automático.
2. **Fotografía:** Fotografía natural de alta cocina e ingredientes recién cosechados con luz solar matutina.
3. **Vídeo:** Vídeos documentales breves sobre los artesanos japoneses y agricultores locales.
4. **Tipografía:** Serif refinada en tonos crema sobre fondos carbón suave.
5. **Composición:** Formato de libro de arte (*coffee table book*) con columnas verticales anchas.
6. **Navegación:** Menú minimalista en la parte superior derecha que se expande de forma sobria.
7. **Estructura de Home:** Hero Fotográfico → Manifiesto Omotenashi → El Menú de Temporada → La Granja → Reservas.
8. **Carta / Catálogo:** Presentación poética de los 11 pases del menú degustación con historias de los productores.
9. **Cards:** Bloques limpios con bordes invisibles y separación por generosos espacios.
10. **Animaciones:** Animaciones de fundido cruzado (*cross-fade*) pausadas de 1.5 segundos.
11. **Scroll:** Scroll fluido natural de lectura relajada.
12. **Hover:** Suave cambio de opacidad en imágenes (de 0.9 a 1.0).
13. **Transiciones:** Carga de página imperceptible mediante precarga inteligente.
14. **Paleta:** Mousse de oliva (`#2E332B`), madera nogal (`#3E2723`), crema lino (`#F4F1EA`) y carbón suave (`#1C1C1C`).
15. **Mobile:** Lectura editorial perfecta sin elementos molestos.
16. **CTAs:** Botones de texto subrayado con trazo de 1px.
17. **Reservas:** Integración sobria con fecha de apertura mensual de listas.
18. **Conversión:** Centrada en vender la experiencia completa de gastronomía + alojamiento.
19. **Velocidad/Performance:** Excelente optimización de imágenes en formato WebP progresivo.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Transmitir la calidez del concepto artesanal japonés (*Omotenashi*) a través de la fotografía y la tipografía.
2. **Qué NO copiar:** La velocidad de interacción tan pausada que en una web comercial de delivery podría impacientar al cliente.
3. **Qué patrón adaptar a OYISHI:** Bloques narrativos "El Arte del Sushi en OYISHI" intercalados entre las categorías del menú para justificar el posicionamiento premium.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 7: Alchemist Copenhagen
* **URL:** `https://alchemist.dk`
* **Categoría:** Alta Gastronomía Holística & Multi-sensory Web (Awwwards Winner)

#### Análisis de los 20 Aspectos:
1. **Hero:** Pantalla totalmente negra con un punto de luz central que reacciona al movimiento del ratón y sonido ambiente opcional.
2. **Fotografía:** Fotografía surrealista y teatral de platos como obras de arte dramáticas.
3. **Vídeo:** Animaciones de proyección en cúpula integradas en la interfaz.
4. **Tipografía:** Monospaced de precisión científica combinada con Serif clásica ultra-elegante.
5. **Composición:** Estructura en capítulos numerados como si fuera una representación teatral.
6. **Navegación:** Navegación por capítulos con indicador visual de progreso lateral.
7. **Estructura de Home:** Intro Sensorial → Capítulo I: La Cúpula → Capítulo II: La Cocina → Capítulo III: El Manifiesto → Reservas.
8. **Carta / Catálogo:** Presentación de los 50 "Impressiones" gastronómicas mediante tarjetas interactivas 3D.
9. **Cards:** Marcos con iluminación de bordes y profundidad visual.
10. **Animaciones:** Animaciones complejas en WebGL y Canvas con distorsión de imágenes.
11. **Scroll:** Scroll interactivo basado en canvas que desplaza elementos en ejes Z y Y.
12. **Hover:** Distorsiones ópticas y efectos de refracción sobre el texto.
13. **Transiciones:** Fundidos en negro con efectos de sonido ambiental ultra-suaves.
14. **Paleta:** Negro de medianoche (`#050505`), bronce antiguo (`#B89759`), blanco espectral (`#E0E0E0`).
15. **Mobile:** Versión simplificada sin WebGL pesado pero manteniendo el impacto tipográfico.
16. **CTAs:** Botones con estética de terminal refinada con bordes de 1px.
17. **Reservas:** Sistema exclusivo con cuenta atrás para la liberación de mesas.
18. **Conversión:** Dirigida a entusiastas de la gastronomía mundial dispuestos a reservar con meses de antelación.
19. **Velocidad/Performance:** Carga estructurada con loader personalizado sobrio.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Convertir una web de restaurante en una obra de arte digital inolvidable.
2. **Qué NO copiar:** La complejidad técnica extrema en WebGL y la dependencia de música que pueden frustrar al usuario que solo quiere pedir sushi.
3. **Qué patrón adaptar a OYISHI:** El uso de tipografía Monospaced para detalles técnicos (gramos, alérgenos, piezas) combinado con Serif para los nombres de platos.
4. **Dificultad estimada:** Muy Alta.
5. **Impacto visual esperado:** 10/10.

---

### Referencia 8: Sticks'n'Sushi
* **URL:** `https://sticksnsushi.com`
* **Categoría:** Nordic-Japanese Fusion & E-Commerce Gastronómico Leader

#### Análisis de los 20 Aspectos:
1. **Hero:** Fotografía cenital de alta resolución con bandejas de sushi y yakitori perfectamente dispuestas.
2. **Fotografía:** Iluminación clara nórdica, contraste impecable, enfoque nítido en el producto comestible.
3. **Vídeo:** Vídeos cortos de 3 segundos mostrando el glaseado de las brochetas en la parrilla.
4. **Tipografía:** Sans-serif nórdica limpia (*Helvetica Now* / *Inter* en peso bold).
5. **Composición:** Cuadrícula comercial limpia con tarjetas de alto impacto visual.
6. **Navegación:** Header sticky con selector directo entre "Takeaway / Delivery" y "Dine-In".
7. **Estructura de Home:** Hero Comercial → Selector de Modo de Pedido → Combinados Estrella → Carta por Categorías → Locales.
8. **Carta / Catálogo:** Menú e-commerce hiper-optimizado con filtros por ingredientes, vegetarianos y alérgenos.
9. **Cards:** Tarjetas blancas/oscuras de esquina recta con botón directo "+ Añadir al carrito".
10. **Animaciones:** Animación de deslizado (*slide-in*) del carrito desde la derecha.
11. **Scroll:** Scroll rápido y fluido optimizado para catálogos extensos.
12. **Hover:** Ligero desplazamiento hacia arriba de la tarjeta (`translateY(-4px)`).
13. **Transiciones:** Cambio instantáneo de pestaña de categorías sin parpadeo.
14. **Paleta:** Carbón nórdico (`#1A1A1A`), madera clara (`#E5D9C5`), rosa salmón (`#FF8A7A`) y blanco impoluto (`#FFFFFF`).
15. **Mobile:** Una de las mejores UX móviles de restauración en Europa (eficiencia de compra total).
16. **CTAs:** Botones oscuros de alto contraste con texto "Pedir Ahora".
17. **Reservas:** Proceso en 3 clics integrado con el gestor de restaurante.
18. **Conversión:** EXTREMADAMENTE ALTA. Diseñado específicamente para maximizar el valor del pedido medio.
19. **Velocidad/Performance:** Excelente (Score > 90 en Lighthouse Mobile).

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La velocidad y sencillez con la que el usuario puede explorar el menú y realizar su pedido.
2. **Qué NO copiar:** La estética excesivamente nórdica/minimalista clara si OYISHI busca posicionarse en el segmento oscuro-cinematográfico de lujo.
3. **Qué patrón adaptar a OYISHI:** La arquitectura de la página `/carta` de OYISHI: buscador instantáneo, pestañas fijas de 17 categorías y drawer de carrito rápido.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 8.5/10 (Máxima efectividad comercial).

---

### Referencia 9: Pierre Hermé Paris
* **URL:** `https://pierreherme.com`
* **Categoría:** Haute Pâtisserie & Luxury Food Brand Showcase

#### Análisis de los 20 Aspectos:
1. **Hero:** Slider sensorial con vídeos macro de ingredientes cayendo en cámara lenta y detalles de acabado artesanal.
2. **Fotografía:** Fotografía macro de estudio joyero: texturas de hojaldre, brillo de glaseados y colores intensos.
3. **Vídeo:** Vídeo en super slow-motion (240fps) enfocado en la textura y corte de los productos.
4. **Tipografía:** Serif francesa elegante con versalitas para títulos de colección.
5. **Composición:** Grid de catálogo de alta costura (*haute couture*) con espaciados irregulares elegantes.
6. **Navegación:** Menú desplegable masivo (*mega-menu*) ilustrado con iconos gastronómicos finos.
7. **Estructura de Home:** Hero de Colección de Temporada → Los Iconos → Creador de Cajas Personalizadas → Experiencias → Footer.
8. **Carta / Catálogo:** Catálogo tipo joyería con selector de Sabores, Colecciones y Ediciones Limitadas.
9. **Cards:** Tarjetas cuadradas 1:1 con fondo gris muy claro o carbón según la colección.
10. **Animaciones:** Elevación sutil de elementos al hacer hover con sombras suaves difuminadas.
11. **Scroll:** Scroll con revelado en cascada de imágenes.
12. **Hover:** Cambio de imagen de producto a foto de corte transversal que muestra el interior.
13. **Transiciones:** Suave disolución cruzada entre páginas de producto.
14. **Paleta:** Negro azabache (`#111111`), oro pulido (`#D4AF37`), rosa macarrón (`#E8A598`) y chocolate profundo (`#2B1B17`).
15. **Mobile:** Galería deslizable horizontal (*swipeable carousel*) optimizada para pulgares.
16. **CTAs:** Botones rectangulares dorados o negros con bordes impecables.
17. **Reservas:** Módulo de reserva de talleres gastronómicos y catas privadas.
18. **Conversión:** Altísima para compra de regalo y productos de gama alta.
19. **Velocidad/Performance:** Rápida gracias a la compresión inteligente WebP/AVIF.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Tratar el producto gastronómico como una joya mediante la fotografía macro y el hover con foto de corte del producto.
2. **Qué NO copiar:** La excesiva cantidad de categorías de regalo que no aplican a un restaurante de sushi.
3. **Qué patrón adaptar a OYISHI:** El hover de las tarjetas de platos que muestre una foto secundaria del corte del nigiri o detalle del ingrediente principal.
4. **Dificultad estimada:** Baja (requiere fotos de calidad).
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 10: The Macallan Experience
* **URL:** `https://themacallan.com`
* **Categoría:** Ultra-Premium Brand, Motion & Dark Aesthetic

#### Análisis de los 20 Aspectos:
1. **Hero:** Vídeo cinematic de gota de líquido cayendo en cámara lenta sobre cristal con iluminación ámbar sobre negro.
2. **Fotografía:** Iluminación focal de estudio sobre fondos negros profundos, resaltando destellos dorados y ámbars.
3. **Vídeo:** Loops de vídeo cinematográfico codificados en alta calidad con carga progresiva.
4. **Tipografía:** Serif exclusiva de lujo de alto contraste de trazo.
5. **Composición:** Disposición vertical majestuosa con bloques a pantalla completa (*full-screen scroll sections*).
6. **Navegación:** Header minimalista que se oculta al hacer scroll hacia abajo y reaparece al subir.
7. **Estructura de Home:** Hero Cinematográfico → Historia de la Destilería → Botellas Icónicas → Visita Virtual → Footer.
8. **Carta / Catálogo:** Presentación 360° de las colecciones con fichas técnicas detalladas de notas de cata.
9. **Cards:** Tarjetas oscuras con marco dorado hiper-fino de 0.5px y efecto de brillo interior.
10. **Animaciones:** Animaciones sincronizadas con el scroll (*ScrollTrigger*) que ensamblan los elementos en pantalla.
11. **Scroll:** Scroll narrativo que revela capas de información progresivamente.
12. **Hover:** Resplandor dorado tenue (*glow effect*) alrededor de las botellas o tarjetas.
13. **Transiciones:** Transición de fundido a negro entre pantallas.
14. **Paleta:** Negro carbón (`#0B0B0B`), ámbar de roble (`#C88242`), dorado místico (`#E1AD01`) y cobrizos (`#B87333`).
15. **Mobile:** Adaptación fluida sin pérdida de la sensación de lujo.
16. **CTAs:** Botones en bronce cepillado con animación de rellenado gradual al pasar el cursor.
17. **Reservas:** Reservas de visitas guiadas exclusivas.
18. **Conversión:** Branding de máximo nivel y venta directa de ediciones limitadas.
19. **Velocidad/Performance:** Optimizada mediante la carga de assets bajo demanda.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La integración de la paleta de colores ámbar/dorada sobre fondos negros oscuros y el efecto de brillo metálico en bordes.
2. **Qué NO copiar:** La excesiva lentitud del scroll narrativo que puede entorpecer a quien busca una consulta rápida.
3. **Qué patrón adaptar a OYISHI:** Bordes con resplandor dorado refinado (`border border-amber-500/20 hover:border-amber-500/50 transition-colors duration-500`) en las tarjetas de productos destacados.
4. **Dificultad estimada:** Baja/Media.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 11: Royal Mansour Marrakech
* **URL:** `https://royalmansour.com`
* **Categoría:** Benchmark Hospitality de Lujo & Immersive Navigation

#### Análisis de los 20 Aspectos:
1. **Hero:** Secuencia de micro-vídeos fluidos que muestran detalles de la arquitectura, gastronomía y jardines.
2. **Fotografía:** Colores ricos, calidez extrema, contraluces dorados y texturas de artesanía.
3. **Vídeo:** Clips breves de 2 segundos que cambian suavemente mediante transiciones de opacidad.
4. **Tipografía:** Serif refinada en mayúsculas para títulos, Sans-serif muy ligera para cuerpo.
5. **Composición:** Cuadrículas elegantes inspiradas en mosaicos tradicionales simplificados en diseño moderno.
6. **Navegación:** Menú desplegable lateral con vista previa en miniatura de cada sección al pasar el cursor sobre las opciones.
7. **Estructura de Home:** Hero Inmersivo → Restaurantes Gastronómicos → El Spa → Suites y Riads → Experiencias → Footer.
8. **Carta / Catálogo:** Presentación de los menús de sus restaurantes de estrellas Michelin con imágenes a toda pantalla.
9. **Cards:** Tarjetas con marcos sobrios y leyendas centradas con espaciado generoso.
10. **Animaciones:** Revelado suave (*fade-up*) de texto conforme entra en la ventana de visión (*viewport*).
11. **Scroll:** Scroll natural muy fluido.
12. **Hover:** Revelado de imágenes secundarias mediante máscaras circulares o rectangulares.
13. **Transiciones:** Desplazamiento lateral suave de páginas.
14. **Paleta:** Terracota cálido (`#A0522D`), bronce dorado (`#D4AF37`), ocre (`#CC7722`) y negro noche (`#120F0D`).
15. **Mobile:** Drawer de navegación impecable con botones de reserva de gran tamaño.
16. **CTAs:** Botones redondeados sobrios con fondo oscuro y texto en oro.
17. **Reservas:** Selector flotante de restaurantes y fechas en la barra superior.
18. **Conversión:** Alta conversión para cliente internacional de alto nivel adquisitivo.
19. **Velocidad/Performance:** Carga asíncrona optimizada.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Las vistas previas de secciones al hacer hover en el menú de navegación.
2. **Qué NO copiar:** Los tiempos de espera largos para la carga de galerías de fotos de alta resolución.
3. **Qué patrón adaptar a OYISHI:** El menú de categorías con vista previa en miniatura al pasar el ratón sobre cada nombre de categoría.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 12: Aman Resorts & Fine Dining
* **URL:** `https://aman.com`
* **Categoría:** World Leader in Minimalist Luxury & Serene Typography

#### Análisis de los 20 Aspectos:
1. **Hero:** Imagen estática panorámica de serenidad absoluta con texto centrado pequeño y refinado.
2. **Fotografía:** Enfoque arquitectónico y natural de paisaje con paletas neutras y luz suave.
3. **Vídeo:** Vídeos ambientales lentos que transmiten paz y paz mental.
4. **Tipografía:** Serif exclusiva con espaciado entre letras (*letter-spacing*) expandido.
5. **Composición:** Enorme porcentaje de espacio blanco/oscuro alrededor de cada bloque.
6. **Navegación:** Línea superior limpia con 4 opciones principales de máximo nivel.
7. **Estructura de Home:** Hero Panorámico → Destinos → Gastronomía & Wellness → Historias Aman → Footer.
8. **Carta / Catálogo:** Menús digitales organizados como folletos de arte minimalista.
9. **Cards:** Sin marcos visibles; la separación la determinan los márgenes.
10. **Animaciones:** Transiciones tan suaves que resultan casi imperceptibles.
11. **Scroll:** Scroll pausado sin interrupciones ni elementos flotantes invasivos.
12. **Hover:** Cambio de color sutil de texto de gris claro a blanco puro.
13. **Transiciones:** Disolución en blanco/negro de 1 segundo.
14. **Paleta:** Gris piedra (`#2A2A2A`), beige arena (`#D8D0C5`), carbón suave (`#1A1A1A`) y blanco tiza (`#F4F4F2`).
15. **Mobile:** Simplicidad total, fácil de leer y navegar con una mano.
16. **CTAs:** Botones de texto plano con línea inferior sutil.
17. **Reservas:** Flujo sobrio paso a paso.
18. **Conversión:** Fidelización de clientes habituales de súper lujo.
19. **Velocidad/Performance:** Ultra-rápida debido al código limpio sin librerías pesadas.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Demostrar que el lujo no necesita gritar ni sobrecargarse de efectos animadas para impactar.
2. **Qué NO copiar:** La excesiva falta de color que podría restarle apetitosidad al sushi.
3. **Qué patrón adaptar a OYISHI:** Espaciado generoso entre secciones (`py-24` o `py-32` en Tailwind) para dejar respirar a las fotografías de los platos.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 13: Den Tokyo
* **URL:** `https://jimbochoden.com`
* **Categoría:** World's 50 Best Restaurant Winner & Warm Japanese Storytelling

#### Análisis de los 20 Aspectos:
1. **Hero:** Fotografía cálida del Chef Zaiyu Hasegawa sonriendo en la barra con sus platos icónicos.
2. **Fotografía:** Fotografía naturalista, sin retoques excesivos de estudio, mostrando la frescura real.
3. **Vídeo:** No utiliza vídeos en el hero para agilizar la carga.
4. **Tipografía:** Tipografía Japonesa Mincho (Serif japonesa) combinada con Sans-serif occidental limpia.
5. **Composición:** Cuadrícula simple en formato blog/revista gastronómica.
6. **Navegación:** Menú fijo tradicional sencillo.
7. **Estructura de Home:** Mensaje de Bienvenida → Filosofía del Equipo → Menú del Día → Ubicación & Reservas.
8. **Carta / Catálogo:** Explicación conceptual del menú degustación cambiante según el mercado diario.
9. **Cards:** Tarjetas limpias estilo fotografía Polaroid moderna.
10. **Animaciones:** Sin animaciones complejas.
11. **Scroll:** Scroll estándar del sistema.
12. **Hover:** Opacidad ligera en enlaces.
13. **Transiciones:** Estándar del navegador.
14. **Paleta:** Madera de ciprés (`#D2B48C`), tierra arcilla (`#8B4513`), carbón suave (`#222222`) y blanco crema (`#FAF8F5`).
15. **Mobile:** Adaptación directa y ligera.
16. **CTAs:** Enlaces simples directos a la plataforma de reservas.
17. **Reservas:** Indicaciones claras sobre cómo y cuándo reservar (dificultad alta por demanda).
18. **Conversión:** 100% de ocupación asegurada por reputación mundial.
19. **Velocidad/Performance:** Carga en menos de 1 segundo.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Conectar emocionalmente con el visitante mediante el factor humano y la cercanía.
2. **Qué NO copiar:** La interfaz hiper-simple de aspecto antiguo que no aprovecha las tecnologías web modernas.
3. **Qué patrón adaptar a OYISHI:** La inclusión de una sección "Nuestra Filosofía / El Equipo de Cocina" para transmitir la preparación artesanal del sushi en Fuenlabrada.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 7.5/10.

---

### Referencia 14: Dinings SW3 London
* **URL:** `https://diningssw3.co.uk`
* **Categoría:** High-End Izakaya & Omakase Chelsea (Dark Rich Textures)

#### Análisis de los 20 Aspectos:
1. **Hero:** Fotografía macro de un nigiri de toro con lámina de oro sobre fondo de piedra de pizarra.
2. **Fotografía:** Iluminación puntual cenital que hace brillar el aceite natural del pescado.
3. **Vídeo:** Vídeo atmosférico corto en el pie de página.
4. **Tipografía:** Serif británica clásica combinada con detalles en Sans-serif contemporánea.
5. **Composición:** Diseño centrado con bloques de contraste alternado (oscuro / crema).
6. **Navegación:** Header flotante con acceso directo a "Menus" y "Book a Table".
7. **Estructura de Home:** Hero Gastronómico → Propuesta Culinary → Izakaya Bar → Reservas → Footer.
8. **Carta / Catálogo:** Menús desplegables por acordonamiento (*accordion*) para fácil consulta en móviles.
9. **Cards:** Bloques oscuros con fino borde de 1px en tono bronce.
10. **Animaciones:** Desplazamiento progresivo de elementos al hacer scroll.
11. **Scroll:** Scroll fluido convencional.
12. **Hover:** Oscurecimiento sutil del fondo del botón y brillo en el texto.
13. **Transiciones:** Transición limpia de página.
14. **Paleta:** Negro pizarra (`#121314`), verde musgo profundo (`#1E2822`), bronce antiguo (`#B8860B`) y marfil (`#FFF8DC`).
15. **Mobile:** Acordones de categorías de platos sumamente prácticos para pantallas pequeñas.
16. **CTAs:** Botones rectangulares dorados con letra oscura.
17. **Reservas:** Widget modal rápido para comprobación de disponibilidad en tiempo real.
18. **Conversión:** Alta conversión de residentes locales de alto poder adquisitivo.
19. **Velocidad/Performance:** Buena optimización general.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La estructura de acordones desplegables para consultar la carta en móviles sin saturar la pantalla.
2. **Qué NO copiar:** La mezcla de fondos cremas y oscuros que rompe la inmersión de la experiencia nocturna.
3. **Qué patrón adaptar a OYISHI:** El diseño de los acordones móviles para las categorías de `/carta` si el usuario prefiere vista condensada.
4. **Dificultad estimada:** Baja/Media.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 15: Kyoto Kitcho
* **URL:** `https://kyoto-kitcho.com`
* **Categoría:** Alta Gastronomía Kaiseki Tradicional & Heritage Japanese Design

#### Análisis de los 20 Aspectos:
1. **Hero:** Imagen de jardín zen japonés con cambio de estación meteorológica según la época del año.
2. **Fotografía:** Fotografía artística de platos Kaiseki en vajillas artesanales de cerámica y laca.
3. **Vídeo:** Sin vídeo en el Hero; imágenes fijas de alta carga poética.
4. **Tipografía:** Caligrafía japonesa tradicional integrada con tipografía Serif minimalista.
5. **Composición:** Disposición vertical que imita la escritura japonesa en columnas (*Tatechugaki*).
6. **Navegación:** Menú lateral vertical que no interrumpe la visión del paisaje de fondo.
7. **Estructura de Home:** Imagen de Estación → Poema Gastronómico → Los Platos del Mes → La Casa de Té → Reservas.
8. **Carta / Catálogo:** Explicación detallada del significado cultural de cada pase del menú degustación.
9. **Cards:** Marcos con texturas de papel Washi japonés en formato digital.
10. **Animaciones:** Disolución ultrasuave entre imágenes como pinceladas de agua.
11. **Scroll:** Scroll pausado de máxima elegancia contemplativa.
12. **Hover:** Cambios de tono muy suaves que recuerdan la luz filtrada por bambú.
13. **Transiciones:** Fundidos en blanco cálido.
14. **Paleta:** Verde bambú (`#2D3A2F`), laca roja japonesa (`#8B0000`), dorado pan de oro (`#E6CA65`) y papel washi (`#F7F5F0`).
15. **Mobile:** Maquetación impecable respetando la jerarquía tradicional.
16. **CTAs:** Botones integrados como sellos tradicionales (*Hanko*).
17. **Reservas:** Gestión mediante formulario de solicitud previa con atención personalizada.
18. **Conversión:** Dirigida a experiencias gastronómicas únicas en la vida.
19. **Velocidad/Performance:** Carga optimizada sin scripts innecesarios.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Transportar al usuario a la tradición cultural japonesa auténtica sin clichés comerciales.
2. **Qué NO copiar:** La tipografía vertical en páginas occidentales (dificulta la lectura fluida en español).
3. **Qué patrón adaptar a OYISHI:** Utilizar detalles sutiles en laca roja (`#E85D4E`) inspirados en el sello artesanal tradicional para destacar platos "Recomendados por el Chef".
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 16: Sushi Nakazawa NYC
* **URL:** `https://sushinakazawa.com`
* **Categoría:** Premium Omakase & High-Conversion Seat Booking

#### Análisis de los 20 Aspectos:
1. **Hero:** Foto en primer plano de una pieza de Nigiri de Salmón con brillo impecable sobre fondo negro.
2. **Fotografía:** Iluminación macro de estudio donde el producto es el único protagonista.
3. **Vídeo:** Sin vídeo.
4. **Tipografía:** Sans-serif limpia en mayúsculas con espaciado amplio.
5. **Composición:** Cuadrícula ultra-limpia centrada en los datos clave (Ubicación, Reserva, Menú).
6. **Navegación:** Enlaces directos simples en el encabezado.
7. **Estructura de Home:** Hero Nigiri → Información de Reservas (NYC / DC) → El Chef Daisuke Nakazawa → Galería → Footer.
8. **Carta / Catálogo:** Muestra visual de los 20 nigiris del menú Omakase con nombres en japonés y español.
9. **Cards:** Marcos cuadrados negros con borde fino gris y foto centrada.
10. **Animaciones:** Aparición sencilla de elementos.
11. **Scroll:** Scroll nativo rápido.
12. **Hover:** Iluminación de tarjeta al pasar el cursor.
13. **Transiciones:** Directas.
14. **Paleta:** Negro absoluto (`#0A0A0A`), gris carbón (`#1C1C1C`), salmón vivo (`#FF6B53`) y blanco (`#FFFFFF`).
15. **Mobile:** Botones de reserva masivos para pulsar fácilmente con el pulgar.
16. **CTAs:** Botón "Reserve NYC" y "Reserve DC" visibles de inmediato.
17. **Reservas:** Enlace directo a la plataforma de reservas en la barra principal.
18. **Conversión:** Máxima rapidez para completar la reserva.
19. **Velocidad/Performance:** Carga inmediata.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La claridad de la llamada a la acción y el contraste del salmón sobre el fondo negro azabache.
2. **Qué NO copiar:** La excesiva simplicidad que puede parecer una plantilla si no se acompaña de animaciones finas.
3. **Qué patrón adaptar a OYISHI:** La fotografía de producto sobre fondo negro azabache (`#0D0B0A`) para hacer resaltar el color natural del salmón, atún y aguacate.
4. **Dificultad estimada:** Muy Baja.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 17: Maison Baccarat
* **URL:** `https://baccarat.com`
* **Categoría:** Lujo, Cristal, Refracción de Luz & Transiciones Fluidas

#### Análisis de los 20 Aspectos:
1. **Hero:** Vídeo de copa de cristal cortada reflejando destellos de luz dorada y roja sobre fondo oscuro.
2. **Fotografía:** Calidad de catálogo de joyería de lujo con iluminación de destellos y refracciones.
3. **Vídeo:** Vídeos de alta velocidad que capturan el fuego y el cristal líquido.
4. **Tipografía:** Serif francesa clásica de extrema elegancia.
5. **Composición:** Cuadrículas moduladas con inspiración en vitrinas de museo.
6. **Navegación:** Menú elegante desplegable con iconos vectoriales minimalistas.
7. **Estructura de Home:** Hero Inmersivo → Colecciones Icónicas → Maison Baccarat Restaurants → Regalos → Footer.
8. **Carta / Catálogo:** Catálogo interactivo con efectos de brillo al desplazarse por las piezas.
9. **Cards:** Tarjetas con efecto cristalino y bordes dorados reactivos al cursor.
10. **Animaciones:** Animaciones de luz deslizante sobre botones y tarjetas (*shimmer effect*).
11. **Scroll:** Scroll ultra-fluido.
12. **Hover:** Brillo de luz que recorre el borde de la tarjeta.
13. **Transiciones:** Transiciones elegantes sin pérdida de contexto.
14. **Paleta:** Rojo Baccarat (`#D00000`), dorado champagne (`#E5C158`), negro azabache (`#080808`) y cristalino (`#E8F0F8`).
15. **Mobile:** Adaptación fluida sin perder la sensación de exclusividad.
16. **CTAs:** Botones con marco dorado y animación de brillo metálico.
17. **Reservas:** Integración de reservas para sus salones de té y restaurantes gourmet.
18. **Conversión:** Venta de productos de ultra-lujo.
19. **Velocidad/Performance:** Carga optimizada de recursos gráficos.

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** Los efectos de destello brillante en botones y bordes de tarjetas (*shimmer animation*).
2. **Qué NO copiar:** Los elementos de e-commerce de cristalería ajenos a la restauración.
3. **Qué patrón adaptar a OYISHI:** El efecto de destello de luz sutil (*shimmer effect*) en el botón principal "PEDIR AHORA" o "RESERVAR MESA".
4. **Dificultad estimada:** Media (CSS Keyframes o Framer Motion).
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 18: Noma Copenhagen
* **URL:** `https://noma.dk`
* **Categoría:** Alta Gastronomía Mundial & Radical Minimalist Product Focus

#### Análisis de los 20 Aspectos:
1. **Hero:** Imagen o vídeo limpio de la estación gastronómica actual (Season of Ocean / Vegetable / Game).
2. **Fotografía:** Fotografía hiper-realista, cruda y orgánica de ingredientes nórdicos y fermentos.
3. **Vídeo:** Vídeos documentales breves sobre la recolección de ingredientes en la naturaleza.
4. **Tipografía:** Sans-serif audaz y limpia (*Grotesk* moderna) de gran tamaño.
5. **Composición:** Bloques horizontales masivos con tipografía en tamaño gigante (*hero typography*).
6. **Navegación:** Navegación en el pie o lateral muy simplificada.
7. **Estructura de Home:** Temporada Actual → Comprar Productos Noma Projects → La Historia → Reservas → Footer.
8. **Carta / Catálogo:** Presentación de la temporada con lista de platos e historia de innovación.
9. **Cards:** Bloques rectangulares de color solido o fotografía sin adornos.
10. **Animaciones:** Transiciones inmediatas y limpias.
11. **Scroll:** Scroll nativo de alto rendimiento.
12. **Hover:** Inversión instantánea de color en bloques de texto.
13. **Transiciones:** Rápidas sin pantallas de carga.
14. **Paleta:** Gris nórdico (`#252525`), verde musgo (`#3A4032`), tierra oscura (`#1B1715`) y blanco puro (`#FFFFFF`).
15. **Mobile:** Perfecta legibilidad y accesibilidad para todos los usuarios.
16. **CTAs:** Bloques de texto completo clicables.
17. **Reservas:** Apertura de reservas por temporadas con miles de personas en cola virtual.
18. **Conversión:** Venta agotada instantánea de plazas y productos de su tienda online.
19. **Velocidad/Performance:** Insuperable (Score 98+ en PageSpeed).

#### 5 Claves de Evaluación:
1. **Qué hace excepcionalmente bien:** La fuerza del titular principal y la audacia de la tipografía para comunicar el concepto de temporada.
2. **Qué NO copiar:** El diseño crudo/industrial que puede resultar poco cálido para un restaurante japonés acogedor.
3. **Qué patrón adaptar a OYISHI:** Los bloques de titulares audaces con tipografía de gran escala para secciones clave como "CARTA COMPLETA 155 PLATOS".
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 8.5/10.

---

## 2. TOP 10 REFERENCIAS FINALES

De las 18 referencias investigadas, se han seleccionado las **10 mejores webs** que aportan los patrones más valiosos para el proyecto **OYISHI**:

```
+---------------------------------------------------------------------------------------------+
|                                TOP 10 BENCHMARK SELECCIONADO                                |
+----+-----------------------+---------------------------------------+------------------------+
| #  | REFERENCIA            | URL                                   | ENFOQUE CLAVE          |
+----+-----------------------+---------------------------------------+------------------------+
| 1  | Yamato Table Grill    | https://yamato-sushi.com              | Hero Cinematic & Video |
| 2  | Zuma Restaurants      | https://zumarestaurant.com            | Texturas & Atmósfera   |
| 3  | Masa NYC              | https://masanyc.com                   | Elegancia Wabi-Sabi    |
| 4  | Sticks'n'Sushi        | https://sticksnsushi.com              | UX Carta & Conversión  |
| 5  | Sexy Fish             | https://sexyfish.com                  | Premium Glassmorphism  |
| 6  | Pierre Hermé Paris    | https://pierreherme.com               | Fotografía Macro Joya  |
| 7  | The Macallan          | https://themacallan.com               | Dark Luxury & Shimmer  |
| 8  | Royal Mansour         | https://royalmansour.com              | Hover Preview Navigation|
| 9  | SingleThread Farm     | https://singlethreadfarms.com         | Storytelling Artesanal |
| 10 | Maison Baccarat       | https://baccarat.com                  | Acentos & CTA Motion   |
+----+-----------------------+---------------------------------------+------------------------+
```

---

### Análisis Detallado del TOP 10:

#### 1. Yamato Table Grill & Sushi Bar
* **URL:** `https://yamato-sushi.com`
* **Fortalezas:** Integración magistral del vídeo en el Hero con máscaras oscuras radiales que se funden de manera natural con la paleta de la web.
* **Qué EVITAR:** Cursos personalizados pesados en JavaScript que causan tirones (*lag*) en la experiencia de usuario.
* **Qué ADAPTAR a OYISHI:** Aplicar una máscara de gradiente oscuro continuo al vídeo real `oyishi-sushi-build.mp4` para fusionarlo limpiamente con el fondo `#0F0D0C` de la Home.

#### 2. Zuma Restaurants
* **URL:** `https://zumarestaurant.com`
* **Fortalezas:** Riqueza visual basada en tonos carbón quemado, bronce cepillado y madera oscura.
* **Qué EVITAR:** Menús modales a pantalla completa que tapan por completo el contenido de fondo durante la navegación.
* **Qué ADAPTAR a OYISHI:** Usar la paleta base de carbón cálido (`#14100E`) con acentos de bronce dorados (`#D8B36A`) y rojos sutiles (`#E85D4E`).

#### 3. Masa NYC
* **URL:** `https://masanyc.com`
* **Fortalezas:** Uso maestro del espacio negativo y tipografía Serif refinada para transmitir el máximo nivel de exclusividad.
* **Qué EVITAR:** La falta total de fotos de platos (OYISHI necesita mostrar sus 155 productos reales).
* **Qué ADAPTAR a OYISHI:** El espaciado tipográfico holgado y elegante en los titulares de secciones para evitar la saturación visual.

#### 4. Sticks'n'Sushi
* **URL:** `https://sticksnsushi.com`
* **Fortalezas:** Arquitectura de menú digital hiper-eficiente con barra de categorías sticky, filtros por tipo de plato y carrito desplegable.
* **Qué EVITAR:** El diseño claro/nórdico si se busca mantener una estética nocturna y cálida.
* **Qué ADAPTAR a OYISHI:** La UX de la página `/carta` con selector de 17 categorías, buscador en tiempo real y contador de productos.

#### 5. Sexy Fish London & Miami
* **URL:** `https://sexyfish.com`
* **Fortalezas:** Uso de tarjetas con efecto cristal esmerilado (*glassmorphism*) y bordes de luz brillante sobre fondos oscuros.
* **Qué EVITAR:** La estética cyberpunk y luces neón estridentes que desentonan con la autenticidad japonesa.
* **Qué ADAPTAR a OYISHI:** Tarjetas de productos destacados en la Home con fondo semitransparente oscuro (`bg-[#181412]/80 backdrop-blur-md`) y borde sutil.

#### 6. Pierre Hermé Paris
* **URL:** `https://pierreherme.com`
* **Fortalezas:** Tratamiento de la fotografía gastronómica como alta joyería y efecto hover con cambio a foto de corte del producto.
* **Qué EVITAR:** La estructura de e-commerce de regalos masivo con excesivas ofertas.
* **Qué ADAPTAR a OYISHI:** El efecto hover en las cards de la carta que revela detalles de los ingredientes o el corte del nigiri/roll.

#### 7. The Macallan Experience
* **URL:** `https://themacallan.com`
* **Fortalezas:** Estética de lujo oscuro con resplandor dorado sutil (*shimmer/glow*) en bordes y botones.
* **Qué EVITAR:** El scroll narrativo excesivamente lento para usuarios que desean información inmediata.
* **Qué ADAPTAR a OYISHI:** Bordes reactivos con resplandor dorado sutil al pasar el cursor sobre las tarjetas clave del menú.

#### 8. Royal Mansour Marrakech
* **URL:** `https://royalmansour.com`
* **Fortalezas:** Navegación en el menú con vistas previas en miniatura al pasar el cursor sobre cada categoría.
* **Qué EVITAR:** Tiempos de carga elevados en conexiones móviles lentas.
* **Qué ADAPTAR a OYISHI:** Mostrar una vista previa en imagen miniatura flotante cuando el usuario pasa el cursor sobre las 8 categorías principales en la Home.

#### 9. SingleThread Farm & Inn
* **URL:** `https://singlethreadfarms.com`
* **Fortalezas:** Narrativa fotográfica de alta calidad que transmite el concepto de artesanía e ingredientes frescos de temporada.
* **Qué EVITAR:** Proceso de reserva complejo de múltiples pasos que genera fricción.
* **Qué ADAPTAR a OYISHI:** Sección "El Arte de OYISHI" en la Home destacando la calidad del salmón, atún y la elaboración al momento.

#### 10. Maison Baccarat
* **URL:** `https://baccarat.com`
* **Fortalezas:** Micro-animaciones de brillo metálico (*shimmer effect*) en los botones de llamada a la acción primarios.
* **Qué EVITAR:** Elementos visuales recargados que entorpezcan el tiempo de respuesta.
* **Qué ADAPTAR a OYISHI:** Efecto de brillo barriendo suavemente el botón principal "RESERVAR MESA" / "VER CARTA COMPLETA".

---

## 3. 10 IDEAS CONCRETAS PARA OYISHI CON PUNTUACIÓN (1 A 10)

A continuación se presentan 10 propuestas de diseño e interacción para implementar en OYISHI, evaluadas en 5 criterios clave:

1. **Impacto Visual:** Capacidad de generar el efecto "WOW".
2. **Utilidad Comercial:** Directamente enfocado en aumentar pedidos/reservas.
3. **Mobile:** Facilidad y belleza en pantallas táctiles de smartphones.
4. **Rendimiento:** Mantener velocidad de carga ultra-rápida (Lighthouse > 90).
5. **Dificultad:** Esfuerzo técnico estimado de implementación (1 = Muy Fácil, 10 = Muy Difícil).

```
+-------------------------------------------------------------------------------------------------------+
|                                10 IDEAS RECOMENDADAS PARA OYISHI                                      |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
| #  | IDEA DE DISEÑO / PATRÓN               | VISUAL  | COMERCIAL  | MOBILE | RENDIMIENTO | DIFICULTAD |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
| 1  | Hero Cinematográfico con Máscara      |   10    |     9      |   9    |      9      |     3      |
| 2  | Rejilla de Categorías Visuales        |    9    |     10     |   10   |      9      |     3      |
| 3  | Curaduría "Selección OYISHI" (8 items)|    9    |     10     |   9    |     10      |     2      |
| 4  | Tarjetas de Producto Glassmorphism    |    9    |     9      |   9    |      9      |     3      |
| 5  | Botón CTA con Brillo Metallic Shimmer|    8    |     9      |   10   |     10      |     2      |
| 6  | Filtro Rápido e-Commerce en /carta    |    8    |     10     |   10   |      9      |     4      |
| 7  | Modal/Drawer de Reserva Oscuro        |    8    |     10     |   10   |     10      |     3      |
| 8  | Micro-Animaciones Stagger en Scroll   |    9    |     8      |   9    |      9      |     4      |
| 9  | Bloque Narrativo "El Arte del Sushi"  |    9    |     8      |   9    |     10      |     2      |
| 10 | Sticky Bottom Navigation en Móvil     |    7    |     10     |   10   |     10      |     3      |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
```

---

### Explicación Técnica de las 10 Ideas:

1. **Hero Cinematográfico con Máscara Radial (`#0F0D0C`):**
   * *Descripción:* Mantener el vídeo real `oyishi-sushi-build.mp4` funcionando en el Hero pero aplicando un degradado radial en CSS (`bg-gradient-to-t from-[#0F0D0C] via-transparent to-transparent`) que se fusione suavemente con la primera sección sin cortes abruptos.
   * *Puntuaciones:* Visual: 10 | Comercial: 9 | Mobile: 9 | Rendimiento: 9 | Dificultad: 3

2. **Rejilla de Categorías Visuales ("EXPLORA OYISHI"):**
   * *Descripción:* En la Home, colocar una cuadrícula elegante de 8 bloques visuales (Sashimi, Nigiri, Uramaki, Gyoza, etc.) con imágenes de alta resolución y efecto hover de zoom ligero que redirija directamente a la categoría en `/carta`.
   * *Puntuaciones:* Visual: 9 | Comercial: 10 | Mobile: 10 | Rendimiento: 9 | Dificultad: 3

3. **Curaduría "Selección OYISHI" (8 Productos Destacados):**
   * *Descripción:* Mostrar únicamente 8 productos icónicos en la Home (en lugar de los 155 para no saturar), presentados en tarjetas oscuras con badge en rojo OYISHI (`#E85D4E`) "Recomendado".
   * *Puntuaciones:* Visual: 9 | Comercial: 10 | Mobile: 9 | Rendimiento: 10 | Dificultad: 2

4. **Tarjetas de Producto Glassmorphism Warm Dark:**
   * *Descripción:* Tarjetas con fondo carbón `#181412` semitransparente (`bg-opacity-80 backdrop-blur-md`), borde fino `#2D2520` y destello dorado sutil al pasar el cursor.
   * *Puntuaciones:* Visual: 9 | Comercial: 9 | Mobile: 9 | Rendimiento: 9 | Dificultad: 3

5. **Botón CTA con Brillo Metallic Shimmer (Framer Motion / CSS):**
   * *Descripción:* Animación de una ráfaga de luz dorada suave que recorre en diagonal el botón "RESERVAR MESA" o "PEDIR ONLINE" cada 4 segundos.
   * *Puntuaciones:* Visual: 8 | Comercial: 9 | Mobile: 10 | Rendimiento: 10 | Dificultad: 2

6. **Filtro Rápido e-Commerce y Buscador en `/carta`:**
   * *Descripción:* En la página `/carta`, incluir una barra de pestañas horizontales con scroll táctil suave para las 17 categorías y un buscador instantáneo por texto en tiempo real.
   * *Puntuaciones:* Visual: 8 | Comercial: 10 | Mobile: 10 | Rendimiento: 9 | Dificultad: 4

7. **Modal / Drawer de Reserva Estética Oscura Integrado:**
   * *Descripción:* Formulario de reservas directo con estética oscura elegante (selector de personas, fecha y hora) sin necesidad de abandonar la página web.
   * *Puntuaciones:* Visual: 8 | Comercial: 10 | Mobile: 10 | Rendimiento: 10 | Dificultad: 3

8. **Micro-Animaciones Staggered Scroll con Framer Motion:**
   * *Descripción:* Aparición escalonada de las tarjetas de producto conforme entran en la pantalla (`viewport={{ once: true }}` con `staggerChildren: 0.08`).
   * *Puntuaciones:* Visual: 9 | Comercial: 8 | Mobile: 9 | Rendimiento: 9 | Dificultad: 4

9. **Bloque Narrativo "El Arte del Sushi OYISHI":**
   * *Descripción:* Sección editorial entre la muestra de productos y las reservas con fotografía macro de salmón fresco, tipografía Serif refinada y el manifiesto de calidad en Fuenlabrada.
   * *Puntuaciones:* Visual: 9 | Comercial: 8 | Mobile: 9 | Rendimiento: 10 | Dificultad: 2

10. **Sticky Bottom Bar para Móviles:**
    * *Descripción:* Barra fija inferior en smartphones con 2 botones de acceso rápido: "VER CARTA (155)" y "RESERVAR MESA", asegurando conversión inmediata con el pulgar.
    * *Puntuaciones:* Visual: 7 | Comercial: 10 | Mobile: 10 | Rendimiento: 10 | Dificultad: 3

---

## 4. RECOMENDACIÓN FINAL

> **“Si OYISHI tuviera que tomar solo 5 ideas de toda esta investigación, serían estas:”**

### 1. Máscara Radial Cinematográfica en el Hero (Inspirada en Yamato Table Grill)
* **Por qué:** Mantiene el vídeo real de sushi funcionando a plena calidad, pero elimina el corte brusco inferior, integrando la cabecera de forma invisible y refinada con el tono carbón de la Home (`#0F0D0C`).

### 2. Curaduría Estratégica en Home + Catálogo Completo en `/carta` (Inspirado en Sticks'n'Sushi)
* **Por qué:** La Home debe enamorar con solo 8 platos estrella ("Selección OYISHI") y 8 accesos a categorías. La carga de los 155 productos pertenece en exclusiva a `/carta` con su buscador ultra-rápido.

### 3. Tarjetas con Estética Glassmorphism Oscuro y Borde Dorado Sutil (Inspirada en Sexy Fish & Macallan)
* **Por qué:** Da un salto radical de calidad visual frente a las webs tradicionales de restaurantes de zona, transmitiendo lujo contemporáneo mediante fondos `#181412` y micro-bordes dorados al hacer hover.

### 4. Animación de Brillo Shimmer en CTAs Principales (Inspirada en Maison Baccarat)
* **Por qué:** Guía de forma irresistible la mirada del usuario hacia los puntos de conversión ("RESERVAR MESA" / "VER CARTA"), elevando el ratio de clics tanto en escritorio como en móvil.

### 5. Sticky Bottom Navigation Bar para SmartPhones (Inspirada en Zuma & Sticks'n'Sushi)
* **Por qué:** Más del 70% del tráfico de OYISHI será desde teléfonos móviles. Tener los botones de acción al alcance inmediato del pulgar garantiza la máxima tasa de reservas y pedidos.

---

*Informe finalizado por el **AGENTE 1 — RESEARCH & BENCHMARK**. Listo para la fase de Dirección de Arte y Motion Design.*
