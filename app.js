const LEVELS = {
  zero: {name:"Nivel 0 · Desde cero", short:"NIVEL 0", lessons:[
    ["Hello!","¡Hola!","jelóu","Saludar"],["Good morning.","Buenos días.","gud mórning","Saludar por la mañana"],
    ["My name is Ana.","Me llamo Ana.","mai néim is Ana","Presentarte"],["How are you?","¿Cómo estás?","jáu ar iu","Preguntar cómo está alguien"],
    ["I am fine, thank you.","Estoy bien, gracias.","ai am fáin, zank iu","Responder con cortesía"],["Please.","Por favor.","plís","Pedir algo con amabilidad"],
    ["Thank you.","Gracias.","zank iu","Dar las gracias"],["Goodbye!","¡Adiós!","gudbái","Despedirte"]
  ]},
  basic: {name:"Básico", short:"BÁSICO", lessons:[
    ["I would like a glass of water, please.","Quisiera un vaso de agua, por favor.","ai wud láik a glas ov wóter plís","Pedir algo en una cafetería"],
    ["Where is the nearest bus stop?","¿Dónde está la parada de autobús más cercana?","wér is de nírest bas stap","Pedir indicaciones"],
    ["How much does this cost?","¿Cuánto cuesta esto?","jáu mach das dis cost","Preguntar un precio"],
    ["Could you help me, please?","¿Podría ayudarme, por favor?","kud iu jelp mi plís","Pedir ayuda"],
    ["I don't understand. Could you repeat that?","No entiendo. ¿Podría repetirlo?","ai dont anderstánd, kud iu ripít dat","Pedir que repitan algo"],
    ["I live near the city center.","Vivo cerca del centro de la ciudad.","ai liv nír de cíti sénter","Hablar de dónde vives"],
    ["I usually take the bus to work.","Normalmente tomo el autobús para ir al trabajo.","ai iúshuali téik de bas tu work","Contar una rutina"],
    ["What would you recommend?","¿Qué me recomendarías?","wot wud iu rekoménd","Pedir una recomendación"]
  ]},
  intermediate: {name:"Intermedio", short:"INTERMEDIO", lessons:[
    ["I've been learning English for two years.","He estado aprendiendo inglés durante dos años.","aiv bin lérning ínglish for tu yírs","Hablar de tu experiencia"],
    ["I see your point, but I have a different perspective.","Entiendo tu punto, pero tengo una perspectiva diferente.","ai sí yor point, bat ai jav a díferent perspektiv","Expresar una opinión distinta"],
    ["Could you explain what you mean by that?","¿Podrías explicar qué quieres decir con eso?","kud iu ekspléin wot iu mín bai dat","Pedir una aclaración"],
    ["If I had more time, I would take another course.","Si tuviera más tiempo, tomaría otro curso.","if ai jad mor taim, ai wud téik anóder kors","Hablar de una situación hipotética"],
    ["I'm looking forward to meeting the new team.","Tengo muchas ganas de conocer al nuevo equipo.","aim lúking fórward tu míting de niu tím","Hablar de planes"],
    ["The main reason is that it saves us time.","La razón principal es que nos ahorra tiempo.","de méin ríson is dat it séivs as taim","Explicar una razón"],
    ["In my experience, clear communication makes a difference.","En mi experiencia, la comunicación clara marca la diferencia.","in mai ekspíriens, clír komiunikeishon méiks a díferens","Compartir una experiencia"],
    ["Would you mind sending me the details tomorrow?","¿Te importaría enviarme los detalles mañana?","wud iu máind sénding mi de ditéils tumórou","Hacer una petición amable"]
  ]},
  professional: {name:"Profesional", short:"PROFESIONAL", lessons:[
    ["I'm responsible for coordinating the project timeline.","Soy responsable de coordinar el calendario del proyecto.","aim rispónsabol for kouórdineiting de próyekt táimlain","Explicar tus responsabilidades"],
    ["Based on the latest data, we should revise our forecast.","Según los datos más recientes, deberíamos revisar nuestro pronóstico.","béist on de léitest déita, wi shud riváis aur fórcast","Presentar una recomendación basada en datos"],
    ["Could you elaborate on the risks involved?","¿Podría ampliar la información sobre los riesgos involucrados?","kud iu iláboréit on de risks invólvd","Pedir más detalles en una reunión"],
    ["I'd like to propose an alternative approach.","Me gustaría proponer un enfoque alternativo.","aid láik tu propóus an oltérnativ apróuch","Proponer una solución"],
    ["Our priority is to deliver measurable results.","Nuestra prioridad es ofrecer resultados medibles.","aur praioriti is tu dilíver méshurabol rizalts","Hablar de prioridades"],
    ["Let's align on the objectives before we move forward.","Alineemos los objetivos antes de seguir adelante.","lets aláin on di obyéktivs bifór wi muv fórward","Acordar los objetivos"],
    ["I'll follow up with a summary after the meeting.","Daré seguimiento con un resumen después de la reunión.","ail fólo ap wid a sámari áfter de míting","Cerrar una reunión con claridad"],
    ["We may need to adjust the scope to meet the deadline.","Quizá tengamos que ajustar el alcance para cumplir con la fecha límite.","wi méi nid tu adyast de skóup tu mit de dédlain","Negociar plazos y alcance"]
  ]}
};

