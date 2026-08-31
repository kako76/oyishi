# OYISHI — BASE DE CONOCIMIENTO COMPLETA PARA GPT

> Documento generado el 31/08/2026. Contiene toda la arquitectura, código fuente y lógica del proyecto web OYISHI.

---

## 1. VISIÓN GENERAL DEL PROYECTO

**OYISHI** es una aplicación web SPA (Single Page Application) para un restaurante japonés ubicado en Fuenlabrada, Madrid. Permite realizar pedidos online, reservas, y gestión de pedidos tomados por un agente de voz con IA (Retell AI).

- **URL Producción:** https://oyishi.pages.dev / https://oyishi.es
- **Infraestructura:** Cloudflare Pages (frontend) + Cloudflare Pages Functions (backend serverless) + Cloudflare D1 (base de datos SQLite)
- **Repositorio:** kako76/oyishi

---

## 2. STACK TECNOLÓGICO

### Frontend
- **React 19** con TypeScript
- **Vite 8** como bundler
- **TailwindCSS 4** para estilos (configuración personalizada)
- **Framer Motion 13** para animaciones
- **Lucide React** para iconos
- **jsPDF + jspdf-autotable** para exportación de pedidos
- **xlsx** para exportación Excel

### Backend (Cloudflare Pages Functions)
- **TypeScript** en runtime Edge de Cloudflare Workers
- **JWT HS256** implementado manualmente (sin librería, usando Web Crypto API)
- **Cloudflare D1** (SQLite en el edge) para persistencia de pedidos

### Integración IA
- **Retell AI** — Agente de voz "Andrea" que recibe pedidos por llamada telefónica
- Webhook POST autenticado con HMAC-SHA256

---

## 3. ESTRUCTURA DE ARCHIVOS

