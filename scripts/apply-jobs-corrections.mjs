import mongoose from 'mongoose';
import { writeFileSync } from 'node:fs';

const updates = {
  'Babel Group': {
    description: 'Desarrollador Frontend',
    startDate: 'Mayo 2025',
    endDate: 'Junio 2026',
    tecnologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Zustand',
      'Turborepo',
      'Storybook',
      'Jest',
      'Playwright',
      'Lighthouse CI',
    ],
    thingsDone: [
      'Migré la arquitectura monolítica a un monorepo con Turborepo, Next.js y microfrontends: el tiempo de carga inicial bajó de 3,2 s a 1,8 s (-43 %) y la conversión del embudo subió un 14 %.',
      'Rediseñé el sistema de diseño accesible con más de 40 componentes bajo WCAG 2.1, auditado con Lighthouse CI, en TypeScript y Zustand. La entrega de nuevos módulos pasó de dos semanas a cinco días.',
      'Implementé pruebas E2E y unitarias (Playwright, Jest) en CI/CD con GitHub Actions: un 30 % menos de incidencias en producción y despliegues más rápidos.',
    ],
  },
  'Allfunds Digital': {
    description: 'Desarrollador Full-Stack',
    startDate: 'Agosto 2022',
    endDate: 'Abril 2025',
    tecnologies: [
      'React',
      'Node.js',
      'MongoDB',
      'REST API',
      'WebSockets',
      'JWT/OAuth',
      'Jest',
      'React Testing Library',
      'styled-components',
    ],
    thingsDone: [
      'Construí e integré servicios web bancarios con Node.js, MongoDB y REST API, con autenticación JWT/OAuth, para más de 100.000 transacciones diarias.',
      'Implementé comunicaciones en tiempo real con WebSockets y mantuve la suite de pruebas (Jest, React Testing Library) en un 95 % de cobertura sobre los flujos críticos.',
      'Rediseñé la interfaz bancaria responsiva con React y styled-components bajo arquitectura de diseño atómico, bajando la tasa de rebote del portal por debajo del 5 %.',
    ],
  },
  'Geotap Group': {
    description: 'Desarrollador de aplicaciones',
    startDate: 'Febrero 2021',
    endDate: 'Agosto 2022',
    tecnologies: ['Flutter', 'React Native', 'Node.js', 'Express', 'Angular', 'Python'],
    thingsDone: [
      'Desarrollé dos aplicaciones móviles para iOS y Android con Flutter y React Native, publicadas en App Store y Google Play, que llegaron a superar los 40.000 usuarios activos mensuales.',
      'Integré módulos de etiquetado y procesamiento de datos clínicos en la plataforma web, con un 98 % de precisión en el análisis de imágenes.',
      'Construí la plataforma de e-commerce sobre Node.js, Express y REST API, cuidando la estabilidad del procesamiento de pedidos.',
    ],
  },
};

const dryRun = process.argv.includes('--dry-run');

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Falta MONGODB_URI. Ejecuta con --env-file=.env.local.');
    process.exitCode = 1;
    return;
  }

  await mongoose.connect(uri);
  const collection = mongoose.connection.db.collection('jobs');

  const current = await collection.find({}).toArray();
  const backupPath = `/tmp/portfolio-jobs-backup-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify(current, null, 2));
  console.log(`Backup: ${backupPath} (${current.length} documentos)\n`);

  for (const [name, fields] of Object.entries(updates)) {
    const doc = current.find((job) => job.name === name);

    if (!doc) {
      console.log(`[FALTA] ${name} no existe en la colección`);
      continue;
    }

    const changed = Object.keys(fields).filter(
      (key) => JSON.stringify(doc[key]) !== JSON.stringify(fields[key]),
    );

    console.log(`${name}: ${changed.length ? changed.join(', ') : 'sin cambios'}`);

    if (dryRun || changed.length === 0) continue;

    const result = await collection.updateOne({ _id: doc._id }, { $set: fields });
    console.log(`  actualizado: matched=${result.matchedCount} modified=${result.modifiedCount}`);
  }

  if (dryRun) console.log('\nDry run: no se ha escrito nada.');

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
