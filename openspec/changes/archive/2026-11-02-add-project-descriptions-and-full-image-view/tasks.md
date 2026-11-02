# Tasks

## 1. Modelo y presentación de la descripción

- [x] 1.1 Añadir `description?: string` a `ProyectType` y `description: String` al esquema de `Proyect`; verificar que el proyecto compila y que `/api/proyects` devuelve el campo tras informarlo en un documento.
- [x] 1.2 Renderizar la descripción en el panel expandible antes de las actividades, solo cuando tenga contenido; verificar con un proyecto con descripción y otro sin ella que no aparece un hueco vacío.

## 2. Capturas completas

- [x] 2.1 Cambiar `.project-image` a `object-fit: contain` y el fondo de `.project-image-wrap` a un tono neutro oscuro; verificar en escritorio y móvil que las capturas 16:9 y la cuadrada de Toggl se ven completas y sin recortes.

## 3. Descripciones en MongoDB

- [x] 3.1 Crear `scripts/update-project-descriptions.mjs` con las 11 descripciones del diseño, soporte para `--dry-run`, validación de nombres y el comando `npm run update:project-descriptions`; documentar el comando en el README y verificar que el dry-run encuentra los 11 proyectos.
- [x] 3.2 Ejecutar el script sin `--dry-run` y verificar que `/api/proyects` devuelve `description` en los 11 documentos y que la página muestra los textos en los paneles expandibles.

## 4. Verificación de integración

- [x] 4.1 Ejecutar `npm run build` y verificar que termina sin errores de TypeScript ni de JSX.
- [x] 4.2 Revisar la sección de proyectos en escritorio y móvil: descripciones visibles al expandir, capturas completas sin recorte y carrusel funcionando.

## Workflow follow-up

- Archivar el cambio después de completar la verificación y la revisión del proyecto.
