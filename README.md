# FLYNGLISH — Aprende inglés jugando

Aplicación web instalable para practicar inglés desde el nivel 0 hasta el profesional. Incluye modo individual o para dos personas, progreso por usuario, práctica oral y una pantalla de bienvenida animada de cinco segundos.

## Juegos

- **Memorama:** une la frase en inglés con su significado y luego practica en voz alta.
- **Serpientes y escaleras:** tablero serpenteante de 100 casillas, con fichas para 1 o 2 jugadores, preguntas ajustadas al nivel, sonidos opcionales y retos especiales al caer en una serpiente o escalera.
- **Tabla de retos:** elige una casilla y completa su reto oral.
- **Dominó bilingüe:** conecta fichas en inglés y español y juega contra la computadora.

Cada juego tiene su propio selector de nivel. El memorama y la tabla ajustan su cantidad de retos; Serpientes y escaleras adapta sus preguntas, y el dominó cambia el vocabulario según el nivel. Al elegir un juego se abre en pantalla completa; si el navegador no ofrece esa función, la app muestra una vista de juego a pantalla completa.

## Cuentas y progreso

Puedes crear un usuario y contraseña desde la pantalla de acceso. La contraseña se guarda como derivación criptográfica PBKDF2 con sal aleatoria; el progreso se conserva en el almacenamiento local del navegador y se separa por nombre de usuario. Por ello, las cuentas funcionan solo en el mismo navegador y dispositivo: esta versión no tiene servidor ni sincronización entre dispositivos. Mantén una copia de los datos del navegador si necesitas conservarlos.

Para crear cuenta e iniciar sesión se necesita abrir el proyecto desde `localhost` o HTTPS, ya que la protección de contraseña usa Web Crypto.

La pantalla principal incluye el reto del día, misiones diarias con recompensas de XP, un resumen del nivel, acceso a los cuatro juegos y navegación inferior a Inicio, Misiones, Progreso y Ajustes. Las misiones se guardan por usuario y fecha en el navegador; aprender palabras se cuenta al completar prácticas distintas, Memorama al encontrar todas las parejas y modo de dos jugadores al terminar una práctica en pareja. Los espacios de arte de los juegos quedan listos para incorporar ilustraciones más adelante.

## Audios

Las frases usan archivos MP3 únicos dentro de `audio/<nivel>/`. Por ejemplo, “Hello!” se reproduce desde `audio/zero/hello.mp3`. La lista completa está en `audio/README.md`. Si falta un archivo, la app reproduce una voz temporal del navegador.

## Agregar las ilustraciones de los juegos

Puedes guardar tus imágenes en una carpeta `images/` con estos nombres sugeridos:

- `images/memorama.png`
- `images/serpientes-escaleras.png`
- `images/tabla-retos.png`
- `images/domino.png`

En `index.html`, sustituye cada elemento `.game-art-placeholder` por una imagen, por ejemplo: `<img src="images/memorama.png" alt="Memorama">`.

## Ejecutar

Abre la carpeta del proyecto en Visual Studio Code y sirve `index.html` con Live Server u otro servidor local. Para el micrófono y las funciones PWA, usa `localhost` o HTTPS. El permiso del micrófono depende del navegador; si no hay reconocimiento, puedes practicar y confirmar manualmente.

## Archivos principales

- `index.html` — bienvenida animada, acceso, menú y página principal.
- `styles.css` — estilo visual y diseño adaptable.
- `app.js` — niveles, audios, reconocimiento de voz y juegos.
- `manifest.json` y `service-worker.js` — instalación y soporte sin conexión.
