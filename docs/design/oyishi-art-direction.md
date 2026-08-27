# OYISHI — Manual de Dirección de Arte & Guía de Identidad Visual Premium

> **Agente 2:** Art Director (Dirección de Arte)  
> **Fecha:** Agosto 2026  
> **Proyecto:** OYISHI — Restaurante Japonés Premium (Fuenlabrada)  
> **Estado:** Documentación Final de Dirección de Arte (Fase Pre-Código)

---

## 1. CONCEPTO VISUAL Y MOOD: "JAPÓN CONTEMPORÁNEO SENSORIAL"

La nueva identidad visual de **OYISHI** no se construye sobre adornos o clichés folclóricos, sino sobre la experiencia sensorial del restaurante japonés contemporáneo de alta gastronomía (inspirado en la sobriedad editorial de referencias internacionales como *Masa NYC*, *Zuma*, *ROKA* y *Nobu*).

### MENTALLIDAD DE DISEÑO
* **Atmósfera Nocturna y Cálida (Wabi-Sabi Moderno):** Entorno oscuro basado en tonos espresso, carbón tostado y piedra volcánica sumi (`#120E0C`), donde la iluminación focal destaca la textura, el brillo y los colores naturales del producto gastronómico (salmón fresco, atún rojo, nori, sésamo, aguacate).
* **Gastronómico y Sofisticado:** Transmite la pulcritud del omakase de alta categoría sin perder la calidez y accesibilidad de la cocina diaria en Fuenlabrada.
* **Cero Clichés:** Se eliminan categóricamente elementos trillados como neones cyberpunk, tipografías estilo manga/anime, ilustraciones caricaturescas de sushi o dorados estridentes de estética "casino".
* **Sensación Editorial Premium:** Cada sección se compone con el rigor de un libro de arte gastronómico (Kinfolk / Openhouse Magazine): espacio negativo generoso, proporciones tipográficas armónicas y tarjetas estructuradas con precisión micro-geométrica.

---

## 2. TRATAMIENTO Y JERARQUÍA DE MARCA (BRANDING & LOGOTIPO)

La marca **OYISHI** (del japonés *Oishii* / おいしい — delicioso) debe ser inmediatamente reconocible, sobria y memorable.

### 2.1 Tratamiento del Logotipo
* **Tipografía de Marca:** Serif Display refinada con kerning expandido (`tracking-[0.25em]`), peso *Light / Regular*.
* **Paleta de Marca:** Crema Sedoso (`#F7F2EC`) para máxima elegancia sobre fondo oscuro, con la posibilidad de acentos sutiles en Dorado Envejecido (`#D8B36A`) en elementos conmemorativos.
* **Subtítulo / Tagline Oficial:** `FUENLABRADA • CONTEMPORARY JAPANESE DINING` (Tipografía UI Mono/Sans, `tracking-[0.3em]`, `text-xs`, color Taupe Cálido `#B0A69D`).

### 2.2 Presencia y Ubicación
* **En Header:** Marca compacta centrada o alineada a la izquierda en `text-xl md:text-2xl font-serif tracking-[0.2em]`. Transmite presencia constante sin invadir la pantalla.
* **En Hero (Sección Principal):** Presentación escultural. El nombre **OYISHI** actúa como hito visual con tipografía Serif gigante (`clamp(4.5rem, 11vw, 11rem)`), integrado con el vídeo de fondo a través de una máscara radial sutil.
* **Jerarquía de Marca:**
  1. **Nivel 1 (Marca Core):** Logotipo **OYISHI** (Sello de identidad y excelencia).
  2. **Nivel 2 (Posicionamiento):** *Sushi & Contemporary Dining* (Propuesta de valor).
  3. **Nivel 3 (Garantía de Calidad):** Badges de acreditación (*"Pescado Fresco Diario"*, *"Elaboración Artesanal al Momento"*, *"Menú del Día"*).

---

## 3. SISTEMA TIPOGRÁFICO DEFINITIVO

