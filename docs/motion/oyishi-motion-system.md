# OYISHI — Sistema de Movimiento & Animaciones (Motion Design System)

> **Autor:** AGENTE 3 — MOTION DIRECTOR  
> **Fecha:** Agosto 2026  
> **Proyecto:** OYISHI — Restaurante Japonés Premium (Fuenlabrada)  
> **Stack de Animación:** Framer Motion + Tailwind CSS + GPU Acceleration  
> **Estado:** Documento de Especificación (Fase 1: Diseño del Sistema — Pendiente de Aprobación)

---

## 1. MANIFIESTO DE MOVIMIENTO: "LA RITMIA DEL SUSHI"

El sistema de movimiento de OYISHI no es una colección inconexa de efectos estéticos o animaciones decorativas. Se concibe como una **extensión cinemática y gastronómica de la marca**: el movimiento imita la cadencia pausada, intencionada y exacta del corte de un maestro itamae.

### Criterios Sensoriales:
* **Preciso y Gastronómico:** Las transiciones sugieren fluidez y calidez, sin sobresaltos visuales ni distracciones.
* **Lento e Intencionado:** Duraciones prolongadas (0.5s – 1.4s) con curvas de frenado orgánicas (`cubic-bezier(0.16, 1, 0.3, 1)` — Luxe Ease Out).
* **Cinematográfico:** Transiciones sostenidas que otorgan protagonismo al producto real (155 platos) y a la atmósfera nocturna `#14100E`.

### Reglas Prohibitivas (Lo que NO se usa en OYISHI):
* ❌ **Sin Bounce / Spring exagerado:** Cero rebotes de tipo caricatura o aplicados a elementos de interfaz comercial.
* ❌ **Sin Glitch / Cyberpunk:** Cero efectos de distorsión digital o artefactos visuales.
* ❌ **Sin Scroll-Jacking:** Cero secuestro del scroll nativo del usuario. El rendimiento del scroll se mantiene a 60fps constantes.
* ❌ **Sin Rotaciones Absurdas:** Cero elementos girando 360° o desalineándose de la cuadrícula visual.
* ❌ **Sin Partículas Excesivas:** Cero nieve, chispas o partículas flotantes en segundo plano que saturen la CPU/GPU.
* ❌ **Sin Hover Exagerado:** No se permite que los elementos aumenten desmedidamente de tamaño provocando desplazamiento del layout (`layout shift`).

---

## 2. REGLAS TÉCNICAS Y ACCESIBILIDAD

1. **Aceleración por Hardware (GPU Only):**
   * Se restringen las animaciones continuas a propiedades compuestas por GPU: `transform` (`translate3d`, `scale`, `rotate`) y `opacity`.
   * Se evita animar propiedades de maquetación (`width`, `height`, `margin`, `padding`, `top`, `left`) para erradicar el *Reflow* y el *Repaint*.

2. **Protección Absoluta del Hero:**
   * El vídeo real `public/images/hero/oyishi-sushi-build.mp4` se mantiene intacto. El sistema de motion únicamente controla la entrada de los contenidos superpuestos y la integración del degradado radial inferior (`mix-blend-lighten` y máscaras).

3. **Cumplimiento Estricto de `prefers-reduced-motion`:**
   * Todas las animaciones cuentan con un estado alternativo simplificado de cambio de opacidad rápido (0.1s) sin desplazamientos vectoriales para proteger a usuarios con desórdenes vestibulares o preferencias de accesibilidad activas.

---

## 3. TABLA MAESTRA DEL SISTEMA DE MOVIMIENTO

La siguiente tabla consolida la especificación técnica de las **15 animaciones del sistema OYISHI**:

