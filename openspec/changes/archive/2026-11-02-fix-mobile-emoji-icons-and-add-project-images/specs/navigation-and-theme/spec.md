# Spec Delta

## MODIFIED Requirements

### Requirement: Encabezado de navegación

El sistema SHALL mostrar un encabezado fijo con el logotipo, el nombre del autor y los enlaces de navegación a las secciones de trayectoria, proyectos, stack y contacto.

El encabezado SHALL ocultarse cuando el visitante se desplace hacia abajo más de 120 píxeles y SHALL volver a mostrarse al desplazarse hacia arriba.

El enlace de contacto SHALL mostrar un icono SVG de flecha diagonal que herede el color del texto, sin usar glifos emoji.

#### Scenario: Ocultar el encabezado al bajar

- **WHEN** el visitante se desplaza hacia abajo y supera los 120 píxeles de scroll
- **THEN** el encabezado se desplaza fuera de la vista con una animación

#### Scenario: Mostrar el encabezado al subir

- **WHEN** el visitante se desplaza hacia arriba
- **THEN** el encabezado vuelve a mostrarse

#### Scenario: Navegación suave

- **WHEN** el visitante pulsa un enlace del encabezado
- **THEN** el sistema realiza un desplazamiento suave de 800 milisegundos hasta la sección destino

#### Scenario: Icono de contacto consistente entre plataformas

- **WHEN** el enlace de contacto se muestra en un dispositivo móvil o en escritorio
- **THEN** el icono de flecha diagonal se renderiza como SVG y conserva el mismo aspecto en ambas plataformas
