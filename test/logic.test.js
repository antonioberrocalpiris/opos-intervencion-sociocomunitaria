import test from 'node:test';
import assert from 'node:assert/strict';
import { topics, questions, sequences, cases } from '../data.js';
import { normalizeSearch, scoreQuestions, selectQuestions, shuffle, validateImport } from '../logic.js';

test('cada bloque propuesto tiene al menos 50 preguntas distintas y válidas', () => {
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const topic of topics) {
    const bank = questions.filter(q => q.topic === topic.id);
    assert.ok(bank.length >= 50);
    assert.equal(new Set(bank.map(q => q.prompt)).size, bank.length);
    for (const q of bank) {
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.answer >= 0 && q.answer < 4);
      assert.ok(q.explanation && q.source);
    }
    assert.ok(sequences.some(e => e.topic === topic.id));
    assert.ok(cases.some(e => e.topic === topic.id));
  }
});

test('filtra, mezcla sin modificar el original y corrige blancos', () => {
  const original = [1, 2, 3];
  assert.deepEqual(shuffle(original, () => 0), [2, 3, 1]);
  assert.deepEqual(original, [1, 2, 3]);
  const selected = selectQuestions(questions, 'inclusion', 5, () => 0);
  assert.equal(selected.length, 5);
  assert.ok(selected.every(q => q.topic === 'inclusion'));
  const answers = { [selected[0].id]: selected[0].answer, [selected[1].id]: 1 };
  assert.deepEqual(scoreQuestions(selected, answers), { correct: 1, incorrect: 1, blank: 3 });
});

test('valida temas propios y no acepta preguntas incompletas', () => {
  const question = { prompt: '¿Qué?', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: 'Porque sí.' };
  assert.equal(validateImport({ title: ' Tema ', notes: 'Notas', questions: [question] }).title, 'Tema');
  assert.equal(validateImport({ title: 'Solo notas', notes: 'Texto' }).questions.length, 0);
  assert.throws(() => validateImport({ title: 'Vacío' }), /notas o al menos/);
  assert.throws(() => validateImport({ title: 'Tema', questions: [{ ...question, answer: 4 }] }), /Pregunta 1/);
  assert.throws(() => validateImport({ title: 'Tema', questions: [{ ...question, options: ['A', 'a', 'C', 'D'] }] }), /Pregunta 1/);
  assert.throws(() => validateImport({ title: 'Tema', questions: [null] }), /Pregunta 1/);
  assert.equal(normalizeSearch('INTERVENCIÓN'), 'intervencion');
});
