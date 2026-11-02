# Spec Delta

## MODIFIED Requirements

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

### Requirement: Sección de contacto

El sistema SHALL mostrar una sección de contacto con una acción que abra el cliente de correo del visitante mediante el enlace `mailto:adrianvidal2612@gmail.com`.

La acción de contacto SHALL mostrar un icono SVG de flecha diagonal que herede el color del texto, sin usar glifos emoji.

#### Scenario: Contacto por correo

- **WHEN** el visitante pulsa la acción "Hablemos"
- **THEN** el sistema abre el cliente de correo configurado con el destinatario `adrianvidal2612@gmail.com`

#### Scenario: Icono consistente entre plataformas

- **WHEN** la acción "Hablemos" se muestra en un dispositivo móvil o en escritorio
- **THEN** el icono de flecha diagonal se renderiza como SVG y conserva el mismo aspecto en ambas plataformas

## ADDED Requirements

### Requirement: Marquesina de especialidades

El sistema SHALL mostrar una marquesina con las especialidades Frontend, Backend, Producto y Aprender haciendo, separadas por un icono decorativo.

El icono separador SHALL renderizarse como SVG y SHALL quedar oculto para tecnologías de asistencia.

#### Scenario: Visualización de la marquesina

- **WHEN** el visitante carga la página principal
- **THEN** el sistema muestra las cuatro especialidades separadas por el icono decorativo

#### Scenario: Separador consistente entre plataformas

- **WHEN** la marquesina se muestra en un dispositivo móvil o en escritorio
- **THEN** el separador se renderiza como SVG y no como emoji a color
