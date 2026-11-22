const curriculum = {
  title: 'Educarex · Portal de currículos y posibles actualizaciones',
  url: 'https://www.educarex.es/fp/curriculo-ex.html'
};
const superior = {
  title: 'Instrucción consolidada 13/2024 · Distribución de grado superior',
  url: 'https://www.educarex.es/pub/cont/com/0019/documentos/normativa/formacion-profesional/Instrucci%C3%B3n_Consolidada_ccff_gs_2024_2025(F).pdf'
};
const medio = {
  title: 'Instrucción consolidada 12/2024 · Distribución de grado medio',
  url: 'https://www.educarex.es/pub/cont/com/0019/documentos/Instrucci%C3%B3n_Consolidada_ccff_gm_2024_2025_.pdf'
};
const update2025 = {
  title: 'Instrucción 21/2025 · Actualización curricular de Integración Social',
  url: 'https://www.educarex.es/pub/cont/com/0019/documentos/Instruccion_21_2025_SAN-SSC.pdf'
};
const attributionPaths = {
  'Atención a Personas en Situación de Dependencia': 'servicios-socioculturales-comunidad/atencion-personas-situacion-dependencia',
  'Integración Social': 'servicios-socioculturales-comunidad/integracion-social',
  'Animación Sociocultural y Turística': 'servicios-socioculturales-comunidad/animacion-sociocultural-turistica',
  'Educación Infantil': 'servicios-socioculturales-comunidad/educacion-infantil',
  'Mediación Comunicativa': 'servicios-socioculturales-comunidad/mediacion-comunicativa',
  'Promoción de Igualdad de Género': 'servicios-socioculturales-comunidad/promocion-igualdad-genero',
  'Servicios Funerarios': 'servicios-socioculturales-comunidad/servicios-funerarios',
  'Formación para la Movilidad Segura y Sostenible': 'servicios-socioculturales-comunidad/formacion-movilidad-segura-sostenible',
  'Enseñanza y Animación Sociodeportiva': 'actividades-fisicas-deportivas/ensenanza-animacion-sociodeportiva',
  'Acondicionamiento Físico': 'actividades-fisicas-deportivas/acondicionamiento-fisico',
  'Actividades Ecuestres': 'agraria/actividades-ecuestres',
  'Guía en el Medio Natural y de Tiempo Libre': 'actividades-fisicas-deportivas/guia-medio-natural-tiempo-libre',
  'Educación y Control Ambiental': 'seguridad-medio-ambiente/educacion-control-ambiental'
};
const transversal = (grade, digitalCourse, sustainabilityCourse) => [
  [`${grade === 'medio' ? '1664' : '1665'} · Digitalización aplicada a los sectores productivos`, `${digitalCourse} · 30 horas; atribución compartida`],
  ['1708 · Sostenibilidad aplicada al sistema productivo', `${sustainabilityCourse} · 30 horas; atribución compartida`]
];
const cycle = (title, grade, boe, doe, modules, note, extra = []) => ({
  title, grade, modules: modules.map(([name, course]) => ({ name, course })),
  note,
  sources: [
    { title: 'Título estatal · BOE', url: `https://www.boe.es/buscar/act.php?id=${boe}` },
    { title: 'Atribución docente por módulo · TodoFP', url: `https://todofp.es/que-estudiar/familias-profesionales/${attributionPaths[title]}/atribucion-docente.html` },
    { title: 'Adaptación estatal de títulos de FP · BOE', url: grade.startsWith('Grado medio') ? 'https://www.boe.es/buscar/act.php?id=BOE-A-2024-10684' : 'https://www.boe.es/buscar/act.php?id=BOE-A-2024-10685' },
    ...(doe ? [{ title: 'Currículo autonómico original · DOE', url: `https://doe.juntaex.es/pdfs/doe/${doe}.pdf` }] : []),
    ...extra,
    curriculum
  ]
});

