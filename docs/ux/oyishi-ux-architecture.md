# OYISHI — Arquitectura UX, Diseño de Navegación & Sistema de Carta

> **Autor:** AGENTE 4 — UX & MENU ARCHITECT  
> **Fecha:** Agosto 2026  
> **Proyecto:** OYISHI — Restaurante Japonés Premium (Fuenlabrada)  
> **Stack:** React + TypeScript + Tailwind CSS + Framer Motion  
> **Catálogo de Referencia:** 155 productos reales | 17 categorías | Home independiente de `/carta`  

---

## 1. RESUMEN EJECUTIVO & PRINCIPIOS UX

El objetivo prioritario de la arquitectura de experiencia de usuario (UX) de **OYISHI** es transformar un catálogo amplio de **155 productos reales** y **17 categorías gastronómicas** en un ecosistema digital intuitivo, ultrarrápido y de alta conversión.

### Principios Fundamentales de UX:
1. **Descubrimiento Activo sin Saturación:** La Home no debe saturar al cliente con 155 productos. Actúa como un escaparate editorial que despierta el apetito y canaliza la intención hacia la acción deseada (Ver Carta, Pedir Online o Reservar).
2. **Navegación Eficiente en 3 Clics:** El usuario debe ser capaz de encontrar cualquier plato específico (ej. *Uramaki Mango* o *Gyozas de carne*) en menos de 5 segundos desde su llegada.
3. **Honestidad Transaccional:** Eliminar toda simulación de reserva o confirmación ficticia. Toda acción del usuario debe traducirse en un flujo real (reserva oficial en `oyishi.es` o comanda directa por WhatsApp).
4. **Mobile-First Real:** Diseñar pensando prioritariamente en interactividad táctil con el pulgar en resoluciones estándar móviles (**390×844** y **430×932**).

---

## 2. ARQUITECTURA & AUDITORÍA DE LA HOME

La Home de OYISHI sigue un ritmo narrativo y comercial cuidadosamente jerarquizado para acompañar al usuario desde la fascinación visual inicial hasta la conversión directa.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARQUITECTURA DE LA HOME                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. HERO (Vídeo Cinematográfico + Overlay Radial + CTAs Principales)    │
│ 2. EXPLORA OYISHI (Grid de 8 Categorías Core con Navegación Filtrada)  │
│ 3. SELECCIÓN OYISHI (Curaduría de Máximo 8 Platos Estrella)            │
│ 4. BANDEJAS Y COMBINADOS (Sección Protagonista de Alto Ticket)         │
│ 5. MENÚ DEL DÍA (Fórmula Mediodía Comercial Lunes a Viernes)           │
│ 6. RESERVA DE MESA (Canalización a Sistema Oficial Real)               │
│ 7. UBICACIÓN Y CONTACTO (Fuenlabrada, Horarios y Google Maps Corregido) │
│ 8. FOOTER EDITORIAL (Branding, Legal y Redes)                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 2.1 Hero Section
* **Objetivo de UX:** Crear impacto visual inmediato (Factor WOW) y establecer el posicionamiento de restaurante japonés premium en Fuenlabrada.
* **Componentes:**
  * Background: Vídeo `oyishi-sushi-build.mp4` en bucle continuo con gradiente radial oscuro (`#120E0C`) que elimina cortes bruscos.
  * Branding: Titular Serif de gran escala **OYISHI** + Tagline *"Japón contemporáneo servido en Fuenlabrada"*.
  * CTAs Directos: 
    * Primario: `"PEDIR ONLINE"` / `"EXPLORAR CARTA"` (Color Coral `#E85D4E`).
    * Secundario: `"RESERVAR MESA"` (Outline Dorado `#D8B36A`).
* **Regla Estricta:** *No modificar `Hero.tsx` en código sin supervisión previa.*

---

