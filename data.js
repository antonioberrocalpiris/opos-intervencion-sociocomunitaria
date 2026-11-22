import { lawTopic, lawQuestions } from './legislacion-bank.js';
import { topic46, questions46 } from './tema46-bank.js';

export const topicReferences = {
  diagnostico: [{ label: 'Currículo de Integración Social: contexto y metodología de la intervención (referencia contextual)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2012-10866' }],
  inclusion: [{ label: 'Currículo de Integración Social y apoyos a la autonomía (referencia contextual)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2012-10866' }, { label: 'Ley General de derechos de las personas con discapacidad', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2013-12632' }],
  legislacion: [{ label: 'Ley Orgánica 3/2022 de Formación Profesional', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-5139' }, { label: 'Real Decreto 659/2023 de ordenación de la FP', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2023-16889' }],
  'tema-46': [{ label: 'Tema 46 del programa oficial', url: 'https://www.boe.es/boe/dias/1996/02/13/pdfs/C00001-00096.pdf#page=17' }, { label: 'Real Decreto 95/2022 de Educación Infantil', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-1654' }, { label: 'Indicadores de desarrollo infantil · CDC', url: 'https://www.cdc.gov/act-early/milestones/index.html' }, { label: 'Título de FP en Educación Infantil · módulo 0015', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2007-20201' }]
};

// Bloques de estudio propios; no equivalen a los epígrafes del programa oficial.
const blocks = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico y planificación de la intervención',
    intro: 'Del conocimiento del contexto al diseño, seguimiento y mejora de una intervención participativa.',
    concepts: [
      ['Intervención sociocomunitaria', 'Proceso organizado con personas y colectivos para mejorar su realidad y fortalecer su participación.'],
      ['Comunidad', 'Conjunto de personas vinculadas por un territorio, intereses o relaciones y experiencias compartidas.'],
      ['Diagnóstico comunitario', 'Análisis compartido de necesidades, recursos y relaciones para orientar la acción.'],
      ['Necesidad normativa', 'Diferencia entre una situación y un estándar definido por profesionales o instituciones.'],
      ['Necesidad sentida', 'Carencia que las propias personas perciben y expresan como importante.'],
      ['Necesidad expresada', 'Necesidad sentida que se traduce en una demanda o petición concreta.'],
      ['Necesidad comparativa', 'Carencia identificada al comparar grupos o territorios con características semejantes.'],
      ['Demanda', 'Petición formulada por una persona o colectivo, que requiere análisis y no equivale automáticamente a toda la necesidad.'],
      ['Problema social', 'Situación percibida como indeseable que afecta a un colectivo y requiere una respuesta compartida.'],
      ['Factor de riesgo', 'Condición que aumenta la probabilidad de que aparezca una situación perjudicial, sin determinarla por sí sola.'],
      ['Factor de protección', 'Condición que ayuda a reducir el impacto de riesgos o favorece resultados positivos.'],
      ['Recurso comunitario', 'Medio, capacidad o servicio disponible que puede movilizarse para alcanzar objetivos comunes.'],
      ['Activo comunitario', 'Capacidad o elemento del entorno que contribuye al bienestar y puede fortalecerse.'],
      ['Mapa de recursos', 'Representación organizada de los recursos de un territorio y sus relaciones o localización.'],
      ['Mapa de actores', 'Identificación de personas, grupos e instituciones relevantes, sus intereses y vínculos.'],
      ['Fuentes primarias', 'Información obtenida directamente para el estudio, por ejemplo mediante entrevistas propias.'],
      ['Fuentes secundarias', 'Información previamente elaborada por otras personas o instituciones y reutilizada en el análisis.'],
      ['Observación participante', 'Técnica en la que quien investiga observa mientras participa en la vida del grupo, con criterios éticos.'],
      ['Entrevista semiestructurada', 'Conversación guiada por temas preparados que permite adaptar y profundizar las preguntas.'],
      ['Grupo de discusión', 'Técnica que explora discursos e interacciones mediante una conversación grupal facilitada.'],
      ['Cuestionario', 'Instrumento con preguntas sistematizadas para recoger información de varias personas.'],
      ['Muestreo intencional', 'Selección deliberada de participantes según criterios relevantes para el estudio.'],
      ['Triangulación', 'Contraste de información procedente de distintas fuentes, técnicas o perspectivas.'],
      ['Consentimiento informado', 'Aceptación libre basada en información comprensible sobre finalidad, uso de datos y participación.'],
      ['Confidencialidad', 'Compromiso de proteger el acceso y la divulgación de información personal obtenida.'],
      ['Priorización', 'Elección razonada de necesidades sobre las que actuar según criterios explícitos.'],
      ['Árbol de problemas', 'Herramienta que relaciona un problema central con sus causas y consecuencias.'],
      ['Análisis DAFO', 'Análisis de debilidades y fortalezas internas junto con amenazas y oportunidades externas.'],
      ['Finalidad', 'Cambio amplio al que pretende contribuir una intervención, más allá de una actividad aislada.'],
      ['Objetivo general', 'Resultado amplio que orienta el proyecto y se concreta en objetivos más específicos.'],
      ['Objetivo específico', 'Resultado concreto y verificable que contribuye al objetivo general.'],
      ['Indicador', 'Dato observable que ayuda a valorar un aspecto del proceso o de los resultados.'],
      ['Línea de base', 'Medición inicial que sirve de referencia para interpretar cambios posteriores.'],
      ['Meta', 'Valor o logro concreto que se espera alcanzar en un plazo determinado.'],
      ['Actividad', 'Acción prevista que moviliza recursos para contribuir a los objetivos.'],
      ['Metodología', 'Conjunto coherente de criterios y procedimientos que orientan cómo se interviene.'],
      ['Cronograma', 'Distribución temporal de tareas, hitos y responsables de un proyecto.'],
      ['Presupuesto', 'Previsión ordenada de costes y recursos económicos necesarios para la intervención.'],
      ['Destinatarios', 'Personas o colectivos a quienes se dirige la intervención, cuya diversidad debe considerarse.'],
      ['Cobertura', 'Relación entre la población a la que se llega y la población destinataria prevista.'],
      ['Evaluación inicial', 'Valoración previa que orienta decisiones y establece el punto de partida.'],
      ['Evaluación de proceso', 'Seguimiento de cómo se desarrolla la intervención para introducir ajustes.'],
      ['Evaluación de resultados', 'Valoración de los cambios o logros alcanzados en relación con los objetivos.'],
      ['Eficacia', 'Grado en que se alcanzan los objetivos previstos.'],
      ['Eficiencia', 'Relación entre los resultados obtenidos y los recursos utilizados.'],
      ['Pertinencia', 'Adecuación de una intervención a las necesidades y al contexto en que se realiza.'],
      ['Sostenibilidad', 'Posibilidad de mantener beneficios o capacidades una vez reducidos los apoyos iniciales.'],
      ['Devolución de resultados', 'Comunicación comprensible de los hallazgos a quienes participaron para contrastarlos y utilizarlos.'],
      ['Participación significativa', 'Implicación real en las decisiones, con información accesible y capacidad de influencia.'],
      ['Mejora continua', 'Proceso de revisar evidencias, introducir cambios y volver a valorar sus efectos.']
    ]
  },
  {
    id: 'inclusion',
    title: 'Inclusión, diversidad y acción educativa',
    intro: 'Principios y herramientas para acompañar procesos educativos y sociales desde los derechos y la participación.',
    concepts: [
      ['Inclusión social', 'Proceso de eliminación de barreras para que todas las personas puedan participar y ejercer sus derechos.'],
      ['Exclusión social', 'Proceso multidimensional de acumulación de desventajas y dificultades de participación.'],
      ['Igualdad de oportunidades', 'Condición que busca que las personas puedan acceder y participar sin barreras discriminatorias.'],
      ['Equidad', 'Distribución de apoyos y oportunidades atendiendo a necesidades y situaciones diferentes.'],
      ['Diversidad', 'Variedad de características, experiencias y formas de vida presentes en una comunidad.'],
      ['Discriminación directa', 'Trato desfavorable a una persona por un motivo protegido en una situación comparable.'],
      ['Discriminación indirecta', 'Regla aparentemente neutra que sitúa a un grupo en desventaja particular, salvo justificación legítima.'],
      ['Interseccionalidad', 'Perspectiva que examina cómo se relacionan diversos ejes de desigualdad en experiencias concretas.'],
      ['Accesibilidad universal', 'Condición de entornos, productos y servicios comprensibles, utilizables y practicables por todas las personas.'],
      ['Ajustes razonables', 'Modificaciones necesarias y adecuadas para garantizar derechos en un caso concreto, sin carga desproporcionada o indebida.'],
      ['Diseño universal para el aprendizaje', 'Enfoque que anticipa opciones de implicación, representación y acción y expresión para reducir barreras.'],
      ['Barreras para la participación', 'Obstáculos del entorno, de la organización o de las actitudes que dificultan la inclusión.'],
      ['Apoyo individualizado', 'Ayuda ajustada a las preferencias, capacidades y necesidades concretas de una persona.'],
      ['Autodeterminación', 'Capacidad de tomar decisiones sobre la propia vida con los apoyos necesarios.'],
      ['Empoderamiento', 'Proceso de fortalecimiento de la capacidad de personas y grupos para influir en su vida y entorno.'],
      ['Enfoque de derechos', 'Perspectiva que reconoce a las personas como titulares de derechos y no solo receptoras de ayuda.'],
      ['Modelo social de la discapacidad', 'Enfoque que analiza la discapacidad en interacción con las barreras del entorno.'],
      ['Vida independiente', 'Orientación que promueve elecciones y control sobre la vida cotidiana con los apoyos precisos.'],
      ['Acción comunitaria', 'Trabajo colectivo que conecta personas y recursos para transformar situaciones compartidas.'],
      ['Trabajo en red', 'Coordinación sostenida entre agentes que comparten objetivos y responsabilidades.'],
      ['Derivación acompañada', 'Conexión con otro recurso explicando el proceso y facilitando la continuidad del apoyo con consentimiento.'],
      ['Mediación', 'Proceso voluntario de gestión de conflictos con ayuda de una tercera parte imparcial.'],
      ['Escucha activa', 'Atención deliberada que comprueba la comprensión y reconoce lo que expresa la otra persona.'],
      ['Comunicación asertiva', 'Expresión clara y respetuosa de necesidades y límites, sin someter ni agredir.'],
      ['Empatía', 'Esfuerzo por comprender la perspectiva y las emociones de otra persona sin apropiarse de su experiencia.'],
      ['Pregunta abierta', 'Pregunta que invita a explicar experiencias y no se limita a una respuesta de sí o no.'],
      ['Reformulación', 'Expresión con otras palabras de lo escuchado para comprobar su comprensión.'],
      ['Conflicto', 'Situación de intereses o necesidades percibidos como incompatibles que puede abordarse constructivamente.'],
      ['Negociación', 'Proceso en el que las partes buscan acuerdos mediante diálogo y concesiones o alternativas.'],
      ['Participación infantil', 'Derecho de niñas y niños a expresar su opinión y ser escuchados conforme a su edad y madurez.'],
      ['Perspectiva de género', 'Análisis de cómo normas y relaciones de género influyen en oportunidades y desigualdades.'],
      ['Coeducación', 'Acción educativa que promueve igualdad y cuestiona estereotipos y relaciones discriminatorias.'],
      ['Estereotipo', 'Creencia simplificada y generalizada atribuida a las personas de un grupo.'],
      ['Prejuicio', 'Valoración previa, a menudo negativa, sobre personas por su pertenencia a un grupo.'],
      ['Interculturalidad', 'Enfoque que promueve interacción respetuosa y diálogo en condiciones de igualdad entre culturas.'],
      ['Competencia intercultural', 'Capacidad de comunicarse y actuar de forma reflexiva y respetuosa en contextos culturales diversos.'],
      ['Aprendizaje cooperativo', 'Organización del aprendizaje en pequeños grupos con interdependencia positiva y responsabilidad individual.'],
      ['Aprendizaje-servicio', 'Propuesta que integra aprendizajes con un servicio a la comunidad y reflexión sobre la experiencia.'],
      ['Educación no formal', 'Aprendizaje organizado fuera del sistema formal, con intencionalidad educativa.'],
      ['Educación informal', 'Aprendizaje que surge de experiencias cotidianas y no necesariamente de una actividad educativa estructurada.'],
      ['Dinamización grupal', 'Facilitación de procesos y actividades para favorecer la interacción y los objetivos de un grupo.'],
      ['Cohesión grupal', 'Vinculación entre integrantes que favorece el sentido de pertenencia al grupo.'],
      ['Rol grupal', 'Papel o patrón de actuación que una persona desempeña en la dinámica de un grupo.'],
      ['Norma grupal', 'Regla compartida que orienta expectativas y comportamientos en el grupo.'],
      ['Evaluación participativa', 'Valoración de una intervención que incorpora a las personas implicadas en decisiones e interpretación.'],
      ['Escucha a las familias', 'Recogida respetuosa de perspectivas familiares sin sustituir la voz ni los derechos de la persona.'],
      ['Prevención primaria', 'Actuación que busca evitar la aparición de un problema antes de que se produzca.'],
      ['Prevención secundaria', 'Actuación de detección e intervención tempranas ante señales o problemas incipientes.'],
      ['Prevención terciaria', 'Actuación dirigida a reducir consecuencias y favorecer la recuperación cuando el problema ya existe.'],
      ['Buen trato', 'Relación basada en respeto, cuidado, escucha y reconocimiento de la dignidad de la persona.']
    ]
  }
];

export const topics = [...blocks.map(({ id, title, intro }) => ({ id, title, intro, origin: 'propuesto' })), lawTopic, topic46];
export const guides = {
  diagnostico: [
    ['Escuchar antes de diseñar', 'Delimita el territorio o colectivo, identifica a las personas afectadas y combina datos existentes con entrevistas, observación y espacios participativos. Pregunta también quién no está siendo escuchado.'],
    ['Analizar y priorizar', 'Distingue demandas, necesidades y recursos. Contrasta perspectivas, relaciona causas y consecuencias y acuerda criterios de prioridad como gravedad, alcance, urgencia y viabilidad.'],
    ['Convertir el diagnóstico en acción', 'Formula una finalidad y objetivos verificables. Para cada objetivo concreta actividades, responsables, calendario, recursos, línea de base, indicadores y metas coherentes.'],
    ['Evaluar para aprender', 'Revisa el proceso durante la ejecución y compara resultados con los objetivos. Interpreta los datos junto a sus limitaciones, devuelve las conclusiones y acuerda mejoras con la comunidad.'],
    ['Pregunta para desarrollar', '¿Cómo evitarías que un diagnóstico elaborado solo por profesionales invisibilice fortalezas o necesidades de la comunidad? Argumenta las técnicas y precauciones éticas.']
  ],
  inclusion: [
    ['Mirar las barreras', 'La inclusión no consiste solo en admitir a una persona: exige revisar espacios, comunicación, prácticas y actitudes que limitan su participación y sus derechos.'],
    ['Escuchar y acordar apoyos', 'Parte de las preferencias de la persona y ofrece información comprensible. Anticipa opciones accesibles y acuerda ajustes individualizados sin sustituir sus decisiones.'],
    ['Trabajar con el entorno', 'Coordina recursos y agentes con objetivos claros, cuidando el consentimiento y la confidencialidad. La red complementa, pero no reemplaza, la voz de las personas implicadas.'],
    ['Educar para la participación', 'Propón actividades cooperativas con papeles y apoyos diversos. Revisa estereotipos, cuida la convivencia y evalúa no solo la asistencia, sino también la posibilidad real de decidir y contribuir.'],
    ['Pregunta para desarrollar', 'Diseña una actividad comunitaria accesible e intercultural: identifica barreras, apoyos, agentes, criterios de evaluación y cómo participarán las personas destinatarias.']
  ],
  legislacion: [
    ['Marco general y autonómico', 'Sitúa la LOE en su texto consolidado y la Ley de educación de Extremadura. Después concreta la regulación específica de formación profesional.'],
    ['Sistema de formación profesional', 'Distingue la Ley Orgánica 3/2022, que ordena e integra el sistema, y el Real Decreto 659/2023, que lo desarrolla. No confundas grados de oferta con cursos académicos.'],
    ['Del título al aula', 'Consulta el real decreto consolidado del título, su atribución docente y la contextualización curricular de Extremadura. Localiza los resultados de aprendizaje y criterios del módulo que vas a programar.'],
    ['Acceso docente', 'El Real Decreto 276/2007 establece el marco de ingreso; la convocatoria y las instrucciones aplicables concretan el proceso. Las cifras de una convocatoria anterior no son reglas para todas las posteriores.'],
    ['Comprueba siempre la fuente', 'Identifica norma, ámbito, fecha y versión consolidada; comprueba las modificaciones antes de citar un artículo o aplicarlo a un supuesto.']
  ],
  'tema-46': [
    ['Desarrollo psicomotor y evolución', 'Define el desarrollo como proceso integral y presenta las adquisiciones hasta los seis años como orientativas, con variabilidad individual.'],
    ['Factores, cuerpo y lateralidad', 'Relaciona las oportunidades de experiencia con el entorno y la maduración; aborda el esquema corporal y acompaña la preferencia lateral sin forzarla.'],
    ['Estrategias y recursos', 'Selecciona juego, movimiento, observación y adaptaciones para participar con seguridad; coordina con las familias y el equipo.'],
    ['Currículo y reeducación', 'Sitúa el currículo estatal y extremeño de Infantil. Distingue la labor educativa de la valoración e intervención de profesionales competentes.'],
    ['Conexión con FP', 'Vincula la propuesta a resultados de aprendizaje y criterios del módulo 0015 Desarrollo cognitivo y motor del título de Educación Infantil.']
  ]
};
export const questions = [...blocks.flatMap(block => block.concepts.map(([term, definition], index) => {
  const distractors = [1, 7, 19].map(offset => block.concepts[(index + offset) % block.concepts.length][1]);
  return {
    id: `${block.id}-${index + 1}`,
    topic: block.id,
    prompt: `¿Qué describe mejor «${term}»?`,
    options: [definition, ...distractors],
    answer: 0,
    explanation: `${term}: ${definition}`,
    source: 'Material original de repaso; contrasta los conceptos con bibliografía especializada.'
  };
})), ...lawQuestions, ...questions46];

export const sequences = [
  { topic: 'diagnostico', title: 'Diseñar una intervención', steps: ['Conocer el contexto y escuchar a la comunidad', 'Priorizar necesidades con criterios explícitos', 'Definir objetivos e indicadores', 'Planificar actividades y recursos', 'Evaluar y devolver los resultados'], hint: 'Comienza escuchando y termina aprendiendo de los resultados.' },
  { topic: 'diagnostico', title: 'Preparar una entrevista', steps: ['Definir qué información se necesita', 'Elaborar un guion flexible', 'Informar y solicitar consentimiento', 'Escuchar y registrar de forma acordada', 'Analizar y contrastar la información'], hint: 'Antes de preguntar hay que tener un propósito y acordar cómo participar.' },
  { topic: 'inclusion', title: 'Reducir barreras de participación', steps: ['Escuchar a las personas implicadas', 'Identificar barreras del entorno', 'Acordar apoyos y alternativas accesibles', 'Poner en práctica las medidas', 'Revisar si la participación mejora'], hint: 'No presupongas las necesidades: pregunta primero.' },
  { topic: 'inclusion', title: 'Acompañar un conflicto', steps: ['Crear un espacio seguro para el diálogo', 'Escuchar las perspectivas de las partes', 'Identificar necesidades e intereses', 'Explorar alternativas y acuerdos', 'Revisar el cumplimiento de lo acordado'], hint: 'Escuchar precede a buscar soluciones.' },
  { topic: 'legislacion', title: 'Preparar una referencia curricular de FP', steps: ['Identificar el ciclo y el módulo que se quiere programar', 'Consultar el real decreto consolidado del título y su atribución docente', 'Revisar la contextualización curricular vigente de Extremadura', 'Localizar los resultados de aprendizaje y criterios del módulo', 'Diseñar actividades y evaluación coherentes con esos elementos'], hint: 'Primero identifica el módulo; después contrasta las fuentes antes de diseñar.' },
  { topic: 'tema-46', title: 'Planificar una propuesta motriz inclusiva', steps: ['Observar el contexto y las posibilidades del grupo', 'Definir una finalidad educativa y una actividad de juego', 'Preparar el espacio, materiales y alternativas accesibles', 'Acompañar la exploración observando sin forzar', 'Registrar y revisar la participación para ajustar la propuesta'], hint: 'Conoce primero al grupo y revisa al final qué ha funcionado.' }
];

export const cases = [
  { topic: 'diagnostico', title: 'Un barrio con poca participación', text: 'Una asociación propone talleres para jóvenes, pero apenas conoce sus intereses y la asistencia previa ha sido baja.', prompt: '¿Qué harías primero y cómo incorporarías las voces menos representadas?', guide: ['Escuchar a jóvenes en espacios y horarios accesibles.', 'Contrastar sus necesidades con datos y recursos existentes.', 'Acordar prioridades y diseñar actividades con participación real.', 'Definir indicadores y revisar asistencia y experiencia.'] },
  { topic: 'inclusion', title: 'Una actividad con barreras', text: 'Una persona quiere participar en un taller, pero el local y los materiales presentan barreras de acceso.', prompt: '¿Cómo responderías respetando su autonomía?', guide: ['Preguntar a la persona qué barreras y apoyos identifica.', 'Buscar un espacio y materiales accesibles y acordar ajustes.', 'Coordinar los recursos necesarios sin divulgar datos innecesarios.', 'Revisar con la persona si las medidas funcionan.'] },
  { topic: 'inclusion', title: 'Desacuerdo en un grupo', text: 'Dos participantes interrumpen repetidamente el trabajo por un conflicto previo y el resto deja de intervenir.', prompt: '¿Cómo cuidarías al grupo y abordarías el conflicto?', guide: ['Establecer un espacio seguro y normas de respeto.', 'Escuchar a las partes sin tomar partido ni forzar una mediación.', 'Explorar necesidades, alternativas y acuerdos voluntarios.', 'Hacer seguimiento y acudir a protocolos aplicables si existe riesgo.'] },
  { topic: 'legislacion', title: 'Una programación desactualizada', text: 'Una compañera comparte una programación antigua de un ciclo de FP, anterior a la nueva ordenación. Quieres utilizarla solo como punto de partida.', prompt: '¿Qué fuentes contrastarías y cómo revisarías su aplicación al módulo?', guide: ['Consultar la ordenación actual del sistema de FP y las disposiciones transitorias aplicables.', 'Comprobar el texto consolidado del título y la atribución docente del módulo.', 'Consultar el currículo y las instrucciones extremeñas vigentes para el curso y modalidad.', 'Revisar resultados de aprendizaje, criterios, evaluación y formación en empresa.', 'Registrar las fuentes y fechas consultadas antes de defender la propuesta.'] },
  { topic: 'tema-46', title: 'Un circuito con apoyos', text: 'En una actividad motriz del primer ciclo, una niña necesita más tiempo y apoyo para participar en un recorrido.', prompt: '¿Cómo adaptarías la propuesta y qué observarías sin convertir la diferencia en diagnóstico?', guide: ['Ajustar recorrido y materiales, ofreciendo alternativas seguras.', 'Observar la participación en distintos momentos y anotar apoyos y contexto.', 'Coordinar con familia y equipo; consultar profesionales competentes si hay preocupación persistente.', 'Vincular la propuesta formativa al módulo 0015 y sus criterios, si se plantea para el alumnado de FP.'] }
];