```
oyishi/
├── src/
│   ├── App.tsx                    # Router SPA principal
│   ├── index.css                  # Estilos globales + Tailwind
│   ├── main.tsx                   # Punto de entrada React
│   ├── components/
│   │   ├── Header.tsx             # Navegación principal
│   │   ├── Footer.tsx             # Pie de página
│   │   ├── Hero.tsx               # Sección hero homepage
│   │   ├── InteractiveMenu.tsx    # Carta con filtros y carrito
│   │   ├── CartModal.tsx          # Modal del carrito de compra
│   │   ├── Toast.tsx              # Notificaciones
│   │   ├── StickyMobileCTA.tsx    # CTA fijo en móvil
│   │   ├── ReservationForm.tsx    # Formulario de reservas
│   │   ├── FeaturedProductsSection.tsx
│   │   ├── AnatomyOfFlavor.tsx
│   │   ├── JapaneseElements.tsx
│   │   └── ImageWithSkeleton.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CartaPage.tsx          # Página de la carta/pedidos
│   │   ├── AdminOrdersPage.tsx    # Panel de administración de pedidos
│   │   ├── QuienesSomosPage.tsx
│   │   ├── ReservasPage.tsx
│   │   ├── ContactoPage.tsx
│   │   ├── AvisoLegalPage.tsx
│   │   ├── PrivacidadPage.tsx
│   │   ├── CookiesPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── data/oyishi/
│   │   ├── index.ts               # Tipos OyishiProduct + exports
│   │   ├── products.json          # ~200 productos con referencias, precios, alérgenos
│   │   ├── restaurant.ts          # Info del restaurante
│   │   └── metadata.json          # URLs fuente de datos
│   ├── store/
│   │   └── CartContext.tsx        # Context API para el carrito
│   ├── hooks/
│   │   ├── useCart.ts             # Hook del carrito
│   │   └── useSEO.ts              # Hook de SEO dinámico
│   ├── services/
│   │   └── adminOrdersService.ts  # Servicio REST para pedidos admin
│   └── utils/
│       ├── navigation.ts          # Navegación SPA
│       ├── motionVariants.ts      # Variantes Framer Motion
│       └── imageUtils.ts          # Validación de imágenes
├── functions/
│   └── api/
│       ├── admin/
│       │   ├── _jwt.ts            # Sign/Verify JWT con Web Crypto
│       │   ├── login.ts           # POST /api/admin/login
│       │   └── orders.ts          # GET/PATCH /api/admin/orders
│       └── webhook/
│           └── retell.ts          # POST /api/webhook/retell
├── public/
│   └── _redirects                 # SPA routing Cloudflare Pages
├── wrangler.jsonc                 # Config Cloudflare Pages
├── tailwind.config.js             # Design tokens
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

## 4. SISTEMA DE DISEÑO

### Colores (Tailwind tokens)
```js
oyishi: {
  bg:          '#120E0C',   // Fondo principal (negro japonés)
  bgSec:       '#181310',   // Fondo secundario (cards)
  card:        '#1E1714',
  cardHover:   '#261E1A',
  gold:        '#D8B36A',   // Dorado principal (acción, destacado)
  goldAlt:     '#C5A059',
  coral:       '#E85D4E',   // Selección de texto
  coralHover:  '#D44C3D',
  wasabi:      '#7CB342',   // Verde acento
  text:        '#F7F2EC',   // Texto principal (crema)
  textSec:     '#B0A69D',   // Texto secundario
  border:      '#2E241F',
}
```

### Tipografías
- **Display:** Cormorant Garamond, Playfair Display, Cinzel, Noto Serif JP
- **Sans:** Inter, Plus Jakarta Sans
- **Mono:** Inter Mono, JetBrains Mono

### CSS Global destacado (`src/index.css`)
- Scrollbar personalizado en dorado al hacer hover
- `.scrollbar-hide` — oculta scrollbar horizontal en barra de categorías
- `.focus-ring` — anillo de foco accesible en dorado
- `.btn-shimmer` — efecto shimmer en CTAs
- `.micro-zoom` — zoom suave en hover (scale 1.04)
- `@media (prefers-reduced-motion: reduce)` — accesibilidad total

---

## 5. ARQUITECTURA SPA (App.tsx)

El router es manual (sin React Router). Usa `window.history.pushState` y el evento `popstate`.

```tsx
// Rutas disponibles:
'/'              → HomePage
'/carta'         → CartaPage  (también '/pedidos' redirige aquí)
'/quienes-somos' → QuienesSomosPage
'/reservas'      → ReservasPage
'/contacto'      → ContactoPage
'/aviso-legal'   → AvisoLegalPage
'/privacidad'    → PrivacidadPage
'/cookies'       → CookiesPage
'/admin/pedidos' → AdminOrdersPage
// cualquier otra → NotFoundPage
```

Todas las páginas se cargan con `React.lazy()` + `Suspense` (code splitting automático).

Las transiciones usan `AnimatePresence` + `motion.div` de Framer Motion (`opacity 0→1, y 8→0, duration 0.35s`).

Se integra con Google Analytics 4 via `window.gtag` en cada cambio de ruta.

---

## 6. MODELO DE DATOS — PRODUCTOS

### Interfaz OyishiProduct
```typescript
interface OyishiProduct {
  id: string;              // ID interno único
  originalId?: string;     // ID del sistema original oyishi.es
  reference?: string;      // Referencia oficial (ej: "41", "41A", "M1")
  name: string;            // Nombre del plato
  category: string;        // Categoría del menú
  description?: string;    // Descripción (opcional)
  pieces?: number;         // Número de piezas
  price: number;           // Precio en euros
  allergens: string[];     // Lista de alérgenos
  allergenStatus: 'verified' | 'unknown';
  imageUrl?: string;       // URL de imagen
  imageStatus: 'official' | 'missing' | 'decorative';
  sourceUrl: string;       // URL de origen
  source: 'oyishi.es';
  verified: boolean;
}
```

### Categorías de la carta (en orden)
1. Todos (virtual)
2. IRI
3. SUSHI (2 piezas)
4. Makis (8 piezas)
5. TEMAKI (1 piezas)
6. Tartar
7. Especiales
8. SASHIMI (9 cortes)
9. KUSHIYAKI (2 piezas)
10. Pastas fritas y plancha
11. Bebidas
12. ... (y más categorías de postres, menús, etc.)

### Info del Restaurante
```typescript
const restaurantInfo = {
  name: "OYISHI",
  tagline: "Gastronomía Japonesa en Fuenlabrada",
  phones: ["918 626 221", "699 365 212"],
  email: "info@oyishi.es",
  address: "Calle Leganés 42, 28945 Fuenlabrada, Madrid",
  schedule: "De Lunes a Domingo: 12:00-16:30 | 19:30-24:00",
};
```

---

## 7. COMPONENTE INTERACTIVEMENU (Carta + Filtros)

Este componente es el núcleo de la experiencia de pedido online.

**Funcionalidades:**
- Búsqueda por nombre, descripción o referencia exacta (evita que "41" coincida con "41A")
- Filtro por categoría con barra horizontal con flechas ← →
- Grid de productos (1 col móvil / 2 md / 3 lg / 4 xl)
- Animaciones de entrada/salida con Framer Motion
- Imagen oficial del plato o placeholder japonés si falta
- Muestra referencia oficial (ej: "41. Salmón Nigiri")
- Muestra alérgenos con badges
- Botón "Añadir" que usa el CarContext

**Barra de categorías con flechas (actualización 31/08/2026):**
```tsx
// Estado de scroll
const scrollRef = useRef<HTMLDivElement>(null);
const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(false);

