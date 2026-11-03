# Spec Delta

## MODIFIED Requirements

### Requirement: Detalle expandible

El sistema SHALL permitir expandir y contraer la información textual de cada tarjeta al pulsar sobre su imagen.

La información SHALL incluir el nombre del proyecto, la descripción cuando esté informada, las actividades realizadas y las etiquetas.

#### Scenario: Expandir el detalle

- **WHEN** el visitante pulsa la imagen de un proyecto contraído
- **THEN** el sistema muestra el nombre, la descripción, las actividades y las etiquetas disponibles

#### Scenario: Contraer el detalle

- **WHEN** el visitante vuelve a pulsar la imagen de un proyecto expandido
- **THEN** el sistema oculta de nuevo el detalle

#### Scenario: Proyecto sin descripción

- **WHEN** un proyecto no tiene descripción informada
- **THEN** el panel muestra el resto de información sin dejar un hueco vacío

## ADDED Requirements

### Requirement: Visualización completa de capturas

El sistema SHALL mostrar la captura completa de cada proyecto sin recortar su contenido.

El contenedor de imagen SHALL usar un fondo neutro que enmarque la captura cuando su proporción no coincida con la del contenedor.

#### Scenario: Captura apaisada en tarjeta 4:3

- **WHEN** una captura apaisada se muestra en la tarjeta
- **THEN** se ve completa dentro del contenedor, con bandas del fondo neutro en lugar de contenido recortado

#### Scenario: Captura cuadrada

- **WHEN** una captura cuadrada se muestra en la tarjeta
- **THEN** se ve completa y centrada dentro del contenedor