| Elemento | Trigger | Animación | Duración | Easing | Mobile | Reduced Motion |
|---|---|---|---|---|---|---|
| **1. Entrada Hero** | Page Mount | Fade-in atmosférico con escalado ambiental de luz (`scale 1.05 -> 1`) | 1.4s (Delay 0s) | `cubic-bezier(0.16, 1, 0.3, 1)` | Fade-in lineal simple (1.0s) sin blur | Fade-in estático (0.2s) |
| **2. Aparición OYISHI** | Page Mount | Revelado vertical por letra con clip-path mask (`polygon`) y ciclo continuo de color | 1.2s (Stagger 0.08s, Delay 0.2s) | `cubic-bezier(0.16, 1, 0.3, 1)` | Fade-up en bloque completo de la palabra | Transición rápida de opacidad (0.1s) |
| **3. Transición Hero -> Explora** | Viewport Scroll | Parallax inverso sutil en texto (`y: -60px`) y fundido continuo a `#14100E` | 1.0s | `cubic-bezier(0.25, 1, 0.5, 1)` | Scroll nativo directo sin parallax | Scroll estático sin transformación Y |
| **4. Categorías ("Explora OYISHI")** | Viewport / Hover | Entry: Cascade stagger. Hover: Photo zoom (`scale 1.05`), Arrow slide (`x: +4px`) | Entry: 0.6s (Stagger 0.05s). Hover: 0.4s | `cubic-bezier(0.16, 1, 0.3, 1)` | Grid 2 col con fade-in, sin efecto hover zoom | Fade-in directo sin stagger ni zoom |
| **5. Fotografías Gastronómicas** | Image Load / Hover | Entry: Fade-in desde placeholder. Hover: Micro-zoom cinematográfico (`scale 1.04`) | Entry: 0.6s. Hover: 0.7s | `cubic-bezier(0.16, 1, 0.3, 1)` | Carga con fade-in directo sin zoom al tacto | Opacidad inmediata sin zoom |
| **6. Product Cards (Home & Carta)** | Viewport / Hover | Entry: Fade-up (`y: 25px -> 0`). Hover: Elevación (`y: -4px`), borde oro Wasabi (`#D8B36A/40`) | Entry: 0.7s (Stagger 0.06s). Hover: 0.35s | `cubic-bezier(0.16, 1, 0.3, 1)` | Grid con fade-in suave, sin elevación al scroll | Fade-in estático sin desplazamiento Y |
| **7. Bandejas y Combinados** | Viewport / Hover | Entry: Fade con scale inverso (`scale 1.02 -> 1`). Hover: Expansion foto (`scale 1.05`) | Entry: 0.9s. Hover: 0.8s | `cubic-bezier(0.16, 1, 0.3, 1)` | Bloque vertical full-width sin zoom hover | Fade estático sin escala |
| **8. Menú del Día** | Viewport Scroll | Revelado centrado con fade-up y destaque del badge "Mediodía" | 0.8s (Delay 0.2s) | `easeOut` | Revelado vertical estándar | Aparición inmediata |
| **9. Reserva (Formulario)** | Viewport / Submit | Entry: Fade-in con sombra. Submit: Checkmark scaling solidario (`scale 0.5 -> 1`) | Entry: 0.8s. Submit: 0.6s | `cubic-bezier(0.16, 1, 0.3, 1)` | Formulario adaptado 100% sin re-layouts | Cambio directo de estado sin scaling |
| **10. Header Fijo** | Scroll > 50px | Transición a cristal esmerilado (`bg-[#140f0c]/85` + `backdrop-blur-md`), pulso verde | 0.5s | `cubic-bezier(0.16, 1, 0.3, 1)` | Compactado con blur optimizado | Cambio instantáneo de color de fondo |
| **11. Botones Principales** | Hover / Interval | Hover: Elevación `-2px` + Shimmer barriendo en diagonal. Icon: `rotate 90°` / `translate` | Hover: 0.3s. Shimmer loop: 4.0s | `cubic-bezier(0.16, 1, 0.3, 1)` | Active state feedback (`scale 0.98`), sin shimmer | Cambio directo de tono de color |
| **12. Cambio Home -> /carta** | Route Change | Disolución cruzada (*Cross-fade*) con desplazamiento vertical sutil (`y: 10px -> 0`) | Exit: 0.25s. Enter: 0.4s | `easeOut` | Fade-in limpio ultra-rápido (0.2s) | Cambio directo sin transición entre rutas |
| **13. Buscador en Carta** | Focus / Input | Focus: Resplandor sutil Wasabi Gold. Filter: Reorganización fluida de la rejilla | Focus: 0.25s. Layout: 0.3s | `easeOut` | Foco nativo con teclado táctil directo | Sin animación de layout, filtrado instantáneo |
| **14. Filtros de Categorías** | Click Filtro | Desplazamiento fluido de la píldora dorada de fondo (`layoutId`) al chip activo | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll horizontal táctil con píldora fija | Cambio de clase CSS estático |
| **15. Carrito (Drawer)** | Open / Add Item | Backdrop: Fade (0.3s). Drawer: Spring slide (`x: 100% -> 0`). Badge pop: `scale 1.3` | Drawer: 0.4s. Badge: 0.3s | `spring(stiffness: 250, damping: 25)` | Drawer a pantalla completa con swipe-to-close | Fade-in estático del panel (0.15s) |

