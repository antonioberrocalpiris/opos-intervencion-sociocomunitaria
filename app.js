import { topics, questions, guides, sequences, cases } from './data.js?v=2';
import { normalizeSearch, scoreQuestions, selectQuestions, shuffle, validateImport } from './logic.js';
import { legislation, stages } from './oposicion.js?v=4';
import { cycles } from './ciclos.js?v=3';
import { officialTopics } from './temario-oficial.js?v=4';

const $ = id => document.getElementById(id);
const make = (tag, text, className) => {
  const element = document.createElement(tag);
  if (text != null) element.textContent = text;
  if (className) element.className = className;
  return element;
};
const storageKey = 'sociocomunitaria-material-v1';
let personal = [];
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (!Array.isArray(stored)) throw new Error('La biblioteca guardada no tiene un formato válido.');
  personal = stored.map(item => {
    if (typeof item.id !== 'string' || !item.id.startsWith('personal-')) throw new Error('Un tema guardado no tiene identificador válido.');
    return { ...validateImport(item), id: item.id };
  });
  if (new Set(personal.map(item => item.id)).size !== personal.length) throw new Error('Hay identificadores duplicados.');
} catch (error) {
  $('import-status').textContent = `No se ha podido cargar la biblioteca: ${error.message}. No se ha modificado el almacenamiento.`;
  $('storage-warning').textContent = $('import-status').textContent;
  $('storage-warning').hidden = false;
}
let storageSafe = !$('import-status').textContent;
function savePersonal(next) {
  if (!storageSafe) throw new Error('No se puede sobrescribir una biblioteca que no se ha podido leer. Recupera una copia válida.');
  try { localStorage.setItem(storageKey, JSON.stringify(next)); }
  catch (error) { throw new Error(`No se pudo guardar en el navegador: ${error.message}`); }
  personal = next;
}
function allTopics() {
  return [...topics, ...personal.map(item => ({ id: item.id, title: item.title, intro: 'Material propio', origin: 'propio' }))];
}
function allQuestions() {
  return [...questions, ...personal.flatMap(item => item.questions.map((q, index) => ({ ...q, id: `${item.id}-${index}`, topic: item.id })))];
}
function topicTitle(id) { return allTopics().find(topic => topic.id === id)?.title || 'Tema no disponible'; }
function sourceElement(source) {
  if (source.startsWith('https://')) {
    const link = make('a', 'Consultar fuente oficial ↗');
    link.href = source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  return make('small', source);
}

function refreshFilters() {
  for (const id of ['topic-filter', 'exercise-filter']) {
    const select = $(id);
    const selected = select.value;
    select.replaceChildren(make('option', id === 'topic-filter' ? 'Todos los temas con preguntas' : 'Todos los bloques'));
    select.firstChild.value = 'all';
    const bank = allQuestions();
    for (const topic of allTopics()) {
      if (id === 'topic-filter' && !bank.some(q => q.topic === topic.id)) continue;
      if (id === 'exercise-filter' && !sequences.some(e => e.topic === topic.id) && !cases.some(e => e.topic === topic.id)) continue;
      const option = make('option', `${topic.title} · ${topic.origin}`);
      option.value = topic.id;
      select.append(option);
    }
    select.value = [...select.options].some(option => option.value === selected) ? selected : 'all';
  }
  $('topic-count').textContent = String(topics.length);
  $('question-count').textContent = String(allQuestions().length);
}

function showPanel(id) {
  if (!document.querySelector(`.tab[data-panel="${id}"]`)) return;
  for (const button of document.querySelectorAll('.tab')) {
    const active = button.dataset.panel === id;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }
  for (const panel of document.querySelectorAll('.panel')) panel.hidden = panel.id !== id;
}
document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => {
  showPanel(button.dataset.panel);
  history.replaceState(null, '', `#${button.dataset.panel}`);
}));
window.addEventListener('hashchange', () => showPanel(location.hash.slice(1)));
showPanel(location.hash.slice(1) || 'practica');

