# Spec Delta

## ADDED Requirements

### Requirement: Fondo adaptativo de la galería

El sistema SHALL derivar el color de fondo de las bandas de la galería a partir del color predominante de la imagen activa.

El color resultante SHALL mezclarse con el tono neutro del contenedor para mantener la coherencia visual.

El sistema SHALL usar el tono neutro como fallback mientras no haya un color disponible o si la extracción falla.

#### Scenario: Color de la imagen activa

- **WHEN** una imagen termina de cargar y se convierte en la imagen activa
- **THEN** el fondo del contenedor usa un color derivado de esa imagen

#### Scenario: Cambio de slide

- **WHEN** el visitante cambia a otra imagen del carrusel
- **THEN** el fondo del contenedor se actualiza al color de la nueva imagen con una transición suave

#### Scenario: Fallback neutro

- **WHEN** todavía no se ha calculado el color o la extracción falla
- **THEN** el contenedor mantiene el fondo neutro `#151817`
