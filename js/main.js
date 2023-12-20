/*----- constants -----*/
const MAX_ATTEMPTS = 7;
const WORDS = ['space', 'earth', 'star', 'nebula'];
const MSG_LOOKUP = {
  null: '',
  'win': 'YOU MADE IT!',
  'lose': 'YOU MISSED YOUR FLIGHT!',
}

const IMAGES = {
  img1: 'imgs/rocket/rocket-1.png',
  img2: 'imgs/rocket/rocket-2.png',
  img3: 'imgs/rocket/rocket-3.png',
  img4: 'imgs/rocket/rocket-4.png',
  img5: 'imgs/rocket/rocket-5.png',
  img6: 'imgs/rocket/rocket-6.png',
  img7: 'imgs/rocket/rocket-7.png',
  sadImg: 'imgs/sad.png',
  man: 'imgs/astronaut',
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
let manImg = document.getElementById('astronaut');
let shipImg = document.getElementById('rckt');
const playAgnBtn = document.getElementById('ply-agn')

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
  renderImg();
  renderControls();
}

function handleGuess(keyPushed) {
  const secretWordArr = secretWord.split('');
  const letter = secretWordArr.find((element) => element === keyPushed.key);
  if (letter === undefined && !incorrectGuesses.includes(keyPushed.key)) {
    incorrectGuesses.push(keyPushed.key);
    attempts--;
  } else {
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
    manImg.style.visibility = 'hidden';
  } else if (attempts > 0 && guessedWord !== secretWord) {
    outcome = null;
  } else {
    outcome = 'lose';
  }
}


function renderMsg() {
  msgEl.style.visibility = outcome === null ? 'hidden' : 'visible';
  msgEl.innerHTML = MSG_LOOKUP[outcome];
}

function renderControls() {
  playAgnBtn.style.visibility = outcome === null ? 'hidden' : 'visible';
}

function renderImg() {
  // manImg.src = IMAGES['man'];
}