let quiz = null;
$('start').addEventListener('click', () => {
  const count = Number($('count').value);
  const selected = selectQuestions(allQuestions(), $('topic-filter').value, count);
  if (selected.length < count) {
    $('quiz-error').textContent = `Hay ${selected.length} preguntas disponibles con ese filtro. Elige una cantidad menor o cambia de tema.`;
    return;
  }
  $('quiz-error').textContent = '';
  quiz = { items: selected, index: 0, answers: {}, mode: $('mode').value, answered: false };
  $('results').hidden = true;
  $('quiz').hidden = false;
  renderQuestion();
  $('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
function renderQuestion() {
  const q = quiz.items[quiz.index];
  quiz.answered = false;
  $('quiz-label').textContent = quiz.mode === 'practice' ? 'PRÁCTICA GUIADA' : 'AUTOCOMPROBACIÓN';
  $('question-text').textContent = q.prompt;
  $('question-topic').textContent = topicTitle(q.topic);
  $('quiz-progress').textContent = `${quiz.index + 1} / ${quiz.items.length}`;
  $('progress-bar').style.width = `${100 * quiz.index / quiz.items.length}%`;
  $('feedback').hidden = true;
  $('feedback').replaceChildren();
  $('next').hidden = true;
  $('blank').hidden = false;
  $('options').replaceChildren();
  for (const option of shuffle(q.options.map((text, index) => ({ text, index })))) {
    const button = make('button', option.text, 'option');
    button.type = 'button';
    button.addEventListener('click', () => answer(option.index));
    $('options').append(button);
  }
}
function answer(choice) {
  if (quiz.answered) return;
  quiz.answered = true;
  const q = quiz.items[quiz.index];
  quiz.answers[q.id] = choice;
  for (const button of $('options').children) button.disabled = true;
  $('blank').hidden = true;
  $('next').hidden = false;
  $('next').textContent = quiz.index === quiz.items.length - 1 ? 'Ver resultados →' : 'Siguiente →';
  if (quiz.mode === 'practice') {
    $('feedback').append(make('strong', choice == null ? 'En blanco' : choice === q.answer ? '¡Bien hecho!' : 'Una oportunidad para aprender'));
    $('feedback').append(make('p', `Respuesta: ${q.options[q.answer]}`), make('p', q.explanation), sourceElement(q.source));
    $('feedback').hidden = false;
  }
}
$('blank').addEventListener('click', () => answer(null));
$('next').addEventListener('click', () => {
  if (++quiz.index >= quiz.items.length) finishQuiz();
  else renderQuestion();
});
$('finish').addEventListener('click', finishQuiz);
function finishQuiz() {
  const score = scoreQuestions(quiz.items, quiz.answers);
  $('quiz').hidden = true;
  const results = $('results');
  results.replaceChildren(make('p', 'CADA INTENTO CUENTA', 'eyebrow'), make('h3', 'Has dado otro paso.'), make('p', `${score.correct} aciertos · ${score.incorrect} errores · ${score.blank} en blanco, incluidas las preguntas no respondidas.`), make('p', 'Repasa las explicaciones y vuelve a intentarlo cuando quieras.', 'muted'));
  for (const q of quiz.items) {
    const details = make('details');
    const choice = quiz.answers[q.id];
    details.append(make('summary', `${choice == null ? 'En blanco' : choice === q.answer ? 'Correcta' : 'Para repasar'} · ${q.prompt}`));
    details.append(make('p', `Tu respuesta: ${choice == null ? 'En blanco' : q.options[choice]}`), make('p', `Respuesta propuesta: ${q.options[q.answer]}`), make('p', q.explanation), sourceElement(q.source));
    results.append(details);
  }
  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderExercises() {
  const filter = $('exercise-filter').value;
  $('sequence-list').replaceChildren();
  $('case-list').replaceChildren();
  for (const exercise of sequences.filter(e => filter === 'all' || e.topic === filter)) {
    const card = make('article', null, 'card exercise-card');
    card.append(make('p', topicTitle(exercise.topic), 'eyebrow'), make('h4', exercise.title), make('p', 'Utiliza las flechas para ordenar los pasos.', 'muted'));
    const list = make('ol', null, 'sequence');
    let order = shuffle(exercise.steps);
    const draw = () => {
      list.replaceChildren();
      order.forEach((step, index) => {
        const row = make('li');
        row.append(make('span', step));
        const controls = make('span', null, 'move-controls');
        for (const [label, delta] of [['↑', -1], ['↓', 1]]) {
          const button = make('button', label, 'move');
          button.type = 'button';
          button.setAttribute('aria-label', `${delta < 0 ? 'Subir' : 'Bajar'}: ${step}`);
          button.disabled = index + delta < 0 || index + delta >= order.length;
          button.addEventListener('click', () => {
            [order[index], order[index + delta]] = [order[index + delta], order[index]];
            draw();
            list.children[index + delta].querySelectorAll('button')[delta < 0 ? 0 : 1].focus();
          });
          controls.append(button);
        }
        row.append(controls); list.append(row);
      });
    };
    draw(); card.append(list);
    const status = make('p', '', 'status');
    status.setAttribute('role', 'status');
    const check = make('button', 'Comprobar orden', 'button secondary');
    check.type = 'button';
    check.addEventListener('click', () => { status.textContent = order.every((step, index) => step === exercise.steps[index]) ? '¡Bien! Coincide con el orden orientativo.' : `Aún no coincide. Pista: ${exercise.hint}`; });
    const solution = make('details');
    solution.append(make('summary', 'Ver orden orientativo'));
    const correct = make('ol');
    exercise.steps.forEach(step => correct.append(make('li', step)));
    solution.append(correct);
    card.append(check, status, solution); $('sequence-list').append(card);
  }
  for (const exercise of cases.filter(e => filter === 'all' || e.topic === filter)) {
    const card = make('article', null, 'card exercise-card');
    card.append(make('p', topicTitle(exercise.topic), 'eyebrow'), make('h4', exercise.title), make('p', exercise.text), make('strong', exercise.prompt));
    const label = make('label', 'Tu propuesta (no se guarda)', 'case-answer');
    const textarea = make('textarea'); textarea.rows = 5; textarea.placeholder = 'Escribe tu razonamiento...';
    label.append(textarea); card.append(label);
    const details = make('details'); details.append(make('summary', 'Ver guía de reflexión'));
    const list = make('ul');
    exercise.guide.forEach(item => list.append(make('li', item)));
    details.append(list); card.append(details); $('case-list').append(card);
  }
}
$('exercise-filter').addEventListener('change', renderExercises);

function renderLibrary() {
  const container = $('library');
  container.replaceChildren();
  const search = normalizeSearch($('search').value.trim());
  const matches = allTopics().filter(topic => {
    const item = personal.find(p => p.id === topic.id);
    return normalizeSearch(`${topic.title} ${topic.intro} ${item?.notes || ''}`).includes(search);
  });
  if (!matches.length) container.append(make('p', 'No se han encontrado temas con ese texto.', 'muted'));
  for (const topic of matches) {
    const item = personal.find(p => p.id === topic.id);
    const card = make('article', null, 'card library-card');
    card.append(make('p', topic.origin === 'propio' ? 'MATERIAL PROPIO' : 'BLOQUE PROPUESTO', 'eyebrow'), make('h3', topic.title), make('p', topic.intro));
    const count = allQuestions().filter(q => q.topic === topic.id).length;
    card.append(make('p', `${count} preguntas disponibles${count < 50 ? ' · aún no alcanza 50 preguntas' : ''}`, 'muted'));
    if (guides[topic.id]) {
      const details = make('details');
      details.append(make('summary', 'Abrir esquema de estudio'));
      for (const [heading, text] of guides[topic.id]) {
        details.append(make('h4', heading), make('p', text));
      }
      card.append(details);
    }
    if (item?.notes) {
      const details = make('details');
      details.append(make('summary', 'Leer apuntes'), make('p', item.notes, 'notes'));
      card.append(details);
    }
    if (item) {
      const remove = make('button', 'Eliminar tema', 'button outline');
      remove.type = 'button';
      remove.addEventListener('click', () => {
        if (!confirm(`¿Eliminar «${item.title}» y sus preguntas de este navegador?`)) return;
        try { savePersonal(personal.filter(p => p.id !== item.id)); refreshAll(); $('import-status').textContent = 'Tema eliminado.'; }
        catch (error) { $('import-status').textContent = error.message; }
      });
      card.append(remove);
    }
    container.append(card);
  }
}
$('search').addEventListener('input', renderLibrary);
function refreshAll() { refreshFilters(); renderExercises(); renderLibrary(); }

$('import').addEventListener('click', async () => {
  const file = $('import-file').files[0];
  try {
    if (!file) throw new Error('Selecciona un archivo TXT o JSON.');
    if (file.size > 2_000_000) throw new Error('El archivo supera el límite de 2 MB.');
    const text = await file.text();
    let value;
    if (/\.json$/i.test(file.name)) {
      try { value = JSON.parse(text); } catch { throw new Error('El JSON no es válido.'); }
    } else if (/\.txt$/i.test(file.name)) {
      value = { title: $('import-title').value, notes: text };
    } else throw new Error('Solo se admiten archivos .txt o .json.');
    const item = { ...validateImport(value), id: `personal-${crypto.randomUUID()}` };
    savePersonal([...personal, item]);
    $('import-file').value = ''; $('import-title').value = '';
    $('import-status').textContent = `Añadido «${item.title}» con ${item.questions.length} preguntas.`;
    refreshAll();
  } catch (error) { $('import-status').textContent = error.message; }
});

for (const topic of topics) {
  const card = make('article', null, 'card');
  card.append(make('p', 'BLOQUE PROPUESTO', 'eyebrow'), make('h3', topic.title), make('p', topic.intro));
  for (const [heading, text] of guides[topic.id] || []) card.append(make('h4', heading), make('p', text));
  $('study-list').append(card);
}

for (const area of new Set(legislation.map(law => law.area))) {
  const option = make('option', area);
  option.value = area;
  $('law-filter').append(option);
}
function renderLaws() {
  $('law-list').replaceChildren();
  for (const law of legislation.filter(item => $('law-filter').value === 'all' || item.area === $('law-filter').value)) {
    const card = make('article', null, 'card source-list');
    const link = make('a', 'Abrir fuente oficial ↗');
    link.href = law.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    card.append(make('p', law.area, 'eyebrow'), make('h3', law.title), make('p', law.summary), make('p', `Para preparar la oposición: ${law.application}`), link);
    if (law.extra) {
      const extra = make('a', law.extra.text + ' ↗');
      extra.href = law.extra.url; extra.target = '_blank'; extra.rel = 'noopener noreferrer';
      card.append(make('p'), extra);
    }
    $('law-list').append(card);
  }
}
$('law-filter').addEventListener('change', renderLaws);
renderLaws();

function renderCycles() {
  const query = normalizeSearch($('cycle-search').value.trim());
  const matches = cycles.filter(cycle => normalizeSearch(`${cycle.title} ${cycle.grade} ${cycle.modules.map(module => `${module.name} ${module.course}`).join(' ')}`).includes(query));
  $('cycle-list').replaceChildren();
  if (!matches.length) $('cycle-list').append(make('p', 'No se han encontrado ciclos con ese texto.', 'muted'));
  for (const cycle of matches) {
    const card = make('article', null, 'card source-list');
    card.append(make('p', cycle.grade, 'eyebrow'), make('h3', cycle.title), make('p', cycle.note));
    const list = make('ul', null, 'cycle-modules');
    for (const module of cycle.modules) list.append(make('li', `${module.name} — ${module.course}`));
    card.append(make('strong', 'Módulos identificados para contrastar en el anexo de profesorado'), list);
    for (const source of cycle.sources) {
      const link = make('a', source.title + ' ↗');
      link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const row = make('p'); row.append(link); card.append(row);
    }
    $('cycle-list').append(card);
  }
}
$('cycle-search').addEventListener('input', renderCycles);
renderCycles();

const stageSelect = $('stage-select');
const officialTopicSelect = $('official-topic-select');
for (const [index, topic] of officialTopics.entries()) {
  const label = topic.length > 100 ? `${topic.slice(0, 100).trimEnd()}…` : topic;
  const option = make('option', `Tema ${index + 1} · ${label}`);
  option.value = String(index);
  officialTopicSelect.append(option);
}
for (const stage of stages) {
  const option = make('option', stage.title);
  option.value = stage.id; stageSelect.append(option);
}
let promptIndex = 0;
let interval = null;
let deadline = null;
function showOfficialTopic() {
  const index = Number(officialTopicSelect.value);
  $('official-topic-text').textContent = `Tema ${index + 1}. ${officialTopics[index]}`;
}
function stopTimer() {
  if (interval !== null) clearInterval(interval);
  interval = null;
  deadline = null;
}
function showStage() {
  stopTimer();
  const stage = stages.find(item => item.id === stageSelect.value);
  $('stage-title').textContent = stage.title;
  $('stage-description').textContent = stage.description;
  $('stage-minutes').value = stage.minutes;
  $('stage-timer').textContent = '00:00';
  $('timer-status').textContent = 'El tiempo es orientativo y puede ajustarse.';
  $('stage-prompt').textContent = stage.prompts[promptIndex];
  $('stage-checklist').replaceChildren();
  for (const text of stage.checklist) {
    const label = make('label', null, 'check-item');
    const input = make('input'); input.type = 'checkbox';
    label.append(input, document.createTextNode(text));
    $('stage-checklist').append(label);
  }
}
stageSelect.addEventListener('change', () => { promptIndex = 0; showStage(); });
officialTopicSelect.addEventListener('change', showOfficialTopic);
$('official-topic-next').addEventListener('click', () => {
  officialTopicSelect.selectedIndex = (officialTopicSelect.selectedIndex + 1) % officialTopics.length;
  showOfficialTopic();
});
$('stage-new').addEventListener('click', () => {
  const stage = stages.find(item => item.id === stageSelect.value);
  promptIndex = (promptIndex + 1) % stage.prompts.length;
  $('stage-prompt').textContent = stage.prompts[promptIndex];
});
function updateTimer() {
  const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  $('stage-timer').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  if (remaining === 0) {
    stopTimer();
    $('timer-status').textContent = 'Tiempo terminado. Revisa tu trabajo con calma.';
  }
}
$('timer-start').addEventListener('click', () => {
  const minutes = Number($('stage-minutes').value);
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 240) {
    $('timer-status').textContent = 'Introduce un número entero de minutos entre 1 y 240.';
    return;
  }
  stopTimer();
  deadline = Date.now() + minutes * 60_000;
  $('timer-status').textContent = 'Reloj en marcha. El borrador no se guarda al recargar.';
  updateTimer();
  interval = setInterval(updateTimer, 1000);
});
$('timer-stop').addEventListener('click', () => {
  stopTimer();
  $('timer-status').textContent = 'Reloj detenido. Al iniciarlo de nuevo empieza desde el tiempo indicado.';
});
showOfficialTopic();
showStage();
$('export').addEventListener('click', () => {
  if (!storageSafe) { $('backup-status').textContent = 'La biblioteca no se ha podido leer; no se puede exportar una copia fiable.'; return; }
  const blob = new Blob([JSON.stringify({ version: 1, topics: personal }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = make('a'); link.href = url; link.download = 'mis-temas-sociocomunitaria.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('backup-status').textContent = 'Copia preparada. Guárdala en un lugar seguro.';
});
$('restore').addEventListener('change', async event => {
  try {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 10_000_000) throw new Error('La copia supera el límite de 10 MB.');
    let data;
    try { data = JSON.parse(await file.text()); } catch { throw new Error('La copia no contiene JSON válido.'); }
    if (data?.version !== 1 || !Array.isArray(data.topics)) throw new Error('La copia no tiene el formato esperado.');
    const next = data.topics.map(item => {
      if (typeof item.id !== 'string' || !item.id.startsWith('personal-')) throw new Error('Un tema de la copia no tiene identificador válido.');
      return { ...validateImport(item), id: item.id };
    });
    if (new Set(next.map(item => item.id)).size !== next.length) throw new Error('La copia contiene identificadores duplicados.');
    if (!confirm('La restauración sustituirá todos los temas personales de este navegador. ¿Continuar?')) return;
    const wasSafe = storageSafe;
    storageSafe = true;
    try { savePersonal(next); } catch (error) { storageSafe = wasSafe; throw error; }
    $('import-status').textContent = '';
    $('backup-status').textContent = `Copia restaurada: ${next.length} temas.`;
    refreshAll();
  } catch (error) { $('backup-status').textContent = error.message; }
  finally { event.target.value = ''; }
});
refreshAll();
