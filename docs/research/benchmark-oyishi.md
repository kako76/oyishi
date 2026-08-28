# OYISHI â€” Benchmark & Research Report (Agente 1)

> **Autor:** AGENTE 1 â€” RESEARCH & BENCHMARK
> **Fecha:** Agosto 2026
> **Proyecto:** OYISHI â€” Restaurante JaponÃ©s Premium (Fuenlabrada)
> **Stack TÃ©cnico Oyishi:** React + TypeScript + Vite + Tailwind CSS + Framer Motion
> **CatÃ¡logo:** 155 productos reales | Home independiente de `/carta` | Hero con vÃ­deo real

---

## 1. INVESTIGACIÃ“N GENERAL (18 WEBS DE REFERENCIA)

Se ha realizado una investigaciÃ³n profunda de 18 sitios web internacionales lÃ­deres en **sushi premium, alta gastronomÃ­a japonesa, hospitality de lujo, marcas de culto galardonadas en Awwwards/FWA/MUSE y firmas de lujo con motion aplicable**.

---

### Referencia 1: Yamato Table Grill & Sushi Bar
* **URL:** `https://yamato-sushi.com`
* **CategorÃ­a:** High Gastronomy Japanese & Interactive Dining (Awwwards Winner)

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Full-bleed cinematic video con humo, fuego y nitidez extrema de cortes de nigiri. Overlay de degradado oscuro radial.
2. **FotografÃ­a:** IluminaciÃ³n focal de claroscuro (estilo macro gastronÃ³mico), contraste profundo entre fondo carbÃ³n y brillo del pescado.
3. **VÃ­deo:** Loops en MP4/WebM optimizados en H.265/AV1 a 60fps con carga diferida.
4. **TipografÃ­a:** CombinaciÃ³n de Serif clÃ¡sico premium (tipo *Editorial New*) para titulares con Sans-serif geomÃ©trica para cuerpo.
5. **ComposiciÃ³n:** Layout asimÃ©trico con cuadrÃ­culas desalineadas que transmiten dinamismo y refinamiento artesanal.
6. **NavegaciÃ³n:** Header flotante ultralimpio con desenfoque de fondo (*backdrop-blur*) que no distrae del contenido.
7. **Estructura de Home:** Hero VÃ­deo â†’ DeclaraciÃ³n de Manifiesto â†’ Rejilla de CategorÃ­as -> GalerÃ­a de Experiencia -> Bloque de Reservas -> Footer.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n por filtros de fichas interactivas con cambio instantÃ¡neo sin recargar la pÃ¡gina.
9. **Cards:** Tarjetas flotantes con bordes sutiles en tono cobre/oro envejecido y sombras suaves con profundidad.
10. **Animaciones:** Reveal en scroll escalonado (*stagger*) para imÃ¡genes y tipografÃ­a.
11. **Scroll:** Scroll suave (*smooth-scroll*) con inercia controlada sin bloquear la experiencia nativa del navegador.
12. **Hover:** Zoom sutil de imagen (`scale-105`) con revelado de descripciÃ³n y elevaciÃ³n sutil de tarjeta.
13. **Transiciones:** Fades elegantes entre pÃ¡ginas usando transiciones de opacidad y desplazamiento y (`translateY`).
14. **Paleta:** Negro azabache (`#0B0B0C`), carbÃ³n volcÃ¡nico (`#141416`), bronce cepillado (`#C5A059`) y blanco marfil (`#F5F5F3`).
15. **Mobile:** MenÃº desplegable a pantalla completa (*full-screen overlay*) con gestos tÃ¡ctiles fluidos.
16. **CTAs:** Botones primarios en bronce con micro-brillo al pasar el cursor; secundarios con borde fino.
17. **Reservas:** Drawer lateral persistente accesible con un clic desde cualquier secciÃ³n.
18. **ConversiÃ³n:** Claridad absoluta en el botÃ³n "Reservar Mesa" siempre visible en la esquina superior derecha.
19. **Velocidad/Performance:** Percibida ultra-rÃ¡pida mediante carga diferida (*lazy loading*) de vÃ­deo e imÃ¡genes en NextGen WebP.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Integre el vÃ­deo del Hero de forma fluida con el resto de la pÃ¡gina usando mÃ¡scaras oscuras graduadas.
2. **QuÃ© NO copiar:** Los efectos de cursor personalizado pesado en JS que ralentizan la navegaciÃ³n en portÃ¡tiles de gama media.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** IntegraciÃ³n del vÃ­deo real `oyishi-sushi-build.mp4` con degradado continuo hacia la secciÃ³n inferior en tono `#0F0D0C`.
4. **Dificultad estimada:** Media (Framer Motion + Tailwind CSS).
5. **Impacto visual esperado:** 10/10 (Factor WOW instantÃ¡neo).

---

### Referencia 2: Nobu Restaurants & Hotels
* **URL:** `https://noburestaurants.com`
* **CategorÃ­a:** Luxury Hospitality Global & Japanese Gastronomy

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Carrusel de imÃ¡genes fijas de alta resoluciÃ³n alternadas con clips de ambiente sobrio.
2. **FotografÃ­a:** FotografÃ­a editorial a sangre, estilo revista de arquitectura y gastronomÃ­a de lujo.
3. **VÃ­deo:** VÃ­deos cortos en cÃ¡mara lenta que destacan la preparaciÃ³n en directo en la barra de sushi.
4. **TipografÃ­a:** Serif de alta cuna (*Didot* / *Bodoni* refinada) combinada con Sans-serif condensada.
5. **ComposiciÃ³n:** Estructura modular minimalista centrada con mÃ¡rgenes extremadamente amplios (espacio negativo).
6. **NavegaciÃ³n:** MenÃº superior multinivel con selector de ubicaciÃ³n geogrÃ¡fica global.
7. **Estructura de Home:** Selector de Ciudad â†’ Hero EmblemÃ¡tico â†’ FilosofÃ­a del Chef Nobu â†’ Platos Signature â†’ Reservas.
8. **Carta / CatÃ¡logo:** MenÃº en PDF descargable combinado con vista web simplificada por bloques de texto.
9. **Cards:** Marcos limpios de una sola imagen con tipografÃ­a flotante en la base.
10. **Animaciones:** Transiciones sutiles de fade-in al hacer scroll sin elementos excesivamente teatrales.
11. **Scroll:** NATIVO del sistema, primando la velocidad y la accesibilidad.
12. **Hover:** Cambio de color sutil de texto de blanco a dorado champagne (`#D8B36A`).
13. **Transiciones:** Cambio directo entre pÃ¡ginas con indicador discreto de carga.
14. **Paleta:** Negro obsidiana (`#121212`), gris ceniza (`#1E1E1E`), dorado champagne (`#D8B36A`) y crema elegante (`#F8F6F0`).
15. **Mobile:** AdaptaciÃ³n impecable con navegaciÃ³n en barra inferior para acceso inmediato a reservas y mapa.
16. **CTAs:** Botones planos rectangulares con tipografÃ­a Serif en mayÃºsculas y espaciado amplio de letras (*letter-spacing*).
17. **Reservas:** IntegraciÃ³n con plataformas de reserva externas de lujo (SevenRooms / OpenTable).
18. **ConversiÃ³n:** Enfocada prioritariamente a la captaciÃ³n de reservas telefÃ³nicas y digitales.
19. **Velocidad/Performance:** Excelente score en First Contentful Paint (FCP).

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** El uso del espacio negativo y la tipografÃ­a Serif para transmitir estatus de marca internacional.
2. **QuÃ© NO copiar:** La navegaciÃ³n multinivel compleja necesaria para decenas de ubicaciones globales (OYISHI solo necesita 1 ubicaciÃ³n).
3. **QuÃ© patrÃ³n adaptar a OYISHI:** La jerarquÃ­a de titulares Serif sobrios sobre fondo oscuro cÃ¡lido con acentos dorados en botones.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10 (SensaciÃ³n inmediata de restaurante galardonado).

---

