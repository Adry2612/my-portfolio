# Spec Delta

## MODIFIED Requirements

### Requirement: Encabezado de navegación

El sistema SHALL mostrar un encabezado fijo con el logotipo, el nombre del autor y los enlaces de navegación a las secciones de trayectoria, proyectos, stack y contacto.

El encabezado SHALL ocultarse cuando el visitante se desplace hacia abajo más de 120 píxeles y SHALL volver a mostrarse al desplazarse hacia arriba.

El enlace de contacto SHALL mostrar un icono SVG de flecha diagonal que herede el color del texto, sin usar glifos emoji.

Los enlaces SHALL ser anclas con `href` a la sección correspondiente y el desplazamiento suave SHALL resolverse con CSS.

#### Scenario: Ocultar el encabezado al bajar

- **WHEN** el visitante se desplaza hacia abajo y supera los 120 píxeles de scroll
- **THEN** el encabezado se desplaza fuera de la vista con una animación CSS

#### Scenario: Mostrar el encabezado al subir

- **WHEN** el visitante se desplaza hacia arriba
- **THEN** el encabezado vuelve a mostrarse

#### Scenario: Navegación suave

- **WHEN** el visitante pulsa un enlace del encabezado
- **THEN** el navegador desplaza la vista suavemente hasta la sección usando el `href` del ancla

#### Scenario: Enlace rastreable

- **WHEN** un rastreador o una tecnología de asistencia inspecciona el menú
- **THEN** cada enlace expone un `href` válido hacia su sección

#### Scenario: Icono de contacto consistente entre plataformas

- **WHEN** el enlace de contacto se muestra en un dispositivo móvil o en escritorio
- **THEN** el icono de flecha diagonal se renderiza como SVG y conserva el mismo aspecto en ambas plataformas
