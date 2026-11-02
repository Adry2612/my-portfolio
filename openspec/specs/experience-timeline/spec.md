# Experience Timeline Specification

## Purpose

Describir la sección de trayectoria profesional: los indicadores del autor y la lista de experiencias laborales con sus tecnologías y responsabilidades.

## Requirements

### Requirement: Lista de experiencias

El sistema SHALL mostrar las experiencias laborales obtenidas desde `/api/jobs`.

El endpoint SHALL ordenar las ofertas por `startDate` de forma descendente y la página SHALL invertir el orden recibido antes de renderizarlo.

#### Scenario: Renderizado de experiencias

- **WHEN** el sistema recibe una lista de ofertas de empleo
- **THEN** muestra cada oferta en la sección de trayectoria con su logotipo, descripción, empresa, fechas, tecnologías y responsabilidades

#### Scenario: Sin experiencias

- **WHEN** el endpoint devuelve una lista vacía
- **THEN** el sistema renderiza la sección sin filas de experiencia y sin errores

### Requirement: Contenido de una experiencia

Cada experiencia SHALL mostrar el icono de la empresa, la descripción del puesto, el nombre de la empresa, el rango de fechas `startDate - endDate`, la lista de tecnologías y la lista de responsabilidades (`thingsDone`).

#### Scenario: Experiencia completa

- **WHEN** una oferta tiene tecnologías y responsabilidades informadas
- **THEN** el sistema muestra ambas listas dentro de la fila de la experiencia

#### Scenario: Experiencia sin responsabilidades

- **WHEN** una oferta no tiene responsabilidades informadas
- **THEN** el sistema omite la lista de responsabilidades sin romper la fila

### Requirement: Animación de entrada

El sistema SHALL animar la aparición de cada experiencia con un desplazamiento vertical y un retardo escalonado según su posición en la lista.

#### Scenario: Aparición escalonada

- **WHEN** las experiencias se renderizan
- **THEN** cada fila aparece con una animación cuya demora aumenta según su índice

### Requirement: Logotipo de empresa

El sistema SHALL cargar el logotipo de cada empresa desde el directorio estático `/job-icons/` usando el valor del campo `icon`.

El logotipo SHALL mostrarse con una transición de opacidad una vez completada su carga.

#### Scenario: Carga del logotipo

- **WHEN** el navegador termina de cargar la imagen de una empresa
- **THEN** el sistema la muestra con una transición de opacidad

### Requirement: Iconografía de los indicadores

El sistema SHALL mostrar los indicadores de trayectoria con iconos de calendario, maletín y lista de verificación, usando el color de acento del tema.

#### Scenario: Indicadores con iconos

- **WHEN** el visitante ve el bloque de indicadores
- **THEN** cada indicador muestra su icono correspondiente junto al valor y la etiqueta
