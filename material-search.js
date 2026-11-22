import { normalizeSearch } from './logic.js?v=5';

export function searchDocumentIndex(entries, query, group = 'all', document = 'all') {
  const words = normalizeSearch(query.trim()).split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    const text = normalizeSearch(`${entry.title} ${entry.section} ${entry.keywords}`);
    return (group === 'all' || entry.group === group)
      && (document === 'all' || entry.document === document)
      && words.every(word => text.includes(word));
  });
}

export function parsePrivateIndex(indexText, catalog) {
  const match = /^const documents = ([\s\S]*);\s*$/.exec(indexText);
  if (!match) throw new Error('El índice privado no tiene el formato esperado.');
  const documents = JSON.parse(match[1]);
  if (!Array.isArray(documents) || !Array.isArray(catalog)) throw new Error('El catálogo o el índice privado no es una lista.');
  const ids = new Set();
  return catalog.map(entry => {
    if (!entry || typeof entry.id !== 'string' || ids.has(entry.id) || !['tema', 'supuesto'].includes(entry.group) ||
        (entry.topic !== null && (!Number.isInteger(entry.topic) || entry.topic < 1 || entry.topic > 69))) {
      throw new Error('Hay una asociación de tema inválida o duplicada en el catálogo privado.');
    }
    ids.add(entry.id);
    const doc = documents.find(item => item.id === entry.id);
    if (!doc || typeof doc.title !== 'string' || !/^archivos\/[a-z0-9-]+\.(pdf|docx)$/.test(doc.file) ||
        !Array.isArray(doc.pages) || !doc.pages.length || doc.pages.some(page => typeof page !== 'string')) {
      throw new Error(`Documento privado ${entry.id} no disponible o con formato inválido.`);
    }
    return { ...doc, topic: entry.topic, group: entry.group };
  });
}

export function searchPrivateDocuments(documents, query, topic = 'all') {
  const search = normalizeSearch(query.trim());
  if (search.length < 2) return [];
  return documents.flatMap(doc => {
    if (topic === 'supuesto' ? doc.group !== 'supuesto' : topic !== 'all' && doc.topic !== Number(topic)) return [];
    return doc.pages.flatMap((page, index) => {
      const text = page.replace(/\s+/g, ' ');
      const position = normalizeSearch(text).indexOf(search);
      if (position < 0) return [];
      return [{ doc, page: index + 1, excerpt: `…${text.slice(Math.max(0, position - 90), position + search.length + 150)}…` }];
    });
  });
}
