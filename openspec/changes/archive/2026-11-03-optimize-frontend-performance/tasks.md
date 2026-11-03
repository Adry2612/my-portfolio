# Tasks

## 1. Dependencias e iconos

- [x] 1.1 Crear iconos SVG inline para GitHub, flecha diagonal, chevrons, móvil y checklist; verificar que sustituyen a FontAwesome sin cambios visuales.
- [x] 1.2 Retirar `framer-motion`, `@fortawesome/*`, `react-scroll` y `@types/react-scroll` de `package.json`; verificar que `npm install` actualiza el lockfile sin errores.

## 2. Animaciones y scroll

- [x] 2.1 Reescribir `FadeInComponent` con `IntersectionObserver` y clases CSS; verificar que las secciones siguen apareciendo al hacer scroll.
- [x] 2.2 Sustituir `motion` por CSS en Header, Proyect, ProyectFilter, TechnologiesFilter, Job y ThemeButton; verificar hover, entrada de tarjetas y cambio de tema.
- [x] 2.3 Sustituir `react-scroll` por anclas `href` y `scroll-behavior: smooth` con `scroll-margin-top`; verificar navegación y que los enlaces tienen `href` en el HTML.

## 3. Assets

- [x] 3.1 Añadir `sizes='30px'` al logo del header; verificar en el build que la imagen servida es pequeña.
- [x] 3.2 Convertir las fuentes OTF a WOFF2 y actualizar `fonts.ts`; verificar que el build carga las fuentes y que el peso de fuentes baja.

## 4. Movimiento reducido y verificación

- [x] 4.1 Añadir `prefers-reduced-motion` en CSS; verificar que animaciones y scroll suave se desactivan con esa preferencia.
- [x] 4.2 Ejecutar `npm run build` y comprobar que no hay errores ni referencias a las librerías retiradas.
- [x] 4.3 Ejecutar Lighthouse contra `npm run start` y comparar con la línea base (Performance 79, LCP 1,2 s, TBT 560 ms, 473 KB); documentar el resultado.

## Workflow follow-up

- Integrar `develop` en `main` mediante merge/PR tras verificar la preview.
- Archivar el cambio después de la revisión.