---

## 4. ESPECIFICACIÓN DETALLADA DE LAS 15 ANIMACIONES

### 1. Entrada del Hero
* **Elemento:** Contenedor e iluminación atmosférica del Hero.
* **Trigger:** Montaje inicial de la página (`mount`).
* **Propiedad:** `opacity`, `transform (scale)`.
* **Duración:** 1.4s | **Delay:** 0s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Transición progresiva del ambiente de penumbra `#191310` a `#14100E` con un leve ajuste de escala del foco ambiental radial (`scale 1.05 -> 1.0`).
* **Mobile:** Fade-in de opacidad directo en 1.0s.
* **Reduced Motion:** Fade-in plano en 0.2s sin variación de escala.
* **Coste aproximado:** Muy Bajo (GPU Layer).

### 2. Aparición de OYISHI
* **Elemento:** Marca editorial "OYISHI" en `Hero.tsx`.
* **Trigger:** Montaje inicial de la página.
* **Propiedad:** `clip-path` (`polygon(0 0, 100% 0, 100% 100%, 0 100%)`), `translateY`, `opacity`, `color`.
* **Duración:** 1.2s por carácter | **Delay:** 0.2s (stagger 0.08s entre letras) | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Cada letra emerge desde la parte inferior tras una máscara de recorte invisible, acompañada por una modulación armónica continua de color (`#F6F1E8` -> `#D8B36A` -> `#E67A61`).
* **Mobile:** Revelado por bloque completo del titular mediante `translateY(20px -> 0px)` y `opacity(0 -> 1)` para evitar recálculos cromáticos por letra.
* **Reduced Motion:** Aparición fija instantánea con color estático `#F6F1E8`.
* **Coste aproximado:** Bajo.

### 3. Transición Hero → Explora
* **Elemento:** Gradiente inferior del Hero y cabecera de la sección "EXPLORA OYISHI".
* **Trigger:** Scroll en pantalla (`whileInView`).
* **Propiedad:** `opacity`, `translateY`.
* **Duración:** 1.0s | **Delay:** 0.1s | **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)`.
* **Desktop:** El contenido de texto del Hero se desplaza ligeramente en dirección opuesta al scroll (`y: -60px`), mientras la máscara del vídeo se funde de forma imperceptible con la primera sección.
* **Mobile:** Scroll nativo del navegador sin efecto parallax.
* **Reduced Motion:** Movimiento parallax desactivado por completo.
* **Coste aproximado:** Bajo.

### 4. Categorías ("EXPLORA OYISHI")
* **Elemento:** Bloques visuales de 8 categorías principales en la Home.
* **Trigger:** Viewport / Hover.
* **Propiedad:** `opacity`, `transform (scale, translateX)`.
* **Duración:** Scroll Entry: 0.6s (Stagger 0.05s). Hover: 0.4s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Entrada en cascada de los 8 bloques. Al pasar el cursor, la imagen de fondo escala suavemente a `1.05` y la flecha indicadora dorada se desplaza `+4px` a la derecha.
* **Mobile:** Carga en rejilla de 2 columnas con fade-in. Feedback táctil de opacidad al pulsar (`active:opacity-80`).
* **Reduced Motion:** Sin efecto de escala ni desplazamiento de flecha.
* **Coste aproximado:** Bajo.

### 5. Fotografías Gastronómicas
* **Elemento:** Imágenes de productos (Nigiris, Uramakis, Sashimis, etc.).
* **Trigger:** Carga de imagen / Hover.
* **Propiedad:** `opacity`, `transform (scale)`.
* **Duración:** Entry: 0.6s. Hover: 0.7s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Transición de opacidad al completar la carga WebP desde el contenedor carbón `#1A1A1A`. Al hacer hover, la imagen realiza un micro-zoom cinematográfico pausado (`scale(1.04)`).
* **Mobile:** Fade-in de carga sin micro-zoom interactivo.
* **Reduced Motion:** Carga inmediata sin transición de opacidad prolongada.
* **Coste aproximado:** Muy Bajo (Propiedad `transform: scale` nativa).

