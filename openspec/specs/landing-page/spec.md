# Landing Page Specification

## Purpose

Describir la página principal del portfolio de Adrián Vidal: su composición, las secciones visibles, el origen de los datos y el comportamiento de carga que ofrece al visitante.

## Requirements

### Requirement: Estructura de la página principal

El sistema SHALL renderizar una página principal única en la ruta `/` que componga las secciones de presentación, trayectoria, proyectos, stack y contacto dentro de un mismo documento.

La página SHALL incluir el encabezado de navegación, el contenido principal y el pie de página en ese orden.

#### Scenario: Visita a la página principal

- **WHEN** un visitante accede a `/`
- **THEN** el sistema muestra el encabezado, la sección de presentación, la marquesina de especialidades, la trayectoria, los proyectos, el stack, la sección de contacto y el pie de página

#### Scenario: Navegación interna

- **WHEN** el visitante activa un enlace del menú
- **THEN** el sistema desplaza la vista hasta la sección correspondiente sin recargar la página

### Requirement: Sección de presentación

El sistema SHALL mostrar una sección de presentación (`#sobremi`) con el nombre, una frase de posicionamiento, una breve biografía, acciones para ver proyectos y descargar el currículum, y una fotografía del autor.

La acción de descarga SHALL apuntar al archivo estático `/files/curriculum.pdf` con el nombre de archivo `Curriculum de Adrian Vidal`.

Los iconos de las acciones SHALL renderizarse como SVG con `currentColor` y SHALL mantener la misma apariencia en cualquier plataforma, sin usar glifos emoji.

#### Scenario: Descarga del currículum

- **WHEN** el visitante pulsa la acción de descargar CV
- **THEN** el sistema descarga el archivo `/files/curriculum.pdf`

#### Scenario: Acceso a los proyectos desde la presentación

- **WHEN** el visitante pulsa la acción "Ver proyectos"
- **THEN** el sistema desplaza la vista hasta la sección `#proyectos`

#### Scenario: Icono consistente entre plataformas

- **WHEN** la acción "Ver proyectos" se muestra en un dispositivo móvil o en escritorio
- **THEN** el icono de flecha diagonal se renderiza como un SVG con el color del texto, sin convertirse en emoji a color

### Requirement: Indicadores de trayectoria

El sistema SHALL mostrar un bloque de indicadores estáticos con la edad, los años de experiencia y la cantidad de proyectos del autor.

Los valores SHALL ser `27 años`, `+ 5 años` y `+ 10` respectivamente.

#### Scenario: Visualización de indicadores

- **WHEN** el visitante alcanza la sección de trayectoria
- **THEN** el sistema muestra los tres indicadores con sus iconos y etiquetas

### Requirement: Origen de datos del contenido

El sistema SHALL obtener las ofertas de empleo, las tecnologías y los proyectos desde los endpoints internos `/api/jobs`, `/api/tecnologies` y `/api/proyects`.

La URL base de las peticiones SHALL resolverse a partir de las cabeceras de la petición entrante, usando el host y el protocolo reenviado, y SHALL recurrir a la variable de entorno `NEXT_PUBLIC_API_URL` cuando no haya host disponible.

#### Scenario: Resolución de la URL base mediante cabeceras

- **WHEN** la página se renderiza en el servidor con una cabecera `host` disponible
- **THEN** el sistema construye la URL base con el protocolo de `x-forwarded-proto` (o `http`) y el host recibido

#### Scenario: Resolución de la URL base mediante entorno

- **WHEN** la página se renderiza sin cabecera `host` pero con `NEXT_PUBLIC_API_URL` definida
- **THEN** el sistema usa `NEXT_PUBLIC_API_URL` como URL base

#### Scenario: Falta de configuración de API

- **WHEN** no existe `NEXT_PUBLIC_API_URL` ni es posible resolver una URL base
- **THEN** el sistema muestra un mensaje indicando que no hay una URL de API configurada y no renderiza el contenido dependiente de datos

### Requirement: Degradación ante fallos de datos

El sistema SHALL continuar renderizando la página cuando una petición de datos falle o devuelva un estado no exitoso.

Ante un fallo, el sistema SHALL tratar la colección afectada como vacía.

#### Scenario: Fallo del endpoint de empleos

- **WHEN** la petición a `/api/jobs` falla o devuelve un estado no exitoso
- **THEN** la sección de trayectoria se renderiza sin ofertas de empleo y sin romper el resto de la página

#### Scenario: Fallo del endpoint de proyectos

- **WHEN** la petición a `/api/proyects` falla o devuelve un estado no exitoso
- **THEN** la sección de proyectos se renderiza sin tarjetas y sin romper el resto de la página

#### Scenario: Fallo del endpoint de tecnologías

- **WHEN** la petición a `/api/tecnologies` falla o devuelve un estado no exitoso
- **THEN** la sección de stack se renderiza sin tecnologías y sin romper el resto de la página

### Requirement: Sección de contacto

El sistema SHALL mostrar una sección de contacto con una acción que abra el cliente de correo del visitante mediante el enlace `mailto:adrianvidal2612@gmail.com`.

La acción de contacto SHALL mostrar un icono SVG de flecha diagonal que herede el color del texto, sin usar glifos emoji.

#### Scenario: Contacto por correo

- **WHEN** el visitante pulsa la acción "Hablemos"
- **THEN** el sistema abre el cliente de correo configurado con el destinatario `adrianvidal2612@gmail.com`

#### Scenario: Icono consistente entre plataformas

- **WHEN** la acción "Hablemos" se muestra en un dispositivo móvil o en escritorio
- **THEN** el icono de flecha diagonal se renderiza como SVG y conserva el mismo aspecto en ambas plataformas

### Requirement: Metadatos y documento base

El sistema SHALL declarar el documento en español y proporcionar metadatos de título y descripción del portfolio.

El título SHALL ser `Portfolio de Adrián Vidal` y la descripción SHALL ser `Esto es el portfolio de Adrián Vidal`.

#### Scenario: Carga del documento

- **WHEN** un visitante carga cualquier ruta del sitio
- **THEN** el documento se sirve con `lang="es"` y los metadatos declarados

### Requirement: Tipografías locales

El sistema SHALL cargar las tipografías General Sans y Satoshi desde archivos locales mediante `next/font/local`, sin depender de servicios externos de fuentes.

#### Scenario: Renderizado con tipografías propias

- **WHEN** el visitante carga la página
- **THEN** los textos se muestran con las familias General Sans y Satoshi servidas desde el propio sitio

### Requirement: Diseño adaptable

El sistema SHALL adaptar la composición de las secciones a distintos tamaños de pantalla, incluyendo una disposición de una sola columna en vistas estrechas.

#### Scenario: Visualización en pantalla estrecha

- **WHEN** el visitante accede desde un dispositivo con ancho reducido
- **THEN** las rejillas de presentación, proyectos, tecnologías y trayectoria se reorganizan en una sola columna o en el número de columnas previsto para ese tamaño

### Requirement: Marquesina de especialidades

El sistema SHALL mostrar una marquesina con las especialidades Frontend, Backend, Producto y Aprender haciendo, separadas por un icono decorativo.

El icono separador SHALL renderizarse como SVG y SHALL quedar oculto para tecnologías de asistencia.

#### Scenario: Visualización de la marquesina

- **WHEN** el visitante carga la página principal
- **THEN** el sistema muestra las cuatro especialidades separadas por el icono decorativo

#### Scenario: Separador consistente entre plataformas

- **WHEN** la marquesina se muestra en un dispositivo móvil o en escritorio
- **THEN** el separador se renderiza como SVG y no como emoji a color
