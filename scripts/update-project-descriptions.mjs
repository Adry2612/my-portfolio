import mongoose from 'mongoose';

const descriptions = {
  Wordle:
    'Recreación del juego Wordle con React y Tailwind. Gestiona el estado de la partida, las validaciones y el historial de intentos con Context.',
  '2048':
    'Versión web del clásico 2048 construida con Next.js y React. Incluye la lógica de fusión de fichas, el cálculo de puntuación y el estado de la partida.',
  'Banca Digital Unicaja':
    'Interfaz de banca digital de Unicaja centrada en transferencias y gestión de cuentas. Desarrollada con React y Styled Components en el equipo de Babel Group.',
  'Banca Digital Unicaja App':
    'Aplicación móvil de banca de Unicaja para consultar cuentas y realizar transferencias. Interfaz React adaptada a iOS y Android desde Babel Group.',
  'Campus Generali':
    'Plataforma de formación online de Generali para empleados y colaboradores. Mantenimiento y evolución del sitio en ColdFusion para Geotap.',
  'Gener@ App':
    'Aplicación móvil de formación de Generali con itinerarios formativos y un chatbot de apoyo. Desarrollada en Flutter para Geotap.',
  'Calculadora IRPF':
    'Calculadora para estimar el resultado del IRPF a partir de salarios, retenciones y situación personal. Construida con Next.js, React y Tailwind.',
  'Toggl track VSCode extension':
    'Extensión de Visual Studio Code para consultar y controlar Toggl Track sin salir del editor. Desarrollada con JavaScript y la API de VSCode.',
  Nextportfolio:
    'Plataforma de gestión de carteras para clientes bancarios. Contribución al backend con microservicios y resolución de incidencias en Allfunds Digital.',
  'thediary.':
    'Diario personal para organizar rutinas de práctica musical, sesiones y objetivos. Construido con Next.js, Tailwind y Supabase.',
  'kanso.':
    'Recomendador musical que sugiere discos según el estado de ánimo y la actividad. Construido con Next.js, Tailwind y Firebase.',
};

const dryRun = process.argv.includes('--dry-run');

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      'Falta MONGODB_URI. Define la variable o ejecuta con --env-file=.env.local.',
    );
    process.exitCode = 1;
    return;
  }

  await mongoose.connect(uri);
  const collection = mongoose.connection.db.collection('proyects');

  const missing = [];
  let matched = 0;
  let modified = 0;
  let unchanged = 0;

  for (const [name, description] of Object.entries(descriptions)) {
    const project = await collection.findOne(
      { name },
      { projection: { _id: 1, description: 1 } },
    );

    if (!project) {
      missing.push(name);
      continue;
    }

    matched += 1;

    if (dryRun) {
      const status =
        project.description?.trim() === description ?
          'sin cambios'
        : 'se actualizará';
      console.log(`[dry-run] ${name}: ${status}`);
      continue;
    }

    const result = await collection.updateOne(
      { _id: project._id },
      { $set: { description } },
    );

    if (result.modifiedCount > 0) {
      modified += 1;
      console.log(`Actualizado: ${name}`);
    } else {
      unchanged += 1;
      console.log(`Sin cambios: ${name}`);
    }
  }

  console.log(`\nEncontrados: ${matched}/${Object.keys(descriptions).length}`);

  if (!dryRun) {
    console.log(`Actualizados: ${modified}`);
    console.log(`Sin cambios: ${unchanged}`);
  }

  if (missing.length > 0) {
    console.error(`No encontrados: ${missing.join(', ')}`);
    process.exitCode = 1;
  }

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error('Error actualizando descripciones:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});