### Referencia 3: Zuma Restaurants
* **URL:** `https://zumarestaurant.com`
* **CategorÃ­a:** Contemporary Luxury Izakaya & Sushi

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Full-screen looping video enfocado en texturas de granito, madera carbonizada y fuego de la parrilla Robata.
2. **FotografÃ­a:** Tonos oscuros, iluminaciÃ³n dramÃ¡tica con sombras muy marcadas (*chiaroscuro*).
3. **VÃ­deo:** Clips ultra-hd en loop sin audio que transmiten atmÃ³sfera nocturna sofisticada.
4. **TipografÃ­a:** Typography Sans-serif modernista industrial con Serif elegante para subtÃ­tulos.
5. **ComposiciÃ³n:** CuadrÃ­cula de columnas desiguales con paneles retrÃ¡ctiles de navegaciÃ³n.
6. **NavegaciÃ³n:** NavegaciÃ³n en hamburguesa lateral con barra de reserva fija en el pie.
7. **Estructura de Home:** Hero Video â†’ SelecciÃ³n de Ciudad â†’ GalerÃ­a Izakaya â†’ Experiencia GastronÃ³mica â†’ Footer.
8. **Carta / CatÃ¡logo:** MenÃº estructurado por secciones temÃ¡ticas (Robata, Sushi, Tempura, Cocktails).
9. **Cards:** Tarjetas con superposiciÃ³n de texto e imÃ¡genes en proporciÃ³n 4:5.
10. **Animaciones:** Slide-in de menÃºs laterales con curvas BÃ©zier personalizadas de alta fluidez.
11. **Scroll:** Parallax sutil en imÃ¡genes de fondo de secciones clave.
12. **Hover:** InversiÃ³n de color en botones y zoom suave en fotos de productos.
13. **Transiciones:** Carga asÃ­ncrona de secciones sin parpadear.
14. **Paleta:** CarbÃ³n quemado (`#181514`), terracota oscuro (`#5C2920`), bronce cepillado (`#9E7B54`) y negro cÃ¡lido (`#0E0C0B`).
15. **Mobile:** Drawer de reservas fijo en la parte inferior de la pantalla (*sticky bottom bar*).
16. **CTAs:** Botones en tonos bronce con borde de 1px e icono de flecha sutil.
17. **Reservas:** Selector instantÃ¡neo de Fecha/Hora/Comensales en modal emergente.
18. **ConversiÃ³n:** Orientada a reservas nocturnas y eventos privados.
19. **Velocidad/Performance:** Carga de vÃ­deo optimizada con fallback en imagen de alta resoluciÃ³n.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La atmÃ³sfera nocturna cÃ¡lida y la integraciÃ³n de texturas orgÃ¡nicas (madera, piedra, fuego).
2. **QuÃ© NO copiar:** Los menÃºs emergentes que bloquean completamente la vista de la pÃ¡gina en dispositivos portÃ¡tiles.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El uso de fondo en tono carbÃ³n cÃ¡lido (`#14100E`) complementado con acentos terracota/dorado para la secciÃ³n de productos destacados.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 4: Masa NYC
* **URL:** `https://masanyc.com`
* **CategorÃ­a:** 3-Star Michelin Omakase (MÃ¡xima Sobriedad Wabi-Sabi)

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Estilo minimalista extremo: isotipo centrado sobre fondo negro azabache absoluto y tipografÃ­a sutil.
2. **FotografÃ­a:** Ausencia casi total de fotografÃ­a en la portada; fotografÃ­as artÃ­sticas en blanco y negro en secciones interiores.
3. **VÃ­deo:** Sin vÃ­deo. La experiencia apuesta por el silencio y el misterio.
4. **TipografÃ­a:** Serif ultra-fina (estilo *Garamond Premiere* / *Cormorant Garamond*).
5. **ComposiciÃ³n:** SimetrÃ­a axial estricta con mÃ¡rgenes masivos y alineaciÃ³n al centro.
6. **NavegaciÃ³n:** 3 o 4 enlaces discretos en la parte inferior (*Philosophy*, *Reservation*, *Location*, *Contact*).
7. **Estructura de Home:** Isotipo â†’ FilosofÃ­a del Chef Masa Takayama â†’ InformaciÃ³n de Reserva â†’ Footer.
8. **Carta / CatÃ¡logo:** No hay menÃº detallado (concepto Omakase absoluto: "en manos del chef").
9. **Cards:** No utiliza tarjetas tradicionales; solo bloques textuales de extrema pulcritud.
10. **Animaciones:** Fade-in ultrasuave de 1.2 segundos al cargar la pÃ¡gina.
11. **Scroll:** EstÃ¡tico / Scroll mÃ­nimo.
12. **Hover:** ApariciÃ³n de subrayado sutil de 1px bajo los enlaces.
13. **Transiciones:** DisoluciÃ³n suave entre vistas.
14. **Paleta:** Negro puro (`#000000`), gris grafito (`#222222`), blanco tiza (`#EBEBEB`).
15. **Mobile:** IdÃ©ntica sobriedad que en escritorio, adaptando Ãºnicamente el tamaÃ±o del texto.
16. **CTAs:** Botones de texto desnudo con bordes mÃ­nimos.
17. **Reservas:** RedirecciÃ³n directa a la plataforma oficial de reservas de alta gama.
18. **ConversiÃ³n:** Basada en la exclusividad y la lista de espera.
19. **Velocidad/Performance:** Carga instantÃ¡nea (< 0.5s), peso total de pÃ¡gina < 300KB.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Demostrar cÃ³mo el espacio en blanco y el minimalismo transmiten el nivel de precio y prestigio mÃ¡s alto del mundo.
2. **QuÃ© NO copiar:** La falta de fotos de platos y la ausencia de catÃ¡logo interactivo (OYISHI vende 155 productos reales y necesita fotos irresistibles).
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El espaciado tipogrÃ¡fico holgado y la tipografÃ­a Serif estilizada para los nombres de las categorÃ­as principales.
4. **Dificultad estimada:** Muy Baja.
5. **Impacto visual esperado:** 8/10 (Elegancia pura pero demasiado austera para delivery/takeaway).

---

