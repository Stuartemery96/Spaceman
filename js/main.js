/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['space', 'earth', 'star', 'nebula', 'asteroid', 'comet', 'constellation', 'astronaut', 'planet', 'saturn', 'jupiter', 'moon', 'pluto', 'cosmos', 'constellation'];
const MSG_LOOKUP = {
  null: '',
  'win': 'YOU MADE IT!',
  'lose': 'YOU MISSED YOUR FLIGHT!',
}
const sounds = {
  loser: 'sounds/sad.wav',
  winner: 'sounds/rocketsnd.wav',
}
const IMAGES = {
  sadImg: 'imgs/sad.png',
  man: 'imgs/astronaut.png',
}

/*----- state variables -----*/
let secretWord;
let incorrectGuesses;
let guessedLetters;
let outcome;
let attempts;
let guessedWord;

/*----- cached elements  -----*/
const attemptsEl = document.getElementById('cntdwn')
const guessedLettersEl = document.getElementById('random-word');
const incorrectGuessesEl = document.getElementById('inc-guesses');
const msgEl = document.getElementById('msg');
const playAgnBtn = document.getElementById('ply-agn');
const manImg = document.getElementById('astronaut');
const shipImg = document.getElementById('rckt');
const player = new Audio();

/*----- event listeners -----*/
playAgnBtn.addEventListener('click', init);
document.querySelector('*').addEventListener('keypress', handleGuess);

/*----- functions -----*/
init();

function init() {
  outcome = null;
  const rndIdx = Math.floor(Math.random() * WORDS.length)
  secretWord = WORDS[rndIdx];
  guessedLetters = new Array(secretWord.length).fill('_ ');
  incorrectGuesses = new Array().fill(' ');
  attempts = parseInt(MAX_ATTEMPTS);
  render();
}

function render() {
  guessedLettersEl.innerHTML = guessedLetters.join('');
  attemptsEl.innerHTML = attempts;
  incorrectGuessesEl.innerHTML = incorrectGuesses.join('');
  renderMsg();
  renderManImg();
  renderControls();
  renderShip();
}

function handleGuess(keyPushed) {
  const secretWordArr = secretWord.split('');
  const letter = secretWordArr.find((element) => element === keyPushed.key);
  if (letter === undefined && !incorrectGuesses.includes(keyPushed.key) && outcome === null) {
    incorrectGuesses.push(keyPushed.key);
    attempts--;
  } else if (outcome === null) {
    for (let i = 0; i < secretWordArr.length; i++) {
      if (secretWordArr[i] === keyPushed.key) {
        guessedLetters[i] = keyPushed.key;
      }
    }
  }
  getResult();
  render();
}

function getResult() {
  guessedWord = guessedLetters.join('');

  if (guessedWord === secretWord) {
    outcome = 'win';
    playSound('winner');
    attempts = 0;
  } else if (attempts > 0 && guessedWord !== secretWord) {
    outcome = null;
  } else {
    outcome = 'lose';
    playSound('loser');
  }
}

function renderMsg() {
  msgEl.style.visibility = outcome === null ? 'hidden' : 'visible';
  msgEl.innerHTML = MSG_LOOKUP[outcome] + `<br>The correct word was ${secretWord}`;
}

function renderControls() {
  playAgnBtn.style.visibility = outcome === null ? 'hidden' : 'visible';
}

function renderManImg() {
  manImg.style.visibility = outcome === 'win' ? 'hidden' : 'visible';
  if (outcome === null) {
    manImg.src = IMAGES['man'];
  } else if (outcome === 'lose') {
    manImg.src = IMAGES['sadImg'];
  }
}

function renderShip() {
  shipImg.src = `imgs/rocket/${attempts}.png`;
}

function playSound(name) {
  player.src = sounds[name];
  player.play();
  player.volume = 0.5;
}