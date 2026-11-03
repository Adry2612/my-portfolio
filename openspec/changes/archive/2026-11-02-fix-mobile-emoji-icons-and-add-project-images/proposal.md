# Proposal

## Why

Los glifos `↗` (U+2197) y `✳` (U+2733) se renderizan como emoji a color en iOS y Android, pero como glifos de texto en escritorio. Esto rompe la coherencia visual del sitio y hace que los iconos se vean distintos en móvil.

Además, hay siete capturas nuevas en el escritorio (cuatro oscuras de *thediary* y tres verdes de *kanso*) que deben incorporarse al portfolio como imágenes de proyecto en formato WebP y con nombres estables.

## What Changes

- Sustituir los glifos `↗` de las acciones "Ver proyectos", "Hablemos" y del enlace de contacto del encabezado por un icono SVG que herede el color del texto.
- Sustituir los glifos `✳` de la marquesina de especialidades por un icono SVG equivalente.
- Convertir las siete capturas del escritorio a WebP y guardarlas en `public/proyect-images/`:
  - Capturas oscuras de *thediary*: `thediary1.webp`, `thediary2.webp`, `thediary3.webp`, `thediary4.webp`.
  - Capturas verdes de *kanso*: `kanso1.webp`, `kanso2.webp`, `kanso3.webp`.
- Mantener las imágenes dentro del tamaño y peso razonables para la web.
- **Fuera de alcance:** actualizar los documentos de MongoDB que referencian las imágenes. Esa actualización se realiza por separado.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `landing-page`: las acciones de la presentación y contacto y la marquesina dejan de usar glifos emoji y usan iconos SVG con presentación consistente.
- `navigation-and-theme`: el enlace de contacto del encabezado deja de usar el glifo `↗` y usa un icono SVG.
- `project-showcase`: se añade la convención de assets de proyecto en WebP y con nombres estables dentro de `public/proyect-images/`.

## Impact

- `src/app/page.tsx`: acciones de presentación y contacto, y marquesina de especialidades.
- `src/components/Header.tsx`: enlace de contacto del encabezado.
- `src/components/icons/`: nuevos iconos SVG compartidos (flecha diagonal y asterisco).
- `src/app/globals.css`: ajustes de tamaño y alineación de los nuevos iconos en las acciones y la marquesina.
- `public/proyect-images/`: siete nuevos archivos WebP (`thediary1-4`, `kanso1-3`).
- Sin cambios en endpoints, modelos ni variables de entorno.
