# OYISHI â€” EspecificaciÃ³n TÃ©cnica del Sistema de Motion y Microinteracciones

> **Rol:** AGENTE 3 â€” MOTION DIRECTOR
> **Proyecto:** OYISHI â€” Restaurante JaponÃ©s Premium (Fuenlabrada)
> **URL:** https://oyishi.pages.dev/
> **Stack Objetivo:** Framer Motion 10+ / Tailwind CSS 3.4+ / React 18+
> **Estado:** Documento de EspecificaciÃ³n TÃ©cnica Completa (Para Agente de ImplementaciÃ³n)
> **Regla de Oro:** **NO MODIFICAR CÃ“DIGO EN ESTA FASE.** Animaciones sutiles, elegantes, orientadas al rendimiento y accesibilidad.

---

## 1. FILOSOFÃA Y DIRECTRICES DE DISEÃ‘O DE MOVIMIENTO

El lenguaje de movimiento de OYISHI representa el concepto **"JapÃ³n ContemporÃ¡neo Sensorial"** (*Wabi-Sabi Moderno*).

### Principios Fundamentales:
1. **Sutileza y RestricciÃ³n Elegante:** Cero sobrecarga visual. Las animaciones acompaÃ±an la experiencia sin robar protagonismo a los 155 platos reales ni al apetito visual del cliente.
2. **Cadencia GastronÃ³mica:** Movimientos pausados, fluidos y fluidos en entradas de contenido (0.4s a 0.8s); microinteracciones inmediatas y precisas en respuesta tÃ¡ctil/cursor (0.15s a 0.3s).
3. **Curvas de Easing Curadas (Luxe Bezier):**
   - **Entradas y Revelados:** `cubic-bezier(0.16, 1, 0.3, 1)` (*Luxe Ease Out* â€” desaceleraciÃ³n suave estilo Apple/Hospitality Premium).
   - **Salidas y Modales:** `cubic-bezier(0.7, 0, 0.84, 0)` (*Fast Ease In*).
   - **Interacciones TÃ¡ctiles / Drawer:** `spring` controlado sin rebote (*Stiffness: 250, Damping: 28, Mass: 1*).
4. **Presupuesto de Rendimiento (Performance Budget):**
   - **Framerate:** 60 FPS garantizados tanto en desktop como en dispositivos mÃ³viles.
   - **Hardware Acceleration:** Uso exclusivo de propiedades compuestas en GPU: `transform` (`translate3d`, `scale`) y `opacity`. Cero animaciÃ³n de propiedades con reflow (`width`, `height`, `margin`, `padding`, `top`, `left`).
   - **Composite Layers:** Utilizar `transform-gpu` y `will-change: transform, opacity` en elementos crÃ­ticos.

---

## 2. REQUISITOS DE ACCESIBILIDAD Y RENDIMIENTO MÃ“VIL

### A. Soporte Obligatorio `prefers-reduced-motion`
Cualquier componente animado debe consultar `useReducedMotion()` de Framer Motion o aplicar la regla global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### B. OptimizaciÃ³n EspecÃ­fica para MÃ³vil
- DesactivaciÃ³n de efectos Parallax y micro-zooms en pantallas con ancho `< 768px` para evitar lag y sobrecalentamiento de procesadores mÃ³viles.
- SustituciÃ³n de animaciones por letra o por Ã­tem individual por apariciones en bloque agrupado.
- Reemplazo de hovers de cursor por feedback tÃ¡ctil al pulsar (`:active` con `scale(0.98)` durante 100ms).

---

## 3. ESPECIFICACIÃ“N DETALLADA POR COMPONENTE Y SECCIÃ“N

A continuaciÃ³n se detallan las **14 Ã¡reas del sistema de motion** con cÃ³digo tÃ©cnico listo para ser consumido por el agente de implementaciÃ³n.

---

### 3.1. HERO SECTION (`Hero.tsx`)
* **VÃ­deo Background:** Mantiene reproducciÃ³n nativa silenciada (`oyishi-sushi-build.mp4`). El contenedor aplica un fundido de entrada inicial.
* **Titular "OYISHI" (Editorial Display):** Revelado progresivo con mÃ¡scara `clip-path` y escalonamiento (*stagger*) sutil.
* **SubtÃ­tulo & CTAs:** Fade-up vertical pausado.

#### EspecificaciÃ³n Framer Motion (Variantes):
```typescript
// Contenedor principal con stagger
export const heroContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Revelado de caracteres (Desktop)
export const heroLetterVariant = {
  hidden: {
    y: '100%',
    opacity: 0,
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
  },
  visible: {
    y: '0%',
    opacity: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade-up para subtÃ­tulo y CTAs
export const heroFadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
```
* **Reduced Motion:** El texto aparece de forma estÃ¡tica con `opacity: 1` en 0.2s sin `clip-path` ni `y`.

---

### 3.2. NAVEGACIÃ“N (`Header.tsx`)
* **Header Sticky Scroll:** Pasa de transparente a cristal esmerilado al superar 50px de scroll.
* **Links de MenÃº:** Subrayado sutil central que se expande horizontalmente en hover (`scaleX: 0 -> 1`).
* **MenÃº MÃ³vil Overlay:** TransiciÃ³n de cortina sutil desde arriba con desenfoque de fondo.

