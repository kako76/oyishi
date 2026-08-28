# OYISHI â€” Arquitectura UX, DiseÃ±o de NavegaciÃ³n & Sistema de Carta

> **Autor:** AGENTE 4 â€” UX & MENU ARCHITECT
> **Fecha:** Agosto 2026
> **Proyecto:** OYISHI â€” Restaurante JaponÃ©s Premium (Fuenlabrada)
> **Stack:** React + TypeScript + Tailwind CSS + Framer Motion
> **CatÃ¡logo de Referencia:** 155 productos reales | 17 categorÃ­as | Home independiente de `/carta`

---

## 1. RESUMEN EJECUTIVO & PRINCIPIOS UX

El objetivo prioritario de la arquitectura de experiencia de usuario (UX) de **OYISHI** es transformar un catÃ¡logo amplio de **155 productos reales** y **17 categorÃ­as gastronÃ³micas** en un ecosistema digital intuitivo, ultrarrÃ¡pido y de alta conversiÃ³n.

### Principios Fundamentales de UX:
1. **Descubrimiento Activo sin SaturaciÃ³n:** La Home no debe saturar al cliente con 155 productos. ActÃºa como un escaparate editorial que despierta el apetito y canaliza la intenciÃ³n hacia la acciÃ³n deseada (Ver Carta, Pedir Online o Reservar).
2. **NavegaciÃ³n Eficiente en 3 Clics:** El usuario debe ser capaz de encontrar cualquier plato especÃ­fico (ej. *Uramaki Mango* o *Gyozas de carne*) en menos de 5 segundos desde su llegada.
3. **Honestidad Transaccional:** Eliminar toda simulaciÃ³n de reserva o confirmaciÃ³n ficticia. Toda acciÃ³n del usuario debe traducirse en un flujo real (reserva oficial en `oyishi.es` o comanda directa por WhatsApp).
4. **Mobile-First Real:** DiseÃ±ar pensando prioritariamente en interactividad tÃ¡ctil con el pulgar en resoluciones estÃ¡ndar mÃ³viles (**390Ã—844** y **430Ã—932**).

---

## 2. ARQUITECTURA & AUDITORÃA DE LA HOME

La Home de OYISHI sigue un ritmo narrativo y comercial cuidadosamente jerarquizado para acompaÃ±ar al usuario desde la fascinaciÃ³n visual inicial hasta la conversiÃ³n directa.

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        ARQUITECTURA DE LA HOME                         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 1. HERO (VÃ­deo CinematogrÃ¡fico + Overlay Radial + CTAs Principales)    â”‚
â”‚ 2. EXPLORA OYISHI (Grid de 8 CategorÃ­as Core con NavegaciÃ³n Filtrada)  â”‚
â”‚ 3. SELECCIÃ“N OYISHI (CuradurÃ­a de MÃ¡ximo 8 Platos Estrella)            â”‚
â”‚ 4. BANDEJAS Y COMBINADOS (SecciÃ³n Protagonista de Alto Ticket)         â”‚
â”‚ 5. MENÃš DEL DÃA (FÃ³rmula MediodÃ­a Comercial Lunes a Viernes)           â”‚
â”‚ 6. RESERVA DE MESA (CanalizaciÃ³n a Sistema Oficial Real)               â”‚
â”‚ 7. UBICACIÃ“N Y CONTACTO (Fuenlabrada, Horarios y Google Maps Corregido) â”‚
â”‚ 8. FOOTER EDITORIAL (Branding, Legal y Redes)                          â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

### 2.1 Hero Section
* **Objetivo de UX:** Crear impacto visual inmediato (Factor WOW) y establecer el posicionamiento de restaurante japonÃ©s premium en Fuenlabrada.
* **Componentes:**
  * Background: VÃ­deo `oyishi-sushi-build.mp4` en bucle continuo con gradiente radial oscuro (`#120E0C`) que elimina cortes bruscos.
  * Branding: Titular Serif de gran escala **OYISHI** + Tagline *"JapÃ³n contemporÃ¡neo servido en Fuenlabrada"*.
  * CTAs Directos:
    * Primario: `"PEDIR ONLINE"` / `"EXPLORAR CARTA"` (Color Coral `#E85D4E`).
    * Secundario: `"RESERVAR MESA"` (Outline Dorado `#D8B36A`).
