# Un paso cada día · Intervención Sociocomunitaria

Aplicación local de apoyo para preparar la especialidad de Intervención Sociocomunitaria en Extremadura, inspirada en la práctica guiada de Grúa Cáceres. No requiere dependencias ni conexión para funcionar; los enlaces oficiales sí requieren Internet.

## Inicio

Con Node.js 18 o posterior:

```sh
npm start
```

Abre <http://127.0.0.1:4173>. Para cambiar de puerto, ejecuta `PORT=4174 npm start`. Detén el servidor con `Ctrl+C`. Se escucha solo en el propio ordenador.

La pantalla de acceso solicita la clave compartida, distinguiendo mayúsculas y minúsculas. Se recuerda durante la sesión de la pestaña, también al recargar. Necesita JavaScript, almacenamiento de sesión y una conexión segura (HTTPS o localhost).

## Qué incluye

- Tres **bloques propuestos**, no epígrafes oficiales: diagnóstico y planificación; inclusión, diversidad y acción educativa; e identificación de legislación educativa y FP. Cada uno incluye un esquema breve y 50 preguntas originales con cuatro opciones y explicación. El bloque legislativo es de identificación básica de fuentes, no un examen exhaustivo por artículos.
- Práctica filtrada por bloque, con corrección inmediata o al final y revisión de aciertos, errores y blancos. No hay penalización, cronómetro ni nota oficial; las preguntas no respondidas cuentan como blancas.
- Cinco ejercicios de ordenación con pista y solución orientativa y cuatro supuestos abiertos con guía de reflexión. El texto escrito en los supuestos no se guarda.
- Entrenamiento de tema escrito, supuesto práctico, programación, unidad y preguntas del tribunal. Los 69 enunciados numerados son una transcripción orientativa del [anexo I del temario oficial](https://www.boe.es/boe/dias/1996/02/13/pdfs/C00001-00096.pdf#page=16), aplicable conforme a la Orden ECD/191/2012 y a la referencia extremeña de 2025; deben contrastarse con el BOE y la convocatoria vigente. El tema seleccionado acompaña a todas las fases: las propuestas prácticas son orientativas, no ejercicios oficiales, y debe verificarse su relación con el módulo elegido. Incluye reloj ajustable, borrador temporal y listas de autoevaluación. Los tiempos deben contrastarse con la convocatoria que corresponda.
- Fichas de legislación y 13 títulos con enlaces a atribución por módulo y currículo. Los cursos y horas de diez títulos proceden de las instrucciones extremeñas consolidadas 12 y 13/2024; la Instrucción 21/2025 actualiza contenidos de Integración Social. No se han localizado currículo propio, distribución ni oferta en Extremadura para Servicios Funerarios, Formación para la Movilidad Segura y Sostenible y Educación y Control Ambiental. La relación no garantiza exhaustividad de títulos, cursos de especialización u optativas. Contrasta siempre las versiones vigentes, atribuciones compartidas y asignaciones del centro. El [proyecto de decreto de grado superior](https://doe.juntaex.es/otrosFormatos/html.php?xml=2026062936&anio=2026&doe=2220o) se encuentra en información pública en noviembre de 2026 y no debe tratarse como norma aprobada.
- La búsqueda de atribuciones combina ciclo o módulo, grado, curso y atribución indicada como compartida; la ausencia de esa indicación no demuestra exclusividad. La legislación se puede filtrar conjuntamente por materia, ámbito territorial, tipo y texto.
- El material de estudio privado, si existe en `material-privado/`, se consulta solo desde la copia local mediante el enlace «Material privado local». Esa carpeta está excluida del repositorio y de la compilación, y no está protegida frente a otros usuarios del ordenador. No se despliega en GitHub Pages.

## Añadir temas propios

La sección de importación personal está oculta a petición del usuario, pero no se borran los materiales guardados previamente, que permanecen en el mismo navegador y pueden seguir apareciendo en los filtros si tienen preguntas. Los siguientes contenidos se incorporarán al proyecto y su banco de preguntas cuando se faciliten. La funcionalidad de importación se mantiene en el código para una posible recuperación posterior; no está disponible en la navegación actual.

Como referencia para una posible recuperación, el formato de importación JSON UTF-8 era:

```json
{
  "title": "Mi tema",
  "notes": "Mis apuntes",
  "questions": [
    {
      "prompt": "¿Pregunta?",
      "options": ["Correcta", "Opción B", "Opción C", "Opción D"],
      "answer": 0,
      "explanation": "Explicación de la respuesta.",
      "source": "Referencia para contrastar"
    }
  ]
}
```

`answer` es el índice de la respuesta correcta de 0 a 3. Se requieren cuatro opciones distintas y una explicación; `notes`, `questions` y `source` son opcionales, pero debe haber notas o al menos una pregunta. El filtro de práctica solo muestra temas que tengan preguntas; el filtro de ejercicios muestra bloques con ejercicios disponibles.

Los materiales guardados antes de ocultar esa sección se mantienen en `localStorage` del navegador y no se envían a ningún servidor externo. No introduzcas datos sensibles. Cambiar de navegador, origen o puerto da acceso a otra biblioteca; borrar sus datos puede eliminarla. La exportación y restauración están ocultas con la sección. Los resultados de test y los borradores no se conservan al recargar.

## Publicación en GitHub Pages

La web publicada es pública. La pantalla de clave es solo una **barrera visual**, no autenticación ni protección de contenidos: la comprobación está en el navegador, puede eludirse y la clave puede deducirse, además de que cualquiera puede acceder directamente a los archivos. No uses esta clave para otros servicios ni guardes información sensible. Para privacidad real se necesita control de acceso en un servidor. Los materiales guardados permanecen en el navegador de cada dispositivo y no se sincronizan entre dispositivos ni con la aplicación local.

El flujo de GitHub Actions ejecuta las pruebas y publica los archivos estáticos al actualizar `main`. Para preparar esos archivos localmente, ejecuta `npm run build`; solo se copian los archivos necesarios a `dist/`. La carpeta no se incluye en el repositorio.

## Alcance y fuentes

Los contenidos son originales, orientativos y no han sido revisados por un tribunal. Las preguntas son ejercicios de repaso, no preguntas oficiales ni una reproducción del formato de la prueba; pueden contener errores. El programa de la especialidad se aprobó en la [Orden de 1 de febrero de 1996](https://www.boe.es/buscar/doc.php?id=BOE-A-1996-3102), cuyos anexos se publicaron en suplemento. Contrasta el programa aplicable, la normativa actualizada, las pruebas y los criterios en la convocatoria correspondiente, [Profex](https://profex.educarex.es/), el [DOE](https://doe.juntaex.es/) y el [BOE](https://www.boe.es/). El banco inicial no pretende cubrir todos los temas oficiales ni sustituye bibliografía especializada.

## Comprobación

```sh
npm test
```
