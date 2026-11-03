# Design

## Context

Ver `proposal.md` para la motivación. El estado actual relevante es:

- `src/app/page.tsx` usa los caracteres `↗` y `✳` directamente en el JSX.
- `src/components/Header.tsx` usa `↗` dentro del enlace de contacto.
- `src/app/globals.css` dimensiona esos glifos mediante `.primary-action span` y `.ticker b`, reglas que asumen texto y no un SVG.
- `cwebp` está disponible en el entorno (`/opt/homebrew/bin/cwebp`).
- Las siete capturas del escritorio miden entre 2778×1544 y 2880×1564 píxeles y están en PNG.

## Goals / Non-Goals

**Goals:**

- Renderizar los iconos con SVG vectoriales que hereden `currentColor` y se vean igual en cualquier plataforma.
- Conservar el aspecto, tamaño y alineación actuales de las acciones y la marquesina.
- Incorporar las siete capturas como WebP con nombres estables y peso razonable.

**Non-Goals:**

- Corregir las flechas del carrusel de proyectos, que también dependen de `:hover`, pero no forman parte de esta petición.
- Actualizar los documentos de MongoDB que referencian las imágenes.
- Rediseñar la marquesina, las acciones o las tarjetas de proyecto.

## Decisions

### Decisión 1: Iconos SVG reutilizables en lugar de glifos emoji

Se crearán dos componentes en `src/components/icons/`:

- `ArrowUpRightIcon`: flecha diagonal para las acciones y el enlace de contacto.
- `AsteriskIcon`: asterisco decorativo para la marquesina.

Ambos usarán `viewBox="0 0 24 24"`, `fill="none"` o `fill="currentColor"` según el trazado, `aria-hidden="true"` y `focusable="false"`. El tamaño se controlará desde CSS con `width: 1em; height: 1em` o reglas específicas por contexto.

**Alternativas consideradas:**

- Añadir el selector de variación de texto U+FE0E a cada glifo (`↗︎`). Se descarta porque el soporte no es uniforme entre navegadores y puede seguir mostrando emoji en algunos dispositivos.
- Usar `font-variant-emoji: text`. Se descarta por soporte limitado y por no resolver el tamaño y la alineación de forma fiable.
- Mantener los glifos y ocultarlos en móvil. Se descarta porque elimina el icono en la plataforma donde precisamente falla.

### Decisión 2: Ajustar las reglas CSS existentes

Las reglas `.primary-action span` y `.ticker b` se sustituirán o complementarán con reglas para `svg`:

- Las acciones conservarán un icono de aproximadamente 18-20 px.
- La marquesina conservará el color de acento y un tamaño equivalente al glifo actual.
- El enlace de contacto del encabezado usará un icono de 12-13 px alineado con el texto.

### Decisión 3: Conversión con `cwebp` y redimensionado

Cada captura se convertirá con:

```bash
cwebp -q 82 -resize 1600 0 "origen.png" -o "public/proyect-images/<nombre>.webp"
```

`-resize 1600 0` limita el ancho a 1600 px y mantiene la proporción. Es suficiente para tarjetas de hasta ~500 px CSS a doble densidad y reduce el peso frente a los ~4-5 MB de algunos PNG.

Mapeo por orden cronológico de captura:

| Origen | Destino |
| --- | --- |
| `19.42.07` | `thediary1.webp` |
| `19.42.38` | `thediary2.webp` |
| `19.43.26` | `thediary3.webp` |
| `19.43.55` | `thediary4.webp` |
| `19.44.29` | `kanso1.webp` |
| `19.44.48` | `kanso2.webp` |
| `19.45.15` | `kanso3.webp` |

**Alternativas consideradas:**

- Usar `sips` para convertir a WebP. Se descarta porque `cwebp` ofrece control explícito de calidad y redimensionado.
- Guardar las capturas a resolución original. Se descarta por peso innecesario para el tamaño de visualización del portfolio.

### Decisión 4: Los assets no se referencian desde el código

Los nombres de archivo se documentan en la especificación y quedan disponibles en `public/proyect-images/`. La asociación con cada proyecto se hará actualizando los documentos de MongoDB en `images` o `img`, fuera de este cambio.

## Risks / Trade-offs

- [El SVG no coincide exactamente con el glifo anterior] → Se ajustan tamaño y trazo comparando en escritorio y móvil; el icono es decorativo y no altera el texto.
- [Las capturas contienen datos personales o de cuenta] → Se revisan antes de publicarlas y se recortan si fuera necesario.
- [El redimensionado a 1600 px pierde nitidez en pantallas 3x] → 1600 px cubre con margen el tamaño real de la tarjeta; si se necesita más, se puede regenerar desde el PNG original.
- [Las imágenes quedan sin uso hasta actualizar MongoDB] → Es un estado esperado y no rompe la galería actual.

## Migration Plan

1. Añadir los iconos y sustituir los glifos.
2. Ajustar el CSS de acciones, marquesina y enlace de contacto.
3. Convertir y guardar las siete imágenes.
4. Verificar la página en escritorio y móvil.
5. Actualizar MongoDB por separado para asociar `thediary1-4` y `kanso1-3` a sus proyectos.

No se requiere migración de datos ni rollback especial; revertir el cambio consiste en restaurar los glifos y eliminar los archivos WebP.
