# Content API Specification

## Purpose

Describir la capa de datos del portfolio: los endpoints internos de solo lectura, la conexión con MongoDB y los modelos que definen los documentos.

## Requirements

### Requirement: Endpoints de contenido

El sistema SHALL exponer endpoints HTTP `GET` de solo lectura para obtener los contenidos del portfolio:

- `/api/jobs` para las experiencias laborales.
- `/api/proyects` para los proyectos.
- `/api/tecnologies` para las tecnologías.
- `/api/education` para la formación.

Cada endpoint SHALL responder con un objeto JSON que contenga la colección bajo la clave correspondiente: `jobs`, `proyects`, `tecnologies` o `education`.

#### Scenario: Obtener experiencias

- **WHEN** un cliente realiza `GET /api/jobs`
- **THEN** el sistema responde con `{ "jobs": [...] }` ordenado por `startDate` de forma descendente

#### Scenario: Obtener proyectos

- **WHEN** un cliente realiza `GET /api/proyects`
- **THEN** el sistema responde con `{ "proyects": [...] }`

#### Scenario: Obtener tecnologías

- **WHEN** un cliente realiza `GET /api/tecnologies`
- **THEN** el sistema responde con `{ "tecnologies": [...] }`

#### Scenario: Obtener formación

- **WHEN** un cliente realiza `GET /api/education`
- **THEN** el sistema responde con `{ "education": [...] }`

### Requirement: Conexión a la base de datos

El sistema SHALL conectar con MongoDB mediante Mongoose usando la variable de entorno `MONGODB_URI`.

El sistema SHALL reutilizar la conexión existente cuando ya esté establecida, evitando abrir una nueva conexión en cada petición.

#### Scenario: Primera petición

- **WHEN** llega una petición a un endpoint y no existe una conexión activa
- **THEN** el sistema abre una conexión con `MONGODB_URI` y ejecuta la consulta

#### Scenario: Peticiones posteriores

- **WHEN** llega una petición y la conexión a MongoDB ya está activa
- **THEN** el sistema reutiliza esa conexión sin volver a conectarse

### Requirement: Modelo de experiencias

El sistema SHALL definir un modelo de Mongoose para las experiencias con los campos `name`, `description`, `startDate`, `endDate`, `tecnologies` e `icon`.

#### Scenario: Documento de experiencia

- **WHEN** el endpoint de experiencias consulta su colección
- **THEN** devuelve documentos con los campos del modelo en formato JSON plano mediante `lean()`

### Requirement: Modelo de proyectos

El sistema SHALL definir un modelo de Mongoose para los proyectos con los campos `name`, `description`, `img`, `images`, `deploy_url`, `repo_url` y `labels`.

#### Scenario: Documento de proyecto

- **WHEN** el endpoint de proyectos consulta su colección
- **THEN** devuelve documentos con los campos del modelo en formato JSON plano mediante `lean()`

#### Scenario: Descripción opcional

- **WHEN** un proyecto tiene el campo `description` informado
- **THEN** la respuesta de `/api/proyects` incluye esa descripción en el documento

#### Scenario: Proyecto sin descripción

- **WHEN** un proyecto no tiene el campo `description` informado
- **THEN** la respuesta sigue siendo válida y el campo se omite o llega vacío

### Requirement: Modelo de tecnologías

El sistema SHALL definir un modelo de Mongoose para las tecnologías con los campos `name`, `description`, `state`, `category` e `icon`.

#### Scenario: Documento de tecnología

- **WHEN** el endpoint de tecnologías consulta su colección
- **THEN** devuelve documentos con los campos del modelo en formato JSON plano mediante `lean()`

### Requirement: Modelo de formación

El sistema SHALL definir un modelo de Mongoose para la formación con los campos `name`, `description`, `startDate`, `endDate` e `icon`.

#### Scenario: Documento de formación

- **WHEN** el endpoint de formación consulta su colección
- **THEN** devuelve documentos con los campos del modelo en formato JSON plano mediante `lean()`

### Requirement: Manejo de errores de los endpoints

El sistema SHALL capturar los errores de consulta y responder con un objeto JSON que contenga la propiedad `error`.

#### Scenario: Fallo de conexión o consulta

- **WHEN** la conexión o la consulta a MongoDB produce un error
- **THEN** el sistema responde con un objeto JSON con la propiedad `error` en lugar de propagar una excepción no controlada

### Requirement: Consumo interno de la API

El sistema SHALL consumir los endpoints de experiencias, proyectos y tecnologías desde la página principal para renderizar el contenido en el servidor.

El endpoint de formación SHALL estar disponible para consulta aunque la interfaz actual no lo consuma.

#### Scenario: Renderizado en servidor

- **WHEN** la página principal se renderiza
- **THEN** el sistema consulta los endpoints de experiencias, proyectos y tecnologías antes de construir el HTML
