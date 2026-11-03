# Proposal

## Why

Las tarjetas de proyecto solo muestran la imagen hasta que el visitante las pulsa, y al abrirlas no hay contexto sobre qué hace cada proyecto: únicamente el nombre, las actividades y las etiquetas. Falta una descripción breve que explique el problema, el enfoque o el resultado.

Además, el contenedor 4:3 con `object-fit: cover` recorta cerca del 27 % del ancho de las capturas 16:9. En la práctica se pierden menús laterales, títulos y partes del contenido, por lo que la imagen comunica peor de lo que podría.

## What Changes

- Añadir el campo opcional `description` al tipo de proyecto, al modelo de Mongoose y a la respuesta de `/api/proyects`.
- Mostrar la descripción en el panel expandible de cada tarjeta, antes de las actividades y las etiquetas.
- Redactar y guardar en MongoDB una descripción breve en español para los 11 proyectos actuales, mediante un script idempotente que empareja por nombre.
- Mostrar las capturas completas sin recorte: `object-fit: contain` sobre un marco neutro oscuro dentro de la tarjeta.
- Mantener el comportamiento actual del carrusel, los enlaces, la paginación y los filtros.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `project-showcase`: la tarjeta incorpora la descripción del proyecto y la galería muestra las capturas completas sin recortes.
- `content-api`: el modelo de proyectos y el endpoint `/api/proyects` incorporan el campo `description`.

## Impact

- `src/components/_types.ts`: campo `description` en `ProyectType`.
- `src/components/Proyect.tsx`: renderizado de la descripción en el panel expandible.
- `src/models/Proyect.ts`: campo `description` en el esquema.
- `src/app/globals.css`: ajuste de `object-fit` y fondo del contenedor de imagen.
- `scripts/update-project-descriptions.mjs`: actualización idempotente de las descripciones en MongoDB.
- `package.json`: comando para ejecutar la actualización de descripciones.
- Documentos de la colección `proyects` en MongoDB: nuevo campo `description` en los 11 proyectos.
- Sin cambios en endpoints, variables de entorno ni dependencias nuevas.
