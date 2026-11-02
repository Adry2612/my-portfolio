# Tasks

## 1. Extracción del color

- [x] 1.1 Crear `src/lib/dominantColor.ts` con canvas 24×24, cuantización a 4 bits, mezcla 70/30 con `#151817`, caché por URL y fallback `null`; verificar que TypeScript compila.
- [x] 1.2 Verificar manualmente el helper con una imagen clara y otra oscura, comprobando que devuelve un `rgb(...)` válido y que la segunda llamada usa la caché.

## 2. Integración en la tarjeta

- [x] 2.1 Integrar el helper en `Proyect.tsx`: calcular el color en `onLoad` de cada imagen, guardarlo en estado y aplicar `backgroundColor` al contenedor según el slide activo; verificar que el fallback sigue siendo `#151817`.
- [x] 2.2 Añadir la transición de `background-color` en `.project-image-wrap`; verificar que al cambiar de slide el fondo cambia con una transición suave.

## 3. Verificación

- [x] 3.1 Ejecutar `npm run build` y verificar que termina sin errores de TypeScript ni de JSX.
- [x] 3.2 Revisar en el navegador una tarjeta con varias imágenes y comprobar que el fondo cambia al navegar entre slides y que no hay errores de consola.

## Workflow follow-up

- Archivar el cambio después de completar la verificación y la revisión del proyecto.
