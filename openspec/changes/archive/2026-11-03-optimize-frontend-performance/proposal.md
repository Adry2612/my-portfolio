# Proposal

## Why

La medición de Lighthouse contra `next dev` daba 48 de rendimiento, pero no era representativa: el servidor de desarrollo sirve 4,08 MB de JavaScript sin minificar, HMR y `webpack-internal`. La medición real contra el build de producción da **79**, con **LCP 1,2 s**, **TBT 560 ms** y **473 KB** totales.

El margen de mejora está en el JavaScript de cliente. La página hidrata `framer-motion`, FontAwesome y `react-scroll`, librerías que aportan animaciones e iconos que se pueden resolver con CSS y SVG inline. Además, el logo se sirve a 1080×1080 para mostrarse a 30×30 y las fuentes son OTF sin comprimir.

## What Changes

- Eliminar `framer-motion` y sustituir sus animaciones por CSS e `IntersectionObserver`.
- Eliminar FontAwesome y sustituir sus iconos por SVG inline.
- Eliminar `react-scroll` y usar anclas nativas con `scroll-behavior: smooth`.
- Servir el logo con un `srcset` adecuado a su tamaño visual.
- Convertir las fuentes locales de OTF a WOFF2.
- Respetar `prefers-reduced-motion` en animaciones y desplazamiento.
- Mantener el comportamiento visual, el contenido y la accesibilidad actuales.
- Medir antes/después con Lighthouse sobre el build de producción.

## Capabilities

### New Capabilities

- `frontend-performance`: presupuesto de JavaScript, navegación semántica, imágenes al tamaño mostrado y animaciones ligeras.

### Modified Capabilities

- `navigation-and-theme`: la navegación suave pasa de `react-scroll` a desplazamiento nativo del navegador.

## Impact

- `package.json` y `package-lock.json`: retirada de `framer-motion`, `@fortawesome/*`, `react-scroll` y `@types/react-scroll`.
- `src/components/Header.tsx`, `Proyect.tsx`, `ProyectFilter.tsx`, `TechnologiesFilter.tsx`, `Job.tsx`, `ThemeButton.tsx`, `FadeInComponent.tsx`, `Timelife.tsx`.
- `src/components/icons/`: nuevos iconos SVG inline.
- `src/app/globals.css`: animaciones CSS, `scroll-behavior`, `prefers-reduced-motion`.
- `src/app/fonts.ts` y `src/app/fonts/`: fuentes WOFF2.
- `public/logo.png` o `Header.tsx`: tamaño de logo.
- Sin cambios en MongoDB ni endpoints.
