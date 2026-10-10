const WORDS = [
  {word:"apple", meaning:"manzana", theme:"Food & Drinks", emoji:"🍎"},
  {word:"bread", meaning:"pan", theme:"Food & Drinks", emoji:"🍞"},
  {word:"cheese", meaning:"queso", theme:"Food & Drinks", emoji:"🧀"},
  {word:"water", meaning:"agua", theme:"Food & Drinks", emoji:"💧"},
  {word:"milk", meaning:"leche", theme:"Food & Drinks", emoji:"🥛"},
  {word:"rice", meaning:"arroz", theme:"Food & Drinks", emoji:"🍚"},
  {word:"chicken", meaning:"pollo", theme:"Food & Drinks", emoji:"🍗"},
  {word:"strawberry", meaning:"fresa", theme:"Food & Drinks", emoji:"🍓"},
  {word:"teacher", meaning:"maestro/a", theme:"Jobs", emoji:"👩‍🏫"},
  {word:"doctor", meaning:"doctor/a", theme:"Jobs", emoji:"🧑‍⚕️"},
  {word:"chef", meaning:"chef / cocinero/a", theme:"Jobs", emoji:"🧑‍🍳"},
  {word:"farmer", meaning:"agricultor/a", theme:"Jobs", emoji:"👨‍🌾"},
  {word:"driver", meaning:"conductor/a", theme:"Jobs", emoji:"🚌"},
  {word:"nurse", meaning:"enfermero/a", theme:"Jobs", emoji:"🩺"},
  {word:"police officer", meaning:"policía", theme:"Jobs", emoji:"👮"},
  {word:"firefighter", meaning:"bombero/a", theme:"Jobs", emoji:"🧑‍🚒"},
  {word:"school", meaning:"escuela", theme:"Places", emoji:"🏫"},
  {word:"hospital", meaning:"hospital", theme:"Places", emoji:"🏥"},
  {word:"restaurant", meaning:"restaurante", theme:"Places", emoji:"🍽️"},
  {word:"library", meaning:"biblioteca", theme:"Places", emoji:"📚"},
  {word:"park", meaning:"parque", theme:"Places", emoji:"🌳"},
  {word:"supermarket", meaning:"supermercado", theme:"Places", emoji:"🛒"},
  {word:"beach", meaning:"playa", theme:"Places", emoji:"🏖️"},
  {word:"airport", meaning:"aeropuerto", theme:"Places", emoji:"✈️"}
];

const state = {points:0, streak:0, completed:0, currentGame:null, currentWord:null, answered:false, round:0, missionStarted:false};
const $ = id => document.getElementById(id);
const modal = $("game-modal");
const content = $("game-content");
const feedback = $("feedback");
const nextBtn = $("next-btn");