### 2.2 Explora OYISHI (Categorías Visuales)
* **Objetivo de UX:** Permitir al usuario visualizar la diversidad del menú de un vistazo sin abrumarlo con los 155 ítems.
* **Selección Estratégica de Categorías (8 Principales en Home):**
  De las 17 categorías reales, se muestran las 8 de mayor demanda y valor visual:
  1. `ENTRANTE` (Gyozas, Rollitos, Edamame)
  2. `ROLL(8piezas)` (California, Spicy Salmon, Dragon)
  3. `URAMAKI(8piezas)` (Aguacate Uramaki, Cheese Bamboo)
  4. `NIGIRI SUSHI(2 piezas)` (Salmón, Atún, Pez Mantequilla)
  5. `TEMPURIZADOS(8 piezas)` (Maki Crispy Salmón, Rock Roll)
  6. `SASHIMI(9 cortes)` (Cortes de Salmón y Atún fresco)
  7. `BANDEJAS Y COMBINADOS` (Bandejas variadas para compartir)
  8. `MENÚ DEL DÍA` (Fórmula mediodía)
* **Comportamiento & Layout:**
  * Grid: 2 columnas en mobile (`grid-cols-2`), 4 columnas en desktop (`md:grid-cols-4`).
  * Interacción: Tarjetas con imagen oficial representativa, overlay oscuro degradado y título en mayúsculas font-mono.
  * Navegación: Cada tarjeta redirecciona a la página de la carta con el parámetro de categoría activo: `/carta?categoria=URAMAKI%288piezas%29`.

---

### 2.3 Selección OYISHI (Curaduría de Platos Estrella)
* **Objetivo de UX:** Presentar una muestra apetitosa y de rápida conversión sin romper la promesa de Home ligera.
* **Límite Estricto:** Máximo 8 productos.
* **Criterio de Selección:**
  * Productos con fotografía oficial verificada (`imageStatus: "official"`).
  * Variedad gastronómica (entrante, roll, uramaki, nigiri, tempurizado, sashimi).
* **Arquitectura de la Card:**
  * **Contenedor Fotográfico:** Aspect ratio `4/3` con pedestal degradado radial oscuro que homogeneiza la imagen.
  * **Información Esencial:**
    * Nombre del plato (Serif).
    * Número de piezas en chip destacado (`"8 Piezas"` / `"2 Piezas"`).
    * Descripción de ingredientes clave (Taupe, 2 líneas max).
    * Badges de Alérgenos verificados (chips monosilábicos compactos).
    * Precio en tipografía Monospace Dorado (`14.50€`).
  * **CTA de Acción Rápidas:** Botón compacto `[+ AÑADIR]` para ingresar el producto directamente al carrito de compras sin salir de la Home.
* **CTA de Cierre de Sección:**
  * Botón destacado: `"VER CARTA COMPLETA (155 PLATOS)"`.
  * Subtexto explicativo: *"Explora los 155 productos y 17 categorías de OYISHI."*

---

### 2.4 Bandejas y Combinados (Sección Protagonista de Alto Ticket)
* **Objetivo de UX:** Maximizar el ticket medio del pedido online elevando las bandejas a un bloque visual de alto impacto.
* **Problema Actual:** Se mostraba como un bloque secundario más en el grid genérico.
* **Propuesta de Mejora UX:**
  * **Formato Hero Card Horizontal:** 2 columnas en desktop con aspecto panorámico (`aspect-[16/9]`).
  * **Badges de Valor:** ETIQUETA DORADA `"IDEAL PARA COMPARTIR • HASTA 32 PIEZAS"`.
  * **Desglose de Piezas:** Especificación clara de lo que incluye la bandeja (ej. *"4 Maki salmón, 4 Maki atún, 8 California roll, 4 Nigiri salmón..."*).
  * **Precio Relevante & CTA:** Precio en gran formato font-mono (`32.95€`) + Botón de ancho completo `[AÑADIR COMBO AL CARRITO]`.

---

### 2.5 Menú del Día (Fórmula Mediodía)
* **Objetivo de UX:** Comunicar de forma clara y directa la oferta comercial para comidas de lunes a viernes.
* **Problema Actual:** Demasiado espacio vacío vertical y falta de detalle sobre la estructura del menú.
* **Propuesta de Mejora UX:**
  * **Contenedor Estilo Izakaya:** Tarjeta en Carbón Tostado (`#181310`) con borde doble sutil en Dorado Envejecido (`#D8B36A/30`).
  * **Claridad en Horarios:** Badge visible `"DISPONIBLE LUNES A VIERNES • 12:00 A 16:30 (EXCEPTO FESTIVOS)"`.
  * **Desglose en 3 Pasos:**
    * `1º PASO`: Entrante / Sopa Miso / Ensalada
    * `2º PASO`: Plato Principal (Sushi Combo / Noodles / Yakisoba)
    * `3º PASO`: Bebida + Postre o Café
  * **Precio Destacado Unificado:** `13.95€` (o según precio oficial del establecimiento).
  * **CTA:** `"VER OPCIONES DE MENÚ DEL DÍA"` -> `/carta?categoria=MENU%20DIA`.