* **Regla Estricta:** *No modificar `Hero.tsx` en cÃ³digo sin supervisiÃ³n previa.*

---

### 2.2 Explora OYISHI (CategorÃ­as Visuales)
* **Objetivo de UX:** Permitir al usuario visualizar la diversidad del menÃº de un vistazo sin abrumarlo con los 155 Ã­tems.
* **SelecciÃ³n EstratÃ©gica de CategorÃ­as (8 Principales en Home):**
  De las 17 categorÃ­as reales, se muestran las 8 de mayor demanda y valor visual:
  1. `ENTRANTE` (Gyozas, Rollitos, Edamame)
  2. `ROLL(8piezas)` (California, Spicy Salmon, Dragon)
  3. `URAMAKI(8piezas)` (Aguacate Uramaki, Cheese Bamboo)
  4. `NIGIRI SUSHI(2 piezas)` (SalmÃ³n, AtÃºn, Pez Mantequilla)
  5. `TEMPURIZADOS(8 piezas)` (Maki Crispy SalmÃ³n, Rock Roll)
  6. `SASHIMI(9 cortes)` (Cortes de SalmÃ³n y AtÃºn fresco)
  7. `BANDEJAS Y COMBINADOS` (Bandejas variadas para compartir)
  8. `MENÃš DEL DÃA` (FÃ³rmula mediodÃ­a)
* **Comportamiento & Layout:**
  * Grid: 2 columnas en mobile (`grid-cols-2`), 4 columnas en desktop (`md:grid-cols-4`).
  * InteracciÃ³n: Tarjetas con imagen oficial representativa, overlay oscuro degradado y tÃ­tulo en mayÃºsculas font-mono.
  * NavegaciÃ³n: Cada tarjeta redirecciona a la pÃ¡gina de la carta con el parÃ¡metro de categorÃ­a activo: `/carta?categoria=URAMAKI%288piezas%29`.

---

### 2.3 SelecciÃ³n OYISHI (CuradurÃ­a de Platos Estrella)
* **Objetivo de UX:** Presentar una muestra apetitosa y de rÃ¡pida conversiÃ³n sin romper la promesa de Home ligera.
* **LÃ­mite Estricto:** MÃ¡ximo 8 productos.
* **Criterio de SelecciÃ³n:**
  * Productos con fotografÃ­a oficial verificada (`imageStatus: "official"`).
  * Variedad gastronÃ³mica (entrante, roll, uramaki, nigiri, tempurizado, sashimi).
* **Arquitectura de la Card:**
  * **Contenedor FotogrÃ¡fico:** Aspect ratio `4/3` con pedestal degradado radial oscuro que homogeneiza la imagen.
  * **InformaciÃ³n Esencial:**
    * Nombre del plato (Serif).
    * NÃºmero de piezas en chip destacado (`"8 Piezas"` / `"2 Piezas"`).
    * DescripciÃ³n de ingredientes clave (Taupe, 2 lÃ­neas max).
    * Badges de AlÃ©rgenos verificados (chips monosilÃ¡bicos compactos).
    * Precio en tipografÃ­a Monospace Dorado (`14.50â‚¬`).
  * **CTA de AcciÃ³n RÃ¡pidas:** BotÃ³n compacto `[+ AÃ‘ADIR]` para ingresar el producto directamente al carrito de compras sin salir de la Home.
* **CTA de Cierre de SecciÃ³n:**
  * BotÃ³n destacado: `"VER CARTA COMPLETA (155 PLATOS)"`.
  * Subtexto explicativo: *"Explora los 155 productos y 17 categorÃ­as de OYISHI."*

---

