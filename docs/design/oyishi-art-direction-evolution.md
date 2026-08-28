# OYISHI â€” GuÃ­a Ejecutiva de EvoluciÃ³n a DirecciÃ³n de Arte Premium

> **Director de Arte Digital**
> **Fecha:** Agosto 2026
> **Proyecto:** OYISHI â€” Restaurante JaponÃ©s (Fuenlabrada)
> **Referencia Live:** `https://oyishi.pages.dev/`
> **Objetivo:** EvoluciÃ³n y profesionalizaciÃ³n de la identidad visual actual hacia una estÃ©tica de *Japanese Contemporary Dining* sin cambiar la esencia de la marca.

---

## 1. DIAGNÃ“STICO GENERAL Y FILOSOFÃA DE EVOLUCIÃ“N

### 1.1 FilosofÃ­a de EvoluciÃ³n
No se pretende reinventar la identidad de OYISHI, sino **elevar su pulso visual y gastronÃ³mico**:
* **De:** Una interfaz con toques "SaaS / Tech / App de Delivery" (uso excesivo de fuentes monoespaciadas, badges brillantes, esquinas heterogÃ©neas y contrastes secos).
* **A:** Una **experiencia editorial gastronÃ³mica de alta gama** (*Japanese Contemporary Dining* inspirada en referencias internacionales como *Masa NYC*, *Zuma*, *ROKA* y *Nobu*).

### 1.2 Principales Incoherencias Visuales Detectadas en la Web Actual
1. **Abuso de TipografÃ­a Monospace:** La navegaciÃ³n principal del Header y varios botones utilizan fuentes monoespaciadas tÃ©cnicas que recuerdan a un terminal de cÃ³digo o dashboard.
2. **Efecto "Caja dentro de Caja" en ImÃ¡genes:** FotografÃ­as con fondos claros o recortes variados colocadas sobre tarjetas oscuras crean saltos visuales bruscos.
3. **Carencia de Rigor ArquitectÃ³nico en Esquinas:** Coexisten botones ultra-redondeados (`rounded-full`), tarjetas con `rounded-2xl`, inputs con `rounded-md` y badges sin redondeo.
4. **Falta de RespiraciÃ³n Vertical:** Secciones separadas por solo 64px (`py-16`), lo que apelmaza el contenido en pantallas desktop de alta resoluciÃ³n.
5. **JerarquÃ­a CromÃ¡tica Confusa en CTAs:** Uso del dorado en botones de acciÃ³n principales cuando el dorado debe reservarse para el lujo artesanal y los precios, dejando el **Coral OYISHI** (`#E85D4E`) para la conversiÃ³n comercial.

---

## 2. GUÃA DE EVOLUCIÃ“N POR COMPONENTES Y SECCIONES

### 2.1 Header y NavegaciÃ³n
* **Logotipo OYISHI:**
  - Aumentar el espaciado tipogrÃ¡fico a `tracking-[0.25em]` con peso `font-serif font-semibold`.
  - Simplificar la insignia del kanji `å’Œ`: reducir su prominencia o integrarla en un formato sobrio sin resplandor chillÃ³n.
* **NavegaciÃ³n Desktop:**
  - **Sustituir `font-mono`** por `Inter` Sans-serif en `text-[12px] uppercase tracking-[0.22em] font-medium text-oyishi-textSec hover:text-oyishi-text`.
* **Indicador de Estado ("Abierto"):**
  - Eliminar el parpadeo agresivo `animate-pulse`. Sustituir por un punto esmeralda sutil estÃ¡tico (`w-1.5 h-1.5 bg-emerald-500/80`).
  - Reducir el contenedor a un badge minimalista de baja fricciÃ³n visual.
* **Acciones:**
  - BotÃ³n de Carrito con badge Coral flotante sobrio (`#E85D4E`).
  - BotÃ³n de telÃ©fono: marco fino en Taupe (`#2E241F`) con icono dorado en `size={14}`.

### 2.2 Hero Section
* **Tratamiento del Titular:**
  - Titular principal **OYISHI** en Serif Display Light (`font-light`), `clamp(4.25rem, 10.5vw, 11rem)`, `leading-[0.85]`, `tracking-tight`.
