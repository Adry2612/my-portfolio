# Proposal

## Why

Con `object-fit: contain`, las capturas que no coinciden con la proporción 4:3 dejan bandas visibles. Ahora mismo esas bandas usan siempre el mismo tono oscuro (`#151817`), lo que crea un marco genérico que no termina de fundirse con cada captura.

Usar el color predominante de la imagen activa en esas bandas hace que el marco se integre con la captura y mantiene la sensación de imagen completa sin recortes.

## What Changes

- Extraer en el navegador el color predominante de cada imagen al cargarse.
- Mezclar el color extraído con el neutro actual para evitar marcos demasiado claros o estridentes.
- Aplicar ese color como fondo del contenedor de imagen de la tarjeta, actualizándose al cambiar de slide del carrusel.
- Usar `#151817` como fallback mientras no haya color disponible o si la extracción falla.
- Añadir una transición suave entre colores.
- Sustituir el uso obsoleto de `onLoadingComplete` por `onLoad` en las imágenes del carrusel.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `project-showcase`: el fondo de las bandas de la galería pasa a derivarse de la imagen activa, con fallback neutro y transición.

## Impact

- `src/lib/dominantColor.ts`: nuevo helper de extracción y mezcla de color.
- `src/components/Proyect.tsx`: cálculo del color al cargar cada imagen y aplicación al contenedor según el slide activo.
- `src/app/globals.css`: transición de `background-color` en `.project-image-wrap`.
- Sin cambios en MongoDB, endpoints ni dependencias.