// updateScrollState: listener pasivo en scroll + ResizeObserver
// scroll(direction): scrollBy({ left: ±200, behavior: 'smooth' })
// Las flechas aparecen/desaparecen con opacity + pointer-events
// Swipe táctil y trackpad siguen funcionando (overflow-x-auto no bloqueado)
```

---

## 8. SISTEMA DE CARRITO (CartContext)

### Estado del carrito
```typescript
interface CartItem extends OyishiProduct {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: OyishiProduct) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  toastMessage: string | null;
  clearToast: () => void;
  badgeAnimationKey: number; // Para animar el badge del carrito
}
```

**Lógica:**
- `addToCart`: si ya existe, incrementa cantidad; si no, lo añade con quantity=1
- `removeFromCart`: filtra el array
- `updateQuantity`: si quantity ≤ 0, llama a removeFromCart
- `totalItems` y `totalPrice` calculados en render (no en estado)
- Al añadir: dispara toast + anima el badge del header

---

## 9. SERVICIO DE PEDIDOS ADMIN (adminOrdersService.ts)

### Modelo RetellOrder
```typescript
interface RetellOrder {
  id: string;              // "ord_<call_id>"
  customer_name: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  order_items: Array<{
    name: string;
    quantity: number;
    price?: number;
    notes?: string;
  }>;
  notes?: string;           // Incluye tipo_pedido, dirección, resumen llamada
  total: number;
  agent_call_id: string;
  created_at: string;       // ISO 8601
  status: 'NUEVO' | 'CONFIRMADO' | 'PREPARANDO' | 'LISTO' | 'COMPLETADO';
}
```

### Endpoints consumidos
| Método | URL | Descripción |
|--------|-----|-------------|
| POST | `/api/admin/login` | Login con contraseña → devuelve JWT |
| GET | `/api/admin/orders` | Lista pedidos (requiere Bearer token) |
| PATCH | `/api/admin/orders` | Actualiza estado de un pedido |
| DELETE | `/api/admin/orders/:id` | Elimina un pedido |

**Autenticación:** JWT almacenado en `localStorage` con clave `oyishi_admin_token`. Si el servidor devuelve 401/403, se hace logout automático y se recarga la página.

---

## 10. CLOUDFLARE PAGES FUNCTIONS — BACKEND

### 10.1 JWT Helper (`functions/api/admin/_jwt.ts`)

Implementación manual de JWT HS256 usando Web Crypto API (nativa en el runtime Edge):

```typescript
// signJWT(payload, secret) → string JWT
// - Header: { alg: 'HS256', typ: 'JWT' }
// - Firma con crypto.subtle.sign HMAC-SHA256
// - Codificación base64url (sin =, + → -, / → _)

