import test from 'node:test';
import assert from 'node:assert/strict';
import { stages, legislation } from '../oposicion.js';
import { lawQuestions, lawTopic } from '../legislacion-bank.js';
import { cycles } from '../ciclos.js';

test('hay entrenamientos específicos para todas las partes y fases previstas', () => {
  assert.deepEqual(stages.map(stage => stage.id), ['tema', 'practico', 'programacion', 'unidad', 'debate', 'concurso', 'practicas']);
  for (const stage of stages) {
    assert.ok(stage.title && stage.description);
    assert.ok(Number.isInteger(stage.minutes) && stage.minutes > 0 && stage.minutes <= 240);
    assert.ok(stage.prompts.length >= 2 && stage.checklist.length >= 3);
  }
});

test('ciclos identificados ofrecen módulos y fuentes oficiales', () => {
  assert.equal(cycles.length, 8);
  assert.equal(new Set(cycles.map(cycle => cycle.title)).size, cycles.length);
  for (const cycle of cycles) {
    assert.ok(cycle.title && cycle.grade && cycle.note);
    assert.ok(cycle.modules.length >= 2);
    assert.ok(cycle.modules.every(module => module.name && module.course));
    assert.ok(cycle.sources.some(source => source.url.startsWith('https://www.boe.es/')));
    assert.ok(cycle.sources.some(source => source.url === 'https://www.educarex.es/fp/curriculo-ex.html'));
  }
});

test('legislación dispone de fuentes oficiales y 50 preguntas', () => {
  assert.equal(lawQuestions.length, 50);
  assert.ok(lawQuestions.every(question => question.topic === lawTopic.id && question.source.startsWith('https://www.boe.es/')));
  assert.ok(legislation.length >= 10);
  for (const law of legislation) {
    assert.ok(law.title && law.summary && law.application);
    assert.match(law.url, /^https:\/\/(www\.boe\.es|doe\.juntaex\.es|www\.educarex\.es)\//);
  }
});