### 2.4 Bandejas y Combinados (SecciÃ³n Protagonista de Alto Ticket)
* **Objetivo de UX:** Maximizar el ticket medio del pedido online elevando las bandejas a un bloque visual de alto impacto.
* **Problema Actual:** Se mostraba como un bloque secundario mÃ¡s en el grid genÃ©rico.
* **Propuesta de Mejora UX:**
  * **Formato Hero Card Horizontal:** 2 columnas en desktop con aspecto panorÃ¡mico (`aspect-[16/9]`).
  * **Badges de Valor:** ETIQUETA DORADA `"IDEAL PARA COMPARTIR â€¢ HASTA 32 PIEZAS"`.
  * **Desglose de Piezas:** EspecificaciÃ³n clara de lo que incluye la bandeja (ej. *"4 Maki salmÃ³n, 4 Maki atÃºn, 8 California roll, 4 Nigiri salmÃ³n..."*).
  * **Precio Relevante & CTA:** Precio en gran formato font-mono (`32.95â‚¬`) + BotÃ³n de ancho completo `[AÃ‘ADIR COMBO AL CARRITO]`.

---

### 2.5 MenÃº del DÃ­a (FÃ³rmula MediodÃ­a)
* **Objetivo de UX:** Comunicar de forma clara y directa la oferta comercial para comidas de lunes a viernes.
* **Problema Actual:** Demasiado espacio vacÃ­o vertical y falta de detalle sobre la estructura del menÃº.
* **Propuesta de Mejora UX:**
  * **Contenedor Estilo Izakaya:** Tarjeta en CarbÃ³n Tostado (`#181310`) con borde doble sutil en Dorado Envejecido (`#D8B36A/30`).
  * **Claridad en Horarios:** Badge visible `"DISPONIBLE LUNES A VIERNES â€¢ 12:00 A 16:30 (EXCEPTO FESTIVOS)"`.
  * **Desglose en 3 Pasos:**
    * `1Âº PASO`: Entrante / Sopa Miso / Ensalada
    * `2Âº PASO`: Plato Principal (Sushi Combo / Noodles / Yakisoba)
    * `3Âº PASO`: Bebida + Postre o CafÃ©
  * **Precio Destacado Unificado:** `13.95â‚¬` (o segÃºn precio oficial del establecimiento).
  * **CTA:** `"VER OPCIONES DE MENÃš DEL DÃA"` -> `/carta?categoria=MENU%20DIA`.

---

### 2.6 Reserva de Mesa (AuditorÃ­a & Transparencia Total)
* **PROBLEMA DETECTADO (CRÃTICO):** El formulario actual en `ReservationForm.tsx` simula una confirmaciÃ³n con `setTimeout(800)` mostrando un mensaje de *"Solicitud Recibida"*, cuando **no existe un backend real** en el proyecto para procesar la reserva. Esto genera falsas expectativas en el cliente y reservas perdidas en el restaurante.
* **DECISIÃ“N ARQUITECTÃ“NICA UX DE AGENTE 4:**
  1. **OpciÃ³n A (Recomendada / Enlace Oficial Directo):**
     Reemplazar la simulaciÃ³n ficticia por un botÃ³n primario de alta conversiÃ³n que redirija al motor oficial de reservas del restaurante: `https://oyishi.es/reservation.php`.
  2. **OpciÃ³n B (Formulario Integrado con IntegraciÃ³n WhatsApp/Mail Real):**
     Si se mantiene el formulario en pantalla, al pulsar *"Confirmar Reserva"*, en lugar de simular un envÃ­o a base de datos inexistente, debe abrir un enlace directo de confirmaciÃ³n por WhatsApp al restaurante (`wa.me/34699365212?text=Solicitud%20Reserva...`) con los datos del formulario (Nombre, Fecha, Hora, Personas) para que el personal del restaurante confirme de forma real.

---

### 2.7 Contacto & CorrecciÃ³n de Google Maps
* **PROBLEMA DETECTADO EN CÃ“DIGO (`HomePage.tsx`):**
  La URL actual del iframe de Google Maps en la lÃ­nea 212 es:
  `src="https://www.google.com/maps/embed?pb=!1m18!...!4v1700000000000..."`
  Esta cadena contiene parÃ¡metros ficticios que provocan un error de renderizado del mapa (cuadro gris sin mapa interactivo).