const state={points:0,streak:0,completed:0,level:"zero",mode:"solo",activePlayer:0,scores:[0,0],game:null,challengeDone:false,currentLesson:null,continueAction:null,memory:null,boardDone:new Set(),boardCurrent:null,cardsRevealed:new Set(),cardCurrent:null};
const $=id=>document.getElementById(id), modal=$("game-modal"), content=$("game-content"), feedback=$("feedback"), nextBtn=$("next-btn");
const shuffle=list=>[...list].sort(()=>Math.random()-.5);
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function lessonBank(){return LEVELS[state.level].lessons.map((row,index)=>({id:`${state.level}-${index}`,phrase:row[0],meaning:row[1],pronunciation:row[2],use:row[3]}))}
function playerName(index){const el=$(index===0?"player-one-name":"player-two-name");return (el?.value||`Jugador ${index+1}`).trim()||`Jugador ${index+1}`}
function updateTurn(){const banner=$("turn-banner");if(state.mode==="duo"){banner.classList.remove("hidden");banner.textContent=`Turno de ${playerName(state.activePlayer)} · ${playerName(0)}: ${state.scores[0]} puntos · ${playerName(1)}: ${state.scores[1]} puntos`;}else{banner.classList.add("hidden");banner.textContent=""}}
function updateStats(){
  $("total-points").textContent=state.points;$("streak").textContent=state.streak;$("modal-xp").textContent=state.points;$("completed-count").textContent=state.completed;
  const progress=Math.min(state.completed/10*100,100);$("progress-fill").style.width=`${progress}%`;
  $("progress-caption").textContent=`${Math.min(state.completed,10)} de 10 retos completados`;
  $("progress-title").textContent=state.completed?"¡Ya estás hablando inglés!":"Tu primera frase te espera";
  $("progress-description").textContent=state.completed?`Has practicado ${state.completed} ${state.completed===1?"reto":"retos"}. ¡Sigue sumando confianza!`:"Completa un reto hablando para empezar a sumar XP.";
  try{localStorage.setItem("wordquest-progress",JSON.stringify({points:state.points,streak:state.streak,completed:state.completed,level:state.level}))}catch(e){}
  updateTurn();
}
function setFeedback(message,type=""){feedback.className=`feedback${type?` ${type}`:""}`;feedback.textContent=message}
function clearFeedback(){setFeedback("")}
function enableContinue(label="Continuar →",action){nextBtn.disabled=true;nextBtn.textContent=label;state.continueAction=action||null}
function markComplete(lessonId){
  if(state.challengeDone)return;
  state.challengeDone=true;state.points+=10;state.streak++;state.completed++;state.scores[state.activePlayer]++;updateStats();
  if(state.game==="board"&&state.boardCurrent!==null)state.boardDone.add(state.boardCurrent);
  setFeedback(`¡Muy bien! Frase practicada. +10 XP para ${playerName(state.activePlayer)}.`,"good");
  nextBtn.disabled=false;nextBtn.textContent=state.game==="roulette"?"Girar otra vez →":state.game==="board"?"Siguiente reto →":state.game==="cards"?"Siguiente carta →":"Seguir memorama →";
}
function challengeCard(lesson,{showMeaning=true}={}){
  state.currentLesson=lesson;state.challengeDone=false;clearFeedback();
  const recognitionAvailable=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
  return `<div class="speaking-card"><span class="eyebrow">${escapeHtml(lesson.use)}</span><p class="spoken-phrase" lang="en">${escapeHtml(lesson.phrase)}</p>${showMeaning?`<p class="phrase-meaning">${escapeHtml(lesson.meaning)}</p>`:""}<p class="pronunciation-hint">🔊 Guía aproximada: <b>${escapeHtml(lesson.pronunciation)}</b></p><div class="speaking-actions"><button class="secondary-btn listen-btn" type="button">🔊 Escuchar</button><button class="primary-btn speak-btn" type="button">🎙️ ${recognitionAvailable?"Practicar conmigo":"Practicar en voz alta"}</button></div><p class="speech-status" aria-live="polite">${recognitionAvailable?"Pulsa el micrófono y di la frase en inglés.":"Di la frase en voz alta y confirma cuando termines."}</p><div class="self-check"><button class="secondary-btn said-btn" type="button">Ya la dije ✓</button><button class="retry-btn" type="button">Escuchar de nuevo</button></div></div>`;
}
function bindSpeaking(){
  content.querySelector(".listen-btn")?.addEventListener("click",()=>speak(state.currentLesson?.phrase));
  content.querySelector(".retry-btn")?.addEventListener("click",()=>speak(state.currentLesson?.phrase));
  content.querySelector(".said-btn")?.addEventListener("click",()=>markComplete(state.currentLesson?.id));
  content.querySelector(".speak-btn")?.addEventListener("click",()=>recognizeSpeech());
}
function speak(text){if(!text)return;if(!("speechSynthesis" in window)){setFeedback("Tu navegador no puede reproducir voz. Lee la guía y practica la frase en voz alta.");return}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang="en-US";utterance.rate=state.level==="zero"?.78:state.level==="basic"?.88:.96;speechSynthesis.speak(utterance)}
function normalizeSpeech(text){return text.toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim()}
function similarity(a,b){if(a===b)return 1;const row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let prev=row[0];row[0]=i;for(let j=1;j<=b.length;j++){const old=row[j];row[j]=Math.min(row[j]+1,row[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=old}}return 1-row[b.length]/Math.max(a.length,b.length,1)}
function recognizeSpeech(){
  const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SpeechRecognition){setFeedback("El reconocimiento de voz no está disponible aquí. Di la frase y pulsa «Ya la dije».");return}
  const status=content.querySelector(".speech-status"),button=content.querySelector(".speak-btn");const recognition=new SpeechRecognition();recognition.lang="en-US";recognition.interimResults=false;recognition.maxAlternatives=1;
  button.disabled=true;status.textContent="Escuchando… di la frase en inglés.";clearFeedback();
  recognition.onresult=event=>{const transcript=event.results[0][0].transcript;status.textContent=`Te escuché decir: “${transcript}”`;const target=normalizeSpeech(state.currentLesson.phrase),heard=normalizeSpeech(transcript);if(similarity(target,heard)>=.72){markComplete(state.currentLesson.id)}else{state.streak=0;updateStats();setFeedback("Casi. Escucha la frase otra vez y prueba más despacio.","bad")}};
  recognition.onerror=event=>{status.textContent=event.error==="not-allowed"?"Activa el permiso del micrófono en tu navegador.":"No te escuché con claridad. Inténtalo otra vez o usa «Ya la dije»."};
  recognition.onend=()=>{if(button.isConnected)button.disabled=false};
  try{recognition.start()}catch(e){button.disabled=false;status.textContent="No se pudo iniciar el micrófono. Inténtalo otra vez."}
}
function setLevel(level){if(!LEVELS[level])return;state.level=level;document.querySelectorAll("[data-level]").forEach(button=>{const selected=button.dataset.level===level;button.classList.toggle("selected",selected);button.setAttribute("aria-pressed",String(selected))});$("selected-level-label").textContent=`${LEVELS[level].short} · ${LEVELS[level].name.replace(/^.*· /,"").toUpperCase()}`;updateStats()}
function openGame(game){state.game=game;state.activePlayer=0;state.challengeDone=false;clearFeedback();modal.classList.remove("hidden");document.body.style.overflow="hidden";const meta={roulette:["RULETA DE FRASES","Gira y habla","Escucha la frase que salga y practícala en voz alta."],memory:["MEMORAMA BILINGÜE","Encuentra las parejas","Une cada frase en inglés con su significado. Después, practícala en voz alta."],board:["TABLERO DE RETOS","Avanza hablando","Elige una casilla y completa el reto oral para avanzar."],cards:["CARTAS PARA HABLAR","Voltea y practica","Elige una carta, escucha la frase y practica en voz alta."]}[game];$("modal-kicker").textContent=`${meta[0]} · ${LEVELS[state.level].short}`;$("modal-title").textContent=meta[1];$("modal-instructions").textContent=meta[2];enableContinue("Continuar →");if(game==="roulette")renderRoulette();if(game==="memory")initMemory();if(game==="board")renderBoard();if(game==="cards")renderCards();updateTurn()}
function renderRoulette(){state.currentLesson=null;state.challengeDone=false;clearFeedback();enableContinue("Girar otra vez →",()=>{if(state.mode==="duo"&&state.challengeDone)state.activePlayer=1-state.activePlayer;renderRoulette()});content.innerHTML=`<div class="roulette-area"><div class="roulette-wheel" aria-hidden="true">🎡</div><p>La ruleta elegirá una frase de <b>${escapeHtml(LEVELS[state.level].name)}</b>.</p><button class="primary-btn spin-btn" type="button">Girar la ruleta</button></div>`;content.querySelector(".spin-btn").addEventListener("click",()=>{const button=content.querySelector(".spin-btn");button.disabled=true;content.querySelector(".roulette-wheel").classList.add("spinning");window.setTimeout(()=>{const lesson=lessonBank()[Math.floor(Math.random()*lessonBank().length)];content.innerHTML=`<p class="helper roulette-result">🎉 Te tocó este reto:</p>${challengeCard(lesson)}`;bindSpeaking();enableContinue("Girar otra vez →",()=>{if(state.mode==="duo"&&state.challengeDone)state.activePlayer=1-state.activePlayer;renderRoulette()});updateTurn()},650)})}
function initMemory(){const chosen=shuffle(lessonBank()).slice(0,4);state.memory={lessons:chosen,cards:shuffle(chosen.flatMap(lesson=>[{id:lesson.id,type:"en",label:lesson.phrase,lesson},{id:lesson.id,type:"es",label:lesson.meaning,lesson}])),chosen:[],matched:new Set(),locked:false,currentMatch:null};renderMemory()}
function renderMemory(){const m=state.memory;enableContinue("Seguir memorama →",()=>{m.currentMatch=null;m.chosen=[];state.challengeDone=false;clearFeedback();renderMemory()});const cards=m.cards.map((card,index)=>{const face=m.matched.has(card.id)||m.chosen.includes(index);return `<button class="memory-card ${face?"is-face-up":""} ${m.matched.has(card.id)?"is-matched":""}" data-memory-index="${index}" ${m.locked||m.matched.has(card.id)||m.chosen.includes(index)?"disabled":""}>${face?`<span class="memory-type">${card.type==="en"?"ENGLISH":"ESPAÑOL"}</span><span>${escapeHtml(card.label)}</span>`:`<span class="memory-back">?</span>`}</button>`}).join("");let practice=m.currentMatch?`<div class="memory-practice"><p class="helper">¡Pareja encontrada! Ahora di la frase en inglés para ganar XP.</p>${challengeCard(m.currentMatch)}</div>`:"";content.innerHTML=`<div class="memory-score">${m.matched.size/2} de 4 parejas · ${state.mode==="duo"?`Turno: ${escapeHtml(playerName(state.activePlayer))}`:"Encuentra todas las parejas"}</div><div class="memory-grid">${cards}</div>${practice}`;content.querySelectorAll("[data-memory-index]").forEach(button=>button.addEventListener("click",()=>selectMemoryCard(Number(button.dataset.memoryIndex))));if(m.currentMatch)bindSpeaking()}
function selectMemoryCard(index){const m=state.memory;m.chosen.push(index);if(m.chosen.length<2){renderMemory();return}m.locked=true;const [first,second]=m.chosen.map(i=>m.cards[i]);if(first.id===second.id&&first.type!==second.type){m.matched.add(first.id);m.currentMatch=first.lesson;state.scores[state.activePlayer]++;setFeedback(`¡Pareja! ${playerName(state.activePlayer)} suma un punto. Ahora di la frase.` ,"good");m.chosen=[];m.locked=false;renderMemory();updateTurn()}else{renderMemory();setTimeout(()=>{m.chosen=[];m.locked=false;if(state.mode==="duo")state.activePlayer=1-state.activePlayer;clearFeedback();renderMemory();updateTurn()},850)}}
function renderBoard(){state.boardCurrent=null;state.challengeDone=false;clearFeedback();enableContinue("Siguiente reto →",()=>{state.boardCurrent=null;state.challengeDone=false;clearFeedback();renderBoard()});const cells=Array.from({length:16},(_,i)=>`<button class="board-cell ${state.boardDone.has(i)?"is-done":""}" data-board-index="${i}" ${state.boardDone.has(i)?"disabled":""}>${state.boardDone.has(i)?"✓":i===15?"🏁":i+1}</button>`).join("");content.innerHTML=`<div class="board-progress">Casillas superadas: ${state.boardDone.size} · ${state.mode==="duo"?`Juega ${escapeHtml(playerName(state.activePlayer))}`:"Elige cualquier casilla"}</div><div class="challenge-board">${cells}</div><p class="helper">Cada casilla es un reto de conversación. Tu avance se conserva durante esta partida.</p>`;content.querySelectorAll("[data-board-index]").forEach(button=>button.addEventListener("click",()=>{state.boardCurrent=Number(button.dataset.boardIndex);state.challengeDone=false;const lesson=lessonBank()[Math.floor(Math.random()*lessonBank().length)];content.innerHTML=`<button class="back-to-board" type="button">← Volver al tablero</button><p class="helper">Reto de la casilla ${state.boardCurrent+1}</p>${challengeCard(lesson)}`;content.querySelector(".back-to-board").addEventListener("click",renderBoard);bindSpeaking();enableContinue("Siguiente reto →",()=>{if(state.mode==="duo")state.activePlayer=1-state.activePlayer;renderBoard()});updateTurn()}))}
function renderCards(){state.challengeDone=false;clearFeedback();enableContinue("Siguiente carta →",()=>{if(state.mode==="duo"&&state.challengeDone)state.activePlayer=1-state.activePlayer;state.cardCurrent=null;renderCards()});const lessons=lessonBank();content.innerHTML=`<p class="helper">Toca una carta para revelar la frase y su significado.</p><div class="flashcard-grid">${lessons.map((lesson,index)=>`<button class="flash-card ${state.cardsRevealed.has(index)?"is-revealed":""}" data-card-index="${index}"><span class="flash-number">CARTA ${String(index+1).padStart(2,"0")}</span>${state.cardsRevealed.has(index)?`<strong lang="en">${escapeHtml(lesson.phrase)}</strong><small>${escapeHtml(lesson.meaning)}</small><span class="card-practice">Toca para practicar →</span>`:`<span class="flash-question">?</span><small>${escapeHtml(lesson.use)}</small>`}</button>`).join("")}</div>${state.cardCurrent!==null?challengeCard(lessons[state.cardCurrent]):""}`;content.querySelectorAll("[data-card-index]").forEach(button=>button.addEventListener("click",()=>{const index=Number(button.dataset.cardIndex);if(state.cardsRevealed.has(index)){state.cardCurrent=index;renderCards();bindSpeaking()}else{state.cardsRevealed.add(index);renderCards()}}));if(state.cardCurrent!==null)bindSpeaking()}
function continueGame(){if(typeof state.continueAction==="function")state.continueAction()}
function closeGame(){modal.classList.add("hidden");document.body.style.overflow="";if("speechSynthesis" in window)speechSynthesis.cancel()}
document.querySelectorAll("[data-level]").forEach(button=>button.addEventListener("click",()=>setLevel(button.dataset.level)));
document.querySelectorAll("[data-mode]").forEach(button=>button.addEventListener("click",()=>{state.mode=button.dataset.mode;state.activePlayer=0;document.querySelectorAll("[data-mode]").forEach(b=>{const on=b===button;b.classList.toggle("selected",on);b.setAttribute("aria-pressed",String(on))});$("player-names").classList.toggle("hidden",state.mode!=="duo");updateTurn()}));
document.querySelectorAll("[data-game]").forEach(button=>button.addEventListener("click",()=>openGame(button.dataset.game)));
$("start-btn").addEventListener("click",()=>openGame("roulette"));$("tip-btn").addEventListener("click",()=>openGame("cards"));$("close-modal").addEventListener("click",closeGame);$("skip-btn").addEventListener("click",closeGame);nextBtn.addEventListener("click",continueGame);modal.addEventListener("click",event=>{if(event.target===modal)closeGame()});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!modal.classList.contains("hidden"))closeGame()});
try{const saved=JSON.parse(localStorage.getItem("wordquest-progress")||"null");if(saved){state.points=Number(saved.points)||0;state.streak=Number(saved.streak)||0;state.completed=Number(saved.completed)||0;if(LEVELS[saved.level])state.level=saved.level}}catch(e){}
setLevel(state.level);updateStats();
if("serviceWorker" in navigator&&location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