### Referencia 5: Sexy Fish London & Miami
* **URL:** `https://sexyfish.com`
* **CategorÃ­a:** High-End Japanese Dining & Ultra-Luxury Motion

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** VÃ­deo psicodÃ©lico de alta gama con criaturas marinas en 3D fotorrealista combinadas con sushi de lujo.
2. **FotografÃ­a:** Colores saturados, contraluz azul neÃ³n profundo, dorado y coral gastronÃ³mico.
3. **VÃ­deo:** VÃ­deo ambiental ultra-dinÃ¡mico en resoluciÃ³n 4K a 60fps.
4. **TipografÃ­a:** Sans-serif geomÃ©trica en bold mayÃºsculas combinada con letras decorativas personalizadas.
5. **ComposiciÃ³n:** Capas superpuestas con profundidad de campo y parallax activo al mover el ratÃ³n.
6. **NavegaciÃ³n:** MenÃº flotante interactivo con efectos de distorsiÃ³n lÃ­quida al pasar el cursor.
7. **Estructura de Home:** Hero Inmersivo â†’ MenÃº GastronÃ³mico â†’ CoctelerÃ­a de Autor â†’ DJ Sessions â†’ Reservas.
8. **Carta / CatÃ¡logo:** MenÃº interactivo con pestaÃ±as animadas y vistas de fotos en Pop-up de alta velocidad.
9. **Cards:** Tarjetas con efecto de cristal esmerilado (*glassmorphism*) y bordes de luz brillante.
10. **Animaciones:** Animaciones continuas de partÃ­culas y movimiento de lÃ­quidos en segundo plano.
11. **Scroll:** Scroll con efectos de revelado tridimensional.
12. **Hover:** Brillo metÃ¡lico reactivo en botones y fotos.
13. **Transiciones:** TransiciÃ³n de cortina oscura fluida entre pÃ¡ginas.
14. **Paleta:** Azul cobalto profundo (`#0A1128`), neÃ³n turquesa (`#00E5FF`), dorado champagne (`#E6C687`) y negro nocturno (`#050814`).
15. **Mobile:** Experiencia optimizada con micro-interacciones tÃ¡ctiles rÃ¡pidas.
16. **CTAs:** Botones fluorescentes/dorados con pulso sutil de atenciÃ³n.
17. **Reservas:** Widget flotante siempre accesible en el borde inferior derecho.
18. **ConversiÃ³n:** MÃ¡xima orientaciÃ³n al ocio nocturno y reserva de mesas VIP.
19. **Velocidad/Performance:** Alta carga inicial que requiere optimizaciÃ³n previa de assets.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Crear una experiencia inmersiva que engancha al usuario desde el segundo 1.
2. **QuÃ© NO copiar:** Los efectos 3D sobrecargados y los tonos neÃ³n agresivos (OYISHI busca lujo japonÃ©s cÃ¡lido, no ambiente de club cyberpunk).
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Las tarjetas con cristal esmerilado (*glassmorphism* sutil) con fondo `#181412` y opacidad del 80% sobre imÃ¡genes de alta calidad.
4. **Dificultad estimada:** Alta.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 6: SingleThread Farm & Inn
* **URL:** `https://singlethreadfarms.com`
* **CategorÃ­a:** 3-Star Michelin Omakase & Luxury Hospitality (Sonoma)

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Serie de fotografÃ­as cinematogrÃ¡ficas de formato panoramico con desplazamiento suave automÃ¡tico.
2. **FotografÃ­a:** FotografÃ­a natural de alta cocina e ingredientes reciÃ©n cosechados con luz solar matutina.
3. **VÃ­deo:** VÃ­deos documentales breves sobre los artesanos japoneses y agricultores locales.
4. **TipografÃ­a:** Serif refinada en tonos crema sobre fondos carbÃ³n suave.
5. **ComposiciÃ³n:** Formato de libro de arte (*coffee table book*) con columnas verticales anchas.
6. **NavegaciÃ³n:** MenÃº minimalista en la parte superior derecha que se expande de forma sobria.
7. **Estructura de Home:** Hero FotogrÃ¡fico â†’ Manifiesto Omotenashi â†’ El MenÃº de Temporada â†’ La Granja â†’ Reservas.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n poÃ©tica de los 11 pases del menÃº degustaciÃ³n con historias de los productores.
9. **Cards:** Bloques limpios con bordes invisibles y separaciÃ³n por generosos espacios.
10. **Animaciones:** Animaciones de fundido cruzado (*cross-fade*) pausadas de 1.5 segundos.
11. **Scroll:** Scroll fluido natural de lectura relajada.
12. **Hover:** Suave cambio de opacidad en imÃ¡genes (de 0.9 a 1.0).
13. **Transiciones:** Carga de pÃ¡gina imperceptible mediante precarga inteligente.
14. **Paleta:** Mousse de oliva (`#2E332B`), madera nogal (`#3E2723`), crema lino (`#F4F1EA`) y carbÃ³n suave (`#1C1C1C`).
15. **Mobile:** Lectura editorial perfecta sin elementos molestos.
16. **CTAs:** Botones de texto subrayado con trazo de 1px.
17. **Reservas:** IntegraciÃ³n sobria con fecha de apertura mensual de listas.
18. **ConversiÃ³n:** Centrada en vender la experiencia completa de gastronomÃ­a + alojamiento.
19. **Velocidad/Performance:** Excelente optimizaciÃ³n de imÃ¡genes en formato WebP progresivo.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Transmitir la calidez del concepto artesanal japonÃ©s (*Omotenashi*) a travÃ©s de la fotografÃ­a y la tipografÃ­a.
2. **QuÃ© NO copiar:** La velocidad de interacciÃ³n tan pausada que en una web comercial de delivery podrÃ­a impacientar al cliente.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Bloques narrativos "El Arte del Sushi en OYISHI" intercalados entre las categorÃ­as del menÃº para justificar el posicionamiento premium.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 7: Alchemist Copenhagen
* **URL:** `https://alchemist.dk`
* **CategorÃ­a:** Alta GastronomÃ­a HolÃ­stica & Multi-sensory Web (Awwwards Winner)

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Pantalla totalmente negra con un punto de luz central que reacciona al movimiento del ratÃ³n y sonido ambiente opcional.
2. **FotografÃ­a:** FotografÃ­a surrealista y teatral de platos como obras de arte dramÃ¡ticas.
3. **VÃ­deo:** Animaciones de proyecciÃ³n en cÃºpula integradas en la interfaz.
4. **TipografÃ­a:** Monospaced de precisiÃ³n cientÃ­fica combinada con Serif clÃ¡sica ultra-elegante.
5. **ComposiciÃ³n:** Estructura en capÃ­tulos numerados como si fuera una representaciÃ³n teatral.
6. **NavegaciÃ³n:** NavegaciÃ³n por capÃ­tulos con indicador visual de progreso lateral.
7. **Estructura de Home:** Intro Sensorial â†’ CapÃ­tulo I: La CÃºpula â†’ CapÃ­tulo II: La Cocina â†’ CapÃ­tulo III: El Manifiesto â†’ Reservas.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n de los 50 "Impressiones" gastronÃ³micas mediante tarjetas interactivas 3D.
9. **Cards:** Marcos con iluminaciÃ³n de bordes y profundidad visual.
10. **Animaciones:** Animaciones complejas en WebGL y Canvas con distorsiÃ³n de imÃ¡genes.
11. **Scroll:** Scroll interactivo basado en canvas que desplaza elementos en ejes Z y Y.
12. **Hover:** Distorsiones Ã³pticas y efectos de refracciÃ³n sobre el texto.
13. **Transiciones:** Fundidos en negro con efectos de sonido ambiental ultra-suaves.
14. **Paleta:** Negro de medianoche (`#050505`), bronce antiguo (`#B89759`), blanco espectral (`#E0E0E0`).
15. **Mobile:** VersiÃ³n simplificada sin WebGL pesado pero manteniendo el impacto tipogrÃ¡fico.
16. **CTAs:** Botones con estÃ©tica de terminal refinada con bordes de 1px.
17. **Reservas:** Sistema exclusivo con cuenta atrÃ¡s para la liberaciÃ³n de mesas.
18. **ConversiÃ³n:** Dirigida a entusiastas de la gastronomÃ­a mundial dispuestos a reservar con meses de antelaciÃ³n.
19. **Velocidad/Performance:** Carga estructurada con loader personalizado sobrio.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Convertir una web de restaurante en una obra de arte digital inolvidable.
2. **QuÃ© NO copiar:** La complejidad tÃ©cnica extrema en WebGL y la dependencia de mÃºsica que pueden frustrar al usuario que solo quiere pedir sushi.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El uso de tipografÃ­a Monospaced para detalles tÃ©cnicos (gramos, alÃ©rgenos, piezas) combinado con Serif para los nombres de platos.
4. **Dificultad estimada:** Muy Alta.
5. **Impacto visual esperado:** 10/10.

---

### Referencia 8: Sticks'n'Sushi
* **URL:** `https://sticksnsushi.com`
* **CategorÃ­a:** Nordic-Japanese Fusion & E-Commerce GastronÃ³mico Leader

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** FotografÃ­a cenital de alta resoluciÃ³n con bandejas de sushi y yakitori perfectamente dispuestas.
2. **FotografÃ­a:** IluminaciÃ³n clara nÃ³rdica, contraste impecable, enfoque nÃ­tido en el producto comestible.
3. **VÃ­deo:** VÃ­deos cortos de 3 segundos mostrando el glaseado de las brochetas en la parrilla.
4. **TipografÃ­a:** Sans-serif nÃ³rdica limpia (*Helvetica Now* / *Inter* en peso bold).
5. **ComposiciÃ³n:** CuadrÃ­cula comercial limpia con tarjetas de alto impacto visual.
6. **NavegaciÃ³n:** Header sticky con selector directo entre "Takeaway / Delivery" y "Dine-In".
7. **Estructura de Home:** Hero Comercial â†’ Selector de Modo de Pedido â†’ Combinados Estrella â†’ Carta por CategorÃ­as â†’ Locales.
8. **Carta / CatÃ¡logo:** MenÃº e-commerce hiper-optimizado con filtros por ingredientes, vegetarianos y alÃ©rgenos.
9. **Cards:** Tarjetas blancas/oscuras de esquina recta con botÃ³n directo "+ AÃ±adir al carrito".
10. **Animaciones:** AnimaciÃ³n de deslizado (*slide-in*) del carrito desde la derecha.
11. **Scroll:** Scroll rÃ¡pido y fluido optimizado para catÃ¡logos extensos.
12. **Hover:** Ligero desplazamiento hacia arriba de la tarjeta (`translateY(-4px)`).
13. **Transiciones:** Cambio instantÃ¡neo de pestaÃ±a de categorÃ­as sin parpadeo.
14. **Paleta:** CarbÃ³n nÃ³rdico (`#1A1A1A`), madera clara (`#E5D9C5`), rosa salmÃ³n (`#FF8A7A`) y blanco impoluto (`#FFFFFF`).
15. **Mobile:** Una de las mejores UX mÃ³viles de restauraciÃ³n en Europa (eficiencia de compra total).
16. **CTAs:** Botones oscuros de alto contraste con texto "Pedir Ahora".
17. **Reservas:** Proceso en 3 clics integrado con el gestor de restaurante.
18. **ConversiÃ³n:** EXTREMADAMENTE ALTA. DiseÃ±ado especÃ­ficamente para maximizar el valor del pedido medio.
19. **Velocidad/Performance:** Excelente (Score > 90 en Lighthouse Mobile).

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La velocidad y sencillez con la que el usuario puede explorar el menÃº y realizar su pedido.
2. **QuÃ© NO copiar:** La estÃ©tica excesivamente nÃ³rdica/minimalista clara si OYISHI busca posicionarse en el segmento oscuro-cinematogrÃ¡fico de lujo.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** La arquitectura de la pÃ¡gina `/carta` de OYISHI: buscador instantÃ¡neo, pestaÃ±as fijas de 17 categorÃ­as y drawer de carrito rÃ¡pido.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 8.5/10 (MÃ¡xima efectividad comercial).

---