---

### 2.6 Reserva de Mesa (Auditoría & Transparencia Total)
* **PROBLEMA DETECTADO (CRÍTICO):** El formulario actual en `ReservationForm.tsx` simula una confirmación con `setTimeout(800)` mostrando un mensaje de *"Solicitud Recibida"*, cuando **no existe un backend real** en el proyecto para procesar la reserva. Esto genera falsas expectativas en el cliente y reservas perdidas en el restaurante.
* **DECISIÓN ARQUITECTÓNICA UX DE AGENTE 4:**
  1. **Opción A (Recomendada / Enlace Oficial Directo):** 
     Reemplazar la simulación ficticia por un botón primario de alta conversión que redirija al motor oficial de reservas del restaurante: `https://oyishi.es/reservation.php`.
  2. **Opción B (Formulario Integrado con Integración WhatsApp/Mail Real):** 
     Si se mantiene el formulario en pantalla, al pulsar *"Confirmar Reserva"*, en lugar de simular un envío a base de datos inexistente, debe abrir un enlace directo de confirmación por WhatsApp al restaurante (`wa.me/34699365212?text=Solicitud%20Reserva...`) con los datos del formulario (Nombre, Fecha, Hora, Personas) para que el personal del restaurante confirme de forma real.

---

### 2.7 Contacto & Corrección de Google Maps
* **PROBLEMA DETECTADO EN CÓDIGO (`HomePage.tsx`):**
  La URL actual del iframe de Google Maps en la línea 212 es:
  `src="https://www.google.com/maps/embed?pb=!1m18!...!4v1700000000000..."`
  Esta cadena contiene parámetros ficticios que provocan un error de renderizado del mapa (cuadro gris sin mapa interactivo).
* **SOLUCIÓN UX & TÉCNICA:**
  Sustituir el iframe por la dirección embed exacta y verificada de OYISHI en Fuenlabrada:
  `src="https://maps.google.com/maps?q=Calle%20Legan%C3%A9s%2042,%2028945%20Fuenlabrada,%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed"`
  Además, mantener los enlaces de contacto directo mediante `tel:918626221`, `tel:699365212` y `mailto:info@oyishi.es`.

---

## 3. AUDITORÍA & ARQUITECTURA DE LA PÁGINA `/CARTA`

La página `/carta` es el motor de exploración e-commerce de OYISHI. Su arquitectura debe permitir navegar 155 productos con fluidez instantánea.

