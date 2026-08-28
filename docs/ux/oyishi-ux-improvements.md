# Resumen de Mejoras UX y Arquitectura de ConversiÃ³n â€” OYISHI

Este documento detalla la implementaciÃ³n realizada para optimizar la experiencia de usuario (UX), reducir la fricciÃ³n en smartphones y maximizar las conversiones hacia la carta, pedidos y reservas.

---

## 1. Sticky Mobile CTA (`StickyMobileCTA.tsx`)
- **DescripciÃ³n**: Barra fija en la parte inferior en dispositivos mÃ³viles (`md:hidden`).
- **Botones**:
  - `[ VER CARTA ]`: Acceso directo al catÃ¡logo completo (`/carta`).
  - `[ RESERVAR MESA ]` / `[ MI COMANDA (X) ]`: Cambia dinÃ¡micamente segÃºn si el usuario tiene productos en el carrito.
- **Detalles TÃ©cnicos**:
  - Ãrea tÃ¡ctil garantizada de mÃ­nimo **44px** (`min-h-[44px]`).
  - Compatible con **Safe Area** de iOS/Android (`pb-[calc(0.625rem+env(safe-area-inset-bottom))]`).
  - Se oculta automÃ¡ticamente cuando la comanda (`isCartOpen`) estÃ¡ desplegada para evitar solapamientos.

---

## 2. JerarquÃ­a del Hero (`Hero.tsx`)
- **JerarquÃ­a Visual**:
  - **CTA Primario**: `VER CARTA` (Destacado en coral OYISHI con sombra sutil y flecha de direcciÃ³n).
  - **CTA Secundario**: `RESERVAR MESA` (Estilo contorno marfil con icono de calendario).
- Preserva la atmÃ³sfera cinematogrÃ¡fica del video sin saturar de botones redundantes.

---

## 3. Filtros RÃ¡pidos en Carta (`CartaPage.tsx`)
- Se han incorporado chips de filtrado rÃ¡pido basados en datos reales verificados (`products.json`):
  - **â­ Top Ventas**: Filtra platos verificados con fotografÃ­a oficial.
  - **ðŸŒ± Vegetariano**: Filtra opciones sin alÃ©rgenos de pescado, marisco o carne.
  - **ðŸŒ¾ Sin Gluten**: Filtra platos donde `allergens` no incluye Gluten.
  - **ðŸ£ Nigiris**: Filtra la familia especÃ­fica de Nigiris.
- Funcionan en combinaciÃ³n con el buscador y la selecciÃ³n de categorÃ­as.

---

## 4. NavegaciÃ³n de CategorÃ­as Mobile
- Las 17 categorÃ­as se presentan en una **barra horizontal tÃ¡ctil** con desplazamiento suave (`overflow-x-auto scrollbar-hide`) y degradados laterales para indicar continuidad.

---

## 5. Fichas de Producto (Product Cards)
- **Mejoras**:
  - TipografÃ­a mono dorada para precios (`font-mono text-oyishi-gold`).
  - Distintivos con el nÃºmero de piezas cuando estÃ¡ disponible.
  - AlÃ©rgenos con badges discretos e legibles.
  - BotÃ³n tÃ¡ctil `+ AÃ‘ADIR` de 44px de alto.

---

## 6. SecciÃ³n Protagonista de Bandejas y Combinados
- **DiseÃ±o**: ComposiciÃ³n asimÃ©trica que destaca:
  - NÃºmero de piezas (`32 Piezas`, `16 Piezas`).
  - Indicador de recomendaciÃ³n (`Ideal para compartir`).
  - ComposiciÃ³n detallada de ingredientes.
  - Precio total bien visible.
  - BotÃ³n dedicado `+ AÃ‘ADIR BANDEJA`.

---

## 7. Estado de Apertura e Horarios
- Indicador discreto en cabecera: `Abierto Â· 12:00-16:30 | 19:30-24:00` sin parpadeos ni animaciones agresivas.

---

## 8. IntegraciÃ³n WhatsApp Contextual
- **Mensaje de Pedido**:
  `"Hola OYISHI, me gustarÃ­a realizar el siguiente pedido: ... Total: XX.XXâ‚¬"`
- **Mensaje de Reserva**:
  `"Hola OYISHI, me gustarÃ­a reservar mesa..."`

---

## 9. SoluciÃ³n a la Ruta `/pedidos` (Evitando 404)
- Manejo en `App.tsx` para redirigir cualquier navegaciÃ³n a `/pedidos` hacia `/carta` desplegando la comanda si existen Ã­tems.

---

## 10. ValidaciÃ³n y Build
- VerificaciÃ³n mediante `npm run build` finalizada con Ã©xito (`dist/` generado sin errores).