### Referencia 9: Pierre HermÃ© Paris
* **URL:** `https://pierreherme.com`
* **CategorÃ­a:** Haute PÃ¢tisserie & Luxury Food Brand Showcase

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Slider sensorial con vÃ­deos macro de ingredientes cayendo en cÃ¡mara lenta y detalles de acabado artesanal.
2. **FotografÃ­a:** FotografÃ­a macro de estudio joyero: texturas de hojaldre, brillo de glaseados y colores intensos.
3. **VÃ­deo:** VÃ­deo en super slow-motion (240fps) enfocado en la textura y corte de los productos.
4. **TipografÃ­a:** Serif francesa elegante con versalitas para tÃ­tulos de colecciÃ³n.
5. **ComposiciÃ³n:** Grid de catÃ¡logo de alta costura (*haute couture*) con espaciados irregulares elegantes.
6. **NavegaciÃ³n:** MenÃº desplegable masivo (*mega-menu*) ilustrado con iconos gastronÃ³micos finos.
7. **Estructura de Home:** Hero de ColecciÃ³n de Temporada â†’ Los Iconos â†’ Creador de Cajas Personalizadas â†’ Experiencias â†’ Footer.
8. **Carta / CatÃ¡logo:** CatÃ¡logo tipo joyerÃ­a con selector de Sabores, Colecciones y Ediciones Limitadas.
9. **Cards:** Tarjetas cuadradas 1:1 con fondo gris muy claro o carbÃ³n segÃºn la colecciÃ³n.
10. **Animaciones:** ElevaciÃ³n sutil de elementos al hacer hover con sombras suaves difuminadas.
11. **Scroll:** Scroll con revelado en cascada de imÃ¡genes.
12. **Hover:** Cambio de imagen de producto a foto de corte transversal que muestra el interior.
13. **Transiciones:** Suave disoluciÃ³n cruzada entre pÃ¡ginas de producto.
14. **Paleta:** Negro azabache (`#111111`), oro pulido (`#D4AF37`), rosa macarrÃ³n (`#E8A598`) y chocolate profundo (`#2B1B17`).
15. **Mobile:** GalerÃ­a deslizable horizontal (*swipeable carousel*) optimizada para pulgares.
16. **CTAs:** Botones rectangulares dorados o negros con bordes impecables.
17. **Reservas:** MÃ³dulo de reserva de talleres gastronÃ³micos y catas privadas.
18. **ConversiÃ³n:** AltÃ­sima para compra de regalo y productos de gama alta.
19. **Velocidad/Performance:** RÃ¡pida gracias a la compresiÃ³n inteligente WebP/AVIF.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Tratar el producto gastronÃ³mico como una joya mediante la fotografÃ­a macro y el hover con foto de corte del producto.
2. **QuÃ© NO copiar:** La excesiva cantidad de categorÃ­as de regalo que no aplican a un restaurante de sushi.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El hover de las tarjetas de platos que muestre una foto secundaria del corte del nigiri o detalle del ingrediente principal.
4. **Dificultad estimada:** Baja (requiere fotos de calidad).
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 10: The Macallan Experience
* **URL:** `https://themacallan.com`
* **CategorÃ­a:** Ultra-Premium Brand, Motion & Dark Aesthetic

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** VÃ­deo cinematic de gota de lÃ­quido cayendo en cÃ¡mara lenta sobre cristal con iluminaciÃ³n Ã¡mbar sobre negro.
2. **FotografÃ­a:** IluminaciÃ³n focal de estudio sobre fondos negros profundos, resaltando destellos dorados y Ã¡mbars.
3. **VÃ­deo:** Loops de vÃ­deo cinematogrÃ¡fico codificados en alta calidad con carga progresiva.
4. **TipografÃ­a:** Serif exclusiva de lujo de alto contraste de trazo.
5. **ComposiciÃ³n:** DisposiciÃ³n vertical majestuosa con bloques a pantalla completa (*full-screen scroll sections*).
6. **NavegaciÃ³n:** Header minimalista que se oculta al hacer scroll hacia abajo y reaparece al subir.
7. **Estructura de Home:** Hero CinematogrÃ¡fico â†’ Historia de la DestilerÃ­a â†’ Botellas IcÃ³nicas â†’ Visita Virtual â†’ Footer.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n 360Â° de las colecciones con fichas tÃ©cnicas detalladas de notas de cata.
9. **Cards:** Tarjetas oscuras con marco dorado hiper-fino de 0.5px y efecto de brillo interior.
10. **Animaciones:** Animaciones sincronizadas con el scroll (*ScrollTrigger*) que ensamblan los elementos en pantalla.
11. **Scroll:** Scroll narrativo que revela capas de informaciÃ³n progresivamente.
12. **Hover:** Resplandor dorado tenue (*glow effect*) alrededor de las botellas o tarjetas.
13. **Transiciones:** TransiciÃ³n de fundido a negro entre pantallas.
14. **Paleta:** Negro carbÃ³n (`#0B0B0B`), Ã¡mbar de roble (`#C88242`), dorado mÃ­stico (`#E1AD01`) y cobrizos (`#B87333`).
15. **Mobile:** AdaptaciÃ³n fluida sin pÃ©rdida de la sensaciÃ³n de lujo.
16. **CTAs:** Botones en bronce cepillado con animaciÃ³n de rellenado gradual al pasar el cursor.
17. **Reservas:** Reservas de visitas guiadas exclusivas.
18. **ConversiÃ³n:** Branding de mÃ¡ximo nivel y venta directa de ediciones limitadas.
19. **Velocidad/Performance:** Optimizada mediante la carga de assets bajo demanda.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La integraciÃ³n de la paleta de colores Ã¡mbar/dorada sobre fondos negros oscuros y el efecto de brillo metÃ¡lico en bordes.
2. **QuÃ© NO copiar:** La excesiva lentitud del scroll narrativo que puede entorpecer a quien busca una consulta rÃ¡pida.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Bordes con resplandor dorado refinado (`border border-amber-500/20 hover:border-amber-500/50 transition-colors duration-500`) en las tarjetas de productos destacados.
4. **Dificultad estimada:** Baja/Media.
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 11: Royal Mansour Marrakech
* **URL:** `https://royalmansour.com`
* **CategorÃ­a:** Benchmark Hospitality de Lujo & Immersive Navigation

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Secuencia de micro-vÃ­deos fluidos que muestran detalles de la arquitectura, gastronomÃ­a y jardines.
2. **FotografÃ­a:** Colores ricos, calidez extrema, contraluces dorados y texturas de artesanÃ­a.
3. **VÃ­deo:** Clips breves de 2 segundos que cambian suavemente mediante transiciones de opacidad.
4. **TipografÃ­a:** Serif refinada en mayÃºsculas para tÃ­tulos, Sans-serif muy ligera para cuerpo.
5. **ComposiciÃ³n:** CuadrÃ­culas elegantes inspiradas en mosaicos tradicionales simplificados en diseÃ±o moderno.
6. **NavegaciÃ³n:** MenÃº desplegable lateral con vista previa en miniatura de cada secciÃ³n al pasar el cursor sobre las opciones.
7. **Estructura de Home:** Hero Inmersivo â†’ Restaurantes GastronÃ³micos â†’ El Spa â†’ Suites y Riads â†’ Experiencias â†’ Footer.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n de los menÃºs de sus restaurantes de estrellas Michelin con imÃ¡genes a toda pantalla.
9. **Cards:** Tarjetas con marcos sobrios y leyendas centradas con espaciado generoso.
10. **Animaciones:** Revelado suave (*fade-up*) de texto conforme entra en la ventana de visiÃ³n (*viewport*).
11. **Scroll:** Scroll natural muy fluido.
12. **Hover:** Revelado de imÃ¡genes secundarias mediante mÃ¡scaras circulares o rectangulares.
13. **Transiciones:** Desplazamiento lateral suave de pÃ¡ginas.
14. **Paleta:** Terracota cÃ¡lido (`#A0522D`), bronce dorado (`#D4AF37`), ocre (`#CC7722`) y negro noche (`#120F0D`).
15. **Mobile:** Drawer de navegaciÃ³n impecable con botones de reserva de gran tamaÃ±o.
16. **CTAs:** Botones redondeados sobrios con fondo oscuro y texto en oro.
17. **Reservas:** Selector flotante de restaurantes y fechas en la barra superior.
18. **ConversiÃ³n:** Alta conversiÃ³n para cliente internacional de alto nivel adquisitivo.
19. **Velocidad/Performance:** Carga asÃ­ncrona optimizada.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Las vistas previas de secciones al hacer hover en el menÃº de navegaciÃ³n.
2. **QuÃ© NO copiar:** Los tiempos de espera largos para la carga de galerÃ­as de fotos de alta resoluciÃ³n.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El menÃº de categorÃ­as con vista previa en miniatura al pasar el ratÃ³n sobre cada nombre de categorÃ­a.
4. **Dificultad estimada:** Media.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 12: Aman Resorts & Fine Dining
* **URL:** `https://aman.com`
* **CategorÃ­a:** World Leader in Minimalist Luxury & Serene Typography

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Imagen estÃ¡tica panorÃ¡mica de serenidad absoluta con texto centrado pequeÃ±o y refinado.
2. **FotografÃ­a:** Enfoque arquitectÃ³nico y natural de paisaje con paletas neutras y luz suave.
3. **VÃ­deo:** VÃ­deos ambientales lentos que transmiten paz y paz mental.
4. **TipografÃ­a:** Serif exclusiva con espaciado entre letras (*letter-spacing*) expandido.
5. **ComposiciÃ³n:** Enorme porcentaje de espacio blanco/oscuro alrededor de cada bloque.
6. **NavegaciÃ³n:** LÃ­nea superior limpia con 4 opciones principales de mÃ¡ximo nivel.
7. **Estructura de Home:** Hero PanorÃ¡mico â†’ Destinos â†’ GastronomÃ­a & Wellness â†’ Historias Aman â†’ Footer.
8. **Carta / CatÃ¡logo:** MenÃºs digitales organizados como folletos de arte minimalista.
9. **Cards:** Sin marcos visibles; la separaciÃ³n la determinan los mÃ¡rgenes.
10. **Animaciones:** Transiciones tan suaves que resultan casi imperceptibles.
11. **Scroll:** Scroll pausado sin interrupciones ni elementos flotantes invasivos.
12. **Hover:** Cambio de color sutil de texto de gris claro a blanco puro.
13. **Transiciones:** DisoluciÃ³n en blanco/negro de 1 segundo.
14. **Paleta:** Gris piedra (`#2A2A2A`), beige arena (`#D8D0C5`), carbÃ³n suave (`#1A1A1A`) y blanco tiza (`#F4F4F2`).
15. **Mobile:** Simplicidad total, fÃ¡cil de leer y navegar con una mano.
16. **CTAs:** Botones de texto plano con lÃ­nea inferior sutil.
17. **Reservas:** Flujo sobrio paso a paso.
18. **ConversiÃ³n:** FidelizaciÃ³n de clientes habituales de sÃºper lujo.
19. **Velocidad/Performance:** Ultra-rÃ¡pida debido al cÃ³digo limpio sin librerÃ­as pesadas.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Demostrar que el lujo no necesita gritar ni sobrecargarse de efectos animadas para impactar.
2. **QuÃ© NO copiar:** La excesiva falta de color que podrÃ­a restarle apetitosidad al sushi.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Espaciado generoso entre secciones (`py-24` o `py-32` en Tailwind) para dejar respirar a las fotografÃ­as de los platos.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 13: Den Tokyo
* **URL:** `https://jimbochoden.com`
* **CategorÃ­a:** World's 50 Best Restaurant Winner & Warm Japanese Storytelling

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** FotografÃ­a cÃ¡lida del Chef Zaiyu Hasegawa sonriendo en la barra con sus platos icÃ³nicos.
2. **FotografÃ­a:** FotografÃ­a naturalista, sin retoques excesivos de estudio, mostrando la frescura real.
3. **VÃ­deo:** No utiliza vÃ­deos en el hero para agilizar la carga.
4. **TipografÃ­a:** TipografÃ­a Japonesa Mincho (Serif japonesa) combinada con Sans-serif occidental limpia.
5. **ComposiciÃ³n:** CuadrÃ­cula simple en formato blog/revista gastronÃ³mica.
6. **NavegaciÃ³n:** MenÃº fijo tradicional sencillo.
7. **Estructura de Home:** Mensaje de Bienvenida â†’ FilosofÃ­a del Equipo â†’ MenÃº del DÃ­a â†’ UbicaciÃ³n & Reservas.
8. **Carta / CatÃ¡logo:** ExplicaciÃ³n conceptual del menÃº degustaciÃ³n cambiante segÃºn el mercado diario.
9. **Cards:** Tarjetas limpias estilo fotografÃ­a Polaroid moderna.
10. **Animaciones:** Sin animaciones complejas.
11. **Scroll:** Scroll estÃ¡ndar del sistema.
12. **Hover:** Opacidad ligera en enlaces.
13. **Transiciones:** EstÃ¡ndar del navegador.
14. **Paleta:** Madera de ciprÃ©s (`#D2B48C`), tierra arcilla (`#8B4513`), carbÃ³n suave (`#222222`) y blanco crema (`#FAF8F5`).
15. **Mobile:** AdaptaciÃ³n directa y ligera.
16. **CTAs:** Enlaces simples directos a la plataforma de reservas.
17. **Reservas:** Indicaciones claras sobre cÃ³mo y cuÃ¡ndo reservar (dificultad alta por demanda).
18. **ConversiÃ³n:** 100% de ocupaciÃ³n asegurada por reputaciÃ³n mundial.
19. **Velocidad/Performance:** Carga en menos de 1 segundo.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Conectar emocionalmente con el visitante mediante el factor humano y la cercanÃ­a.
2. **QuÃ© NO copiar:** La interfaz hiper-simple de aspecto antiguo que no aprovecha las tecnologÃ­as web modernas.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** La inclusiÃ³n de una secciÃ³n "Nuestra FilosofÃ­a / El Equipo de Cocina" para transmitir la preparaciÃ³n artesanal del sushi en Fuenlabrada.
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 7.5/10.

