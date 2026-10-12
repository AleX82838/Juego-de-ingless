# FLYNGLISH — Aprende inglés hablando

Aplicación web instalable para practicar inglés hablado desde cero hasta un nivel profesional. Está construida con HTML, CSS y JavaScript, sin herramientas de compilación ni servicios de pago.

## Qué incluye

- Cuatro etapas: nivel 0, básico, intermedio y profesional, con frases, traducciones, contexto y una guía de pronunciación aproximada.
- Cuatro juegos: ruleta de frases, memorama bilingüe, tablero de retos y cartas para hablar.
- Modo individual o para dos jugadores, con turnos y puntuación.
- Un archivo MP3 independiente por frase. Si todavía falta un archivo, la app usa voz automática temporal para que «Escuchar» siga funcionando.
- Reconocimiento de hasta cinco alternativas del micrófono para comparar mejor la frase, normalizando contracciones y tolerando pequeñas diferencias de transcripción. Si el micrófono o el reconocimiento no están disponibles, se puede practicar en voz alta y confirmar manualmente.
- Puntos, racha y retos completados guardados en el navegador.
- Diseño adaptable a móvil y escritorio, manifiesto PWA y caché para uso sin conexión.

## Ejecutar en Visual Studio Code

1. Descomprime la carpeta del proyecto.
2. Abre la carpeta `my_own_english_vocabulary_game` en Visual Studio Code.
3. Inicia `index.html` con Live Server u otro servidor local.
4. Permite el acceso al micrófono para practicar con reconocimiento de voz. La reproducción de las frases también funciona sin micrófono.

Para instalarla como PWA y probar el service worker, sirve el proyecto desde `localhost` o HTTPS; abrir `index.html` con `file://` no activa esas funciones.

## Agregar tus audios

Cada frase tiene un nombre de MP3 único basado en su frase en inglés. Guarda los archivos con este patrón: `audio/<nivel>/<nombre-de-la-frase>.mp3`. Por ejemplo:

- `audio/zero/hello.mp3` — “Hello!”
- `audio/zero/thank-you.mp3` — “Thank you!”
- `audio/basic/how-much-does-this-cost.mp3` — “How much does this cost?”
- `audio/professional/id-like-to-propose-an-alternative-approach.mp3` — “I'd like to propose an alternative approach.”

La lista completa de rutas está en `audio/README.md`. Si falta un MP3, se reproduce una voz temporal del navegador. Los audios se guardan separados por nivel para que no se repitan ni se mezclen.

El reconocimiento del navegador compara las palabras que entendió con la frase objetivo. Sirve como guía de práctica, pero no mide con precisión fonemas, acento o entonación.

## Estructura

- `index.html` — ruta de aprendizaje, selección de modo y panel de juego.
- `styles.css` — diseño adaptable.
- `app.js` — niveles, frases, voz y lógica de los cuatro juegos.
- `manifest.json` — metadatos de instalación.
- `service-worker.js` — caché de archivos para uso sin conexión.
- `icon.PNG` — icono y logotipo de FLYNGLISH.
- `audio/` — carpeta para los MP3 de cada frase.
