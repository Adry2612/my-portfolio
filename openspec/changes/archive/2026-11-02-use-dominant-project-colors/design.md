# Design

## Context

Ver `proposal.md` para la motivación. El estado actual relevante:

- `.project-image` usa `object-fit: contain` y `.project-image-wrap` tiene un fondo fijo `#151817`.
- `Proyect.tsx` ya conoce el slide activo (`slide`) y carga las imágenes con `next/image`.
- Las imágenes son locales (`/proyect-images/*.webp`), por lo que un canvas puede leer sus píxeles sin problemas de CORS.
- No hay framework de tests; la verificación se hace con build y navegador.

## Goals / Non-Goals

**Goals:**

- Que las bandas del contenedor usen un color representativo de la imagen activa.
- Mantener un fallback neutro y evitar cambios bruscos al navegar el carrusel.
- No añadir dependencias ni coste perceptible en la carga.

**Non-Goals:**

- Cambiar el recorte, el tamaño o la proporción del contenedor.
- Guardar colores en MongoDB.
- Generar imágenes derivadas o fondos difuminados.
- Cambiar el comportamiento del carrusel.

## Decisions

### Decisión 1: Extracción en el cliente con canvas

Se creará `src/lib/dominantColor.ts` con una función que recibe un `HTMLImageElement` y devuelve un color `rgb(...)` o `null`.

Proceso:

1. Dibujar la imagen en un canvas de 24×24.
2. Leer los píxeles y descartar los transparentes.
3. Cuantizar cada canal a 4 bits y contar los píxeles por cubo.
4. Elegir el cubo con más píxeles y promediar sus colores.
5. Mezclar el resultado con el neutro `#151817` al 70/30.

**Alternativas consideradas:**

- Precalcular los colores en MongoDB o en un JSON. Se descarta para no añadir un campo, un script y mantenimiento extra.
- Usar `getImageData` sobre la imagen completa. Se descarta por coste innecesario; 24×24 es suficiente para estimar el color.
- Fondo difuminado con la propia imagen. Se descarta porque el usuario pidió un color predominante y el desenfoque añade coste de GPU.

### Decisión 2: Caché en memoria por URL de imagen

Los resultados se guardarán en un `Map<string, string>` a nivel de módulo, usando `currentSrc || src` como clave. Así no se recalcula el color si la imagen se vuelve a montar o se repite.

La caché vive solo en el navegador; no se persiste.

### Decisión 3: Aplicación al contenedor según el slide activo

`Proyect.tsx` mantendrá un estado `imageColors` con el color de cada imagen cargada:

```ts
const activeColor = imageColors[images[slide]];
```

El contenedor recibirá un `style={{ backgroundColor: activeColor }}` solo cuando exista color. El CSS mantendrá `#151817` como valor por defecto y añadirá `transition: background-color .4s ease`.

El cálculo se hará en el evento `onLoad` de cada imagen. Se sustituye `onLoadingComplete` (obsoleto) por `onLoad`, que además proporciona el elemento necesario para el canvas.

## Risks / Trade-offs

- [El color predominante puede ser muy claro en capturas blancas] → Se mezcla al 70/30 con el neutro; si aun así molesta, se puede bajar el porcentaje.
- [El primer render muestra el fallback hasta que carga la imagen] → Es el comportamiento esperado y coincide con el fade-in actual.
- [Canvas bloqueado por CORS] → Las imágenes son locales y se sirven desde el mismo origen; aun así, la función captura errores y devuelve `null`.
- [Coste de memoria de los canvas] → Se crean y descartan por imagen; el canvas es de 24×24 y el resultado se cachea como string.

## Migration Plan

1. Añadir el helper de color.
2. Integrarlo en `Proyect.tsx` y ajustar la transición CSS.
3. Verificar el cambio de color entre slides y el fallback.
4. Ejecutar el build.

No hay migración de datos. Revertir consiste en eliminar el helper, el estado y el `style`, y dejar el fondo fijo.