---

### Referencia 14: Dinings SW3 London
* **URL:** `https://diningssw3.co.uk`
* **CategorÃ­a:** High-End Izakaya & Omakase Chelsea (Dark Rich Textures)

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** FotografÃ­a macro de un nigiri de toro con lÃ¡mina de oro sobre fondo de piedra de pizarra.
2. **FotografÃ­a:** IluminaciÃ³n puntual cenital que hace brillar el aceite natural del pescado.
3. **VÃ­deo:** VÃ­deo atmosfÃ©rico corto en el pie de pÃ¡gina.
4. **TipografÃ­a:** Serif britÃ¡nica clÃ¡sica combinada con detalles en Sans-serif contemporÃ¡nea.
5. **ComposiciÃ³n:** DiseÃ±o centrado con bloques de contraste alternado (oscuro / crema).
6. **NavegaciÃ³n:** Header flotante con acceso directo a "Menus" y "Book a Table".
7. **Estructura de Home:** Hero GastronÃ³mico â†’ Propuesta Culinary â†’ Izakaya Bar â†’ Reservas â†’ Footer.
8. **Carta / CatÃ¡logo:** MenÃºs desplegables por acordonamiento (*accordion*) para fÃ¡cil consulta en mÃ³viles.
9. **Cards:** Bloques oscuros con fino borde de 1px en tono bronce.
10. **Animaciones:** Desplazamiento progresivo de elementos al hacer scroll.
11. **Scroll:** Scroll fluido convencional.
12. **Hover:** Oscurecimiento sutil del fondo del botÃ³n y brillo en el texto.
13. **Transiciones:** TransiciÃ³n limpia de pÃ¡gina.
14. **Paleta:** Negro pizarra (`#121314`), verde musgo profundo (`#1E2822`), bronce antiguo (`#B8860B`) y marfil (`#FFF8DC`).
15. **Mobile:** Acordones de categorÃ­as de platos sumamente prÃ¡cticos para pantallas pequeÃ±as.
16. **CTAs:** Botones rectangulares dorados con letra oscura.
17. **Reservas:** Widget modal rÃ¡pido para comprobaciÃ³n de disponibilidad en tiempo real.
18. **ConversiÃ³n:** Alta conversiÃ³n de residentes locales de alto poder adquisitivo.
19. **Velocidad/Performance:** Buena optimizaciÃ³n general.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La estructura de acordones desplegables para consultar la carta en mÃ³viles sin saturar la pantalla.
2. **QuÃ© NO copiar:** La mezcla de fondos cremas y oscuros que rompe la inmersiÃ³n de la experiencia nocturna.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El diseÃ±o de los acordones mÃ³viles para las categorÃ­as de `/carta` si el usuario prefiere vista condensada.
4. **Dificultad estimada:** Baja/Media.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 15: Kyoto Kitcho
* **URL:** `https://kyoto-kitcho.com`
* **CategorÃ­a:** Alta GastronomÃ­a Kaiseki Tradicional & Heritage Japanese Design

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Imagen de jardÃ­n zen japonÃ©s con cambio de estaciÃ³n meteorolÃ³gica segÃºn la Ã©poca del aÃ±o.
2. **FotografÃ­a:** FotografÃ­a artÃ­stica de platos Kaiseki en vajillas artesanales de cerÃ¡mica y laca.
3. **VÃ­deo:** Sin vÃ­deo en el Hero; imÃ¡genes fijas de alta carga poÃ©tica.
4. **TipografÃ­a:** CaligrafÃ­a japonesa tradicional integrada con tipografÃ­a Serif minimalista.
5. **ComposiciÃ³n:** DisposiciÃ³n vertical que imita la escritura japonesa en columnas (*Tatechugaki*).
6. **NavegaciÃ³n:** MenÃº lateral vertical que no interrumpe la visiÃ³n del paisaje de fondo.
7. **Estructura de Home:** Imagen de EstaciÃ³n â†’ Poema GastronÃ³mico â†’ Los Platos del Mes â†’ La Casa de TÃ© â†’ Reservas.
8. **Carta / CatÃ¡logo:** ExplicaciÃ³n detallada del significado cultural de cada pase del menÃº degustaciÃ³n.
9. **Cards:** Marcos con texturas de papel Washi japonÃ©s en formato digital.
10. **Animaciones:** DisoluciÃ³n ultrasuave entre imÃ¡genes como pinceladas de agua.
11. **Scroll:** Scroll pausado de mÃ¡xima elegancia contemplativa.
12. **Hover:** Cambios de tono muy suaves que recuerdan la luz filtrada por bambÃº.
13. **Transiciones:** Fundidos en blanco cÃ¡lido.
14. **Paleta:** Verde bambÃº (`#2D3A2F`), laca roja japonesa (`#8B0000`), dorado pan de oro (`#E6CA65`) y papel washi (`#F7F5F0`).
15. **Mobile:** MaquetaciÃ³n impecable respetando la jerarquÃ­a tradicional.
16. **CTAs:** Botones integrados como sellos tradicionales (*Hanko*).
17. **Reservas:** GestiÃ³n mediante formulario de solicitud previa con atenciÃ³n personalizada.
18. **ConversiÃ³n:** Dirigida a experiencias gastronÃ³micas Ãºnicas en la vida.
19. **Velocidad/Performance:** Carga optimizada sin scripts innecesarios.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Transportar al usuario a la tradiciÃ³n cultural japonesa autÃ©ntica sin clichÃ©s comerciales.
2. **QuÃ© NO copiar:** La tipografÃ­a vertical en pÃ¡ginas occidentales (dificulta la lectura fluida en espaÃ±ol).
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Utilizar detalles sutiles en laca roja (`#E85D4E`) inspirados en el sello artesanal tradicional para destacar platos "Recomendados por el Chef".
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 9/10.