export const cycles = [
  cycle('Atención a Personas en Situación de Dependencia', 'Grado medio · Servicios Socioculturales y a la Comunidad', 'BOE-A-2011-19542', '2013/2080o/13040223', [
    ['0212 · Características y necesidades de las personas en situación de dependencia', '1.º · 150 horas'],
    ['0210 · Organización de la atención a las personas en situación de dependencia', '2.º · 130 horas'],
    ['0211 · Destrezas sociales', '2.º · 115 horas'],
    ...transversal('medio', '1.º', '1.º'),
    ['1713 · Proyecto intermodular', '2.º · 50 horas; atribución compartida']
  ], 'Decreto extremeño 197/2013; cursos y horas según anexo 34 de la Instrucción consolidada 12/2024. Confirma posteriores cambios y el curso aplicable.', [medio]),
  cycle('Integración Social', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2012-10866', '2014/1920o/14040250', [
    ['0337 · Contexto de la intervención social', '1.º · 130 horas'],
    ['0342 · Promoción de la autonomía personal', '1.º · 200 horas'],
    ['0344 · Metodología de la intervención social', '1.º · 130 horas'],
    ['0341 · Apoyo a la intervención educativa', '2.º · 130 horas'],
    ['0017 · Habilidades sociales', '2.º · 130 horas'],
    ...transversal('superior', '1.º', '2.º'),
    ['0345 · Proyecto intermodular de integración social', '2.º · 80 horas; atribución compartida']
  ], 'Decreto 221/2014; distribución según anexo 53 de la Instrucción 13/2024. El anexo 4 de la Instrucción 21/2025 actualiza contenidos para 2025/26. Comprueba normas posteriores.', [superior, update2025, { title: 'RD 289/2023 · Actualización estatal de títulos', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-10395' }]),
  cycle('Animación Sociocultural y Turística', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2011-20272', '2014/2210o/14040276', [
    ['0344 · Metodología de la intervención social', '1.º · 130 horas'],
    ['1128 · Desarrollo comunitario', '1.º · 130 horas'],
    ['1131 · Contexto de la animación sociocultural', '1.º · 130 horas'],
    ['1125 · Animación y gestión cultural', '1.º · 230 horas; atribución compartida'],
    ['1124 · Dinamización grupal', '2.º · 130 horas; atribución compartida'],
    ['1126 · Animación turística', '2.º · 200 horas; atribución compartida'],
    ['1130 · Intervención socioeducativa con jóvenes', '2.º · 130 horas'],
    ...transversal('superior', '2.º', '2.º'),
    ['1132 · Proyecto intermodular de animación sociocultural y turística', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 242/2014; distribución según anexo 51 de la Instrucción 13/2024. Comprueba modificaciones posteriores y alcance de la atribución compartida.', [superior]),
  cycle('Educación Infantil', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2007-20201', '2008/1570o/08040190', [
    ['0011 · Didáctica de la educación infantil', '1.º · 230 horas'],
    ['0015 · Desarrollo cognitivo y motor', '1.º · 200 horas'],
    ['0016 · Desarrollo socioafectivo', '2.º · 160 horas'],
    ['0017 · Habilidades sociales', '2.º · 130 horas'],
    ['0018 · Intervención con familias y atención a menores en riesgo social', '2.º · 130 horas'],
    ...transversal('superior', '1.º', '2.º'),
    ['0019 · Proyecto intermodular de atención a la infancia', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 173/2008 y sus modificaciones; distribución según anexo 52 de la Instrucción 13/2024. Impartir este ciclo de FP no equivale a ser docente de la etapa de Educación Infantil.', [superior]),
  cycle('Mediación Comunicativa', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2014-10871', '2016/500o/16040033', [
    ['1111 · Metodología de la integración social de las personas con dificultades de comunicación, lenguaje y habla', '1.º · 135 horas'],
    ['1112 · Sensibilización social y participación', '1.º · 135 horas'],
    ['0017 · Habilidades sociales', '2.º · 130 horas'],
    ...transversal('superior', '2.º', '2.º'),
    ['1119 · Proyecto intermodular en mediación comunicativa', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 29/2016; distribución según anexo 54 de la Instrucción 13/2024. El RD 289/2023 actualiza el título; comprueba sus efectos en módulos compartidos y posteriores cambios.', [superior, { title: 'RD 289/2023 · Actualización estatal de títulos', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-10395' }]),
  cycle('Promoción de Igualdad de Género', 'Grado superior · Servicios Socioculturales y a la Comunidad', 'BOE-A-2013-12146', '2015/310o/15040018', [
    ['0017 · Habilidades sociales', '2.º · 130 horas'],
    ['0344 · Metodología de la intervención social', '1.º · 130 horas'],
    ['1128 · Desarrollo comunitario', '1.º · 130 horas'],
    ['1401 · Información y comunicación con perspectiva de género', '1.º · 200 horas'],
    ['1404 · Ámbitos de intervención para la promoción de igualdad', '1.º · 130 horas'],
    ['1405 · Participación social de las mujeres', '2.º · 100 horas'],
    ['1406 · Intervención socioeducativa para la igualdad', '2.º · 130 horas'],
    ...transversal('superior', '2.º', '2.º'),
    ['1407 · Proyecto intermodular de promoción de igualdad de género', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 13/2015; distribución según anexo 55 de la Instrucción 13/2024. Comprueba las modificaciones posteriores y el régimen del proyecto intermodular.', [superior]),
  cycle('Servicios Funerarios', 'Grado medio · Servicios Socioculturales y a la Comunidad', 'BOE-A-2025-14086', null, [
    ['1687 · Protocolo y ceremonias funerarias', 'Distribución en Extremadura pendiente de localizar'],
    ['0211 · Destrezas sociales', 'Distribución en Extremadura pendiente de localizar'],
    ['1664 · Digitalización aplicada a los sectores productivos', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1708 · Sostenibilidad aplicada al sistema productivo', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1713 · Proyecto intermodular', 'Distribución en Extremadura pendiente de localizar; atribución compartida']
  ], 'Título estatal de 2025. No se ha confirmado currículo propio ni oferta en Extremadura: consulta Educación FP y el centro antes de considerarlo disponible.'),
  cycle('Formación para la Movilidad Segura y Sostenible', 'Grado superior · Seguridad y Medio Ambiente', 'BOE-A-2021-4569', null, [
    ['1656 · Educación vial', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1658 · Didáctica de la formación para la seguridad vial', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1660 · Proyecto intermodular de formación para la movilidad segura y sostenible', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1665 · Digitalización aplicada a los sectores productivos', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1708 · Sostenibilidad aplicada al sistema productivo', 'Distribución en Extremadura pendiente de localizar; atribución compartida']
  ], 'No se ha confirmado currículo propio ni oferta en Extremadura. Consulta el título, sus atribuciones y el centro antes de considerarlo disponible.'),
  cycle('Enseñanza y Animación Sociodeportiva', 'Grado superior · Actividades Físicas y Deportivas', 'BOE-A-2017-8301', '2018/1370o/18040123', [
    ['1124 · Dinamización grupal', '2.º · 130 horas; atribución compartida'],
    ...transversal('superior', '2.º', '2.º'),
    ['1144 · Proyecto intermodular de enseñanza y animación sociodeportiva', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 106/2018; distribución según anexo 3 de la Instrucción 13/2024. Actividades de ocio y tiempo libre no figura atribuida a esta especialidad en este título.', [superior]),
  cycle('Acondicionamiento Físico', 'Grado superior · Actividades Físicas y Deportivas', 'BOE-A-2017-7981', '2018/1370o/18040120', [
    ['0017 · Habilidades sociales', '2.º · 130 horas; atribución compartida'],
    ...transversal('superior', '2.º', '2.º'),
    ['1154 · Proyecto intermodular de acondicionamiento físico', '2.º · 80 horas; atribución compartida']
  ], 'Decreto extremeño 103/2018; distribución según anexo 4 de la Instrucción 13/2024. Comprueba los cambios posteriores y la asignación del centro.', [superior]),
  cycle('Actividades Ecuestres', 'Grado medio · Actividades Físicas y Deportivas / Agraria', 'BOE-A-2017-7982', '2018/1370o/18040122', [
    ['1328 · Atención a grupos', '2.º · 80 horas; atribución compartida'],
    ...transversal('medio', '1.º', '2.º'),
    ['1713 · Proyecto intermodular', '2.º · 50 horas; atribución compartida']
  ], 'Decreto extremeño 105/2018; distribución según anexo 3 de la Instrucción 12/2024. Consulta la asignación concreta en el centro.', [medio]),
  cycle('Guía en el Medio Natural y de Tiempo Libre', 'Grado medio · Actividades Físicas y Deportivas', 'BOE-A-2020-2738', '2021/1730o/21040132', [
    ...transversal('medio', '1.º', '1.º'),
    ['1713 · Proyecto intermodular', '2.º · 50 horas; atribución compartida']
  ], 'Decreto extremeño 104/2021; distribución según anexo 2 de la Instrucción 12/2024. Según TodoFP, Atención a grupos no figura atribuida a Intervención Sociocomunitaria en este título, aunque sí en Actividades Ecuestres.', [medio]),
  cycle('Educación y Control Ambiental', 'Grado superior · Seguridad y Medio Ambiente', 'BOE-A-2011-6709', null, [
    ['0791 · Programas de educación ambiental', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['0017 · Habilidades sociales', 'Distribución en Extremadura pendiente de localizar'],
    ['0794 · Proyecto intermodular de educación y control ambiental', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1665 · Digitalización aplicada a los sectores productivos', 'Distribución en Extremadura pendiente de localizar; atribución compartida'],
    ['1708 · Sostenibilidad aplicada al sistema productivo', 'Distribución en Extremadura pendiente de localizar; atribución compartida']
  ], 'No se ha localizado currículo propio ni oferta en Extremadura. La atribución estatal no implica que exista oferta en un centro extremeño.')
];
