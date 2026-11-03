# Technology Stack Specification

## Purpose

Describir la sección de stack tecnológico: los filtros por categoría, la lista de tecnologías y sus iconos.

## Requirements

### Requirement: Filtros de tecnologías

El sistema SHALL ofrecer cuatro filtros de tecnologías: `Main Stack`, `Front`, `Back` y `Otros`.

El filtro `Main Stack` SHALL estar activo por defecto.

#### Scenario: Filtro inicial

- **WHEN** el visitante llega a la sección de stack
- **THEN** el sistema muestra las tecnologías de la categoría `main` y marca ese filtro como activo

#### Scenario: Cambio de categoría

- **WHEN** el visitante selecciona otro filtro
- **THEN** el sistema muestra únicamente las tecnologías cuya lista `category` incluya la categoría seleccionada

#### Scenario: Indicador del filtro activo

- **WHEN** el visitante cambia de filtro
- **THEN** el sistema anima un indicador deslizante hasta la posición del filtro seleccionado

### Requirement: Visualización de tecnologías

El sistema SHALL mostrar cada tecnología con su nombre e icono.

El icono SHALL cargarse desde el directorio estático `/tecnology-icons/` usando el valor del campo `icon`.

#### Scenario: Tecnología con icono

- **WHEN** una tecnología tiene nombre e icono
- **THEN** el sistema muestra ambos dentro de un elemento de la rejilla de tecnologías

#### Scenario: Categoría sin tecnologías

- **WHEN** la categoría seleccionada no tiene tecnologías asociadas
- **THEN** el sistema muestra la rejilla vacía sin errores

### Requirement: Animación de la rejilla

El sistema SHALL animar la aparición de la rejilla y de cada tecnología al cambiar de categoría.

#### Scenario: Cambio de categoría animado

- **WHEN** el visitante selecciona una categoría distinta
- **THEN** la rejilla se desvanece y las tecnologías aparecen escalonadamente

### Requirement: Estado de carga

El sistema SHALL mostrar elementos de esqueleto animados mientras prepara la lista de tecnologías.

#### Scenario: Carga inicial

- **WHEN** la sección de stack se está preparando
- **THEN** el sistema muestra tres elementos de esqueleto animados