```
┌────────────────────────────────────────────────────────────────────────┐
│                     ARQUITECTURA DE LA PÁGINA /CARTA                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. HEADER E-COMMERCE (Barra de búsqueda con auto-completado y clear)   │
│ 2. CATEDRAL DE FILTROS (Pills horizontales deslizables + All/17 cats)  │
│ 3. FEEDBACK DE BÚSQUEDA (Contador en tiempo real: "X de 155 productos")│
│ 4. GRID RESPONSIVO (Paginación incremental inteligente: 24 en 24)     │
│ 5. PRODUCT CARDS UNIFICADAS (Aspect Ratio 4:3 + Piezas + Alérgenos)    │
│ 6. CARRO LATERAL PERSISTENTE (Drawer desplegable + Formato WhatsApp)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 3.1 Buscador en Tiempo Real
* **Funcionalidad:** Búsqueda predictiva sin recarga de página.
* **Campos Evaluados:** Coincidencia en `name` (nombre del plato) y `description` (ingredientes).
* **Elementos UX Requeridos:**
  * Icono de lupa alineado a la izquierda.
  * Botón de borrado rápido `[X]` a la derecha cuando el usuario ha escrito texto.
  * Feedback para búsquedas vacías: *"No se encontraron platos que coincidan con '[término]'. Intenta con salmón, tempura o gyozas."*

---

### 3.2 Filtro por Categorías & Sincronización URLSearchParams
* **Listado de Categorías:** `Todos` + las 17 categorías reales (normalizando etiquetas como `ROLL(8piezas)`, `URAMAKI(8piezas)`, etc.).
* **Manejo de URLSearchParams:**
  * Al hacer clic en una categoría (ej. `NIGIRI SUSHI(2 piezas)`), la URL debe actualizarse limpiamente a: `/carta?categoria=NIGIRI%20SUSHI%282%20piezas%29` mediante `window.history.pushState`.
  * Al cargar la página o pulsar el botón atrás/adelante del navegador, la aplicación debe leer `window.location.search` e inicializar el filtro en la categoría correspondiente.
  * Si la categoría es `'Todos'`, el parámetro `categoria` debe eliminarse de la URL para mantenerla limpia (`/carta`).

---

### 3.3 Estrategia de Paginación / "Cargar Más"
* **Problema:** Renderizar 155 tarjetas complejas con imágenes de golpe ralentiza los dispositivos móviles de gama media y empeora los Core Web Vitals (INP y CLS).
* **Solución UX:**
  * Carga inicial limitada a **24 productos**.
  * Botón secundario centrado: `"CARGAR MÁS PRODUCTOS (+24)"`.
  * Contador dinámico: *"Mostrando 24 de 155 productos"*.
  * Reset automático del contador a 24 cuando el usuario cambia de categoría o realiza una búsqueda.

---

### 3.4 Especificación Mobile-First por Resoluciones

```
┌────────────────────────────────────────────────────────────────────────┐
│                   OPTIMIZACIÓN MÓVIL POR RESOLUCIÓN                   │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 390×844 (Standard Mobile)│ Grid de 1 columna (tarjetas anchas) o       │
│                          │ 2 columnas compactas sin texto desbordado.  │
│                          │ Touch targets de botones >= 44px x 44px.    │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 430×932 (Pro Max/Large)  │ Grid de 2 columnas holgado.                 │
│                          │ Barra de categorías sticky con scroll swipe.│
│                          │ Carrito con drawer de 85% de ancho pantalla.│
└──────────────────────────┴─────────────────────────────────────────────┘
```

#### Detalles UX Específicos para 390×844 (iPhone 12/13/14/15):
1. **Grid de Productos:** Tarjeta en formato vertical compacto con padding de `p-4`.
2. **Pills de Categoría:** Scroll horizontal táctil (`overflow-x-auto snap-x`) con padding lateral de `px-4` para evitar que el primer y último elemento queden cortados.
3. **Carrito Drawer:** Ocupa el 100% del ancho del viewport (`w-full`) para máxima comodidad de lectura y modificación de cantidades con el pulgar.

#### Detalles UX Específicos para 430×932 (iPhone Pro Max / Plus):
1. **Grid de Productos:** Rejilla de 2 columnas bien espaciadas (`grid-cols-2 gap-4`).
2. **Altura de Banner:** Ajuste de paddings superiores `pt-28` para compensar la barra de estado y la isla dinámica de iOS.

---

## 4. JERARQUÍA DE CONVERSIÓN & FLUJOS DE USUARIO

Para evitar la fatiga de decisión del cliente y guiarlo hacia la acción comercial, se establece una **jerarquía estricta de llamadas a la acción (CTAs)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        JERARQUÍA OFICIAL DE CTAS                       │
├───────────────────┬────────────────────────────┬───────────────────────┤
│ NIVEL DE ACCIÓN   │ BOTÓN / CTA                │ DESTINO / ACCIÓN      │
├───────────────────┼────────────────────────────┼───────────────────────┤
│ PRIMARIO (Verde)  │ PEDIR POR WHATSAPP         │ wa.me/34699365212     │
│ PRIMARIO (Coral)  │ AÑADIR AL CARRITO / CARTA  │ Drawer Carrito / Carta│
│ SECUNDARIO (Oro)  │ RESERVAR MESA              │ oyishi.es/reservation │
│ SECUNDARIO (Ghost)│ VER DETALLES / FILTRAR     │ Filtro / Pestaña      │
└───────────────────┴────────────────────────────┴───────────────────────┘
```

---

### 4.1 Mapeo de Flujos Principales de Conversión