Se establece un sistema riguroso limitado a **exactamente 2 familias principales**, evitando el desorden visual.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SISTEMA TIPOGRÁFICO OYISHI                     │
├──────────────────────────┬─────────────────────────────────────────────┤
│ DISPLAY / EDITORIAL      │ Cormorant Garamond / Playfair Display (Serif)│
│ UI / BODY / METADATA     │ Inter (Sans-serif) & Inter Mono (Monospace) │
└──────────────────────────┴─────────────────────────────────────────────┘
```

### 3.1 Familia DISPLAY (Serif Editorial)
* **Fuentes:** `'Cormorant Garamond'`, `'Playfair Display'`, `Georgia`, `serif`.
* **Uso:** Marca principal, titulares de sección (H1, H2), nombres de platos en tarjetas destacadas.
* **Pesos:** `300` (Light), `400` (Regular), `500` (Medium).
* **Line-height:** `0.85` a `0.95` en titulares gigantes; `1.1` a `1.2` en H2/H3.

### 3.2 Familia UI & BODY (Sans-serif Limpia + Monospace Técnico)
* **Fuentes:** `'Inter'`, `system-ui`, `-apple-system`, `sans-serif` (con variante `font-mono` para cifras).
* **Uso:** Cuerpo de texto, descripciones de platos, botones de interfaz, menús de navegación, precios y badges.
* **Pesos:** `300` (Light), `400` (Regular), `500` (Medium), `600` (Semi-bold).
* **Line-height:** `1.6` en body; `1.0` en precios y CTAs.

### 3.3 Escala Tipográfica Completa

| Nivel / Elemento | Familia | Tamaño (Mobile / Desktop) | Peso | Tracking | Color Token |
|---|---|---|---|---|---|
| **Hero H1** | Display Serif | `clamp(4.25rem, 10.5vw, 11rem)` | 300 Light | `-0.03em` | `--color-oyishi-text-primary` |
| **H1 Sección** | Display Serif | `clamp(2.5rem, 5vw, 4.5rem)` | 400 Regular | `-0.02em` | `--color-oyishi-text-primary` |
| **H2 Subsección** | Display Serif | `text-2xl md:text-4xl` (`24px` / `36px`) | 400 Regular | `normal` | `--color-oyishi-text-primary` |
| **H3 Card Title** | Display Serif | `text-lg md:text-xl` (`18px` / `20px`) | 500 Medium | `normal` | `--color-oyishi-text-primary` |
| **Body Standard** | UI Sans | `text-sm md:text-base` (`14px` / `16px`) | 400 Regular | `normal` | `--color-oyishi-text-secondary` |
| **Small / Ingredientes**| UI Sans | `text-xs md:text-sm` (`12px` / `14px`) | 400 Regular | `normal` | `--color-oyishi-text-secondary` |
| **Price (Precio)** | UI Mono | `text-lg md:text-xl` (`18px` / `20px`) | 500 Medium | `-0.02em` | `--color-oyishi-gold` |
| **CTA / Botón** | UI Sans | `text-[11px] md:text-xs` (`11px` / `12px`) | 600 Semi-bold | `0.25em` (uppercase) | `--color-oyishi-text-primary` / `--color-oyishi-coral` |
| **Badge / Categoría** | UI Mono | `text-[10px] md:text-xs` (`10px` / `12px`) | 500 Medium | `0.2em` (uppercase) | `--color-oyishi-gold` |

---

## 4. PALETA DE COLOR COMPLETA (DESIGN TOKENS)

Se rechaza el negro puro (`#000000`) como única solución por su frialdad. La paleta de OYISHI se basa en la calidez de la piedra sumi, madera oscura tostada, el crema de la seda y el bermellón del atún/salmón.

