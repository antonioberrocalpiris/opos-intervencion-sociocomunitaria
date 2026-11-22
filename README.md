# Un paso cada día · Intervención Sociocomunitaria

Aplicación local de apoyo para preparar la especialidad de Intervención Sociocomunitaria en Extremadura, inspirada en la práctica guiada de Grúa Cáceres. No requiere dependencias ni conexión para funcionar; los enlaces oficiales sí requieren Internet.

## Inicio

Con Node.js 18 o posterior:

```sh
npm start
```

Abre <http://127.0.0.1:4173>. Para cambiar de puerto, ejecuta `PORT=4174 npm start`. Detén el servidor con `Ctrl+C`. Se escucha solo en el propio ordenador.

## Qué incluye

- Dos **bloques propuestos**, no epígrafes oficiales: diagnóstico y planificación; inclusión, diversidad y acción educativa. Cada uno incluye un esquema breve y 50 preguntas originales de reconocimiento conceptual, con cuatro opciones y explicación. Son una primera base de repaso, no un desarrollo exhaustivo de la oposición.
- Práctica filtrada por bloque, con corrección inmediata o al final y revisión de aciertos, errores y blancos. No hay penalización, cronómetro ni nota oficial; las preguntas no respondidas cuentan como blancas.
- Cuatro ejercicios de ordenación con pista y solución orientativa y tres supuestos abiertos con guía de reflexión. El texto escrito en los supuestos no se guarda.
- Biblioteca con búsqueda sin distinguir mayúsculas ni tildes en títulos y apuntes, importación de material personal y copia de seguridad.

## Añadir temas propios

En «Mis temas» selecciona un TXT y escribe su título. Se guarda como apuntes buscables; **no se generan preguntas automáticamente**. También puedes importar un JSON UTF-8 con la estructura siguiente:

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

`answer` es el índice de la respuesta correcta de 0 a 3. Se requieren cuatro opciones distintas y una explicación; `notes`, `questions` y `source` son opcionales, pero debe haber notas o al menos una pregunta. El filtro de práctica solo muestra temas que tengan preguntas; el filtro de ejercicios muestra bloques con ejercicios disponibles. Los temas personales pueden tener menos de 50 preguntas y se indica en la biblioteca. Para añadir PDF o Word hay que convertirlos previamente a texto; no se extraen ni indexan automáticamente.

Los materiales se almacenan en `localStorage` del navegador y no se envían a ningún servidor externo. No introduzcas datos sensibles. Cambiar de navegador, origen o puerto da acceso a otra biblioteca; borrar sus datos puede eliminarla. Exporta una copia JSON y guárdala en un lugar seguro. «Restaurar copia» sustituye todos los temas personales tras confirmación. Los resultados de test y los borradores no se conservan al recargar.

## Publicación en GitHub Pages

La web publicada es pública y cualquiera puede acceder a sus archivos. La biblioteca personal permanece en el navegador de cada dispositivo y no se sincroniza entre dispositivos ni con la aplicación local. Usa la exportación e importación de copias para trasladarla.

El flujo de GitHub Actions ejecuta las pruebas y publica los archivos estáticos al actualizar `main`. Para preparar esos archivos localmente, ejecuta `npm run build`; solo se copian los archivos necesarios a `dist/`. La carpeta no se incluye en el repositorio.

## Alcance y fuentes

Los contenidos son originales, orientativos y no han sido revisados por un tribunal. Las preguntas son ejercicios de repaso, no preguntas oficiales ni una reproducción del formato de la prueba; pueden contener errores. El programa de la especialidad se aprobó en la [Orden de 1 de febrero de 1996](https://www.boe.es/buscar/doc.php?id=BOE-A-1996-3102), cuyos anexos se publicaron en suplemento. Contrasta el programa aplicable, la normativa actualizada, las pruebas y los criterios en la convocatoria correspondiente, [Profex](https://profex.educarex.es/), el [DOE](https://doe.juntaex.es/) y el [BOE](https://www.boe.es/). El banco inicial no pretende cubrir todos los temas oficiales ni sustituye bibliografía especializada.

## Comprobación

```sh
npm test
```