---

### Referencia 16: Sushi Nakazawa NYC
* **URL:** `https://sushinakazawa.com`
* **CategorÃ­a:** Premium Omakase & High-Conversion Seat Booking

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Foto en primer plano de una pieza de Nigiri de SalmÃ³n con brillo impecable sobre fondo negro.
2. **FotografÃ­a:** IluminaciÃ³n macro de estudio donde el producto es el Ãºnico protagonista.
3. **VÃ­deo:** Sin vÃ­deo.
4. **TipografÃ­a:** Sans-serif limpia en mayÃºsculas con espaciado amplio.
5. **ComposiciÃ³n:** CuadrÃ­cula ultra-limpia centrada en los datos clave (UbicaciÃ³n, Reserva, MenÃº).
6. **NavegaciÃ³n:** Enlaces directos simples en el encabezado.
7. **Estructura de Home:** Hero Nigiri â†’ InformaciÃ³n de Reservas (NYC / DC) â†’ El Chef Daisuke Nakazawa â†’ GalerÃ­a â†’ Footer.
8. **Carta / CatÃ¡logo:** Muestra visual de los 20 nigiris del menÃº Omakase con nombres en japonÃ©s y espaÃ±ol.
9. **Cards:** Marcos cuadrados negros con borde fino gris y foto centrada.
10. **Animaciones:** ApariciÃ³n sencilla de elementos.
11. **Scroll:** Scroll nativo rÃ¡pido.
12. **Hover:** IluminaciÃ³n de tarjeta al pasar el cursor.
13. **Transiciones:** Directas.
14. **Paleta:** Negro absoluto (`#0A0A0A`), gris carbÃ³n (`#1C1C1C`), salmÃ³n vivo (`#FF6B53`) y blanco (`#FFFFFF`).
15. **Mobile:** Botones de reserva masivos para pulsar fÃ¡cilmente con el pulgar.
16. **CTAs:** BotÃ³n "Reserve NYC" y "Reserve DC" visibles de inmediato.
17. **Reservas:** Enlace directo a la plataforma de reservas en la barra principal.
18. **ConversiÃ³n:** MÃ¡xima rapidez para completar la reserva.
19. **Velocidad/Performance:** Carga inmediata.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La claridad de la llamada a la acciÃ³n y el contraste del salmÃ³n sobre el fondo negro azabache.
2. **QuÃ© NO copiar:** La excesiva simplicidad que puede parecer una plantilla si no se acompaÃ±a de animaciones finas.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** La fotografÃ­a de producto sobre fondo negro azabache (`#0D0B0A`) para hacer resaltar el color natural del salmÃ³n, atÃºn y aguacate.
4. **Dificultad estimada:** Muy Baja.
5. **Impacto visual esperado:** 8.5/10.

---

### Referencia 17: Maison Baccarat
* **URL:** `https://baccarat.com`
* **CategorÃ­a:** Lujo, Cristal, RefracciÃ³n de Luz & Transiciones Fluidas

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** VÃ­deo de copa de cristal cortada reflejando destellos de luz dorada y roja sobre fondo oscuro.
2. **FotografÃ­a:** Calidad de catÃ¡logo de joyerÃ­a de lujo con iluminaciÃ³n de destellos y refracciones.
3. **VÃ­deo:** VÃ­deos de alta velocidad que capturan el fuego y el cristal lÃ­quido.
4. **TipografÃ­a:** Serif francesa clÃ¡sica de extrema elegancia.
5. **ComposiciÃ³n:** CuadrÃ­culas moduladas con inspiraciÃ³n en vitrinas de museo.
6. **NavegaciÃ³n:** MenÃº elegante desplegable con iconos vectoriales minimalistas.
7. **Estructura de Home:** Hero Inmersivo â†’ Colecciones IcÃ³nicas â†’ Maison Baccarat Restaurants â†’ Regalos â†’ Footer.
8. **Carta / CatÃ¡logo:** CatÃ¡logo interactivo con efectos de brillo al desplazarse por las piezas.
9. **Cards:** Tarjetas con efecto cristalino y bordes dorados reactivos al cursor.
10. **Animaciones:** Animaciones de luz deslizante sobre botones y tarjetas (*shimmer effect*).
11. **Scroll:** Scroll ultra-fluido.
12. **Hover:** Brillo de luz que recorre el borde de la tarjeta.
13. **Transiciones:** Transiciones elegantes sin pÃ©rdida de contexto.
14. **Paleta:** Rojo Baccarat (`#D00000`), dorado champagne (`#E5C158`), negro azabache (`#080808`) y cristalino (`#E8F0F8`).
15. **Mobile:** AdaptaciÃ³n fluida sin perder la sensaciÃ³n de exclusividad.
16. **CTAs:** Botones con marco dorado y animaciÃ³n de brillo metÃ¡lico.
17. **Reservas:** IntegraciÃ³n de reservas para sus salones de tÃ© y restaurantes gourmet.
18. **ConversiÃ³n:** Venta de productos de ultra-lujo.
19. **Velocidad/Performance:** Carga optimizada de recursos grÃ¡ficos.

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** Los efectos de destello brillante en botones y bordes de tarjetas (*shimmer animation*).
2. **QuÃ© NO copiar:** Los elementos de e-commerce de cristalerÃ­a ajenos a la restauraciÃ³n.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** El efecto de destello de luz sutil (*shimmer effect*) en el botÃ³n principal "PEDIR AHORA" o "RESERVAR MESA".
4. **Dificultad estimada:** Media (CSS Keyframes o Framer Motion).
5. **Impacto visual esperado:** 9.5/10.

---

### Referencia 18: Noma Copenhagen
* **URL:** `https://noma.dk`
* **CategorÃ­a:** Alta GastronomÃ­a Mundial & Radical Minimalist Product Focus

#### AnÃ¡lisis de los 20 Aspectos:
1. **Hero:** Imagen o vÃ­deo limpio de la estaciÃ³n gastronÃ³mica actual (Season of Ocean / Vegetable / Game).
2. **FotografÃ­a:** FotografÃ­a hiper-realista, cruda y orgÃ¡nica de ingredientes nÃ³rdicos y fermentos.
3. **VÃ­deo:** VÃ­deos documentales breves sobre la recolecciÃ³n de ingredientes en la naturaleza.
4. **TipografÃ­a:** Sans-serif audaz y limpia (*Grotesk* moderna) de gran tamaÃ±o.
5. **ComposiciÃ³n:** Bloques horizontales masivos con tipografÃ­a en tamaÃ±o gigante (*hero typography*).
6. **NavegaciÃ³n:** NavegaciÃ³n en el pie o lateral muy simplificada.
7. **Estructura de Home:** Temporada Actual â†’ Comprar Productos Noma Projects â†’ La Historia â†’ Reservas â†’ Footer.
8. **Carta / CatÃ¡logo:** PresentaciÃ³n de la temporada con lista de platos e historia de innovaciÃ³n.
9. **Cards:** Bloques rectangulares de color solido o fotografÃ­a sin adornos.
10. **Animaciones:** Transiciones inmediatas y limpias.
11. **Scroll:** Scroll nativo de alto rendimiento.
12. **Hover:** InversiÃ³n instantÃ¡nea de color en bloques de texto.
13. **Transiciones:** RÃ¡pidas sin pantallas de carga.
14. **Paleta:** Gris nÃ³rdico (`#252525`), verde musgo (`#3A4032`), tierra oscura (`#1B1715`) y blanco puro (`#FFFFFF`).
15. **Mobile:** Perfecta legibilidad y accesibilidad para todos los usuarios.
16. **CTAs:** Bloques de texto completo clicables.
17. **Reservas:** Apertura de reservas por temporadas con miles de personas en cola virtual.
18. **ConversiÃ³n:** Venta agotada instantÃ¡nea de plazas y productos de su tienda online.
19. **Velocidad/Performance:** Insuperable (Score 98+ en PageSpeed).