* **SOLUCIÃ“N UX & TÃ‰CNICA:**
  Sustituir el iframe por la direcciÃ³n embed exacta y verificada de OYISHI en Fuenlabrada:
  `src="https://maps.google.com/maps?q=Calle%20Legan%C3%A9s%2042,%2028945%20Fuenlabrada,%20Madrid&t=&z=15&ie=UTF8&iwloc=&output=embed"`
  AdemÃ¡s, mantener los enlaces de contacto directo mediante `tel:918626221`, `tel:699365212` y `mailto:info@oyishi.es`.

---

## 3. AUDITORÃA & ARQUITECTURA DE LA PÃGINA `/CARTA`

La pÃ¡gina `/carta` es el motor de exploraciÃ³n e-commerce de OYISHI. Su arquitectura debe permitir navegar 155 productos con fluidez instantÃ¡nea.

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     ARQUITECTURA DE LA PÃGINA /CARTA                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 1. HEADER E-COMMERCE (Barra de bÃºsqueda con auto-completado y clear)   â”‚
â”‚ 2. CATEDRAL DE FILTROS (Pills horizontales deslizables + All/17 cats)  â”‚
â”‚ 3. FEEDBACK DE BÃšSQUEDA (Contador en tiempo real: "X de 155 productos")â”‚
â”‚ 4. GRID RESPONSIVO (PaginaciÃ³n incremental inteligente: 24 en 24)     â”‚
â”‚ 5. PRODUCT CARDS UNIFICADAS (Aspect Ratio 4:3 + Piezas + AlÃ©rgenos)    â”‚
â”‚ 6. CARRO LATERAL PERSISTENTE (Drawer desplegable + Formato WhatsApp)   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

### 3.1 Buscador en Tiempo Real
* **Funcionalidad:** BÃºsqueda predictiva sin recarga de pÃ¡gina.
* **Campos Evaluados:** Coincidencia en `name` (nombre del plato) y `description` (ingredientes).
* **Elementos UX Requeridos:**
  * Icono de lupa alineado a la izquierda.
  * BotÃ³n de borrado rÃ¡pido `[X]` a la derecha cuando el usuario ha escrito texto.
  * Feedback para bÃºsquedas vacÃ­as: *"No se encontraron platos que coincidan con '[tÃ©rmino]'. Intenta con salmÃ³n, tempura o gyozas."*

---

### 3.2 Filtro por CategorÃ­as & SincronizaciÃ³n URLSearchParams
* **Listado de CategorÃ­as:** `Todos` + las 17 categorÃ­as reales (normalizando etiquetas como `ROLL(8piezas)`, `URAMAKI(8piezas)`, etc.).
* **Manejo de URLSearchParams:**
  * Al hacer clic en una categorÃ­a (ej. `NIGIRI SUSHI(2 piezas)`), la URL debe actualizarse limpiamente a: `/carta?categoria=NIGIRI%20SUSHI%282%20piezas%29` mediante `window.history.pushState`.
  * Al cargar la pÃ¡gina o pulsar el botÃ³n atrÃ¡s/adelante del navegador, la aplicaciÃ³n debe leer `window.location.search` e inicializar el filtro en la categorÃ­a correspondiente.
  * Si la categorÃ­a es `'Todos'`, el parÃ¡metro `categoria` debe eliminarse de la URL para mantenerla limpia (`/carta`).

---

### 3.3 Estrategia de PaginaciÃ³n / "Cargar MÃ¡s"
* **Problema:** Renderizar 155 tarjetas complejas con imÃ¡genes de golpe ralentiza los dispositivos mÃ³viles de gama media y empeora los Core Web Vitals (INP y CLS).
* **SoluciÃ³n UX:**
  * Carga inicial limitada a **24 productos**.
  * BotÃ³n secundario centrado: `"CARGAR MÃS PRODUCTOS (+24)"`.
  * Contador dinÃ¡mico: *"Mostrando 24 de 155 productos"*.
  * Reset automÃ¡tico del contador a 24 cuando el usuario cambia de categorÃ­a o realiza una bÃºsqueda.

