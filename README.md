# WordQuest — My Own English Vocabulary Game

A colorful, responsive, installable web app for practicing English vocabulary. Built with plain HTML, CSS, and JavaScript—no build tools or paid services required.

## Features
- 24 words across three themes: Food & Drinks, Jobs, and Places.
- Six mini-game modes: Quick Quiz, Spell It, Sentence Lab, Picture Clue, Translate It, and Vocabulary Deck.
- XP, streak, and completed-game counter saved in the browser.
- Responsive layout for desktop and mobile.
- PWA manifest and service worker for installation and basic offline support.
- English mini-game labels and instructions, with Spanish meanings for vocabulary.

## Run in Visual Studio Code
1. Unzip the project folder.
2. Open Visual Studio Code.
3. Choose **File → Open Folder…** and select `my_own_english_vocabulary_game`.
4. Install the **Live Server** extension if you do not have it.
5. Right-click `index.html` and choose **Open with Live Server**.
6. The app opens in your browser. Changes to HTML/CSS/JS reload automatically.

You can also use another local development server. For PWA installation and service-worker support, use `localhost` or HTTPS; opening `index.html` directly as a `file://` URL does not enable the full install/offline features.

## Install on iPhone
1. Publish the folder to an HTTPS host (for example, GitHub Pages or Netlify), or run it on a local server accessible to the iPhone.
2. Open the HTTPS website in Safari.
3. Tap **Share → Add to Home Screen**.
4. Open WordQuest from the new Home Screen icon.

PWA installation behavior can vary by browser and iOS version. The app does not require an account.

## Project structure
- `index.html` — app layout and accessible modal dialog.
- `styles.css` — responsive visual design.
- `app.js` — vocabulary data and game logic.
- `manifest.json` — installable app metadata.
- `service-worker.js` — basic offline cache.
- `icon.svg` — app icon.

## School project checklist (from the supplied PDF)
- Vocabulary: 24 English words with meanings and emoji picture clues, grouped into 3 themes.
- Rules/instructions in English: each mini-game explains what to do in English.
- Challenges: translation, spelling, sentence creation, and picture-word matching are included.
- Digital app: supports practice and presentation, but does **not** replace the required handmade physical game.
- Physical product still required: make a board/cards by hand using cardboard, paper, colors, bottle caps, or recycled materials, and be ready to play with the teacher for 5–10 minutes.

## Suggested physical companion
Make 24 cards by hand. Put the English word and a small drawing on the front; put the Spanish meaning and a challenge on the back. Sort them using the same three themes as the app. Bring the cards/board for the teacher demonstration.