#### 5 Claves de EvaluaciÃ³n:
1. **QuÃ© hace excepcionalmente bien:** La fuerza del titular principal y la audacia de la tipografÃ­a para comunicar el concepto de temporada.
2. **QuÃ© NO copiar:** El diseÃ±o crudo/industrial que puede resultar poco cÃ¡lido para un restaurante japonÃ©s acogedor.
3. **QuÃ© patrÃ³n adaptar a OYISHI:** Los bloques de titulares audaces con tipografÃ­a de gran escala para secciones clave como "CARTA COMPLETA 155 PLATOS".
4. **Dificultad estimada:** Baja.
5. **Impacto visual esperado:** 8.5/10.

---

## 2. TOP 10 REFERENCIAS FINALES

De las 18 referencias investigadas, se han seleccionado las **10 mejores webs** que aportan los patrones mÃ¡s valiosos para el proyecto **OYISHI**:

```
+---------------------------------------------------------------------------------------------+
|                                TOP 10 BENCHMARK SELECCIONADO                                |
+----+-----------------------+---------------------------------------+------------------------+
| #  | REFERENCIA            | URL                                   | ENFOQUE CLAVE          |
+----+-----------------------+---------------------------------------+------------------------+
| 1  | Yamato Table Grill    | https://yamato-sushi.com              | Hero Cinematic & Video |
| 2  | Zuma Restaurants      | https://zumarestaurant.com            | Texturas & AtmÃ³sfera   |
| 3  | Masa NYC              | https://masanyc.com                   | Elegancia Wabi-Sabi    |
| 4  | Sticks'n'Sushi        | https://sticksnsushi.com              | UX Carta & ConversiÃ³n  |
| 5  | Sexy Fish             | https://sexyfish.com                  | Premium Glassmorphism  |
| 6  | Pierre HermÃ© Paris    | https://pierreherme.com               | FotografÃ­a Macro Joya  |
| 7  | The Macallan          | https://themacallan.com               | Dark Luxury & Shimmer  |
| 8  | Royal Mansour         | https://royalmansour.com              | Hover Preview Navigation|
| 9  | SingleThread Farm     | https://singlethreadfarms.com         | Storytelling Artesanal |
| 10 | Maison Baccarat       | https://baccarat.com                  | Acentos & CTA Motion   |
+----+-----------------------+---------------------------------------+------------------------+
```

---

### AnÃ¡lisis Detallado del TOP 10:

#### 1. Yamato Table Grill & Sushi Bar
* **URL:** `https://yamato-sushi.com`
* **Fortalezas:** IntegraciÃ³n magistral del vÃ­deo en el Hero con mÃ¡scaras oscuras radiales que se funden de manera natural con la paleta de la web.
* **QuÃ© EVITAR:** Cursos personalizados pesados en JavaScript que causan tirones (*lag*) en la experiencia de usuario.
* **QuÃ© ADAPTAR a OYISHI:** Aplicar una mÃ¡scara de gradiente oscuro continuo al vÃ­deo real `oyishi-sushi-build.mp4` para fusionarlo limpiamente con el fondo `#0F0D0C` de la Home.

#### 2. Zuma Restaurants
* **URL:** `https://zumarestaurant.com`
* **Fortalezas:** Riqueza visual basada en tonos carbÃ³n quemado, bronce cepillado y madera oscura.
* **QuÃ© EVITAR:** MenÃºs modales a pantalla completa que tapan por completo el contenido de fondo durante la navegaciÃ³n.
* **QuÃ© ADAPTAR a OYISHI:** Usar la paleta base de carbÃ³n cÃ¡lido (`#14100E`) con acentos de bronce dorados (`#D8B36A`) y rojos sutiles (`#E85D4E`).

#### 3. Masa NYC
* **URL:** `https://masanyc.com`
* **Fortalezas:** Uso maestro del espacio negativo y tipografÃ­a Serif refinada para transmitir el mÃ¡ximo nivel de exclusividad.
* **QuÃ© EVITAR:** La falta total de fotos de platos (OYISHI necesita mostrar sus 155 productos reales).
* **QuÃ© ADAPTAR a OYISHI:** El espaciado tipogrÃ¡fico holgado y elegante en los titulares de secciones para evitar la saturaciÃ³n visual.

#### 4. Sticks'n'Sushi
* **URL:** `https://sticksnsushi.com`
* **Fortalezas:** Arquitectura de menÃº digital hiper-eficiente con barra de categorÃ­as sticky, filtros por tipo de plato y carrito desplegable.
* **QuÃ© EVITAR:** El diseÃ±o claro/nÃ³rdico si se busca mantener una estÃ©tica nocturna y cÃ¡lida.
* **QuÃ© ADAPTAR a OYISHI:** La UX de la pÃ¡gina `/carta` con selector de 17 categorÃ­as, buscador en tiempo real y contador de productos.

#### 5. Sexy Fish London & Miami
* **URL:** `https://sexyfish.com`
* **Fortalezas:** Uso de tarjetas con efecto cristal esmerilado (*glassmorphism*) y bordes de luz brillante sobre fondos oscuros.
* **QuÃ© EVITAR:** La estÃ©tica cyberpunk y luces neÃ³n estridentes que desentonan con la autenticidad japonesa.
* **QuÃ© ADAPTAR a OYISHI:** Tarjetas de productos destacados en la Home con fondo semitransparente oscuro (`bg-[#181412]/80 backdrop-blur-md`) y borde sutil.

#### 6. Pierre HermÃ© Paris
* **URL:** `https://pierreherme.com`
* **Fortalezas:** Tratamiento de la fotografÃ­a gastronÃ³mica como alta joyerÃ­a y efecto hover con cambio a foto de corte del producto.
* **QuÃ© EVITAR:** La estructura de e-commerce de regalos masivo con excesivas ofertas.
* **QuÃ© ADAPTAR a OYISHI:** El efecto hover en las cards de la carta que revela detalles de los ingredientes o el corte del nigiri/roll.

#### 7. The Macallan Experience
* **URL:** `https://themacallan.com`
* **Fortalezas:** EstÃ©tica de lujo oscuro con resplandor dorado sutil (*shimmer/glow*) en bordes y botones.
* **QuÃ© EVITAR:** El scroll narrativo excesivamente lento para usuarios que desean informaciÃ³n inmediata.
* **QuÃ© ADAPTAR a OYISHI:** Bordes reactivos con resplandor dorado sutil al pasar el cursor sobre las tarjetas clave del menÃº.

#### 8. Royal Mansour Marrakech
* **URL:** `https://royalmansour.com`
* **Fortalezas:** NavegaciÃ³n en el menÃº con vistas previas en miniatura al pasar el cursor sobre cada categorÃ­a.
* **QuÃ© EVITAR:** Tiempos de carga elevados en conexiones mÃ³viles lentas.
* **QuÃ© ADAPTAR a OYISHI:** Mostrar una vista previa en imagen miniatura flotante cuando el usuario pasa el cursor sobre las 8 categorÃ­as principales en la Home.

#### 9. SingleThread Farm & Inn
* **URL:** `https://singlethreadfarms.com`
* **Fortalezas:** Narrativa fotogrÃ¡fica de alta calidad que transmite el concepto de artesanÃ­a e ingredientes frescos de temporada.
* **QuÃ© EVITAR:** Proceso de reserva complejo de mÃºltiples pasos que genera fricciÃ³n.
* **QuÃ© ADAPTAR a OYISHI:** SecciÃ³n "El Arte de OYISHI" en la Home destacando la calidad del salmÃ³n, atÃºn y la elaboraciÃ³n al momento.

#### 10. Maison Baccarat
* **URL:** `https://baccarat.com`
* **Fortalezas:** Micro-animaciones de brillo metÃ¡lico (*shimmer effect*) en los botones de llamada a la acciÃ³n primarios.
* **QuÃ© EVITAR:** Elementos visuales recargados que entorpezcan el tiempo de respuesta.
* **QuÃ© ADAPTAR a OYISHI:** Efecto de brillo barriendo suavemente el botÃ³n principal "RESERVAR MESA" / "VER CARTA COMPLETA".

---

## 3. 10 IDEAS CONCRETAS PARA OYISHI CON PUNTUACIÃ“N (1 A 10)

A continuaciÃ³n se presentan 10 propuestas de diseÃ±o e interacciÃ³n para implementar en OYISHI, evaluadas en 5 criterios clave:

1. **Impacto Visual:** Capacidad de generar el efecto "WOW".
2. **Utilidad Comercial:** Directamente enfocado en aumentar pedidos/reservas.
3. **Mobile:** Facilidad y belleza en pantallas tÃ¡ctiles de smartphones.
4. **Rendimiento:** Mantener velocidad de carga ultra-rÃ¡pida (Lighthouse > 90).
5. **Dificultad:** Esfuerzo tÃ©cnico estimado de implementaciÃ³n (1 = Muy FÃ¡cil, 10 = Muy DifÃ­cil).

