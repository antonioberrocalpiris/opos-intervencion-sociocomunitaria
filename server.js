import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.pdf': 'application/pdf', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const port = Number(process.env.PORT || 4173);
createServer(async (req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Solicitud no válida'); return; }
  const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  const extension = extname(file);
  if (!file.startsWith(root + sep) || !types[extension] ||
      (['.pdf', '.docx'].includes(extension) && !file.startsWith(resolve(root, 'material-privado') + sep))) {
    res.writeHead(404).end('No encontrado'); return;
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)], 'X-Content-Type-Options': 'nosniff' }).end(data);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') res.writeHead(404).end('No encontrado');
    else { console.error(error); res.writeHead(500).end('Error al leer el archivo'); }
  }
}).listen(port, '127.0.0.1', () => console.log(`Abre http://127.0.0.1:${port}`));