#### EspecificaciÃ³n TÃ©cnica:
```typescript
// TransiciÃ³n de Header al hacer scroll
// CSS / Tailwind: transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
// Estado Scrolled: bg-[#140F0C]/85 backdrop-blur-md py-3 border-b border-white/[0.04] shadow-2xl

// MenÃº MÃ³vil AnimatePresence
export const mobileMenuVariant = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};
```

---

### 3.3. APARICIÃ“N DE SECCIONES (Scroll Viewport Reveal)
* **Trigger:** Las secciones clave ("EXPLORA OYISHI", "SELECCIÃ“N OYISHI", "BANDEJAS", "MENÃš DEL DÃA", "RESERVAS") aparecen suavemente al entrar en el viewport.
* **ConfiguraciÃ³n Viewport:** `whileInView="visible" viewport={{ once: true, amount: 0.2 }}`.

#### EspecificaciÃ³n Framer Motion:
```typescript
export const sectionFadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
```

---

### 3.4. CARDS DE PRODUCTOS Y BANDEJAS
* **Grid de Productos ("SELECCIÃ“N OYISHI" y `/carta`):** Entrada escalonada (*stagger*) para los Ã­tems visibles en pantalla.
* **Contenedor:** ElevaciÃ³n sutil de la tarjeta (`translateY(-4px)`), cambio de borde a dorado Wasabi sutil (`rgba(216,179,106,0.3)`).

#### EspecificaciÃ³n Framer Motion:
```typescript
export const cardGridStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const cardItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
```

---

### 3.5. HOVER DE PRODUCTOS E IMÃGENES
* **Efecto Foto:** Micro-zoom cinematogrÃ¡fico muy lento y pausado al colocar el cursor sobre el contenedor de imagen.
* **TransformaciÃ³n:** `scale(1.04)` con `duration-700 ease-out`.

#### EspecificaciÃ³n CSS / Tailwind:
```html
<div className="overflow-hidden">
  <img
    src="..."
    alt="..."
    className="w-full h-full object-cover transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
  />
</div>
```

---

### 3.6. BOTONES Y ACCIONES (`CTA Buttons`)
* **MicrointeracciÃ³n Hover:** ElevaciÃ³n de 2px (`translateY(-2px)`), brillo de resplandor en sombra.
* **Iconos Intermediarios:** El icono `Plus` de aÃ±adir rota 90Â° suavemente (`rotate-90 duration-300`). Flechas de navegaciÃ³n se desplazan 4px a la derecha (`group-hover:translate-x-1`).
* **Active Feedback (MÃ³vil):** `active:scale-[0.98] transition-transform duration-100`.

#### EspecificaciÃ³n CSS / Motion:
```css
/* RÃ¡faga Shimmer MetÃ¡lica Sutil (Para CTAs Primarios como "VER CARTA" / "RESERVAR") */
@keyframes shimmerSweep {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}

.btn-shimmer-effect {
  position: relative;
  overflow: hidden;
}

.btn-shimmer-effect::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 50%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transform: rotate(25deg);
  animation: shimmerSweep 4s infinite ease-in-out;
}
```

---

### 3.7. AÃ‘ADIR A COMANDA (MicrointeracciÃ³n de AcciÃ³n)
* **Comportamiento:** Al pulsar "+ AÃ±adir":
  1. El botÃ³n de la tarjeta emite un breve pulso de escala `scale(0.96) -> scale(1.0)`.
  2. El badge del icono de carrito en la cabecera realiza un efecto *Pop* (`scale(1) -> scale(1.35) -> scale(1)`).
  3. Muestra una micro-notificaciÃ³n flotante (Toast) en la esquina inferior izquierda: *"AÃ±adido: [Nombre del plato]"*.

#### EspecificaciÃ³n Framer Motion (Badge Counter):
```typescript
export const cartBadgePop = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.35, 1],
    transition: { duration: 0.35, ease: 'easeOut' }
  }
};
```

---

### 3.8. CARRITO Y DRAWER (`CartModal.tsx`)
* **Backdrop (TelÃ³n de fondo):** Fade-in suave de `opacity: 0 -> 1` con `backdrop-blur-sm` (0.3s).
* **Drawer Lateral:** Deslizamiento horizontal desde la derecha con fÃ­sica de muelle amortiguado.
* **EliminaciÃ³n de Elemento:** DisoluciÃ³n en altura y opacidad (`opacity: 0`, `height: 0`, `marginBottom: 0`).

#### EspecificaciÃ³n Framer Motion:
```typescript
export const drawerVariant = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 28 }
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] }
  }
};

export const cartItemRemoveVariant = {
  initial: { opacity: 1, height: 'auto' },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
};
```

---