```
                                PALETA DE COLOR OYISHI
 ┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
 │  ESPRESSO SUMI   │  CARBÓN TOSTADO  │ PIEDRA VOLCÁNICA │  CORAL OYISHI    │
 │     #120E0C      │     #181310      │     #1E1714      │     #E85D4E      │
 │  (Fondo Base)    │ (Superficies Sec)│ (Cards / Modales)│  (Acento Prim)   │
 ├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
 │ DORADO ENVEJECIDO│   CREMA SEDOSO   │   TAUPE CÁLIDO   │   BORDE MADERA   │
 │     #D8B36A      │     #F7F2EC      │     #B0A69D      │     #2E241F      │
 │  (Precios/Det)   │ (Texto Principal)│(Texto Secundario)│  (Separadores)   │
 └──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

### Tabla de Design Tokens

| Token CSS | Nombre Visual | Hex / RGBA | Función en Interfaz |
|---|---|---|---|
| `--color-oyishi-bg-base` | Espresso Sumi | `#120E0C` | Fondo principal del sitio web, body y secciones clave. |
| `--color-oyishi-bg-surface` | Carbón Tostado | `#181310` | Fondo de secciones secundarias, drawers y banners. |
| `--color-oyishi-bg-card` | Piedra Volcánica | `#1E1714` | Fondo de tarjetas de producto, contenedores de menú. |
| `--color-oyishi-bg-card-hover` | Volcánica Elevada | `#261E1A` | Fondo activo al hacer hover en tarjetas. |
| `--color-oyishi-coral` | Coral OYISHI | `#E85D4E` | Acento primario, botones principales ("VER CARTA"), badges especiales. |
| `--color-oyishi-coral-hover` | Bermellón Intenso | `#D44C3D` | Estado hover de botones primarios. |
| `--color-oyishi-gold` | Dorado Envejecido | `#D8B36A` | Precios, acentos artesanales, sellos de calidad, iconos. |
| `--color-oyishi-gold-subtle` | Resplandor Washi | `rgba(216, 179, 106, 0.12)` | Fondos de chips, bordes activos sutiles. |
| `--color-oyishi-text-primary` | Crema Sedoso | `#F7F2EC` | Texto principal, titulares, nombres de productos. |
| `--color-oyishi-text-secondary` | Taupe Cálido | `#B0A69D` | Descripciones de platos, ingredientes, subtextos. |
| `--color-oyishi-text-muted` | Gris Arcilla | `#736B63` | Placeholders, textos deshabilitados, metadatos secundarios. |
| `--color-oyishi-border` | Borde Madera Oscura | `#2E241F` | Separación sutil entre tarjetas, inputs y módulos. |
| `--color-oyishi-border-accent` | Borde Coral | `rgba(232, 93, 78, 0.35)` | Enfoque activo en campos de formulario y cards seleccionadas. |

---

## 5. SISTEMA DE GRID, ESPACIADO Y RITMO VERTICAL

### 5.1 Contenedores y Márgenes
* **Full Bleed Hero:** `max-w-[1920px] mx-auto`
* **Contenedor Estándar (Home & Secciones):** `max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16`
* **Contenedor Contenido Focado (Reserva / Menú del Día):** `max-w-4xl mx-auto px-4 sm:px-6`

### 5.2 Ritmo Vertical (Espaciado de Secciones)
* **Separación entre Secciones Home:** `py-16 md:py-24 lg:py-32` (100px - 128px entre bloques principales para mantener la respiración editorial).
* **Padding Interno de Cards:** `p-5 md:p-6`.
* **Gap de Rejillas (Grids):** `gap-4 sm:gap-6 lg:gap-8`.

### 5.3 Rejillas Específicas por Sección
* **Grid "Explora OYISHI" (Categorías):** `grid-cols-2 md:grid-cols-4 gap-4 md:gap-6`
* **Grid "Selección OYISHI" (8 destacados Home):** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
* **Grid "Bandejas y Combinados":** `grid-cols-1 lg:grid-cols-2 gap-8`
* **Grid Catálogo `/carta` (155 productos):** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
* **Grid Mobile:** 1 columna con tarjetas horizontales optimizadas o rejilla de 2 columnas compactas sin desbordamiento.

---

## 6. SISTEMA DE HOMOGENEIZACIÓN DE FOTOGRAFÍA DE PRODUCTO

**Problema Detectado:** Las fotos oficiales de los 155 productos presentan variaciones en fondo, iluminación, ángulo y recorte.

**Solución Visual de la Dirección de Arte:** Crear un **módulo estandarizado de presentación fotográfica** que unifique todos los platos sin falsear el producto real.