// verifyJWT(token, secret) → payload
// - Valida firma HMAC
// - Valida exp (expiración)
// - Valida algoritmo HS256
// - Lanza Error si inválido o expirado
```

Token expira en 24 horas desde emisión.

### 10.2 Login (`functions/api/admin/login.ts`)

**POST /api/admin/login**
- Lee `ADMIN_PASSWORD` de variables de entorno Cloudflare
- Compara con `body.password`
- Si correcto: emite JWT con `{ role: 'admin', iat, exp }`
- Variables requeridas: `ADMIN_PASSWORD`, `JWT_SECRET`

### 10.3 Orders (`functions/api/admin/orders.ts`)

**GET /api/admin/orders** — Requiere Bearer JWT con role=admin
```sql
SELECT * FROM retell_orders ORDER BY created_at DESC LIMIT 100
```
Normaliza `order_items` que puede venir como string JSON o array.

**PATCH /api/admin/orders** — Requiere Bearer JWT con role=admin
```sql
UPDATE retell_orders SET status = ? WHERE id = ?
```

**DELETE /api/admin/orders/:id** — En `functions/api/admin/orders/[id].ts`
```sql
DELETE FROM retell_orders WHERE id = ?
```

### 10.4 Webhook Retell (`functions/api/webhook/retell.ts`)

**POST /api/webhook/retell**

**Verificación de firma HMAC-SHA256:**
1. Lee header `x-retell-signature` → extrae `v=<timestamp>` y `d=<digest>`
2. Verifica que timestamp no tenga más de 5 minutos de antigüedad
3. Verifica HMAC: `HMAC-SHA256(body + timestamp)` con `RETELL_WEBHOOK_SECRET`

**Filtrado de eventos:**
- Solo procesa eventos `call_analyzed`
- Ignora `call_started`, `call_ended`, etc. (evita duplicados)

**Extracción de datos del payload Retell:**
```typescript
// Busca en: payload.data, payload.call, payload.call_analysis.custom_analysis_data
// Campos extraídos:
customer_name  // nombre del cliente
phone          // teléfono (o callData.from_number)
date           // fecha del pedido/reserva
time           // hora
party_size     // comensales (default: 2)
order_items    // array de productos pedidos
tipo_pedido    // 'recoger' o 'domicilio'
direccion      // si es domicilio
localidad
codigo_postal
notes          // notas + resumen de llamada de Retell AI
total          // importe total
```

**Inserción en D1:**
```sql
INSERT OR REPLACE INTO retell_orders 
(id, customer_name, phone, date, time, party_size, 
 order_items, notes, total, agent_call_id, created_at, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
```
- `id` = `ord_<call_id>`
- `status` = `CONFIRMADO` si `call_successful=true`, sino `NUEVO`
- `order_items` se almacena como JSON string

---

## 11. BASE DE DATOS D1 — ESQUEMA

### Tabla `retell_orders`
```sql
CREATE TABLE retell_orders (
  id            TEXT PRIMARY KEY,
  customer_name TEXT,
  phone         TEXT,
  date          TEXT,
  time          TEXT,
  party_size    INTEGER DEFAULT 2,
  order_items   TEXT,      -- JSON array serializado
  notes         TEXT,
  total         REAL DEFAULT 0,
  agent_call_id TEXT,
  created_at    TEXT,
  status        TEXT DEFAULT 'NUEVO'
    CHECK (status IN ('NUEVO','CONFIRMADO','PREPARANDO','LISTO','COMPLETADO'))
);
```

**Binding:** Variable `DB` inyectada por Cloudflare Pages.
**Database name:** `oyishi_db`
**Database ID:** `1cec021b-2859-41df-b143-366b5fa4b245`

---

## 12. CONFIGURACIÓN CLOUDFLARE (`wrangler.jsonc`)

```jsonc
{
  "name": "oyishi",
  "pages_build_output_dir": "./dist",
  "compatibility_date": "2026-08-28",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [{
    "binding": "DB",
    "database_name": "oyishi_db",
    "database_id": "1cec021b-2859-41df-b143-366b5fa4b245"
  }]
}
```

**Variables de entorno en Cloudflare Dashboard (NO en código):**
- `ADMIN_PASSWORD` — Contraseña del panel admin
- `JWT_SECRET` — Secreto para firmar tokens JWT
- `RETELL_WEBHOOK_SECRET` — Secreto HMAC del webhook de Retell AI
- `VITE_GA_MEASUREMENT_ID` — ID de Google Analytics 4

---

## 13. SPA ROUTING — `public/_redirects`

```
/api/*  /api/:splat  200
/*      /index.html  200
```

Esto asegura que todas las rutas del SPA devuelvan `index.html` y las llamadas a `/api/*` sean manejadas por las Pages Functions.

---

## 14. SCRIPTS Y COMANDOS

```bash
npm run dev          # Servidor de desarrollo Vite
npm run build        # tsc -b && vite build
npm run preview      # Vista previa del build
npm run lint         # oxlint
npm run validate:data # Valida estructura de products.json
```

**Build output:** `./dist/` → desplegado automáticamente en Cloudflare Pages al hacer push a main.

---

## 15. AGENTE DE VOZ RETELL AI — "ANDREA"

### Configuración del agente
- **Nombre:** Andrea
- **Idioma:** Español
- **Voz:** Claudia
- **Modelo:** Gemini 3.1 Flash Lite
- **Knowledge base:** "OYISHI - CARTA" (cargada con los productos y referencias)
- **Modo:** Rigid (sin improvisaciones)

### Flujo de conversación
1. **Bienvenida** → Andrea se presenta
2. **Toma de pedido / conversación** → Andrea pregunta por los platos usando las referencias exactas (ej: "41. Salmón Nigiri — 2 piezas")
3. **Confirmación** → Resume el pedido con total, datos del cliente y tipo (recoger/domicilio)

### Datos recopilados por Andrea (custom_analysis_data)
```json
{
  "customer_name": "string",
  "phone": "string",
  "date": "string",
  "time": "string",
  "party_size": "number",
  "order_items": [{"reference": "41", "name": "Salmón Nigiri", "quantity": 2, "price": 3.5}],
  "tipo_pedido": "recoger | domicilio",
  "direccion": "string",
  "localidad": "string",
  "codigo_postal": "string",
  "total": "number",
  "notes": "string"
}
```

---

## 16. PANEL DE ADMINISTRACIÓN (`/admin/pedidos`)

- Login protegido por contraseña (JWT 24h)
- Lista todos los pedidos en tiempo real (polling o manual refresh)
- Estados del pedido: NUEVO → CONFIRMADO → PREPARANDO → LISTO → COMPLETADO
- Exportación de pedidos a PDF (jsPDF) y Excel (xlsx)
- Filtros por fecha y estado
- Eliminación de pedidos individual

---

## 17. REGLAS CRÍTICAS DEL PROYECTO

### NO modificar nunca sin revisión experta:
1. **`functions/api/webhook/retell.ts`** — Verificación HMAC crítica para seguridad
2. **`functions/api/admin/_jwt.ts`** — Implementación JWT
3. **`src/data/oyishi/products.json`** — Datos oficiales de productos (no inventar referencias)
4. **`wrangler.jsonc`** — Configuración de base de datos productiva

### Reglas de referencias de productos:
- Las referencias son alfanuméricas: `"41"`, `"41A"`, `"M1"`, `"S3"`, etc.
- La búsqueda por referencia es **exacta** (no parcial) para evitar que "41" coincida con "41A"
- Nunca inventar referencias que no existan en `products.json`

### Reglas de routing:
- `/pedidos` redirige automáticamente a `/carta` en App.tsx
- El SPA intercepta todos los clicks en `<a>` locales para navegación sin recarga

---

## 18. DEPENDENCIAS PRINCIPALES

```json
{
  "dependencies": {
    "framer-motion": "^13.1.1",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.8",
    "lucide-react": "^1.34.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "tailwindcss": "^4.3.3",
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  }
}
```

---

## 19. HISTORIAL DE CAMBIOS CLAVE

| Fecha | Cambio |
|-------|--------|
| 2026-08-27 | Creación inicial de la SPA con carta interactiva |
| 2026-08-27 | Integración con Retell AI + webhook HMAC |
| 2026-08-28 | Panel admin con D1 + JWT |
| 2026-08-28 | Sistema de arte direction "Japón Contemporáneo Sensorial" |
| 2026-08-29 | Referencias oficiales de productos visibles en carta |
| 2026-08-29 | Configuración del agente Retell "Andrea" con prompt estricto |
| 2026-08-31 | Barra de categorías con flechas ← → de navegación |

---

## 20. INSTRUCCIONES PARA EL GPT

Si eres un GPT creado con este documento, debes:

1. **Conocer toda la arquitectura** de OYISHI descrita aquí.
2. **Nunca inventar** referencias de productos que no estén en el sistema.
3. **Respetar la lógica de negocio** (pedidos por voz, panel admin, flujo de carrito).
4. **Usar el stack tecnológico exacto**: React 19, TypeScript, TailwindCSS 4, Cloudflare Pages.
5. **Mantener el sistema de diseño** con los colores, tipografías y tokens definidos.
6. **No modificar** el webhook Retell ni el sistema JWT sin entender la seguridad implicada.
7. Para cualquier cambio de UI: modificar el componente específico, no reescribir todo.
8. El build se valida con `npm run build` (debe salir Exit code: 0 sin errores TypeScript).
