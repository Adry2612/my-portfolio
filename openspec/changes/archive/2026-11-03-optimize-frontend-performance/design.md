# Design

## Context

La medición de producción da 79 de rendimiento, LCP 1,2 s, TBT 560 ms y 473 KB. El TBT viene de la hidratación de JavaScript: `framer-motion` mueve animaciones, FontAwesome aporta iconos y `react-scroll` gestiona el desplazamiento. Los tres se pueden sustituir por CSS, SVG inline y anclas nativas.

El informe de Lighthouse que se estaba usando provenía de `next dev` (4,08 MB de JS, `webpack-internal`, HMR), por lo que no representa al usuario final.

## Goals / Non-Goals

**Goals:**

- Reducir el JavaScript de cliente y el TBT.
- Mantener el mismo contenido, diseño y accesibilidad.
- Medir con Lighthouse sobre el build de producción.
- Respetar `prefers-reduced-motion`.

**Non-Goals:**

- Cambiar la base de datos, los endpoints o el contenido.
- Rediseñar la interfaz.
- Introducir una librería de animaciones o iconos nueva.

## Decisions

### Decisión 1: CSS e IntersectionObserver en lugar de Framer Motion

Las animaciones de entrada se implementarán con clases CSS y un `IntersectionObserver` compartido en `FadeInComponent`. Los hover de tarjetas y botones usarán `transform` y `transition` CSS. El header ocultará/mostrará con una clase y una transición. El botón de tema usará dos estados SVG con transición CSS.

**Alternativas consideradas:**

- Mantener Framer Motion y cargarlo de forma diferida. Se descarta porque la mayor parte de las animaciones son fades y transformaciones simples.
- Usar otra librería de animación. Se descarta por el mismo motivo.

### Decisión 2: SVG inline en lugar de FontAwesome

Los iconos de GitHub, flecha, chevrons, móvil y checklist se sustituirán por componentes SVG propios en `src/components/icons/`. Así se eliminan los paquetes `@fortawesome/*` del bundle.

### Decisión 3: Anclas nativas en lugar de react-scroll

El menú usará `<a href="#seccion">`. `html { scroll-behavior: smooth; }` y `scroll-margin-top` en las secciones resuelven el desplazamiento sin JavaScript. Esto también mejora el SEO porque los enlaces son rastreables.

### Decisión 4: Logo y fuentes

El logo del header recibirá `sizes='30px'` para que `next/image` elija una variante pequeña. Las fuentes OTF se convertirán a WOFF2 para reducir el peso de descarga.

### Decisión 5: Movimiento reducido

Se añadirá una media query `prefers-reduced-motion: reduce` que reduce animaciones y desactiva el desplazamiento suave.

## Risks / Trade-offs

- [Las animaciones CSS no serán idénticas a las de Framer Motion] → Se mantienen los mismos tiempos y curvas aproximadas; el objetivo es el mismo efecto visual.
- [El desplazamiento nativo no dura exactamente 800 ms] → La especificación se actualiza a desplazamiento nativo; el comportamiento es el esperado en cada navegador.
- [Cambios en muchos componentes] → Se verifica el build, la consola y las interacciones principales antes de medir.
- [Las fuentes WOFF2 pueden requerir herramientas externas] → Si no están disponibles, se documenta y se mantiene OTF; el resto de optimizaciones no depende de ello.

## Migration Plan

1. Retirar dependencias y sustituir iconos.
2. Sustituir animaciones y scroll.
3. Optimizar logo y fuentes.
4. Añadir `prefers-reduced-motion`.
5. Build, pruebas manuales y Lighthouse de producción.
6. Integrar `develop` en `main`.
