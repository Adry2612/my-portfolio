# Project Showcase Specification

## Purpose

Describir la sección de proyectos: filtrado por tipo, ordenación, paginación, tarjetas de proyecto, galería de imágenes y enlaces de despliegue y repositorio.

## Requirements

### Requirement: Filtro por tipo de proyecto

El sistema SHALL ofrecer dos filtros de proyecto: `Web` y `Multiplataforma`.

El filtro `Web` SHALL estar activo por defecto y SHALL mostrar únicamente los proyectos cuyo campo `type` sea `web`. El filtro `Multiplataforma` SHALL mostrar únicamente los proyectos cuyo campo `type` sea `mobile`.

#### Scenario: Filtro inicial

- **WHEN** el visitante llega a la sección de proyectos
- **THEN** el sistema muestra los proyectos de tipo `web` y marca visualmente ese filtro como activo

#### Scenario: Cambio a multiplataforma

- **WHEN** el visitante selecciona el filtro `Multiplataforma`
- **THEN** el sistema sustituye la lista por los proyectos de tipo `mobile`

#### Scenario: Indicador del filtro activo

- **WHEN** el visitante cambia de filtro
- **THEN** el sistema anima un indicador deslizante hasta la posición del filtro seleccionado

### Requirement: Ordenación de proyectos

El sistema SHALL ordenar los proyectos filtrados por su fecha de forma descendente, interpretando el campo `date` con el formato `dd/mm/aaaa`.

Los proyectos sin fecha SHALL considerarse con valor temporal cero y quedar al final de la lista.

#### Scenario: Proyectos con fecha

- **WHEN** el sistema filtra proyectos que tienen fechas distintas
- **THEN** los muestra del más reciente al más antiguo

#### Scenario: Proyectos sin fecha

- **WHEN** un proyecto no tiene fecha o la fecha no es interpretable
- **THEN** el sistema lo coloca después de los proyectos con fecha

### Requirement: Paginación de proyectos

El sistema SHALL mostrar como máximo cuatro proyectos por página.

El sistema SHALL mostrar controles de paginación únicamente cuando haya más de una página y SHALL indicar la página activa con `aria-current`.

#### Scenario: Lista con más de cuatro proyectos

- **WHEN** el filtro activo produce más de cuatro proyectos
- **THEN** el sistema muestra la primera página con cuatro tarjetas y los controles para navegar al resto

#### Scenario: Navegación entre páginas

- **WHEN** el visitante pulsa el control de una página
- **THEN** el sistema muestra las tarjetas correspondientes a esa página

#### Scenario: Lista de una sola página

- **WHEN** el filtro activo produce cuatro proyectos o menos
- **THEN** el sistema no muestra controles de paginación

### Requirement: Tarjeta de proyecto

El sistema SHALL mostrar cada proyecto en una tarjeta con su imagen, nombre, etiquetas y enlaces disponibles.

La tarjeta SHALL mostrar una insignia cuando el proyecto tenga el campo `profesional` informado.

#### Scenario: Proyecto profesional

- **WHEN** un proyecto tiene un valor en `profesional`
- **THEN** la tarjeta muestra una insignia con ese valor sobre la imagen

#### Scenario: Enlaces del proyecto

- **WHEN** un proyecto tiene `deploy_url` o `repo_url`
- **THEN** la tarjeta muestra los enlaces "Ver despliegue" y "Ver repositorio" correspondientes, abiertos en una pestaña nueva

#### Scenario: Proyecto sin enlaces

- **WHEN** un proyecto no tiene `deploy_url` ni `repo_url`
- **THEN** la tarjeta no muestra enlaces de acción

### Requirement: Galería de imágenes

El sistema SHALL mostrar las imágenes de un proyecto provenientes del arreglo `images` o, en su defecto, del campo `img` interpretado como una lista separada por comas.

Cuando haya más de una imagen, el sistema SHALL ofrecer flechas de anterior y siguiente, indicadores de posición y reproducción automática al pasar el puntero sobre la imagen.

La reproducción automática SHALL avanzar cada 1600 milisegundos y SHALL detenerse y volver a la primera imagen al retirar el puntero.

#### Scenario: Proyecto con varias imágenes

- **WHEN** un proyecto tiene más de una imagen
- **THEN** el sistema muestra flechas, indicadores y reproduce la galería automáticamente al pasar el puntero

#### Scenario: Detener la reproducción automática

- **WHEN** el visitante retira el puntero de la imagen
- **THEN** el sistema detiene la reproducción automática y vuelve a la primera imagen

#### Scenario: Proyecto con una sola imagen

- **WHEN** un proyecto tiene una única imagen
- **THEN** el sistema no muestra flechas ni indicadores de galería

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

### Requirement: Actividades y etiquetas

El sistema SHALL admitir `activities` como arreglo o como texto único y SHALL unir sus valores separados por comas para mostrarlos.

El sistema SHALL admitir `labels` como arreglo o como texto separado por comas y SHALL mostrar cada etiqueta como un elemento independiente.

#### Scenario: Actividades en texto

- **WHEN** un proyecto define `activities` como una cadena
- **THEN** el sistema la muestra como una única descripción de actividades

#### Scenario: Etiquetas en texto

- **WHEN** un proyecto define `labels` como una cadena separada por comas
- **THEN** el sistema muestra cada etiqueta por separado

### Requirement: Carga progresiva de proyectos

El sistema SHALL mostrar esqueletos de carga mientras prepara la lista de proyectos y SHALL animar la aparición de cada tarjeta.

#### Scenario: Carga inicial

- **WHEN** la sección de proyectos se está preparando
- **THEN** el sistema muestra tarjetas de esqueleto animadas

#### Scenario: Aparición de tarjetas

- **WHEN** las tarjetas están listas
- **THEN** el sistema las muestra con una animación de entrada escalonada

### Requirement: Assets de imágenes de proyecto

Las imágenes de proyecto SHALL almacenarse en formato WebP dentro de `public/proyect-images/`.

Los nombres de archivo SHALL ser estables y descriptivos, usando el patrón `<coleccion><numero>.webp` para las capturas de una misma aplicación.

#### Scenario: Capturas de thediary

- **WHEN** se añaden capturas de la aplicación thediary al portfolio
- **THEN** se guardan como `thediary1.webp`, `thediary2.webp`, `thediary3.webp` y `thediary4.webp` en `public/proyect-images/`

#### Scenario: Capturas de kanso

- **WHEN** se añaden capturas de la aplicación kanso al portfolio
- **THEN** se guardan como `kanso1.webp`, `kanso2.webp` y `kanso3.webp` en `public/proyect-images/`

#### Scenario: Referencia desde la galería

- **WHEN** un proyecto referencia una de estas imágenes por su nombre
- **THEN** la galería la carga desde `/proyect-images/<nombre>.webp`

### Requirement: Visualización completa de capturas

El sistema SHALL mostrar la captura completa de cada proyecto sin recortar su contenido.

El contenedor de imagen SHALL usar un fondo neutro que enmarque la captura cuando su proporción no coincida con la del contenedor.

#### Scenario: Captura apaisada en tarjeta 4:3

- **WHEN** una captura apaisada se muestra en la tarjeta
- **THEN** se ve completa dentro del contenedor, con bandas del fondo neutro en lugar de contenido recortado

#### Scenario: Captura cuadrada

- **WHEN** una captura cuadrada se muestra en la tarjeta
- **THEN** se ve completa y centrada dentro del contenedor

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
