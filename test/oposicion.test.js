import test from 'node:test';
import assert from 'node:assert/strict';
import { stages, legislation } from '../oposicion.js';
import { lawQuestions, lawTopic } from '../legislacion-bank.js';
import { cycles } from '../ciclos.js';
import { officialTopics } from '../temario-oficial.js';

test('hay entrenamientos específicos para todas las partes y fases previstas', () => {
  assert.deepEqual(stages.map(stage => stage.id), ['tema', 'practico', 'programacion', 'unidad', 'debate']);
  for (const stage of stages) {
    assert.ok(stage.title && stage.description);
    assert.ok(Number.isInteger(stage.minutes) && stage.minutes > 0 && stage.minutes <= 240);
    assert.ok(stage.prompts.length >= 2 && stage.checklist.length >= 3);
  }
});

test('el temario de la especialidad comprende 69 enunciados oficiales numerados', () => {
  assert.equal(officialTopics.length, 69);
  assert.equal(new Set(officialTopics).size, 69);
  assert.ok(officialTopics.every(topic => typeof topic === 'string' && topic.length > 100));
  assert.match(officialTopics[0], /^La intervención social:/);
  assert.match(officialTopics[17], /^Planificación y programación de la Animación Sociocultural/);
  assert.match(officialTopics[68], /^La relación del Técnico Superior en Integración Social/);
});

test('ciclos identificados ofrecen módulos y fuentes oficiales', () => {
  assert.equal(cycles.length, 13);
  assert.equal(new Set(cycles.map(cycle => cycle.title)).size, cycles.length);
  for (const cycle of cycles) {
    assert.ok(cycle.title && cycle.grade && cycle.note);
    assert.ok(cycle.modules.length >= 2);
    assert.ok(cycle.modules.every(module => module.name && module.course));
    assert.ok(cycle.sources.some(source => source.url.startsWith('https://www.boe.es/')));
    assert.ok(cycle.sources.some(source => source.url.startsWith('https://todofp.es/') && source.url.endsWith('/atribucion-docente.html')));
    assert.ok(cycle.sources.some(source => source.url === 'https://www.educarex.es/fp/curriculo-ex.html'));
  }
});

test('atribuciones compartidas y secuenciación se mantienen por título', () => {
  const find = title => cycles.find(cycle => cycle.title === title);
  const moduleFor = (cycle, code) => cycle.modules.find(module => module.name.startsWith(`${code} ·`));
  const equestrian = find('Actividades Ecuestres');
  const guide = find('Guía en el Medio Natural y de Tiempo Libre');
  assert.match(moduleFor(equestrian, '1328').course, /2.º · 80 horas; atribución compartida/);
  assert.equal(moduleFor(guide, '1328'), undefined);
  assert.match(moduleFor(guide, '1664').course, /1.º · 30 horas/);
  assert.match(moduleFor(equestrian, '1708').course, /2.º · 30 horas/);
  assert.match(moduleFor(find('Integración Social'), '1665').course, /1.º · 30 horas/);
  assert.match(moduleFor(find('Animación Sociocultural y Turística'), '1665').course, /2.º · 30 horas/);
  assert.match(moduleFor(find('Enseñanza y Animación Sociodeportiva'), '1124').course, /2.º · 130 horas/);
  assert.match(moduleFor(find('Acondicionamiento Físico'), '0017').course, /2.º · 130 horas/);
  assert.match(moduleFor(find('Educación y Control Ambiental'), '0791').course, /pendiente de localizar/);
  for (const cycle of cycles) {
    assert.ok(cycle.modules.some(module => /Proyecto intermodular/i.test(module.name)));
    assert.ok(cycle.modules.some(module => module.name.startsWith('1708 ·')));
    assert.ok(cycle.modules.some(module => /^166[45] ·/.test(module.name)));
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
