# Spec Delta

## ADDED Requirements

### Requirement: Presupuesto de JavaScript

El bundle inicial de cliente SHALL excluir librerías de animación, iconos y scroll que puedan resolverse con CSS, SVG inline o APIs nativas del navegador.

La medición de referencia SHALL hacerse sobre el build de producción y no sobre `next dev`.

#### Scenario: Build sin librerías prescindibles

- **WHEN** se ejecuta el build de producción
- **THEN** el bundle de cliente no incluye `framer-motion`, FontAwesome ni `react-scroll`

#### Scenario: Medición representativa

- **WHEN** se evalúa el rendimiento con Lighthouse
- **THEN** la medición se realiza contra `next start` o el despliegue de producción

### Requirement: Navegación semántica

Los enlaces del menú SHALL ser anclas con un atributo `href` que apunte a la sección correspondiente.

El desplazamiento suave SHALL resolverse con `scroll-behavior: smooth` y `scroll-margin-top`, sin depender de JavaScript.

#### Scenario: Enlace rastreable

- **WHEN** un rastreador o una tecnología de asistencia inspecciona el menú
- **THEN** cada enlace expone un `href` válido hacia su sección

#### Scenario: Desplazamiento sin JavaScript

- **WHEN** el visitante pulsa un enlace del menú
- **THEN** el navegador desplaza la vista suavemente hasta la sección

### Requirement: Imágenes al tamaño mostrado

Las imágenes decorativas y de marca SHALL servirse con un tamaño acorde a sus dimensiones de visualización.

El logotipo del encabezado SHALL usar un `srcset` limitado a su tamaño real.

#### Scenario: Logo optimizado

- **WHEN** se carga el encabezado
- **THEN** el navegador descarga una variante del logo cercana a 30×30 px, no una imagen de 1080×1080

### Requirement: Animaciones ligeras

Las animaciones de entrada y hover SHALL implementarse con CSS.

El sistema SHALL respetar `prefers-reduced-motion` reduciendo o desactivando animaciones y desplazamiento suave.

#### Scenario: Movimiento reducido

- **WHEN** el sistema operativo indica `prefers-reduced-motion: reduce`
- **THEN** las animaciones y el desplazamiento suave se desactivan o se reducen

#### Scenario: Animación sin JavaScript

- **WHEN** una tarjeta o sección aparece en pantalla
- **THEN** la animación se ejecuta con CSS o `IntersectionObserver`, sin Framer Motion
