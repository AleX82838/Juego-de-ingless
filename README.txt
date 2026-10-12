# FLYNGLISH — parche de audio

## Qué incluye
- `app.js`: configuración de los 32 audios con rutas explícitas y función de respaldo con voz del navegador.
- `audio/zero/`, `audio/basic/`, `audio/intermediate/`, `audio/professional/`: carpetas preparadas para colocar los MP3.
- Este ZIP no contiene los archivos MP3, porque no se adjuntaron audios originales.

## Importante para integrar
No sustituyas todo tu `app.js` actual por el archivo de este ZIP: solo compartiste el bloque `LEVELS`, no el resto de la aplicación.
1. Abre el `app.js` actual de tu proyecto.
2. Sustituye tu objeto `LEVELS` por el de este paquete.
3. Copia también las funciones `getLessonAudioPath()` y `playLessonAudio()` que están al final del archivo.
4. En el botón que reproduce una lección, llama por ejemplo:
   `playLessonAudio("zero", 0)` para reproducir “Hello!”.
   `playLessonAudio("basic", 2)` para reproducir “How much does this cost?”.
   Los índices empiezan en cero.
5. Coloca los MP3 dentro de las carpetas `audio/` respetando exactamente los nombres y rutas indicados.

## Cambio importante
La frase de nivel 0 dice “My name is Nova.”, así que su archivo debe llamarse
`audio/zero/my-name-is-nova.mp3` (no `my-name-is-ana.mp3`).

## Respaldo
Si un MP3 no existe o no se puede reproducir, se intenta usar `SpeechSynthesisUtterance` del navegador en inglés estadounidense. La voz disponible depende del dispositivo y del navegador.

## Ejemplo de integración en un botón
`button.addEventListener("click", () => playLessonAudio("zero", 0));`
Adapta `button` a la referencia real del botón en tu aplicación.
