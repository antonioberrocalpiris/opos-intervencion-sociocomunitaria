import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePrivateIndex, searchPrivateDocuments } from '../material-search.js';

const index = 'const documents = [{"id":"t46","title":"Tema 46","file":"archivos/tema46.pdf","pages":["Desarrollo motor y lateralidad.","Preferencia LATERAL."]},{"id":"caso","title":"Supuesto","file":"archivos/caso.docx","pages":["Prevención y mediación"]}];\n';
const catalog = [{ id: 't46', topic: 46, group: 'tema' }, { id: 'caso', topic: null, group: 'supuesto' }];

test('asocia solamente documentos presentes con temas expresamente catalogados', () => {
  const docs = parsePrivateIndex(index, catalog);
  assert.equal(docs[0].topic, 46);
  assert.equal(docs[1].topic, null);
  assert.throws(() => parsePrivateIndex(index, [{ id: 'ausente', topic: 46, group: 'tema' }]), /no disponible/);
  assert.throws(() => parsePrivateIndex(index, [{ id: 't46', topic: 70, group: 'tema' }]), /inválida/);
  assert.throws(() => parsePrivateIndex(index, [{ id: 't46', topic: 46, group: 'desconocido' }]), /inválida/);
  assert.throws(() => parsePrivateIndex(index, [catalog[0], catalog[0]]), /duplicada/);
  assert.throws(() => parsePrivateIndex('código inesperado', catalog), /formato esperado/);
  assert.throws(() => parsePrivateIndex(index.replace('archivos/tema46.pdf', '../tema46.pdf'), catalog), /inválido/);
});

test('busca en todas las páginas ignorando acentos y permite filtrar por tema', () => {
  const docs = parsePrivateIndex(index, catalog);
  assert.deepEqual(searchPrivateDocuments(docs, 'lateral').map(hit => hit.page), [1, 2]);
  assert.equal(searchPrivateDocuments(docs, 'mediacion')[0].doc.id, 'caso');
  assert.equal(searchPrivateDocuments(docs, 'mediacion', '46').length, 0);
  assert.equal(searchPrivateDocuments(docs, 'mediacion', 'supuesto')[0].doc.id, 'caso');
  assert.equal(searchPrivateDocuments(docs, 'no existe').length, 0);
  assert.equal(searchPrivateDocuments(docs, 'LATERALIDAD', '46')[0].page, 1);
  assert.equal(searchPrivateDocuments(docs, 'x').length, 0);
});
