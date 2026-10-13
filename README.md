# FLYNGLISH — Aprende inglés jugando

Aplicación web instalable para practicar inglés desde el nivel 0 hasta el profesional. Incluye modo individual o para dos personas, progreso guardado y práctica oral.

## Juegos

- **Memorama:** une la frase en inglés con su significado y luego practica en voz alta.
- **Serpientes y escaleras:** lanza el dado; para mover tu ficha, completa un reto hablando.
- **Tabla de retos:** elige una casilla y completa su reto oral.

En la pantalla principal, el botón **MENÚ** despliega los accesos a Mi perfil, Ajustes y Sistema. Las tarjetas de juegos tienen espacios reservados para incorporar las ilustraciones más adelante.

## Audios

Las frases usan archivos MP3 únicos dentro de `audio/<nivel>/`. Por ejemplo, “Hello!” se reproduce desde `audio/zero/hello.mp3`. La lista completa está en `audio/README.md`. Si falta un archivo, la app reproduce una voz temporal del navegador.

## Agregar las ilustraciones de los juegos

Puedes guardar tus imágenes en una carpeta `images/` con estos nombres sugeridos:

- `images/memorama.png`
- `images/serpientes-escaleras.png`
- `images/tabla-retos.png`

En `index.html`, sustituye cada elemento `.game-art-placeholder` por una imagen, por ejemplo: `<img src="images/memorama.png" alt="Memorama">`.

## Ejecutar

Abre la carpeta del proyecto en Visual Studio Code y sirve `index.html` con Live Server u otro servidor local. Para el micrófono y las funciones PWA, usa `localhost` o HTTPS. El permiso del micrófono depende del navegador; si no hay reconocimiento, puedes practicar y confirmar manualmente.

## Archivos principales

- `index.html` — página principal, menú desplegable y tarjetas de juego.
- `styles.css` — estilo visual y diseño adaptable.
- `app.js` — niveles, audios, reconocimiento de voz y juegos.
- `manifest.json` y `service-worker.js` — instalación y soporte sin conexión.
