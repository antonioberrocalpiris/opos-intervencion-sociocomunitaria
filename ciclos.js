const curriculum = {
  title: 'Educarex · Currículos e instrucciones actualizados (incluida Instrucción 21/2025)',
  url: 'https://www.educarex.es/fp/curriculo-ex.html'
};
const cycle = (title, grade, boe, doe, modules, note) => ({
  title, grade, modules: modules.map(([name, course]) => ({ name, course })),
  note,
  sources: [
    { title: 'Título estatal y atribución docente · BOE', url: `https://www.boe.es/buscar/act.php?id=${boe}` },
    ...(doe ? [{ title: 'Currículo autonómico original · DOE', url: `https://doe.juntaex.es/pdfs/doe/${doe}.pdf` }] : []),
    curriculum
  ]
});

export const cycles = [
  cycle('Atención a Personas en Situación de Dependencia', 'Grado medio · Servicios Socioculturales y a la Comunidad', 'BOE-A-2011-19542', '2013/2080o/13040223', [
    ['Características y necesidades de las personas en situación de dependencia', '1.º en la distribución anterior'],
    ['Organización de la atención a las personas en situación de dependencia', '2.º en la distribución anterior'],
    ['Destrezas sociales', '2.º en la distribución anterior']
  ], 'Decreto extremeño 197/2013. El curso indicado es una referencia de la distribución anterior; verifica los anexos y adaptaciones aplicables al año académico.'),
  cycle('Integración Social', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2012-10866', '2014/1920o/14040250', [
    ['Contexto de la intervención social', '1.º en la distribución anterior'],
    ['Promoción de la autonomía personal', '1.º en la distribución anterior'],
    ['Metodología de la intervención social', '1.º en la distribución anterior'],
    ['Apoyo a la intervención educativa', '2.º en la distribución anterior'],
    ['Habilidades sociales', '2.º en la distribución anterior']
  ], 'Decreto extremeño 221/2014; contrasta la actualización de la titulación y la instrucción aplicable. El curso indicado es orientativo y procede de la distribución anterior.'),
  cycle('Animación Sociocultural y Turística', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2011-20272', '2014/2210o/14040276', [
    ['Metodología de la intervención social', '1.º en la distribución anterior'],
    ['Desarrollo comunitario', '1.º en la distribución anterior'],
    ['Contexto de la animación sociocultural', '1.º en la distribución anterior'],
    ['Animación y gestión cultural', '1.º en la distribución anterior; atribución compartida'],
    ['Dinamización grupal', '2.º en la distribución anterior; atribución compartida'],
    ['Animación turística', '2.º en la distribución anterior; atribución compartida'],
    ['Intervención socioeducativa con jóvenes', '2.º en la distribución anterior']
  ], 'Decreto extremeño 242/2014. La distribución anterior puede cambiar con la adaptación del currículo; comprueba el anexo actual y la atribución compartida.'),
  cycle('Educación Infantil', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2007-20201', '2008/1570o/08040190', [
    ['Didáctica de la educación infantil', '1.º en la distribución anterior'],
    ['Desarrollo cognitivo y motor', '1.º en la distribución anterior'],
    ['Desarrollo socioafectivo', '2.º en la distribución anterior'],
    ['Habilidades sociales', '2.º en la distribución anterior'],
    ['Intervención con familias y atención a menores en riesgo social', '2.º en la distribución anterior']
  ], 'Decreto extremeño 173/2008 y sus modificaciones. Comprueba el currículo actualizado y no confundas impartir el ciclo de FP con ser docente de la etapa de Educación Infantil.'),
  cycle('Mediación Comunicativa', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2014-10871', '2016/500o/16040033', [
    ['Metodología de la integración social de las personas con dificultades de comunicación, lenguaje y habla', '1.º en la distribución anterior'],
    ['Sensibilización social y participación', '1.º en la distribución anterior'],
    ['Habilidades sociales', '2.º en la distribución anterior']
  ], 'Decreto extremeño 29/2016. Verifica los cambios del título y la instrucción autonómica aplicable antes de tomar el curso como definitivo.'),
  cycle('Promoción de Igualdad de Género', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2013-12146', '2015/310o/15040018', [
    ['Habilidades sociales', 'Curso pendiente de confirmar'],
    ['Metodología de la intervención social', 'Curso pendiente de confirmar'],
    ['Desarrollo comunitario', 'Curso pendiente de confirmar'],
    ['Información y comunicación con perspectiva de género', 'Curso pendiente de confirmar'],
    ['Ámbitos de intervención para la promoción de igualdad', 'Curso pendiente de confirmar'],
    ['Participación social de las mujeres', 'Curso pendiente de confirmar'],
    ['Intervención socioeducativa para la igualdad', 'Curso pendiente de confirmar']
  ], 'Decreto extremeño 13/2015. No se ha podido confirmar de forma fiable la distribución actual de los módulos entre cursos: consulta el anexo y las instrucciones vigentes.'),
  cycle('Servicios Funerarios', 'Grado medio · Servicios Socioculturales y a la Comunidad', 'BOE-A-2025-14086', null, [
    ['Protocolo y ceremonias funerarias', 'Distribución en Extremadura pendiente de localizar'],
    ['Destrezas sociales', 'Distribución en Extremadura pendiente de localizar']
  ], 'Título estatal de 2025. No se ha confirmado currículo propio ni oferta en Extremadura: consulta Educación FP y el centro antes de considerarlo disponible.'),
  cycle('Formación para la Movilidad Segura y Sostenible', 'Grado superior · Seguridad y Medio Ambiente', 'BOE-A-2021-4569', null, [
    ['Educación vial', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['Didáctica de la formación para la seguridad vial', 'Distribución en Extremadura pendiente de localizar; atribución compartida']
  ], 'No se ha confirmado currículo propio ni oferta en Extremadura. Consulta el título, sus atribuciones y el centro antes de considerarlo disponible.')
];