function shuffle(arr){return [...arr].sort(()=>Math.random()-.5)}
function pickWord(){return WORDS[Math.floor(Math.random()*WORDS.length)]}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function updateStats(){
  $("total-points").textContent=state.points;
  $("streak").textContent=state.streak;
  $("modal-xp").textContent=state.points;
  $("mission-progress").style.width=Math.min(state.completed/3*100,100)+"%";
  $("mission-status").textContent=`${Math.min(state.completed,3)} of 3 games completed`;
  localStorage.setItem("wordquest-progress",JSON.stringify({points:state.points,streak:state.streak,completed:state.completed}));
}
function loadProgress(){
  try{const saved=JSON.parse(localStorage.getItem("wordquest-progress"));if(saved){state.points=saved.points||0;state.streak=saved.streak||0;state.completed=saved.completed||0}}catch(e){}
  updateStats();
}
function openGame(game){
  state.currentGame=game;state.round=0;state.answered=false;
  modal.classList.remove("hidden");
  document.body.style.overflow="hidden";
  if(game==="vocabulary"){renderVocabulary();return}
  const meta={
    quiz:["QUICK QUIZ","Pick the meaning","Choose the correct Spanish meaning."],
    spell:["SPELL IT","Spell the word","Look at the picture and type the English word."],
    sentence:["SENTENCE LAB","Make a sentence","Write a short sentence in English using the word."],
    picture:["PICTURE CLUE","Describe the picture","Choose the English word that matches the picture."],
    translate:["TRANSLATE","Translate it","Translate the Spanish word into English."]
  }[game];
  $("modal-kicker").textContent=meta[0];$("modal-title").textContent=meta[1];$("modal-instructions").textContent=meta[2];
  nextRound();
}
function nextRound(){
  state.currentWord=pickWord();state.answered=false;feedback.textContent="";feedback.className="feedback";nextBtn.disabled=true;nextBtn.textContent="Next →";
  if(state.currentGame==="quiz") renderChoice("quiz");
  if(state.currentGame==="picture") renderChoice("picture");
  if(state.currentGame==="spell") renderText("spell");
  if(state.currentGame==="translate") renderText("translate");
  if(state.currentGame==="sentence") renderText("sentence");
}
function promptCard(word,showMeaning=false){
  return `<div class="prompt-card"><div class="prompt-emoji">${word.emoji}</div><div class="prompt-word">${showMeaning?escapeHtml(word.meaning):escapeHtml(word.word)}</div><div class="prompt-meaning">${showMeaning?"Translate into English":" "+escapeHtml(word.theme)}</div></div>`;
}
function renderChoice(type){
  const w=state.currentWord;
  const isQuiz=type==="quiz";
  const question=isQuiz?`What does <b>${escapeHtml(w.word)}</b> mean?`:"Which English word matches this picture?";
  const opts=shuffle([w,...shuffle(WORDS.filter(x=>x.word!==w.word)).slice(0,3)]);
  content.innerHTML=`${isQuiz?promptCard(w):`<div class="prompt-card"><div class="prompt-emoji">${w.emoji}</div><div class="prompt-meaning">What is this in English?</div></div>`}<p class="helper">${question}</p><div class="answer-list">${opts.map(o=>`<button class="answer-option" data-answer="${escapeHtml(o.word)}">${escapeHtml(isQuiz?o.meaning:o.word)}</button>`).join("")}</div>`;
  content.querySelectorAll("[data-answer]").forEach(btn=>btn.addEventListener("click",()=>{
    if(state.answered)return;
    const selected=WORDS.find(item=>item.word===btn.dataset.answer);\n    const correct=isQuiz?(selected && selected.meaning===w.meaning):(btn.dataset.answer===w.word);
    if(correct){btn.classList.add("correct");handleAnswer(true,"Correct! Great job. +10 XP");}
    else{btn.classList.add("wrong");content.querySelectorAll("[data-answer]").forEach(b=>{if(isQuiz ? (WORDS.find(item=>item.word===b.dataset.answer)?.meaning===w.meaning) : (b.dataset.answer===w.word))b.classList.add("correct")});handleAnswer(false,`Not quite! The answer is “${isQuiz?w.meaning:w.word}”.`)}
    content.querySelectorAll("[data-answer]").forEach(b=>b.disabled=true);
  }));
}
function renderText(type){
  const w=state.currentWord;
  let prompt="",placeholder="",extra="";
  if(type==="spell"){prompt=promptCard(w);placeholder="Type the English word…"}
  if(type==="translate"){prompt=promptCard(w,true);placeholder="Write the English translation…"}
  if(type==="sentence"){prompt=promptCard(w);placeholder="Example: I go to school every day.";extra=`<p class="helper">Write a sentence with <b>${escapeHtml(w.word)}</b>. It must include at least 3 words.</p>`}
  content.innerHTML=`${prompt}${extra}<form id="answer-form"><input class="text-answer" id="text-answer" autocomplete="off" placeholder="${placeholder}" required><button class="primary-btn" style="width:100%;margin-top:10px" type="submit">Check answer ✓</button></form>${type==="sentence"?`<div class="sentence-example">Example: “The teacher works at my school.”</div>`:""}`;
  $("text-answer").focus();
  $("answer-form").addEventListener("submit",e=>{
    e.preventDefault();if(state.answered)return;
    const answer=$("text-answer").value.trim();
    if(type==="sentence"){
      const clean=answer.toLowerCase().replace(/[.,!?;:]/g,"").split(/\s+/);
      const contains=clean.some(x=>x===w.word.toLowerCase());
      const enough=clean.length>=3;
      if(contains&&enough)handleAnswer(true,"Nice sentence! You used the word correctly. +10 XP");
      else handleAnswer(false,`Try again: write at least 3 words and include “${w.word}”.`);
    }else{
      const target=(type==="spell"?w.word:w.word).toLowerCase().trim();
      const normalized=answer.toLowerCase().trim().replace(/[.!?]$/,"");
      if(normalized===target)handleAnswer(true,"Correct! Great job. +10 XP");
      else handleAnswer(false,`Almost! Correct answer: “${w.word}”.`);
    }
  });
}
function handleAnswer(correct,message){
  state.answered=true;
  if(correct){state.points+=10;state.streak++;feedback.className="feedback good";state.completed++;updateStats();}
  else{state.streak=0;feedback.className="feedback bad";}
  feedback.textContent=message;
  nextBtn.disabled=false;
  nextBtn.textContent="Next word →";
}
function renderVocabulary(){
  $("modal-kicker").textContent="WORD DECK";$("modal-title").textContent="Your vocabulary";$("modal-instructions").textContent="Tap any card to see the English word and its Spanish meaning.";
  nextBtn.disabled=true;$("skip-btn").textContent="Close deck";feedback.textContent="";
  content.innerHTML=`<div class="word-deck">${WORDS.map((w,i)=>`<button class="word-tile" data-word-index="${i}"><span>${w.emoji}</span><span><strong>${escapeHtml(w.word)}</strong><small>${escapeHtml(w.theme)}</small></span></button>`).join("")}</div><p class="helper" style="margin-top:13px">24 words · 3 themes · English + Spanish</p>`;
  content.querySelectorAll("[data-word-index]").forEach(btn=>btn.addEventListener("click",()=>{
    const w=WORDS[Number(btn.dataset.wordIndex)];
    feedback.className="feedback good";feedback.textContent=`${w.emoji} ${w.word} = ${w.meaning} · ${w.theme}`;
  }));
}
function closeGame(){modal.classList.add("hidden");document.body.style.overflow="";$("skip-btn").textContent="Skip word";}
$("start-btn").addEventListener("click",()=>openGame("quiz"));
document.querySelectorAll("[data-game]").forEach(btn=>btn.addEventListener("click",()=>openGame(btn.dataset.game)));
$("close-modal").addEventListener("click",closeGame);
modal.addEventListener("click",e=>{if(e.target===modal)closeGame()});
$("skip-btn").addEventListener("click",()=>{if(state.currentGame==="vocabulary"){closeGame();return}nextRound()});
nextBtn.addEventListener("click",()=>{if(state.currentGame==="vocabulary")return;nextRound()});
$("mission-btn").addEventListener("click",()=>{state.missionStarted=true;openGame("quiz");$("mission-btn").textContent="Mission in progress ✓"});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.classList.contains("hidden"))closeGame()});
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}))}
loadProgress();