---

### 3.4 EspecificaciÃ³n Mobile-First por Resoluciones

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                   OPTIMIZACIÃ“N MÃ“VIL POR RESOLUCIÃ“N                   â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 390Ã—844 (Standard Mobile)â”‚ Grid de 1 columna (tarjetas anchas) o       â”‚
â”‚                          â”‚ 2 columnas compactas sin texto desbordado.  â”‚
â”‚                          â”‚ Touch targets de botones >= 44px x 44px.    â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 430Ã—932 (Pro Max/Large)  â”‚ Grid de 2 columnas holgado.                 â”‚
â”‚                          â”‚ Barra de categorÃ­as sticky con scroll swipe.â”‚
â”‚                          â”‚ Carrito con drawer de 85% de ancho pantalla.â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

#### Detalles UX EspecÃ­ficos para 390Ã—844 (iPhone 12/13/14/15):
1. **Grid de Productos:** Tarjeta en formato vertical compacto con padding de `p-4`.
2. **Pills de CategorÃ­a:** Scroll horizontal tÃ¡ctil (`overflow-x-auto snap-x`) con padding lateral de `px-4` para evitar que el primer y Ãºltimo elemento queden cortados.
3. **Carrito Drawer:** Ocupa el 100% del ancho del viewport (`w-full`) para mÃ¡xima comodidad de lectura y modificaciÃ³n de cantidades con el pulgar.

#### Detalles UX EspecÃ­ficos para 430Ã—932 (iPhone Pro Max / Plus):
1. **Grid de Productos:** Rejilla de 2 columnas bien espaciadas (`grid-cols-2 gap-4`).
2. **Altura de Banner:** Ajuste de paddings superiores `pt-28` para compensar la barra de estado y la isla dinÃ¡mica de iOS.

---

## 4. JERARQUÃA DE CONVERSIÃ“N & FLUJOS DE USUARIO

Para evitar la fatiga de decisiÃ³n del cliente y guiarlo hacia la acciÃ³n comercial, se establece una **jerarquÃ­a estricta de llamadas a la acciÃ³n (CTAs)**.

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        JERARQUÃA OFICIAL DE CTAS                       â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ NIVEL DE ACCIÃ“N   â”‚ BOTÃ“N / CTA                â”‚ DESTINO / ACCIÃ“N      â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ PRIMARIO (Verde)  â”‚ PEDIR POR WHATSAPP         â”‚ wa.me/34699365212     â”‚
â”‚ PRIMARIO (Coral)  â”‚ AÃ‘ADIR AL CARRITO / CARTA  â”‚ Drawer Carrito / Cartaâ”‚
â”‚ SECUNDARIO (Oro)  â”‚ RESERVAR MESA              â”‚ oyishi.es/reservation â”‚
â”‚ SECUNDARIO (Ghost)â”‚ VER DETALLES / FILTRAR     â”‚ Filtro / PestaÃ±a      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

### 4.1 Mapeo de Flujos Principales de ConversiÃ³n

#### Flujo 1: Home â†’ ExploraciÃ³n por CategorÃ­a â†’ Pedido Online
```
[Home] â”€â”€> [Explora OYISHI: Click "URAMAKI"] â”€â”€> [/carta?categoria=URAMAKI]
  â”€â”€> [AÃ±adir "Uramaki Mango" (+1)] â”€â”€> [Abrir Comanda Drawer] â”€â”€> [Enviar por WhatsApp]
```

#### Flujo 2: Home â†’ SelecciÃ³n / Combinados â†’ Pedido RÃ¡pido
```
[Home] â”€â”€> [Bandejas: Click "AÃ±adir Combo"] â”€â”€> [NotificaciÃ³n Toast / Counter +1]
  â”€â”€> [Click Icono Carrito] â”€â”€> [Verificar Comanda] â”€â”€> [Enviar por WhatsApp]
```

