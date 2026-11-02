# Portfolio de Adrián Vidal

Portfolio personal de Adrián Vidal, desarrollador full stack. El sitio presenta la trayectoria profesional, los proyectos y el stack tecnológico, con contenido servido desde MongoDB y una interfaz adaptable con tema claro y oscuro.

## Stack

- **Framework:** Next.js 15 (App Router) con React 18 y TypeScript
- **Estilos:** Tailwind CSS, CSS global con variables de tema
- **Animaciones:** Framer Motion
- **Datos:** MongoDB + Mongoose
- **Iconos:** Font Awesome, SVG propios y `next/image`
- **Tipografías:** General Sans y Satoshi locales (`next/font/local`)

## Estructura

```
src/
├── app/
│   ├── api/              # Endpoints de solo lectura (jobs, proyects, tecnologies, education)
│   ├── fonts/            # Fuentes locales
│   ├── layout.tsx        # Layout raíz y metadatos
│   ├── page.tsx          # Página principal (server component)
│   └── globals.css       # Tema visual y estilos
├── components/           # Secciones, tarjetas, filtros y animaciones
├── hooks/                # Hooks de animación
├── lib/mongoose.ts       # Conexión reutilizable a MongoDB
└── models/               # Modelos de Mongoose

openspec/
├── specs/                # Especificaciones de comportamiento del sistema
└── changes/              # Propuestas de cambio de OpenSpec
```

## Requisitos

- Node.js 18 o superior
- Una base de datos MongoDB accesible

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```bash
MONGODB_URI=mongodb://usuario:contraseña@host:puerto/basedatos
NEXT_PUBLIC_API_URL=http://localhost:3000
```

`MONGODB_URI` es obligatoria para que los endpoints puedan leer datos. `NEXT_PUBLIC_API_URL` se usa como URL base de la API cuando la página no puede resolverla desde las cabeceras de la petición.

## Uso

```bash
npm install
npm run dev       # Servidor de desarrollo en http://localhost:3000
npm run build     # Compilación de producción
npm start         # Servidor de producción
npm run lint      # Análisis estático
```

### Actualizar descripciones de proyectos

El campo `description` de cada proyecto se guarda en MongoDB. Para actualizarlo de forma idempotente:

```bash
npm run update:project-descriptions -- --dry-run
npm run update:project-descriptions
```

El script empareja por nombre, informa de los proyectos no encontrados y no modifica el resto. Requiere `MONGODB_URI` en `.env.local`.

## API

Todos los endpoints son de solo lectura (`GET`) y devuelven JSON:

| Endpoint           | Respuesta                    |
| ------------------ | ---------------------------- |
| `/api/jobs`        | `{ jobs: [...] }`            |
| `/api/proyects`    | `{ proyects: [...] }`        |
| `/api/tecnologies` | `{ tecnologies: [...] }`     |
| `/api/education`   | `{ education: [...] }`       |

## Documentación con OpenSpec

El comportamiento del sitio está documentado como especificaciones en [`openspec/specs`](./openspec/specs):

- [`landing-page`](./openspec/specs/landing-page/spec.md): estructura de la página, secciones, datos y degradación ante fallos.
- [`navigation-and-theme`](./openspec/specs/navigation-and-theme/spec.md): navegación, menú móvil, tema claro/oscuro y pie de página.
- [`project-showcase`](./openspec/specs/project-showcase/spec.md): filtros, ordenación, paginación, tarjetas y galería de proyectos.
- [`experience-timeline`](./openspec/specs/experience-timeline/spec.md): indicadores y lista de experiencias laborales.
- [`technology-stack`](./openspec/specs/technology-stack/spec.md): filtros y rejilla de tecnologías.
- [`content-api`](./openspec/specs/content-api/spec.md): endpoints, conexión a MongoDB y modelos de datos.

Comandos útiles:

```bash
openspec list --specs          # Listar especificaciones
openspec show <spec>           # Ver una especificación
openspec validate --specs      # Validar las especificaciones
openspec new change <nombre>   # Crear una propuesta de cambio
openspec view                  # Abrir el panel interactivo
```

## Despliegue

El proyecto está preparado para desplegarse en Vercel. Configura `MONGODB_URI` y `NEXT_PUBLIC_API_URL` en las variables de entorno del proyecto.