### 3.9. CAMBIO DE CATEGORÃAS (Filtros en `/carta`)
* **TransiciÃ³n de PÃ­ldora Activa:** Utiliza `layoutId="activeCategoryPill"` de Framer Motion para deslizar el fondo dorado Wasabi entre botones de categorÃ­a con suavidad perfecta.
* **ReorganizaciÃ³n del Grid:** La cuadrÃ­cula de productos filtra los elementos manteniendo las animaciones de `layout`.

#### EspecificaciÃ³n Framer Motion:
```tsx
// Ejemplo de botÃ³n de filtro
<button onClick={() => setActiveCategory(cat)} className="relative px-6 py-2">
  {activeCategory === cat && (
    <motion.div
      layoutId="activeCategoryPill"
      className="absolute inset-0 bg-oyishi-gold rounded-full shadow-[0_0_15px_rgba(216,179,106,0.3)]"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  )}
  <span className="relative z-10 font-mono text-sm">{cat}</span>
</button>
```

---

### 3.10. FORMULARIO DE RESERVAS (`ReservationForm.tsx`)
* **Foco en Campos Input:** Resplandor progresivo del borde (`border-oyishi-gold` con `shadow-[0_0_10px_rgba(216,179,106,0.15)]`).
* **ConfirmaciÃ³n de EnvÃ­o:** TransiciÃ³n suave al estado de Ã©xito mediante `AnimatePresence`. El icono de verificaciÃ³n `âœ“` se escala desde `0.5` a `1.0` con fade-in.

#### EspecificaciÃ³n Framer Motion:
```typescript
export const reservationSuccessVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export const checkmarkScale = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }
  }
};
```

---

### 3.11. SCROLL Y PARALLAX CONTROLADO
* **Scroll Nativo:** Se prohÃ­be el uso de scroll-jacking. El scroll principal es 100% nativo del navegador.
* **Parallax Suave (Desktop):** Ãšnicamente en elementos decorativos ligeros (como el texto del Hero con `useTransform(scrollY, [0, 400], [0, -50])`). Deshabilitado en dispositivos mÃ³viles.

---

### 3.12. TRATAMIENTO Y CARGA DE IMÃGENES
* **Carga Progresiva (Blur-Up):** Las tarjetas de producto muestran un contenedor `#191310` con efecto Skeleton sutil mientras se descarga la imagen WebP.
* **Entrada de Imagen:** Al completarse la carga (`onLoad`), la imagen pasa de `opacity: 0` a `opacity: 1` en 0.4s.

#### EspecificaciÃ³n React Component Pattern:
```tsx
const [isLoaded, setIsLoaded] = useState(false);

<div className="relative bg-[#191310] overflow-hidden">
  {!isLoaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
  <img
    src={imageUrl}
    alt={name}
    onLoad={() => setIsLoaded(true)}
    className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
  />
</div>
```

---

### 3.13. ESTADOS DE CARGA (Skeletons & Loaders)
* **Skeleton Pulse:** AnimaciÃ³n de respiraciÃ³n muy tenue sobre contenedores neutros `#1F1815`:
  `animate-pulse` con opacidad variante entre `0.4` y `0.8`.
* **Loader de BÃºsqueda / BotÃ³n "Cargar MÃ¡s":** Spinner circular fino en tono Wasabi Gold (`border-2 border-oyishi-gold/20 border-t-oyishi-gold animate-spin`).

---

### 3.14. CONFIRMACIONES Y NOTIFICACIONES (Feedback System)
* **Toast de ConfirmaciÃ³n de Comanda:** Aparece en la parte inferior central (`translateY(20px -> 0px)`, `opacity: 0 -> 1`).
* **Auto-DesapariciÃ³n:** Permanece visible 2.5 segundos y se retira mediante fade-out.

#### EspecificaciÃ³n Framer Motion (Toast):
```typescript
export const toastNotificationVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
};
```

---

## 4. MATRIZ RESUMEN DE TIEMPOS Y EASINGS

| CategorÃ­a | DuraciÃ³n Entrada | DuraciÃ³n Salida | Easing Predeterminado |
|---|---|---|---|
| **PÃ¡ginas / Secciones** | 0.7s â€“ 1.0s | N/A | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Tarjetas / Grids** | 0.5s â€“ 0.6s | 0.3s | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Modales / Drawer** | 0.4s | 0.3s | `spring` / `easeIn` |
| **Microinteracciones Botones** | 0.15s â€“ 0.3s | 0.15s | `easeOut` |
| **Toasts & Badges** | 0.3s | 0.2s | `cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 5. INSTRUCCIONES PARA EL AGENTE DE IMPLEMENTACIÃ“N

Cuando se inicie la fase de codificaciÃ³n:
1. Crear el archivo `src/utils/motionVariants.ts` exportando todas las constantes de animaciÃ³n definidas en este documento.
2. Aplicar `motion.div` / `motion.section` en `HomePage.tsx` y `CartaPage.tsx` integrando los triggers `whileInView` con `viewport={{ once: true }}`.
3. Actualizar `Header.tsx`, `CartModal.tsx` y `ReservationForm.tsx` con las especificaciones de Framer Motion.
4. Verificar en Google Chrome Lighthouse que los indicadores Core Web Vitals (LCP, INP, CLS) permanezcan intactos.
