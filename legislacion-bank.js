// Preguntas iniciales de identificación de fuentes; no sustituyen el estudio articulado.
const norms = [
  {
    name: 'Ley Orgánica 2/2006, de Educación (LOE)',
    source: 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-7899',
    questions: [
      '¿Qué ley orgánica constituye el marco general de educación y fue modificada por la LOMLOE?',
      '¿Qué ley consultarías para situar las funciones del profesorado dentro del sistema educativo general?',
      '¿Qué texto consolidado consultarías para estudiar los principios generales del sistema educativo tras la LOMLOE?',
      '¿Qué ley estatal incorpora la regulación general de las enseñanzas del sistema educativo?',
      '¿Qué texto consultarías para estudiar las disposiciones generales sobre profesorado en la legislación educativa?',
      '¿Qué ley educativa estatal, de 2006, conviene consultar en su versión consolidada?',
      '¿Qué norma es conocida habitualmente como LOE?',
      '¿Qué ley es modificada de forma relevante por la Ley Orgánica 3/2020?',
      '¿Qué marco general educativo estatal conviene relacionar con la normativa específica de FP?',
      '¿En qué ley de educación estatal buscarías el marco general de equidad educativa?'
    ]
  },
  {
    name: 'Ley 4/2011, de educación de Extremadura',
    source: 'https://www.boe.es/buscar/act.php?id=BOE-A-2011-5297',
    questions: [
      '¿Qué ley establece el marco autonómico general de educación de Extremadura?',
      '¿Qué ley autonómica de 2011 consultarías para contextualizar una programación en Extremadura?',
      '¿Qué norma se identifica como Ley de Educación de Extremadura?',
      '¿Qué ley desarrolla el modelo educativo extremeño en el marco estatal?',
      '¿Qué ley regional consultarías al fundamentar la equidad educativa en Extremadura?',
      '¿Qué ley autonómica acompaña al marco estatal al justificar el contexto educativo extremeño?',
      '¿Qué disposición de Extremadura aborda con carácter general su modelo educativo?',
      '¿Qué ley educativa extremeña está fechada el 7 de marzo de 2011?',
      '¿Cuál es la referencia regional general, y no el real decreto de título de un ciclo, para situar la educación extremeña?',
      '¿Qué norma autonómica conviene consultar en texto consolidado para fundamentar el sistema educativo de Extremadura?'
    ]
  },
  {
    name: 'Ley Orgánica 3/2022, de ordenación e integración de la FP',
    source: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-5139',
    questions: [
      '¿Qué ley orgánica establece el sistema integrado de Formación Profesional?',
      '¿Qué ley consultarías para estudiar la estructura de ofertas de FP en grados A a E?',
      '¿Qué norma de rango orgánico ordena e integra la Formación Profesional desde 2022?',
      '¿Qué ley aborda los itinerarios formativos progresivos en el sistema integrado de FP?',
      '¿Qué ley diferencia las ofertas de FP de grado D y grado E en el sistema integrado?',
      '¿Qué ley proporciona el marco general para la acreditación de competencias profesionales en el sistema integrado de FP?',
      '¿Qué ley estatal establece el marco de formación y acompañamiento profesionales a lo largo de la vida?',
      '¿Qué norma es la ley orgánica específica de ordenación e integración de la Formación Profesional?',
      '¿Qué ley consultarías para situar la orientación profesional dentro del sistema integrado de FP?',
      '¿Qué ley de 2022 sirve de marco al posterior desarrollo reglamentario del sistema de FP?'
    ]
  },
  {
    name: 'Real Decreto 659/2023, de ordenación del Sistema de FP',
    source: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-16889',
    questions: [
      '¿Qué real decreto desarrolla reglamentariamente la ordenación del Sistema de Formación Profesional?',
      '¿Qué norma desarrolla el sistema de FP y regula aspectos generales de la formación en empresa u organismo equiparado?',
      '¿Qué real decreto de 2023 desarrolla la Ley Orgánica 3/2022 en la ordenación del sistema de FP?',
      '¿Qué disposición estatal consultarías para estudiar la evaluación general de las ofertas del sistema de FP?',
      '¿Qué real decreto desarrolla la estructura y organización de las ofertas de FP en grados A a E?',
      '¿Qué norma estatal desarrolla la ordenación del sistema de FP más allá de un título concreto?',
      '¿Qué real decreto consultarías para relacionar resultados de aprendizaje y evaluación de las ofertas de FP?',
      '¿Qué disposición estatal desarrolla aspectos de la orientación profesional en el sistema de FP?',
      '¿Qué norma reglamentaria consultarías sobre los regímenes de formación en empresa del sistema de FP?',
      '¿Qué real decreto desarrolla de forma general la formación profesional, sin ser una convocatoria de oposición?'
    ]
  },
  {
    name: 'Real Decreto 276/2007, de ingreso en cuerpos docentes',
    source: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-4372',
    questions: [
      '¿Qué real decreto regula el ingreso y acceso a los cuerpos docentes y la adquisición de especialidades?',
      '¿Qué norma estatal consultarías sobre el marco general de las pruebas de ingreso docente?',
      '¿Qué real decreto establece el reglamento general de ingreso a cuerpos docentes?',
      '¿Qué norma de 2007 regula procedimientos selectivos y especialidades de cuerpos docentes?',
      '¿Qué disposición consultarías sobre la fase de oposición en el ingreso a cuerpos docentes?',
      '¿Qué reglamento estatal de acceso docente conviene estudiar junto a la convocatoria extremeña aplicable?',
      '¿Qué norma regula la fase de concurso dentro del marco general de ingreso docente?',
      '¿Qué real decreto consultarías para situar la fase de prácticas de quienes superan el proceso selectivo docente?',
      '¿Qué norma estatal desarrolla las reglas generales de acceso a la función pública docente?',
      '¿Qué disposición regula el ingreso docente, en lugar de establecer el currículo de un ciclo de FP?'
    ]
  }
];

export const lawTopic = {
  id: 'legislacion',
  title: 'Identificación de legislación educativa y FP',
  intro: '50 preguntas iniciales para identificar fuentes. Amplía el estudio con los textos consolidados y las fichas de legislación.',
  origin: 'propuesto'
};

export const lawQuestions = norms.flatMap((norm, normIndex) => norm.questions.map((prompt, index) => ({
  id: `legislacion-${normIndex * 10 + index + 1}`,
  topic: lawTopic.id,
  prompt,
  options: [norm.name, ...[1, 2, 3].map(offset => norms[(normIndex + offset) % norms.length].name)],
  answer: 0,
  explanation: `${norm.name}. Esta pregunta identifica la fuente principal; su aplicación debe comprobarse junto a otras normas y modificaciones vigentes.`,
  source: norm.source
})));
