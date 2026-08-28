# OYISHI â€” Informe Final de VerificaciÃ³n Post-IntegraciÃ³n

> **AuditorÃ­a de VerificaciÃ³n Independiente (Sin ModificaciÃ³n de CÃ³digo)**
> **Fecha:** 27 de Agosto de 2026
> **Proyecto:** OYISHI â€” Restaurante JaponÃ©s (Fuenlabrada)
> **Entorno:** `npm run dev` (Localhost:5175) & `npm run build`

---

## 1. RESULTADOS DE VERIFICACIÃ“N POR ÃREA

### 1. Carrito & Accesibilidad (`CartModal.tsx`) â€” `OK`
- **Focus Trap:** Listener `keydown` en `CartModal.tsx` intercepta `Tab` y `Shift+Tab` confinando la navegaciÃ³n del foco dentro del modal.
- **Teclado:** La tecla `Escape` cierra la comanda lateral de forma inmediata.
- **RestauraciÃ³n de Foco:** Al cerrar, `previousFocusRef.current` devuelve el foco de navegaciÃ³n al botÃ³n que abriÃ³ el modal.
- **Marcado ARIA:** Atributos `role="dialog"`, `aria-modal="true"` y `aria-labelledby="cart-title"` correctamente implementados.

---

### 2. Touch Targets MÃ³viles (360Ã—800, 390Ã—844, 430Ã—932) â€” `OK`
- **Filtros de CategorÃ­as:** PÃ­ldoras con `min-h-[44px]` e `inline-flex items-center justify-center`.
- **Controles de Carrito:** Botones de cerrar, incremento/decremento (`+`/`-`) y eliminar con dimensiones fijas de `min-w-[44px] min-h-[44px]`.
- **Buscador & Botones "AÃ±adir":** Input con `py-3.5`, botÃ³n de limpiar con `min-w-[44px]` y botones de aÃ±adir producto con `min-h-[44px]`.

---

### 3. Code Splitting & AnÃ¡lisis del Bundle â€” `PROBLEMA`
- **Bundle Inicial (`index-D9aSY-DD.js`):** **423.93 kB** (gzip: 122.94 kB).
- **Chunk de Carta (`CartaPage-D2pA4vvv.js`):** **8.25 kB** (gzip: 2.86 kB).
- **DiagnÃ³stico:** A pesar de importar `CartaPage` con `React.lazy()`, el catÃ¡logo `products.json` (78 kB) y la lÃ³gica de productos se incluyen en el bundle inicial porque `HomePage.tsx` importa `menuData` para la secciÃ³n "SELECCIÃ“N OYISHI".
- **Dependencias en Bundle Principal:** La carga principal (~423.93 kB) proviene de la suma de `framer-motion` (~150 kB), `react-dom` (~130 kB), `lucide-react` (~40 kB) y `products.json` (~78 kB) al no configurarse `manualChunks` en Rollup.

---

### 4. FotografÃ­a & Efecto `mix-blend-lighten` â€” `PROBLEMA`
- **InspecciÃ³n Visual (20+ productos):** El uso de `mix-blend-lighten` para recortar imÃ¡genes de producto con fondo blanco causa alteraciones estÃ©ticas en elementos claros:
  - **Arroz blanco (Shari):** En Nigiris y Rollos (e.g., Nigiri Sake, Nigiri Maguro, California Roll), los granos de arroz claros se vuelven traslÃºcidos revelando el fondo oscuro (`#140F0D`).
  - **Salsas / Queso Crema:** La mayonesa japonesa y el queso crema (Philadelphia Roll) pierden densidad y se desvanecen.
  - **Platos Claras / Bandejas:** Las bandejas de loza o platos claros se funden con el fondo generando bordes borrosos.

---

### 5. Video Hero (`Hero.tsx`) â€” `OK`
- **Archivo:** `public/images/hero/oyishi-sushi-build.mp4`
- **Peso actual:** **4.69 MB** (continÃºa sin recomprimir).
- **Poster:** `public/images/hero/oyishi-sushi-poster.webp` (34.1 kB).
- **Propiedades:** `autoPlay` (**OK**), `muted` (**OK**), `playsInline` (**OK**), `loop={false}` (**OK**).
- **Final Frame:** Al terminar la reproducciÃ³n de 6s, la imagen permanece estÃ¡tica en el Ãºltimo fotograma/poster sin pantallazo negro ni desvanecimiento (**OK**).

---

### 6. URLs Legales â€” `OK`
- **Aviso Legal:** `https://oyishi.es/src/include/cookieshow/aviso-legal.php` (HTTP 200 - OK)
- **Privacidad:** `https://oyishi.es/src/include/cookieshow/politica-de-privacidad.php` (HTTP 200 - OK)
- **Cookies:** `https://oyishi.es/src/include/cookieshow/cookie.php` (HTTP 200 - OK)

---

### 7. JSON-LD Restaurant (`index.html`) â€” `OK`
- Marcado estructurado Schema.org `Restaurant` validado.
- Contiene datos reales: Nombre, DirecciÃ³n (Calle LeganÃ©s 42), TelÃ©fono (`+34918626221`), Email (`info@oyishi.es`) y Horarios de Apertura.
- **Confirmado:** NO incluye `rating`, `reviewCount`, `awards` ni `priceRange` inventado.

---

### 8. Consola & Red (`/` y `/carta`) â€” `OK`
- **Errores JS:** 0
- **Errores 404:** 0
- **Warnings relevantes:** 0

---

### 9. ValidaciÃ³n & CompilaciÃ³n â€” `OK`
- `npm run validate:data`: **OK** (0 errores, 0 duplicados, 155 fotos oficiales validadas).
- `npm run build`: **OK** (CompilaciÃ³n impecable en 4.77s).

---

## 2. MATRIZ RESUMEN FINAL

```text
CARRITO ACCESIBILIDAD: OK
TOUCH TARGETS:          OK
CODE SPLITTING:         PROBLEMA
FOTOGRAFÃAS:            PROBLEMA
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