### 6. Product Cards ("SELECCIÓN OYISHI" & Rejilla de Carta)
* **Elemento:** Tarjetas contenedoras de producto.
* **Trigger:** Entry Viewport / Hover.
* **Propiedad:** `opacity`, `translateY`, `border-color`, `box-shadow`.
* **Duración:** Entry: 0.7s (Stagger 0.06s). Hover: 0.35s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Entrada progresiva desde abajo (`y: 25px -> 0`). Al pasar el cursor, la tarjeta se eleva `-4px`, el borde evoluciona a un tono bronce sutil (`rgba(216,179,106,0.3)`) y el título adopta el color Wasabi Gold.
* **Mobile:** Entrada en scroll simple sin desplazamiento en eje Y ni elevación.
* **Reduced Motion:** Aparición plana mediante opacidad (0.1s).
* **Coste aproximado:** Bajo.

### 7. Bandejas y Combinados
* **Elemento:** Tarjetas de gran formato (400px) para la sección de Bandejas.
* **Trigger:** Viewport Scroll / Hover.
* **Propiedad:** `opacity`, `transform (scale)`.
* **Duración:** Entry: 0.9s. Hover: 0.8s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Revelado de tarjeta con ligero escalado inverso (`scale 1.02 -> 1.0`). Al pasar el cursor, la foto soplada se expande con extrema suavidad (`scale 1.05`).
* **Mobile:** Formato adaptable vertical sin expansión en hover.
* **Reduced Motion:** Sin alteración de escala.
* **Coste aproximado:** Medio (Fotografía de alta definición).

### 8. Menú del Día
* **Elemento:** Sección promocional de almuerzos de mediodía.
* **Trigger:** Viewport Scroll.
* **Propiedad:** `opacity`, `translateY`.
* **Duración:** 0.8s | **Delay:** 0.2s | **Easing:** `easeOut`.
* **Desktop:** Revelado vertical sobrio del bloque centrado con destello dorado gradual en el subtítulo "Mediodía".
* **Mobile:** Revelado estándar en scroll.
* **Reduced Motion:** Fade estático directo.
* **Coste aproximado:** Muy Bajo.

### 9. Reserva (Formulario de Reservas)
* **Elemento:** Formulario `ReservationForm.tsx` y estado de confirmación.
* **Trigger:** Entry / Form Submit.
* **Propiedad:** `opacity`, `transform (scale, translateY)`.
* **Duración:** Entry: 0.8s. Submit: 0.6s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** El formulario emerge con una sombra difuminada profunda. Tras enviar, el icono de confirmación se manifiesta con un escalado sólido (`scale 0.5 -> 1.0`) sin rebotes plásticos.
* **Mobile:** Transición limpia de pantalla de formulario a confirmación sin desplazar el foco visual.
* **Reduced Motion:** Sustitución directa de vistas sin animación de escala.
* **Coste aproximado:** Muy Bajo.

### 10. Header Fijo (Navegación Principal)
* **Elemento:** Header flotante (`Header.tsx`).
* **Trigger:** Evento de scroll (distancia `scrollY > 50px`).
* **Propiedad:** `background-color`, `backdrop-filter`, `padding`, `box-shadow`.
* **Duración:** 0.5s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** El header pasa de un estado transparente inicial a un fondo cristalino carbón esmerilado (`rgba(20,15,12,0.85)` + `backdrop-blur-md`) reduciendo su acolchado vertical de `py-5` a `py-3`. El indicador "Abierto ahora" emite un pulso verde natural sutil.
* **Mobile:** Mismo cambio cromático con menor densidad de desenfoque para asegurar fluidez táctil.
* **Reduced Motion:** Transición directa de color sin animación de acolchado/altura.
* **Coste aproximado:** Medio (GPU Backdrop Blur).

### 11. Botones Principales (CTAs Comercial)
* **Elemento:** Botones "VER CARTA", "RESERVAR MESA", "PEDIDO ONLINE", "AÑADIR".
* **Trigger:** Interaction (Hover / Active) e intervalo pasivo.
* **Propiedad:** `transform (translateY, rotate)`, `box-shadow`, `background-position` (*shimmer effect*).
* **Duración:** Hover: 0.3s. Shimmer: 4.0s (bucle) | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** Elevación sutil de `-2px`, incremento de resplandor dorado/coral en la base. Un destello diagonal de luz metálica (*metallic shimmer*) cruza el botón suavemente cada 4 segundos. El icono `Plus` dentro de los botones de añade rota 90°.
* **Mobile:** Micro-compresión al toque (`scale 0.98` durante 100ms) sin shimmer pasivo para ahorro energético.
* **Reduced Motion:** Sin elevación Y ni shimmer diagonal; cambio directo de color de fondo.
* **Coste aproximado:** Bajo.

