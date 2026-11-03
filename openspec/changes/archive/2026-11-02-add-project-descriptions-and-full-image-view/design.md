# Design

## Context

Ver `proposal.md` para la motivación. El estado actual relevante:

- `ProyectType` no tiene `description`; el modelo `Proyect` tampoco.
- El panel expandible muestra nombre, actividades y etiquetas (`Proyect.tsx`).
- `.project-image-wrap` usa `aspect-ratio: 4 / 3` y `.project-image` usa `object-fit: cover`, lo que recorta ~27 % del ancho de las capturas 16:9.
- Hay 11 documentos en la colección `proyects`. La mayoría de las capturas son 16:9; las de Toggl son cuadradas.
- La API ya devuelve campos no declarados en el esquema gracias a `lean()`, pero conviene declarar `description` para que el modelo sea explícito.

## Goals / Non-Goals

**Goals:**

- Mostrar una descripción breve por proyecto en el panel expandible.
- Guardar las descripciones en MongoDB de forma reproducible e idempotente.
- Mostrar las capturas completas sin recortes, con un marco neutro coherente.

**Non-Goals:**

- Cambiar la interacción de expansión de las tarjetas.
- Rediseñar la rejilla, la paginación o los filtros.
- Generar miniaturas o imágenes derivadas.
- Cambiar el carrusel o la reproducción automática.

## Decisions

### Decisión 1: `description` como campo opcional en datos y UI

Se añadirá `description?: string` a `ProyectType` y `description: String` al esquema de Mongoose. En `Proyect.tsx` se renderizará un párrafo antes de las actividades, solo si el valor no está vacío, para no dejar huecos en proyectos sin descripción.

**Alternativas consideradas:**

- Mantener un mapa estático de descripciones en el frontend. Se descarta porque el contenido ya vive en MongoDB y el resto de campos se gestionan ahí.
- Reutilizar `activities` como descripción. Se descarta porque actividades y descripción tienen propósitos distintos y varios proyectos no tienen actividades.

### Decisión 2: Actualización mediante script idempotente

Se creará `scripts/update-project-descriptions.mjs` con un mapa `nombre → descripción`. El script:

- Exige `MONGODB_URI`.
- Admite `--dry-run` para mostrar los cambios sin escribir.
- Actualiza con `updateOne({ name }, { $set: { description } })`.
- Informa de documentos encontrados y modificados, y falla si algún nombre no existe.

Se añadirá el comando `npm run update:project-descriptions` usando `node --env-file=.env.local`.

**Alternativas consideradas:**

- Actualizar los documentos a mano desde MongoDB Atlas. Se descarta por falta de reproducibilidad y de revisión en el repositorio.
- Un seed completo de proyectos. Se descarta porque el alcance es solo añadir descripciones y no reemplazar el resto de datos.

### Decisión 3: Capturas completas con `contain` y marco neutro

Se mantendrá el contenedor 4:3 para no alterar la rejilla, pero:

- `.project-image` pasará a `object-fit: contain`.
- `.project-image-wrap` usará un fondo neutro oscuro (`#151817`) en lugar de blanco.

Así las capturas 16:9 y las cuadradas se ven completas. Las bandas que aparezcan quedan integradas en un marco oscuro intencionado, tanto en tema claro como oscuro.

**Alternativas consideradas:**

- Contenedor 16:10 con `cover`: reduce el recorte al ~11 %, pero sigue cortando laterales y recorta mucho las capturas cuadradas.
- Fondo difuminado con la propia imagen: evita bandas vacías, pero duplica el renderizado de imágenes y añade complejidad al carrusel.

### Decisión 4: Contenido de las descripciones

Se usarán estas descripciones, revisables antes de aplicar el script:

| Proyecto | Descripción |
| --- | --- |
| Wordle | Recreación del juego Wordle con React y Tailwind. Gestiona el estado de la partida, las validaciones y el historial de intentos con Context. |
| 2048 | Versión web del clásico 2048 construida con Next.js y React. Incluye la lógica de fusión de fichas, el cálculo de puntuación y el estado de la partida. |
| Banca Digital Unicaja | Interfaz de banca digital de Unicaja centrada en transferencias y gestión de cuentas. Desarrollada con React y Styled Components en el equipo de Babel Group. |
| Banca Digital Unicaja App | Aplicación móvil de banca de Unicaja para consultar cuentas y realizar transferencias. Interfaz React adaptada a iOS y Android desde Babel Group. |
| Campus Generali | Plataforma de formación online de Generali para empleados y colaboradores. Mantenimiento y evolución del sitio en ColdFusion para Geotap. |
| Gener@ App | Aplicación móvil de formación de Generali con itinerarios formativos y un chatbot de apoyo. Desarrollada en Flutter para Geotap. |
| Calculadora IRPF | Calculadora para estimar el resultado del IRPF a partir de salarios, retenciones y situación personal. Construida con Next.js, React y Tailwind. |
| Toggl track VSCode extension | Extensión de Visual Studio Code para consultar y controlar Toggl Track sin salir del editor. Desarrollada con JavaScript y la API de VSCode. |
| Nextportfolio | Plataforma de gestión de carteras para clientes bancarios. Contribución al backend con microservicios y resolución de incidencias en Allfunds Digital. |
| thediary. | Diario personal para organizar rutinas de práctica musical, sesiones y objetivos. Construido con Next.js, Tailwind y Supabase. |
| kanso. | Recomendador musical que sugiere discos según el estado de ánimo y la actividad. Construido con Next.js, Tailwind y Firebase. |

## Risks / Trade-offs

- [Las descripciones son subjetivas] → Quedan en el diseño y en el script para que el usuario las revise antes de aplicar los cambios en MongoDB.
- [El emparejamiento por `name` puede fallar si se renombra un proyecto] → El script informa de los nombres no encontrados y no modifica el resto; se puede ajustar el mapa.
- [`contain` deja bandas visibles] → Se usa un fondo neutro oscuro que las convierte en marco; se valida en tema claro y oscuro.
- [La cuarta captura de thediary no está en MongoDB] → No afecta a este cambio; puede añadirse al array `img` en otra actualización.
- [El script requiere `MONGODB_URI`] → Se documenta el comando y se admite `--dry-run` para revisar sin escribir.

## Migration Plan

1. Añadir el campo y el renderizado de la descripción.
2. Ajustar el CSS de la imagen.
3. Ejecutar el script en modo `--dry-run` y revisar los 11 cambios.
4. Aplicar el script contra la base de datos.
5. Verificar la API y la página en escritorio y móvil.
6. Si hiciera falta revertir, retirar `description` de los documentos y restaurar `cover` y el fondo blanco.