* **SubtÃ­tulo GastronÃ³mico:**
  - Cambiar el subtÃ­tulo a Sans-serif limpia en color Taupe CÃ¡lido (`#C6BEB5`), abandonando el formato monoespaciado en la frase descriptiva.
* **IntegraciÃ³n del VÃ­deo / Imagen Hero:**
  - Aplicar una mÃ¡scara de degradado lateral en el contenedor derecho (`bg-gradient-to-r from-[#120E0C] via-transparent to-transparent`) para que la fotografÃ­a/vÃ­deo se fundan gradualmente con el fondo oscuro del Hero.
* **Botones CTA del Hero:**
  - **Primario ("VER CARTA"):** Fondo Coral OYISHI (`#E85D4E`), texto Crema (`#F7F2EC`), esquinas rectangulares sobrias (`rounded-sm` / 2px), `tracking-[0.2em]`.
  - **Secundario ("RESERVAR MESA"):** Fondo transparente, borde de 1px en Dorado Envejecido (`#D8B36A/40`), texto Dorado (`#D8B36A`), hover con suave relleno `rgba(216,179,106,0.08)`.

### 2.3 SecciÃ³n de CategorÃ­as ("Explora OYISHI")
* **Formato de Nombres de CategorÃ­a:**
  - Corregir strings en mayÃºsculas apelmazadas sin espacios (`ROLL(8PIEZAS)` $\rightarrow$ `Rolls (8 piezas)`).
* **Tratamiento de Tarjetas:**
  - AÃ±adir fotografÃ­a oficial con fondo de piedra sumi (`bg-radial from-[#251D18] to-[#120E0C]`) a **todas** las tarjetas de categorÃ­a (incluyendo "MenÃºs" y "Bandejas").
  - Cambiar el radio de esquina a `rounded-lg` (8px) con borde sutil `#2E241F`.
  - Hover: ApariciÃ³n de una fina lÃ­nea dorada inferior (`bg-oyishi-gold`) con `scale-x-100`.

### 2.4 Tarjetas de Productos ("SelecciÃ³n OYISHI" & `/carta`)
* **MÃ³dulo FotogrÃ¡fico Unificado:**
  - Marco en `aspect-[4/3]` con fondo degradado radial interno `from-[#251D18] to-[#16110E]` y sombra ligera de relieve `drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]`.
  - Gradient overlay en la base de la foto (`from-[#1E1714] to-transparent`) para suavizar el corte con el texto.
* **Nombres de Producto:**
  - Serif elegante (`font-serif text-lg text-oyishi-text group-hover:text-oyishi-gold transition-colors`).
* **Precios:**
  - Monospace Dorado (`font-mono text-oyishi-gold text-lg font-medium`), aÃ±adiendo un espacio fino antes del sÃ­mbolo (`14.50 â‚¬`).
* **Badges & AlÃ©rgenos:**
  - Micro-chips de texto sutiles con borde transparente/Taupe, eliminando parches negros planos.
* **BotÃ³n AÃ±adir:**
  - BotÃ³n compacto `+ AÃ‘ADIR` en Coral OYISHI (`#E85D4E`), `text-[10px] tracking-widest font-semibold uppercase`.

### 2.5 Bandejas y Combinados (Hero Cards de Alto Ticket)
* **EstÃ©tica Nocturna Tenebrista:**
  - Eliminar el degradado blanco/brillante superior. Reemplazarlo por una iluminaciÃ³n cenital sobre fondo `#1E1714`.
* **Formato de Ingredientes:**
  - Limpiar listas con comillas huÃ©rfanas (`â€œ 8maki salmon 8ma...`). Presentar desglose formateado separado por puntos neutros (`8 Maki SalmÃ³n â€¢ 8 Uramaki California â€¢ 4 Nigiri SalmÃ³n`).
* **Badge de Formato:**
  - `IDEAL 2-3 PERSONAS Â· 32 PIEZAS` en Dorado Washi (`#D8B36A`).

### 2.6 MenÃº del DÃ­a
* **DiseÃ±o Tipo Izakaya Artesanal:**
  - Contenedor en CarbÃ³n Tostado (`#181310`) con marco fino doble en Dorado Envejecido (`#D8B36A/30`).
  - Sustituir cÃ­rculos dorados con checkmarks genÃ©ricos por guiones finos o viÃ±etas neutras.
