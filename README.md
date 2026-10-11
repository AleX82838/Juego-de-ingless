# WordQuest — Aprende inglés hablando

Aplicación web instalable para practicar inglés hablado desde cero hasta un nivel profesional. Está construida con HTML, CSS y JavaScript, sin herramientas de compilación ni servicios de pago.

## Qué incluye

- Cuatro etapas: nivel 0, básico, intermedio y profesional, con frases, traducciones, contexto y una guía de pronunciación aproximada.
- Cuatro juegos: ruleta de frases, memorama bilingüe, tablero de retos y cartas para hablar.
- Modo individual o para dos jugadores, con turnos y puntuación.
- Reproducción de voz en inglés y reconocimiento de voz cuando el navegador lo admite. Si el micrófono o el reconocimiento no están disponibles, se puede practicar en voz alta y confirmar manualmente.
- Puntos, racha y retos completados guardados en el navegador.
- Diseño adaptable a móvil y escritorio, manifiesto PWA y caché para uso sin conexión.

## Ejecutar en Visual Studio Code

1. Descomprime la carpeta del proyecto.
2. Abre la carpeta `my_own_english_vocabulary_game` en Visual Studio Code.
3. Inicia `index.html` con Live Server u otro servidor local.
4. Permite el acceso al micrófono para practicar con reconocimiento de voz. La reproducción de las frases también funciona sin micrófono.

Para instalarla como PWA y probar el service worker, sirve el proyecto desde `localhost` o HTTPS; abrir `index.html` con `file://` no activa esas funciones.

## Estructura

- `index.html` — ruta de aprendizaje, selección de modo y panel de juego.
- `styles.css` — diseño adaptable.
- `app.js` — niveles, frases, voz y lógica de los cuatro juegos.
- `manifest.json` — metadatos de instalación.
- `service-worker.js` — caché de archivos para uso sin conexión.
- `icon.PNG` — icono y logotipo de WordQuest.