#### Flujo 3: Home / Header â†’ Reserva de Mesa Real
```
[Header / Home] â”€â”€> [Click "Reservar Mesa"] â”€â”€> [RedirecciÃ³n Oficial: oyishi.es/reservation.php]
  â”€â”€> [ConfirmaciÃ³n Oficial por Restaurante]
```

---

## 5. MATRIZ DE PRIORIZACIÃ“N DE MEJORAS (MATRIZ BACKLOG)

Las siguientes mejoras se dividen por su nivel de impacto y urgencia para la siguiente fase de desarrollo:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                     MATRIZ DE PRIORIZACIÃ“N UX OYISHI                   â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### ðŸ”´ BLOCKER (Prioridad CrÃ­tica â€” CorrecciÃ³n Inmediata)
1. **Eliminar SimulaciÃ³n Ficticia de Reservas:** Reemplazar el `setTimeout` engaÃ±oso de `ReservationForm.tsx` por una integraciÃ³n transparente (RedirecciÃ³n a `oyishi.es/reservation.php` o envÃ­o directo del mensaje a WhatsApp).
2. **Corregir Iframe de Google Maps:** Sustituir la URL rota en `HomePage.tsx` por el embed limpio y funcional de Calle LeganÃ©s 42, Fuenlabrada.
3. **SincronizaciÃ³n Bidireccional de URLSearchParams:** Garantizar que navegar por la carta actualice la URL y que abrir una URL con `?categoria=...` seleccione automÃ¡ticamente la categorÃ­a correcta.

---

### ðŸŸ  HIGH (Prioridad Alta â€” Impacto Comercial Directo)
1. **VisualizaciÃ³n de Piezas & AlÃ©rgenos en Cards:** Mostrar claramente en cada tarjeta de plato el nÃºmero de piezas (`pieces`) y los alÃ©rgenos con formato de badges limpios.
2. **Bandejas y Combinados como Protagonistas:** Reestructurar la secciÃ³n en Home para darle formato panorÃ¡mico de alto ticket con desglose completo del contenido del combo.
3. **Optimizaciones Mobile para 390px y 430px:** Ajustar touch targets (mÃ­nimo 44px), implementar scroll horizontal snap en la barra de categorÃ­as y asegurar el comportamiento fluido del carrito.
4. **PaginaciÃ³n Incremental (24 Ã­tems):** Evitar la carga masiva de los 155 productos de golpe en `/carta`.

---

### ðŸŸ¡ MEDIUM (Prioridad Media â€” Calidad de Experiencia)
1. **UnificaciÃ³n FotogrÃ¡fica con Pedestal Radial:** Aplicar a los contenedores de imÃ¡genes de productos el fondo degradado radial (`#251D18` a `#120E0C`) para integrar imÃ¡genes oficiales de fondo blanco y fondos oscuros.
2. **Claridad en la SecciÃ³n "MenÃº del DÃ­a":** Estructurar el mÃ³dulo visual en Home con el desglose claro de 3 pases (Entrante, Principal, Postre/Bebida) y horario.
3. **Empty States & Feedback de BÃºsqueda:** Mensajes claros cuando una bÃºsqueda no devuelve resultados con sugerencias de platos populares.

---

### ðŸŸ¢ LOW (Prioridad Baja â€” Pulido & Micro-Interacciones)
1. **Animaciones Staggered de Productos:** Entrada progresiva escalonada de las tarjetas en la carta al hacer scroll (`framer-motion`).
2. **Badge Animado "Abierto Ahora":** Indicador dinÃ¡mico en el Header segÃºn el horario de apertura del restaurante.
3. **Micro-brillo Metallic Shimmer en CTAs Primarios:** Destello de luz suave en el botÃ³n de la comanda y ver carta.

---

> **ENTREGABLE CONCLUIDO Y VALIDADO POR AGENTE 4 â€” UX & MENU ARCHITECT**
> *Este informe constituye la especificaciÃ³n definitiva para la reestructuraciÃ³n UX y de menÃº del proyecto OYISHI.*
