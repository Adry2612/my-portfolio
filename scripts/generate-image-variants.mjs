// Genera variantes WebP a los tamaños en los que realmente se muestran las
// imágenes del portfolio. El resultado se versiona en el repositorio para que
// el servidor no tenga que redimensionar nada en tiempo de petición.
//
// Uso: node scripts/generate-image-variants.mjs [--force]
//
// Requiere `cwebp` (brew install webp) para codificar.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const TARGETS = [
  {
    dir: 'public/proyect-images',
    // La tarjeta mide ~488 px en escritorio (grid al 80% de 1240 px).
    widths: [400, 640, 960],
    quality: 78,
  },
  {
    dir: 'public/job-icons',
    // El icono se muestra a 150 px (110 px en móvil).
    widths: [150, 300],
    quality: 82,
    only: ['babel.webp', 'allfunds.webp'],
  },
];

const force = process.argv.includes('--force');

const isVariant = (file) => /-\d+\.webp$/i.test(file);
const isSource = (file) => /\.(webp|jpg|jpeg|png)$/i.test(file) && !isVariant(file);

function encode(input, output, width, quality) {
  execFileSync('cwebp', [
    '-quiet',
    '-q',
    String(quality),
    '-resize',
    String(width),
    '0',
    input,
    '-o',
    output,
  ]);
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

let generated = 0;
let skipped = 0;

for (const target of TARGETS) {
  const files = readdirSync(target.dir)
    .filter(isSource)
    .filter((file) => !target.only || target.only.includes(file))
    .sort();

  console.log(`\n${target.dir} (${files.length} originales)`);

  for (const file of files) {
    const input = path.join(target.dir, file);
    const base = file.replace(/\.[^.]+$/, '');
    const originalSize = statSync(input).size;
    const sizes = [];

    for (const width of target.widths) {
      const output = path.join(target.dir, `${base}-${width}.webp`);

      if (!force && existsSync(output)) {
        skipped += 1;
      } else {
        encode(input, output, width, target.quality);
        generated += 1;
      }

      sizes.push(`${width}: ${kb(statSync(output).size)}`);
    }

    console.log(
      `  ${file.padEnd(24)} ${kb(originalSize).padStart(9)} -> ${sizes.join(' · ')}`,
    );
  }
}

console.log(`\nVariantes generadas: ${generated}, ya existentes: ${skipped}`);