```
┌────────────────────────────────────────────────────────┐
│  MÓDULO DE FOTOGRAFÍA HOMOGÉNEA                        │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Badge Piezas [8 PCS]   (Esquina Superior Der)    │  │
│  │                                                  │  │
│  │          [FOTO OFICIAL DEL PRODUCTO]             │  │
│  │                                                  │  │
│  │  Fondo: Radial Gradient (#251D18 -> #16110E)     │  │
│  │  Overlay Inferior: Gradient Linear to Black/60   │  │
│  └──────────────────────────────────────────────────┘  │
│  Nombre del Plato                                      │
│  Ingredientes en Taupe                                 │
│  14.50€ (Mono Gold)                       [+ Añadir]   │
└────────────────────────────────────────────────────────┘
```

### Especificación Técnica de Fotografía
1. **Aspect Ratio Estándar:**
   - Tarjetas de Producto (Selección y `/carta`): Proporción fija `aspect-[4/3]` o `aspect-[16/10]`.
   - Tarjetas Hero Combinados (Bandejas): Proporción panorámica `aspect-[16/9]`.
2. **Object-fit & Alignment:**
   - `object-cover` con punto focal `object-center`.
   - Efecto Hover: Ampliación cinematográfica sutil `group-hover:scale-105 transition-transform duration-700 ease-out`.
3. **Fondo de Contenedor Fotográfico Unificador:**
   - Cada caja de imagen lleva un fondo degradado radial predeterminado: `bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#251D18] via-[#1A1410] to-[#120E0C]`.
   - Esto garantiza que tanto platos con fondo blanco como platos recortados o sobre pizarra parezcan integrarse armónicamente sobre un pedestal de granito oscuro.
4. **Gradient Overlay Inferior:**
   - Máscara en degradado en la parte inferior de la imagen: `bg-gradient-to-t from-[#1E1714] via-transparent to-black/20`.
   - Suaviza la transición entre la fotografía y la tarjeta de texto, eliminando recortes bruscos.
5. **Tratamiento de Luz y Sombra:**
   - Sombra ligera de relieve: `drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]`.
   - Sombra de borde interno: `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04)`.

---

## 7. ESPECIFICACIÓN VISUAL DE COMPONENTES CORE

### 7.1 Hero Section
* **Vídeo:** Reproducción en bucle de `oyishi-sushi-build.mp4` cubriendo el 100% de la pantalla.
* **Máscara Visual:** Capa superior con degradado radial oscuro (`radial-gradient(ellipse at center, transparent 20%, #120E0C 85%)`) que funde suavemente los bordes del vídeo con el fondo del sitio.
* **Titular:** Marca **OYISHI** en Serif gigante + Subtítulo *"Japón, servido en Fuenlabrada"*.
* **Botones CTA Hero:** Botón Primario en Coral OYISHI (`"EXPLORAR CARTA"`) + Botón Secundario Outline en Dorado sutil (`"RESERVAR MESA"`).

### 7.2 Sección "Explora OYISHI" (Categorías)
* Tarjetas cuadradas con fondo `#1E1714` y bordes de madera `#2E241F`.
* Foto representativa de categoría con filtro oscuro sutil (`brightness-90`).
* Título de categoría en Display Serif (`text-xl font-serif text-oyishi-text-primary`).
* Indicador de hover: Aparición de una línea fina dorada inferior (`bg-oyishi-gold`) mediante `scale-x-100`.

### 7.3 Product Card ("Selección OYISHI" y Catálogo `/carta`)
* **Contenedor:** Fondo `#1E1714`, borde de 1px `#2E241F`, esquinas ligeramente redondeadas (`rounded-xl` / 12px).
* **Header de Card:** Contenedor fotográfico con aspect ratio `4/3`, fondo degradado radial y badge de piezas/alérgenos en la esquina superior derecha.
* **Cuerpo de Card:**
  - Nombre del producto en Serif (`text-lg font-serif text-oyishi-text-primary group-hover:text-oyishi-gold transition-colors`).
  - Lista de ingredientes en Taupe (`text-xs text-oyishi-text-secondary line-clamp-2`).
  - Fila Inferior: Precio en Mono Gold (`text-lg font-mono text-oyishi-gold`) + Botón compacto de acción `[+ AÑADIR]` en Coral.

