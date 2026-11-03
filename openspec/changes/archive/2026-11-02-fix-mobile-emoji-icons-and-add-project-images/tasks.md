# Tasks

## 1. Iconos SVG

- [x] 1.1 Crear `ArrowUpRightIcon` y `AsteriskIcon` en `src/components/icons/` con `currentColor`, `aria-hidden="true"` y `focusable="false"`; verificar que los componentes renderizan un `<svg>` válido.
- [x] 1.2 Sustituir los glifos `↗` de las acciones "Ver proyectos", "Hablemos" y del enlace de contacto del encabezado por `ArrowUpRightIcon`; verificar que no queda ningún `↗` en `src/`.
- [x] 1.3 Sustituir los tres glifos `✳` de la marquesina por `AsteriskIcon`; verificar que no queda ningún `✳` en `src/`.
- [x] 1.4 Ajustar `.primary-action`, el enlace de contacto del encabezado y `.ticker b` en `globals.css` para dimensionar y alinear los nuevos SVG; verificar en escritorio y en una vista móvil que el tamaño y la alineación son correctos.

## 2. Imágenes WebP

- [x] 2.1 Convertir las cuatro capturas oscuras con `cwebp -q 82 -resize 1600 0` y guardarlas como `public/proyect-images/thediary1.webp` a `thediary4.webp`; verificar que los cuatro archivos existen, son WebP válidos y mantienen la proporción.
- [x] 2.2 Convertir las tres capturas verdes con `cwebp -q 82 -resize 1600 0` y guardarlas como `public/proyect-images/kanso1.webp` a `kanso3.webp`; verificar que los tres archivos existen, son WebP válidos y mantienen la proporción.
- [x] 2.3 Comprobar el peso final de las siete imágenes y confirmar que cada una queda por debajo de ~400 KB; si alguna lo supera, reducir la calidad y regenerarla.

## 3. Verificación de integración

- [x] 3.1 Ejecutar `npm run build` y verificar que la compilación termina sin errores de TypeScript ni de JSX.
- [x] 3.2 Revisar la página con el viewport móvil del navegador y confirmar que los iconos de acciones, contacto y marquesina se ven como SVG y no como emoji a color.
- [x] 3.3 Comprobar que las siete imágenes se sirven correctamente desde `/proyect-images/thediary1.webp` … `/proyect-images/kanso3.webp` sin errores 404.

## Workflow follow-up

- Actualizar los documentos de MongoDB para asociar `thediary1-4` y `kanso1-3` a sus proyectos (fuera del alcance de este cambio).
- Archivar el cambio después de completar la verificación y la revisión del proyecto.