#### Flujo 1: Home → Exploración por Categoría → Pedido Online
```
[Home] ──> [Explora OYISHI: Click "URAMAKI"] ──> [/carta?categoria=URAMAKI] 
  ──> [Añadir "Uramaki Mango" (+1)] ──> [Abrir Comanda Drawer] ──> [Enviar por WhatsApp]
```

#### Flujo 2: Home → Selección / Combinados → Pedido Rápido
```
[Home] ──> [Bandejas: Click "Añadir Combo"] ──> [Notificación Toast / Counter +1] 
  ──> [Click Icono Carrito] ──> [Verificar Comanda] ──> [Enviar por WhatsApp]
```

#### Flujo 3: Home / Header → Reserva de Mesa Real
```
[Header / Home] ──> [Click "Reservar Mesa"] ──> [Redirección Oficial: oyishi.es/reservation.php] 
  ──> [Confirmación Oficial por Restaurante]
```

---

## 5. MATRIZ DE PRIORIZACIÓN DE MEJORAS (MATRIZ BACKLOG)

Las siguientes mejoras se dividen por su nivel de impacto y urgencia para la siguiente fase de desarrollo:

```
┌────────────────────────────────────────────────────────────────────────┐
│                     MATRIZ DE PRIORIZACIÓN UX OYISHI                   │
└────────────────────────────────────────────────────────────────────────┘
```

### 🔴 BLOCKER (Prioridad Crítica — Corrección Inmediata)
1. **Eliminar Simulación Ficticia de Reservas:** Reemplazar el `setTimeout` engañoso de `ReservationForm.tsx` por una integración transparente (Redirección a `oyishi.es/reservation.php` o envío directo del mensaje a WhatsApp).
2. **Corregir Iframe de Google Maps:** Sustituir la URL rota en `HomePage.tsx` por el embed limpio y funcional de Calle Leganés 42, Fuenlabrada.
3. **Sincronización Bidireccional de URLSearchParams:** Garantizar que navegar por la carta actualice la URL y que abrir una URL con `?categoria=...` seleccione automáticamente la categoría correcta.

---

### 🟠 HIGH (Prioridad Alta — Impacto Comercial Directo)
1. **Visualización de Piezas & Alérgenos en Cards:** Mostrar claramente en cada tarjeta de plato el número de piezas (`pieces`) y los alérgenos con formato de badges limpios.
2. **Bandejas y Combinados como Protagonistas:** Reestructurar la sección en Home para darle formato panorámico de alto ticket con desglose completo del contenido del combo.
3. **Optimizaciones Mobile para 390px y 430px:** Ajustar touch targets (mínimo 44px), implementar scroll horizontal snap en la barra de categorías y asegurar el comportamiento fluido del carrito.
4. **Paginación Incremental (24 ítems):** Evitar la carga masiva de los 155 productos de golpe en `/carta`.

---

### 🟡 MEDIUM (Prioridad Media — Calidad de Experiencia)
1. **Unificación Fotográfica con Pedestal Radial:** Aplicar a los contenedores de imágenes de productos el fondo degradado radial (`#251D18` a `#120E0C`) para integrar imágenes oficiales de fondo blanco y fondos oscuros.
2. **Claridad en la Sección "Menú del Día":** Estructurar el módulo visual en Home con el desglose claro de 3 pases (Entrante, Principal, Postre/Bebida) y horario.
3. **Empty States & Feedback de Búsqueda:** Mensajes claros cuando una búsqueda no devuelve resultados con sugerencias de platos populares.

---

### 🟢 LOW (Prioridad Baja — Pulido & Micro-Interacciones)
1. **Animaciones Staggered de Productos:** Entrada progresiva escalonada de las tarjetas en la carta al hacer scroll (`framer-motion`).
2. **Badge Animado "Abierto Ahora":** Indicador dinámico en el Header según el horario de apertura del restaurante.
3. **Micro-brillo Metallic Shimmer en CTAs Primarios:** Destello de luz suave en el botón de la comanda y ver carta.

---

> **ENTREGABLE CONCLUIDO Y VALIDADO POR AGENTE 4 — UX & MENU ARCHITECT**  
> *Este informe constituye la especificación definitiva para la reestructuración UX y de menú del proyecto OYISHI.*