### 7.4 Bandejas y Combinados (Hero Cards de Alto Ticket)
* Formato horizontal de doble ancho (Grid 2 columnas).
* Imagen panorámica en `aspect-[16/9]`.
* Etiqueta destacada en Dorado Washi: `IDEAL 2-3 PERSONAS • 32 PIEZAS`.
* Desglose detallado del combo en tipografía UI Sans y precio destacado en gran formato Mono (`38.90€`).

### 7.5 Menú del Día
* Módulo visual inspirado en la estética de los carteles artesanales izakaya.
* Fondo en Carbón Tostado (`#181310`) con marco doble sutil en Dorado Envejecido (`#D8B36A/30`).
* Layout en 3 columnas/bloques: Primeros, Segundos, Postre + Bebida.
* Etiqueta de Horario (`Lunes a Viernes • 13:00 a 16:00`) y Precio Unificado Destacado (`13.95€`).

### 7.6 Formulario de Reserva
* Módulo focado de alta sobriedad en contenedor `#181310`.
* Campos de input limpios con fondo `#120E0C`, borde `#2E241F`, texto Crema (`#F7F2EC`) y foco con borde Coral (`#E85D4E`).
* Selector táctil de Comensales, Fecha y Hora.
* Botón CTA principal de ancho completo: `CONFIRMAR RESERVA EN OYISHI` (Coral OYISHI).

### 7.7 Header & Navegación
* **Estado Hero:** Transparente con texto en Crema y sombra sutil de lectura.
* **Estado Scroll:** Fondo opaco en Carbón Tostado con desfoque sutil (`#120E0C/90 backdrop-blur-md`), borde inferior `#2E241F`.
* **Enlaces:** `text-xs uppercase tracking-[0.2em] font-medium text-oyishi-text-secondary hover:text-oyishi-text-primary`.
* **Acción Directa:** Botón de Carrito con badge flotante Coral.

### 7.8 Footer
* Estructura editorial en 4 columnas.
* Columna 1: Branding OYISHI + Dirección oficial en Fuenlabrada.
* Columna 2: Horarios de Apertura (Almuerzo y Cena).
* Columna 3: Enlaces de Navegación Rápida (`/carta`, Reserva, Menú del Día).
* Columna 4: Redes Sociales y Sello de Calidad.
* Pie de página: Copy de propiedad intelectual y créditos de diseño sobrios.

### 7.9 Botones & Campos de Entrada (Design System UI Elements)
* **Botón Primario:** Fondo Coral OYISHI (`#E85D4E`), texto Crema (`#F7F2EC`), bordes rectos con esquina sutil (`rounded-sm` / 2px), tracking expandido. Estado Hover: `#D44C3D` con suave elevación `translate-y-[-1px]`.
* **Botón Secundario / Ghost:** Fondo transparente, borde de 1px `#D8B36A/40`, texto Dorado Envejecido. Estado Hover: fondo `#D8B36A/10`.
* **Inputs & Selects:** Fondo `#120E0C`, borde `#2E241F`, padding `px-4 py-3`, text `#F7F2EC`. Estado Focus: border `#E85D4E`, sin outline invasivo.

---

## 8. ARQUITECTURA VISUAL DE LA HOME (SECUENCIA DEFINITIVA)

Se mantiene estrictamente la estructura optimizada y validada por la investigación de UX:

```
┌────────────────────────────────────────────────────────┐
│ 1. HERO (Video real + Marca OYISHI + CTAs de Impacto)  │
├────────────────────────────────────────────────────────┤
│ 2. EXPLORA OYISHI (Grid 8 Categorías Visuales Core)    │
├────────────────────────────────────────────────────────┤
│ 3. SELECCIÓN OYISHI (Curaduría 8 Platos Estrella)     │
├────────────────────────────────────────────────────────┤
│ 4. BANDEJAS Y COMBINADOS (Hero Cards Alto Ticket)      │
├────────────────────────────────────────────────────────┤
│ 5. MENÚ DEL DÍA (Módulo Comercial Mediodía)            │
├────────────────────────────────────────────────────────┤
│ 6. RESERVA (Formulario Directo de Alta Conversión)     │
├────────────────────────────────────────────────────────┤
│ 7. UBIACIÓN Y CONTACTO (Fuenlabrada, Horarios, Mapa)   │
├────────────────────────────────────────────────────────┤
│ 8. FOOTER (Branding, Legal y Navegación Secundaria)    │
└────────────────────────────────────────────────────────┘
```

