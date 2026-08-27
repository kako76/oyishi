# OYISHI — Informe Final de Verificación Post-Integración

> **Auditoría de Verificación Independiente (Sin Modificación de Código)**  
> **Fecha:** 27 de Agosto de 2026  
> **Proyecto:** OYISHI — Restaurante Japonés (Fuenlabrada)  
> **Entorno:** `npm run dev` (Localhost:5175) & `npm run build`

---

## 1. RESULTADOS DE VERIFICACIÓN POR ÁREA

### 1. Carrito & Accesibilidad (`CartModal.tsx`) — `OK`
- **Focus Trap:** Listener `keydown` en `CartModal.tsx` intercepta `Tab` y `Shift+Tab` confinando la navegación del foco dentro del modal.
- **Teclado:** La tecla `Escape` cierra la comanda lateral de forma inmediata.
- **Restauración de Foco:** Al cerrar, `previousFocusRef.current` devuelve el foco de navegación al botón que abrió el modal.
- **Marcado ARIA:** Atributos `role="dialog"`, `aria-modal="true"` y `aria-labelledby="cart-title"` correctamente implementados.

---

### 2. Touch Targets Móviles (360×800, 390×844, 430×932) — `OK`
- **Filtros de Categorías:** Píldoras con `min-h-[44px]` e `inline-flex items-center justify-center`.
- **Controles de Carrito:** Botones de cerrar, incremento/decremento (`+`/`-`) y eliminar con dimensiones fijas de `min-w-[44px] min-h-[44px]`.
- **Buscador & Botones "Añadir":** Input con `py-3.5`, botón de limpiar con `min-w-[44px]` y botones de añadir producto con `min-h-[44px]`.

---

### 3. Code Splitting & Análisis del Bundle — `PROBLEMA`
- **Bundle Inicial (`index-D9aSY-DD.js`):** **423.93 kB** (gzip: 122.94 kB).
- **Chunk de Carta (`CartaPage-D2pA4vvv.js`):** **8.25 kB** (gzip: 2.86 kB).
- **Diagnóstico:** A pesar de importar `CartaPage` con `React.lazy()`, el catálogo `products.json` (78 kB) y la lógica de productos se incluyen en el bundle inicial porque `HomePage.tsx` importa `menuData` para la sección "SELECCIÓN OYISHI".
- **Dependencias en Bundle Principal:** La carga principal (~423.93 kB) proviene de la suma de `framer-motion` (~150 kB), `react-dom` (~130 kB), `lucide-react` (~40 kB) y `products.json` (~78 kB) al no configurarse `manualChunks` en Rollup.

---

### 4. Fotografía & Efecto `mix-blend-lighten` — `PROBLEMA`
- **Inspección Visual (20+ productos):** El uso de `mix-blend-lighten` para recortar imágenes de producto con fondo blanco causa alteraciones estéticas en elementos claros:
  - **Arroz blanco (Shari):** En Nigiris y Rollos (e.g., Nigiri Sake, Nigiri Maguro, California Roll), los granos de arroz claros se vuelven traslúcidos revelando el fondo oscuro (`#140F0D`).
  - **Salsas / Queso Crema:** La mayonesa japonesa y el queso crema (Philadelphia Roll) pierden densidad y se desvanecen.
  - **Platos Claras / Bandejas:** Las bandejas de loza o platos claros se funden con el fondo generando bordes borrosos.

---

### 5. Video Hero (`Hero.tsx`) — `OK`
- **Archivo:** `public/images/hero/oyishi-sushi-build.mp4`
- **Peso actual:** **4.69 MB** (continúa sin recomprimir).
- **Poster:** `public/images/hero/oyishi-sushi-poster.webp` (34.1 kB).
- **Propiedades:** `autoPlay` (**OK**), `muted` (**OK**), `playsInline` (**OK**), `loop={false}` (**OK**).
- **Final Frame:** Al terminar la reproducción de 6s, la imagen permanece estática en el último fotograma/poster sin pantallazo negro ni desvanecimiento (**OK**).

---

### 6. URLs Legales — `OK`
- **Aviso Legal:** `https://oyishi.es/src/include/cookieshow/aviso-legal.php` (HTTP 200 - OK)
- **Privacidad:** `https://oyishi.es/src/include/cookieshow/politica-de-privacidad.php` (HTTP 200 - OK)
- **Cookies:** `https://oyishi.es/src/include/cookieshow/cookie.php` (HTTP 200 - OK)

---

### 7. JSON-LD Restaurant (`index.html`) — `OK`
- Marcado estructurado Schema.org `Restaurant` validado.
- Contiene datos reales: Nombre, Dirección (Calle Leganés 42), Teléfono (`+34918626221`), Email (`info@oyishi.es`) y Horarios de Apertura.
- **Confirmado:** NO incluye `rating`, `reviewCount`, `awards` ni `priceRange` inventado.

---

### 8. Consola & Red (`/` y `/carta`) — `OK`
- **Errores JS:** 0
- **Errores 404:** 0
- **Warnings relevantes:** 0

---

### 9. Validación & Compilación — `OK`
- `npm run validate:data`: **OK** (0 errores, 0 duplicados, 155 fotos oficiales validadas).
- `npm run build`: **OK** (Compilación impecable en 4.77s).

---

## 2. MATRIZ RESUMEN FINAL

```text
CARRITO ACCESIBILIDAD: OK
TOUCH TARGETS:          OK
CODE SPLITTING:         PROBLEMA
FOTOGRAFÍAS:            PROBLEMA
VIDEO:                  OK
LEGALES:                OK
JSON-LD:                OK
CONSOLA:                OK
validate:data:          OK
build:                  OK

BLOCKERS: 0
HIGH:     0
MEDIUM:   2
LOW:      0
```
