# Navigation and Theme Specification

## Purpose

Describir la navegación del sitio, el comportamiento del encabezado al hacer scroll, el menú móvil, el cambio de tema claro/oscuro y el pie de página.

## Requirements

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

### Requirement: Menú móvil

El sistema SHALL mostrar un botón de menú en vistas estrechas que permita abrir y cerrar los enlaces de navegación.

El menú SHALL cerrarse automáticamente cuando el ancho de la ventana alcance 765 píxeles o más.

#### Scenario: Abrir el menú móvil

- **WHEN** el visitante pulsa el botón de menú en una vista estrecha
- **THEN** el sistema muestra los enlaces de navegación en una capa superpuesta

#### Scenario: Cerrar el menú al ampliar la ventana

- **WHEN** el ancho de la ventana pasa a ser de 765 píxeles o más con el menú abierto
- **THEN** el sistema cierra el menú automáticamente

### Requirement: Cambio de tema

El sistema SHALL ofrecer un control para alternar entre tema claro y tema oscuro.

El cambio de tema SHALL aplicarse añadiendo o retirando la clase `dark` en el elemento raíz del documento, conforme a la configuración `darkMode: 'class'` de Tailwind.

#### Scenario: Activar el tema oscuro

- **WHEN** el visitante pulsa el control de tema estando en tema claro
- **THEN** el sistema añade la clase `dark` al elemento raíz y actualiza los colores de la interfaz

#### Scenario: Volver al tema claro

- **WHEN** el visitante pulsa el control de tema estando en tema oscuro
- **THEN** el sistema retira la clase `dark` del elemento raíz y restaura los colores claros

#### Scenario: Estado inicial del tema

- **WHEN** el visitante carga el sitio por primera vez
- **THEN** el sistema inicia en tema claro y no conserva la preferencia entre recargas

### Requirement: Accesibilidad del control de tema

El control de tema SHALL exponer un nombre accesible y un estado `aria-pressed` coherentes con el tema activo.

#### Scenario: Lectura por tecnología de asistencia

- **WHEN** una tecnología de asistencia enfoca el control de tema
- **THEN** anuncia la acción disponible ("Activar modo claro" o "Activar modo oscuro") y si el modo oscuro está activo

### Requirement: Pie de página

El sistema SHALL mostrar un pie de página con el aviso de copyright y la autoría del diseño y el código.

#### Scenario: Visualización del pie de página

- **WHEN** el visitante alcanza el final de la página
- **THEN** el sistema muestra el texto de copyright y la autoría

### Requirement: Tema visual

El sistema SHALL definir los colores y superficies del sitio mediante variables CSS, incluyendo fondo, superficie, texto, texto atenuado, líneas, color de acento y superposiciones, y SHALL ofrecer una variante oscura de esos valores.

#### Scenario: Coherencia visual entre secciones

- **WHEN** el visitante navega entre secciones
- **THEN** los colores de fondo, texto y acentos se mantienen coherentes con el tema activo