* **FotografÃ­a Columna Derecha:**
  - Sustituir la repeticiÃ³n del kanji `å’Œ` por una foto gastronÃ³mica de alta calidad del menÃº (bento/sushi con luz de estudio).

### 2.7 SecciÃ³n de Reservas
* **BotonerÃ­a y Formulario:**
  - BotÃ³n CTA principal: `CONFIRMAR RESERVA EN OYISHI` en **Coral OYISHI** (`#E85D4E`).
  - Inputs con fondo `#120E0C`, borde `#2E241F`, texto Crema (`#F7F2EC`) y estado focus en Coral (`border-[#E85D4E]`).

### 2.8 Footer y Google Maps
* **IntegraciÃ³n del Mapa:**
  - Aplicar filtro CSS nocturno al iframe: `contrast-[1.05] brightness-[0.85] grayscale-[0.8] invert-[0.9] hue-rotate-[180deg]`.
* **Estructura del Footer:**
  - 4 columnas limpias con jerarquÃ­a homogÃ©nea: Marca & Fuenlabrada, Horarios, Carta & Reservas, Legal.

---

## 3. SISTEMA DE DESIGN TOKENS Y ESTÃNDARES VISUALES

### 3.1 Paleta de Color Oficial

| Token CSS | Color Visual | Hex / RGBA | Uso Exclusivo |
|---|---|---|---|
| `--color-oyishi-bg-base` | Espresso Sumi | `#120E0C` | Fondo general de la web y body. |
| `--color-oyishi-bg-surface` | CarbÃ³n Tostado | `#181310` | Superficies secundarias (MenÃº DÃ­a, Drawers, Reservas). |
| `--color-oyishi-bg-card` | Piedra VolcÃ¡nica | `#1E1714` | Tarjetas de producto y contenedores. |
| `--color-oyishi-coral` | Coral OYISHI | `#E85D4E` | Botones primarios de conversiÃ³n, badges activos. |
| `--color-oyishi-gold` | Dorado Envejecido | `#D8B36A` | Precios, sellos artesanales, acentos tipogrÃ¡ficos. |
| `--color-oyishi-text-primary` | Crema Sedoso | `#F7F2EC` | Titulares y nombres de platos. |
| `--color-oyishi-text-secondary` | Taupe CÃ¡lido | `#B0A69D` | Descripciones de ingredientes y subtextos. |
| `--color-oyishi-border` | Borde Madera Oscura | `#2E241F` | Separaciones y marcos de tarjetas. |

### 3.2 EstÃ¡ndar de Esquinas (Corner Radius Rules)
* **Botones Comerciales y Badges:** `rounded-sm` (2px - 4px) para sobriedad arquitectÃ³nica japonesa.
* **Tarjetas y Modales:** `rounded-lg` o `rounded-xl` (8px - 12px).
* **Queda prohibido:** Usar botones de conversiÃ³n tipo pÃ­ldora (`rounded-full`) salvo en avatares o badges circulares especÃ­ficos.

### 3.3 Ritmo Vertical y Espaciado (Vertical Rhythm)
* SeparaciÃ³n entre secciones principales en Desktop: `py-24` a `py-28` (96px a 112px).
* Spacing interno de tarjetas: `p-5 md:p-6`.

---

## 4. REGLAS ESPECÃFICAS PARA DISPOSITIVOS MÃ“VILES (MOBILE SPECIFICATION)

1. **Carrusel de CategorÃ­as Horizontal:** En smartphones, la cuadrÃ­cula de 2 columnas apretadas se convierte en un carrusel con scroll horizontal tÃ¡ctil (*touch-swipe*) y tarjetas de `w-[160px]`.
2. **Ãrea TÃ¡ctil CÃ³moda:** MÃ­nimo `44px x 44px` en todos los botones e iconos interactivos.
3. **Barra MÃ³vil Fija de ConversiÃ³n (Sticky Mobile CTA):** En smartphones, barra discreta inferior con acceso persistente a `VER CARTA` y `RESERVAR`.

---

> **FIN DE LA GUÃA DE EVOLUCIÃ“N DE DIRECCIÃ“N DE ARTE DIGITAL**
> *Esta guÃ­a proporciona la hoja de ruta visual exacta para la siguiente fase de refactorizaciÃ³n de interfaz.*
