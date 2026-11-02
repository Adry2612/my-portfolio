# Spec Delta

## MODIFIED Requirements

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