---

## 9. MOTION LANGUAGE (REGLAS Y PRINCIPIOS DE MOVIMIENTO)

> **Nota:** Se definen únicamente los parámetros de movimiento. La implementación en código corresponde al Motion Director.

### Principios Fundamentales
1. **Ceremonial y Sinfónico:** Las animaciones no saltan ni distraen; se mueven con la pausa y elegancia de una ceremonia del té.
2. **Sin Rebotes Elásticos:** Prohibidos los efectos "spring" excesivos o caricaturescos.
3. **Desplazamientos Cortos:** Máximo `12px` a `20px` en el eje Y para revelados de scroll.

### Especificación de Parámetros Motion

| Tipo de Interacción | Duración (ms) | Curva Easing (Bezier) | Descripción del Efecto |
|---|---|---|---|
| **Hover en Botones** | `200ms - 300ms` | `cubic-bezier(0.2, 0, 0, 1)` | Elevación sutil de 1px + cambio cromático fluido. |
| **Hover en Tarjetas** | `400ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Escala de imagen a 1.03 + elevación de sombra de 12px a 24px. |
| **Scroll Reveal (Entradas)** | `700ms - 900ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fade-in suave (`opacity: 0 -> 1`) con desplazamiento `y: 16 -> 0`. |
| **Stagger Children (Grids)** | `80ms` (delay entre cards) | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas escalonadas sutiles en la rejilla de productos. |
| **Transición de Modales** | `350ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fade-in de backdrop + scale `0.98 -> 1.0` de la ventana. |

---

## 10. REGLAS ADAPTATIVAS PARA DISPOSITIVOS MÓVILES (MOBILE SPECIFICATION)

Dado que más del 70% del tráfico proviene de dispositivos móviles:

1. **Áreas Táctiles Cómodas:** Todos los elementos interactivos (botones, chips, iconos de carrito) deben tener un tamaño mínimo de `44px x 44px`.
2. **Tipografía Adaptativa (Clamp):** Los titulares H1 y H2 escalan mediante unidades `clamp()` para evitar cortes de palabra brutales en pantallas de 360px a 390px.
3. **Barra Móvil Fija de Conversión:** En smartphones, el header o la barra inferior ofrece acceso persistente e inmediato a `"CARTA"` y `"VER CARRITO"`.
4. **Navegación por Categorías Horizontal:** En la página `/carta`, la barra de categorías permite scroll horizontal fluido con desplazamiento suave (*touch swipe*).

---

## 11. "NO HACER EN OYISHI" (PATRONES VISUALES PROHIBIDOS)

Para preservar la integridad premium de la marca, queda **estrictamente prohibido**:

* ❌ **NO usar negro puro absoluto (`#000000`)** como fondo general sin matices cálidos de espresso y carbón tostado.
* ❌ **NO usar neones o colores saturados estilo cyberpunk** (verde neón, cian centelleante, violeta eléctrico).
* ❌ **NO caer en "Gold Overload"**: El dorado es un acento sutil para precios y sellos; no usar fondos dorados ni bordes gruesos brillantes estilo casino.
* ❌ **NO usar tipografías manuscritas estilo "brush" o infantiles** para simular letras japonesas.
* ❌ **NO incluir clichés visuales de manga, anime, sushi 3D low-poly** o personajes animados.
* ❌ **NO aplicar glassmorphism desenfocado e indiscriminado** sobre imágenes de comida que le reste contraste o legibilidad al producto real.
* ❌ **NO mezclar más de 2 familias tipográficas** en la plataforma.
* ❌ **NO usar botones con degradados fosforitos** ni sombras duras al estilo de dashboards SaaS corporativos.
* ❌ **NO mostrar imágenes de productos sin el contenedor fotográfico unificador** con degradado radial y gradiente inferior.
* ❌ **NO implementar animaciones intrusivas, lentas o con rebotes elásticos** que dificulten la navegación del usuario.

---

> **FIN DEL DOCUMENTO DE DIRECCIÓN DE ARTE — OYISHI**  
> *Siguiente Fase: Implementación por el equipo de desarrollo y motion conforme a estas especificaciones visuales.*
