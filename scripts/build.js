import { cp, mkdir, readdir } from 'node:fs/promises';

const files = ['index.html', 'access.js', 'app.js', 'ciclos.js', 'data.js', 'legislacion-bank.js', 'logic.js', 'oposicion.js', 'styles.css'];
await mkdir('dist', { recursive: true });
const unexpected = (await readdir('dist')).filter(file => !files.includes(file));
if (unexpected.length) throw new Error(`dist/ contiene archivos no previstos: ${unexpected.join(', ')}. Retíralos antes de publicar.`);
for (const file of files) await cp(file, `dist/${file}`);
console.log(`Preparados ${files.length} archivos estáticos en dist/.`);