### 12. Cambio Home → /carta (Transición entre Páginas)
* **Elemento:** Envoltorio principal de vistas (`App.tsx` / React Router).
* **Trigger:** Navegación por clic en enlace o cambio de ruta.
* **Propiedad:** `opacity`, `translateY`.
* **Duración:** Exit: 0.25s / Enter: 0.4s | **Easing:** `easeOut`.
* **Desktop:** La página saliente se disuelve suavemente (`opacity: 1 -> 0`), mientras la vista entrante emerge con un leve deslizamiento vertical (`y: 10px -> 0px`, `opacity: 0 -> 1`), recreando la fluidez de un software nativo.
* **Mobile:** Fade-in rápido de 0.2s.
* **Reduced Motion:** Transición instantánea de páginas sin fade ni desplazamiento.
* **Coste aproximado:** Bajo.

### 13. Buscador en Carta
* **Elemento:** Input de búsqueda interactiva en `CartaPage.tsx`.
* **Trigger:** Foco en el campo / Modificación de texto.
* **Propiedad:** `border-color`, `box-shadow`, `layout` (reordenación de rejilla).
* **Duración:** Focus: 0.25s. Layout Grid: 0.3s | **Easing:** `easeOut`.
* **Desktop:** Al enfocar, el borde cambia a Wasabi Gold con resplandor difuminado. Al filtrar, Framer Motion reordena suavemente los productos de la rejilla mediante `layout`.
* **Mobile:** Foco inmediato sin animación pesada de reposicionamiento de rejilla.
* **Reduced Motion:** Reordenación instantánea sin transiciones `layout`.
* **Coste aproximado:** Bajo.

### 14. Filtros de Categorías
* **Elemento:** Píldoras de las 17 categorías en `CartaPage.tsx`.
* **Trigger:** Clic en categoría.
* **Propiedad:** `background-color`, `color`, `box-shadow`, `layoutId` (indicador activo).
* **Duración:** 0.3s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Desktop:** El fondo dorado de selección se desplaza de forma fluida entre botones utilizando la propiedad `layoutId` de Framer Motion.
* **Mobile:** Desplazamiento horizontal táctil nativo sin animación de píldora deslizante.
* **Reduced Motion:** Cambio directo de clase CSS sin desplazamiento de píldora.
* **Coste aproximado:** Bajo.

