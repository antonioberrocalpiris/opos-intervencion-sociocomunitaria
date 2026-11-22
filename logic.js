export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(bank, topic, count, random = Math.random) {
  return shuffle(bank.filter(question => topic === 'all' || question.topic === topic), random).slice(0, count);
}

export function scoreQuestions(questions, answers) {
  const result = { correct: 0, incorrect: 0, blank: 0 };
  for (const question of questions) {
    if (answers[question.id] == null) result.blank++;
    else if (answers[question.id] === question.answer) result.correct++;
    else result.incorrect++;
  }
  return result;
}

export function validateImport(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('El archivo debe contener un objeto JSON.');
  if (typeof value.title !== 'string' || !value.title.trim()) throw new Error('El tema necesita un título.');
  if (value.notes != null && typeof value.notes !== 'string') throw new Error('Las notas deben ser texto.');
  if (value.questions != null && !Array.isArray(value.questions)) throw new Error('Las preguntas deben ser una lista.');
  const list = value.questions || [];
  list.forEach((q, index) => {
    if (!q || typeof q !== 'object' || typeof q.prompt !== 'string' || !q.prompt.trim() ||
      !Array.isArray(q.options) || q.options.length !== 4 ||
      q.options.some(option => typeof option !== 'string' || !option.trim()) ||
      new Set(q.options.map(option => option.trim().toLocaleLowerCase('es'))).size !== 4 ||
      !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3 ||
      typeof q.explanation !== 'string' || !q.explanation.trim()) {
      throw new Error(`Pregunta ${index + 1}: se requieren enunciado, cuatro opciones distintas, respuesta 0–3 y explicación.`);
    }
    if (q.source != null && typeof q.source !== 'string') throw new Error(`Pregunta ${index + 1}: la fuente debe ser texto.`);
  });
  if (!value.notes?.trim() && list.length === 0) throw new Error('Añade notas o al menos una pregunta.');
  return { title: value.title.trim(), notes: value.notes || '', questions: list.map(q => ({
    prompt: q.prompt.trim(), options: q.options.map(option => option.trim()), answer: q.answer,
    explanation: q.explanation.trim(), source: q.source?.trim() || 'Material propio: pendiente de contrastar.'
  })) };
}

export function normalizeSearch(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
}

export function filterLaws(laws, { area = 'all', scope = 'all', kind = 'all', query = '' } = {}) {
  const search = normalizeSearch(query.trim());
  return laws.filter(law => (area === 'all' || law.area === area)
    && (scope === 'all' || law.scope.includes(scope))
    && (kind === 'all' || law.kind === kind)
    && normalizeSearch(`${law.title} ${law.summary} ${law.application} ${law.area} ${law.scope.join(' ')} ${law.kind} ${law.extra?.text || ''}`).includes(search));
}

export function filterCycles(cycles, { query = '', grade = 'all', course = 'all', attribution = 'all' } = {}) {
  const search = normalizeSearch(query.trim());
  return cycles.flatMap(cycle => {
    if (grade !== 'all' && !cycle.grade.startsWith(grade)) return [];
    const cycleMatch = normalizeSearch(`${cycle.title} ${cycle.grade}`).includes(search);
    const modules = cycle.modules.filter(module => {
      const shared = module.course.includes('atribución compartida');
      return (course === 'all' || module.course.startsWith(course))
        && (attribution === 'all' || (attribution === 'shared' ? shared : !shared))
        && (cycleMatch || normalizeSearch(`${module.name} ${module.course}`).includes(search));
    });
    return modules.length ? [{ ...cycle, modules }] : [];
  });
}