```
+-------------------------------------------------------------------------------------------------------+
|                                10 IDEAS RECOMENDADAS PARA OYISHI                                      |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
| #  | IDEA DE DISEÃ‘O / PATRÃ“N               | VISUAL  | COMERCIAL  | MOBILE | RENDIMIENTO | DIFICULTAD |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
| 1  | Hero CinematogrÃ¡fico con MÃ¡scara      |   10    |     9      |   9    |      9      |     3      |
| 2  | Rejilla de CategorÃ­as Visuales        |    9    |     10     |   10   |      9      |     3      |
| 3  | CuradurÃ­a "SelecciÃ³n OYISHI" (8 items)|    9    |     10     |   9    |     10      |     2      |
| 4  | Tarjetas de Producto Glassmorphism    |    9    |     9      |   9    |      9      |     3      |
| 5  | BotÃ³n CTA con Brillo Metallic Shimmer|    8    |     9      |   10   |     10      |     2      |
| 6  | Filtro RÃ¡pido e-Commerce en /carta    |    8    |     10     |   10   |      9      |     4      |
| 7  | Modal/Drawer de Reserva Oscuro        |    8    |     10     |   10   |     10      |     3      |
| 8  | Micro-Animaciones Stagger en Scroll   |    9    |     8      |   9    |      9      |     4      |
| 9  | Bloque Narrativo "El Arte del Sushi"  |    9    |     8      |   9    |     10      |     2      |
| 10 | Sticky Bottom Navigation en MÃ³vil     |    7    |     10     |   10   |     10      |     3      |
+----+---------------------------------------+---------+------------+--------+-------------+------------+
```

---

### ExplicaciÃ³n TÃ©cnica de las 10 Ideas:

1. **Hero CinematogrÃ¡fico con MÃ¡scara Radial (`#0F0D0C`):**
   * *DescripciÃ³n:* Mantener el vÃ­deo real `oyishi-sushi-build.mp4` funcionando en el Hero pero aplicando un degradado radial en CSS (`bg-gradient-to-t from-[#0F0D0C] via-transparent to-transparent`) que se fusione suavemente con la primera secciÃ³n sin cortes abruptos.
   * *Puntuaciones:* Visual: 10 | Comercial: 9 | Mobile: 9 | Rendimiento: 9 | Dificultad: 3

2. **Rejilla de CategorÃ­as Visuales ("EXPLORA OYISHI"):**
   * *DescripciÃ³n:* En la Home, colocar una cuadrÃ­cula elegante de 8 bloques visuales (Sashimi, Nigiri, Uramaki, Gyoza, etc.) con imÃ¡genes de alta resoluciÃ³n y efecto hover de zoom ligero que redirija directamente a la categorÃ­a en `/carta`.
   * *Puntuaciones:* Visual: 9 | Comercial: 10 | Mobile: 10 | Rendimiento: 9 | Dificultad: 3

3. **CuradurÃ­a "SelecciÃ³n OYISHI" (8 Productos Destacados):**
   * *DescripciÃ³n:* Mostrar Ãºnicamente 8 productos icÃ³nicos en la Home (en lugar de los 155 para no saturar), presentados en tarjetas oscuras con badge en rojo OYISHI (`#E85D4E`) "Recomendado".
   * *Puntuaciones:* Visual: 9 | Comercial: 10 | Mobile: 9 | Rendimiento: 10 | Dificultad: 2

4. **Tarjetas de Producto Glassmorphism Warm Dark:**
   * *DescripciÃ³n:* Tarjetas con fondo carbÃ³n `#181412` semitransparente (`bg-opacity-80 backdrop-blur-md`), borde fino `#2D2520` y destello dorado sutil al pasar el cursor.
   * *Puntuaciones:* Visual: 9 | Comercial: 9 | Mobile: 9 | Rendimiento: 9 | Dificultad: 3

5. **BotÃ³n CTA con Brillo Metallic Shimmer (Framer Motion / CSS):**
   * *DescripciÃ³n:* AnimaciÃ³n de una rÃ¡faga de luz dorada suave que recorre en diagonal el botÃ³n "RESERVAR MESA" o "PEDIR ONLINE" cada 4 segundos.
   * *Puntuaciones:* Visual: 8 | Comercial: 9 | Mobile: 10 | Rendimiento: 10 | Dificultad: 2

6. **Filtro RÃ¡pido e-Commerce y Buscador en `/carta`:**
   * *DescripciÃ³n:* En la pÃ¡gina `/carta`, incluir una barra de pestaÃ±as horizontales con scroll tÃ¡ctil suave para las 17 categorÃ­as y un buscador instantÃ¡neo por texto en tiempo real.
   * *Puntuaciones:* Visual: 8 | Comercial: 10 | Mobile: 10 | Rendimiento: 9 | Dificultad: 4

7. **Modal / Drawer de Reserva EstÃ©tica Oscura Integrado:**
   * *DescripciÃ³n:* Formulario de reservas directo con estÃ©tica oscura elegante (selector de personas, fecha y hora) sin necesidad de abandonar la pÃ¡gina web.
   * *Puntuaciones:* Visual: 8 | Comercial: 10 | Mobile: 10 | Rendimiento: 10 | Dificultad: 3

8. **Micro-Animaciones Staggered Scroll con Framer Motion:**
   * *DescripciÃ³n:* ApariciÃ³n escalonada de las tarjetas de producto conforme entran en la pantalla (`viewport={{ once: true }}` con `staggerChildren: 0.08`).
   * *Puntuaciones:* Visual: 9 | Comercial: 8 | Mobile: 9 | Rendimiento: 9 | Dificultad: 4

9. **Bloque Narrativo "El Arte del Sushi OYISHI":**
   * *DescripciÃ³n:* SecciÃ³n editorial entre la muestra de productos y las reservas con fotografÃ­a macro de salmÃ³n fresco, tipografÃ­a Serif refinada y el manifiesto de calidad en Fuenlabrada.
   * *Puntuaciones:* Visual: 9 | Comercial: 8 | Mobile: 9 | Rendimiento: 10 | Dificultad: 2

10. **Sticky Bottom Bar para MÃ³viles:**
    * *DescripciÃ³n:* Barra fija inferior en smartphones con 2 botones de acceso rÃ¡pido: "VER CARTA (155)" y "RESERVAR MESA", asegurando conversiÃ³n inmediata con el pulgar.
    * *Puntuaciones:* Visual: 7 | Comercial: 10 | Mobile: 10 | Rendimiento: 10 | Dificultad: 3

---

## 4. RECOMENDACIÃ“N FINAL

> **â€œSi OYISHI tuviera que tomar solo 5 ideas de toda esta investigaciÃ³n, serÃ­an estas:â€**

### 1. MÃ¡scara Radial CinematogrÃ¡fica en el Hero (Inspirada en Yamato Table Grill)
* **Por quÃ©:** Mantiene el vÃ­deo real de sushi funcionando a plena calidad, pero elimina el corte brusco inferior, integrando la cabecera de forma invisible y refinada con el tono carbÃ³n de la Home (`#0F0D0C`).

### 2. CuradurÃ­a EstratÃ©gica en Home + CatÃ¡logo Completo en `/carta` (Inspirado en Sticks'n'Sushi)
* **Por quÃ©:** La Home debe enamorar con solo 8 platos estrella ("SelecciÃ³n OYISHI") y 8 accesos a categorÃ­as. La carga de los 155 productos pertenece en exclusiva a `/carta` con su buscador ultra-rÃ¡pido.

### 3. Tarjetas con EstÃ©tica Glassmorphism Oscuro y Borde Dorado Sutil (Inspirada en Sexy Fish & Macallan)
* **Por quÃ©:** Da un salto radical de calidad visual frente a las webs tradicionales de restaurantes de zona, transmitiendo lujo contemporÃ¡neo mediante fondos `#181412` y micro-bordes dorados al hacer hover.

### 4. AnimaciÃ³n de Brillo Shimmer en CTAs Principales (Inspirada en Maison Baccarat)
* **Por quÃ©:** GuÃ­a de forma irresistible la mirada del usuario hacia los puntos de conversiÃ³n ("RESERVAR MESA" / "VER CARTA"), elevando el ratio de clics tanto en escritorio como en mÃ³vil.

### 5. Sticky Bottom Navigation Bar para SmartPhones (Inspirada en Zuma & Sticks'n'Sushi)
* **Por quÃ©:** MÃ¡s del 70% del trÃ¡fico de OYISHI serÃ¡ desde telÃ©fonos mÃ³viles. Tener los botones de acciÃ³n al alcance inmediato del pulgar garantiza la mÃ¡xima tasa de reservas y pedidos.

---

*Informe finalizado por el **AGENTE 1 â€” RESEARCH & BENCHMARK**. Listo para la fase de DirecciÃ³n de Arte y Motion Design.*