### 15. Carrito (Drawer Lateral & Modal)
* **Elemento:** Panel emergente `CartModal.tsx` y contador de comanda.
* **Trigger:** Clic en icono de carrito / Añadir producto al carrito.
* **Propiedad:** `transform (translateX)`, `opacity`, `scale` (badge de contador).
* **Duración:** Backdrop: 0.3s. Drawer: 0.4s. Badge Pop: 0.3s | **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` / `spring(stiffness: 250, damping: 25)`.
* **Desktop:** El telón de fondo oscuro se activa con `opacity: 0 -> 1` y desenfoque de fondo. El drawer lateral se desliza desde la derecha con inercia precisa. Al añadir un ítem, el badge numérico del header realiza un micro-pop (`scale: 1.0 -> 1.35 -> 1.0`).
* **Mobile:** Se despliega como panel a pantalla completa o 95% con soporte de cierre por arrastre vertical.
* **Reduced Motion:** Aparece de forma estática en 0.15s sin deslizamiento horizontal.
* **Coste aproximado:** Bajo.

---

## 5. TOP 10 ANIMACIONES RECOMENDADAS

De las 15 animaciones diseñadas, se clasifican las **10 más determinantes** para la transformación sensorial de OYISHI:

```
+-------------------------------------------------------------------------------------------------------------+
|                                    TOP 10 ANIMACIONES RECOMENDADAS OYISHI                                   |
+----+--------------------------------------------+-----------------+-----------------------+-----------------+
| #  | ANIMACIÓN                                  | CLASIFICACIÓN   | IMPACTO EN USUARIO    | COSTE TÉCNICO   |
+----+--------------------------------------------+-----------------+-----------------------+-----------------+
| 1  | 1. Revelado por Letra Titular OYISHI       | HIGH IMPACT     | WOW Instantáneo       | Bajo            |
| 2  | 2. Transición Cristal Header Fijo         | HIGH IMPACT     | Percepción Luxe       | Medio           |
| 3  | 3. Entradas Staggered en Product Cards     | HIGH IMPACT     | Ritmo Gastronómico    | Bajo            |
| 4  | 4. Shimmer Metálico en CTAs Comerciales    | HIGH IMPACT     | Conversión (+Clicks)  | Bajo            |
| 5  | 5. Drawer de Carrito Lateral con Inercia   | HIGH IMPACT     | UX Compras Fluida     | Bajo            |
| 6  | 6. Micro-Zoom Cinematográfico en Fotos     | MEDIUM IMPACT   | Apetitosidad Visceral | Muy Bajo        |
| 7  | 7. Desplazamiento Píldora Filtro layoutId  | MEDIUM IMPACT   | Interactividad Premium| Bajo            |
| 8  | 8. Cross-Fade Navegación (Home -> Carta)  | MEDIUM IMPACT   | Sentido de App Nativa | Bajo            |
| 9  | 9. Elevación Sutil y Borde Dorado en Cards | MEDIUM IMPACT   | Feedback Elegante     | Bajo            |
| 10 | 10. Checkmark Solidario Formulario Reserva | OPTIONAL        | Confirmación Limpia   | Muy Bajo        |
+----+--------------------------------------------+-----------------+-----------------------+-----------------+
```

---

### Análisis Justificativo del TOP 10:

#### 1. Revelado por Letra del Titular OYISHI (HIGH IMPACT)
* **Por qué:** Establece la primera impresión del usuario con categoría editorial de alta costura, diferenciando a OYISHI de cualquier web de restaurante convencional en Fuenlabrada.

#### 2. Transición Cristal del Header Fijo (HIGH IMPACT)
* **Por qué:** Mantiene la sobriedad durante el scroll y proporciona legibilidad constante sin invadir las fotografías del catálogo.

#### 3. Entradas Staggered en Product Cards (HIGH IMPACT)
* **Por qué:** Crea una cadencia de lectura pausada y elegante a medida que el usuario hace scroll, simulando la presentación secuencial de un menú degustación.

#### 4. Shimmer Metálico en CTAs Comerciales (HIGH IMPACT)
* **Por qué:** Captura la atención visual del ojo hacia los botones "VER CARTA", "RESERVAR MESA" y "PEDIDO ONLINE" de forma no invasiva, elevando la tasa de conversión.

#### 5. Drawer de Carrito Lateral con Inercia (HIGH IMPACT)
* **Por qué:** Permite revisar la comanda sin perder la ubicación actual en el menú, proporcionando una experiencia e-commerce de máxima calidad.

#### 6. Micro-Zoom Cinematográfico en Fotografías (MEDIUM IMPACT)
* **Por qué:** Hace que el salmón, atún y nigiris cobren vida al pasar el cursor, aumentando el deseo y la apetitosidad visual.

#### 7. Desplazamiento Píldora Filtro `layoutId` (MEDIUM IMPACT)
* **Por qué:** Convierte la exploración de las 17 categorías de la carta en una experiencia interactiva suave y gratificante.

#### 8. Cross-Fade Navegación entre Vistas (MEDIUM IMPACT)
* **Por qué:** Elimina los saltos bruscos y los parpadeos blancos de recarga de página al navegar entre la Home y `/carta`.

#### 9. Elevación Sutil y Borde Dorado en Cards (MEDIUM IMPACT)
* **Por qué:** Ofrece un feedback interactivo claro y refinado en equipos de escritorio.

#### 10. Checkmark Solidario Formulario Reserva (OPTIONAL)
* **Por qué:** Transmite tranquilidad y solidez al cliente cuando completa su solicitud de reserva de mesa.

---

## 6. PRÓXIMOS PASOS (FASE SIGUIENTE)

1. **Revisión y Aprobación:** Presentar este sistema de movimiento al usuario/cliente para validación del manfiesto y la tabla de especificaciones.
2. **Implementación Gradual (Tras aprobación):**
   * Crear el archivo de utilidades compartidas `src/utils/motionVariants.ts`.
   * Integrar animaciones stagger y hover en `src/pages/HomePage.tsx` y `src/pages/CartaPage.tsx`.
   * Pulir interacciones en `Header.tsx`, `CartModal.tsx` y `ReservationForm.tsx`.
3. **Control QA & Performance:** Validar con Chrome DevTools que el framerate permanezca en 60fps constantes en dispositivos móviles y de escritorio.
