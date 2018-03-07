const box = document.querySelector('#box');
const refresh = document.querySelector('#refresh');
const timer = document.querySelector('#timer');
const starRating = document.querySelector('#star-rating');
const moves = document.querySelector('#moves');
const resultAlert = document.querySelector('#result-alert');
const legoFace = document.querySelector('#lego-face');
const resultIntro = document.querySelector('#result-intro');
const resultHeader = document.querySelector('#result-header');
const scoreMoves = document.querySelector('#score-moves');
const scoreStars = document.querySelector('#score-stars');
const scoreTime = document.querySelector('#score-time');
const retryButton = document.querySelector('#retry-button');
const restart = document.querySelector('#restart');
let timeCounter;  // Counts time in seconds
let timeSinceStart = 0;  // Time since first card clicked
let totalCardsClicked = 0;  // Tracks number of cards clicked
let selectedCards = [];  // Holds value of user selected cards
let totalPairs = 0;  // Tracks number of pairs for game completion

// Create an array that holds images.
let deck = [
  'zebra',
  'zebra',
  'elephant',
  'elephant',
  'lion',
  'lion',
  'cheetah',
  'cheetah',
  'giraffe',
  'giraffe',
  'rhino',
  'rhino',
  'warthog',
  'warthog',
  'ostrich',
  'ostrich'
];

// Take shuffled list as input and append to card backs
function dealCards(newDeck) {
  const cardsList = box.querySelectorAll('li');
  for(let i = 0; i < cardsList.length; i++) {
    const animalAssign = newDeck[i];
    const cardAssign = cardsList[i].querySelector('.back');
    cardAssign.textContent = animalAssign;
  }
}

// Ensure card backs are hidden for each new game
function resetCards() {
  const allCardFronts = box.querySelectorAll('li div.front');
  allCardFronts.forEach(function(card) {
    card.style.visibility = 'visible';
  });
  const allCardBacks = box.querySelectorAll('li div.back');
  allCardBacks.forEach(function(card) {
    card.style.visibility = 'hidden';
    changeBackgroundColor(card, '#74b9ff');
  });
}

// Refresh all game elements
function newGame() {
  resetCards();
  resultAlert.style.visibility = 'hidden';
  // Randomize array (aka: shuffle deck)
  const newDeck = deck.sort(function() { return 0.5 - Math.random(); });
  dealCards(newDeck);
  totalPairs = 0;
  totalCardsClicked = 0;
  timeSinceStart = 0;
  timer.textContent = 0;
  moves.textContent = 0;
  starRating.textContent = '★ ★ ★';
  clearInterval(timeCounter);
  return newDeck;
}

// Display winning overlay
function youWin() {
  clearInterval(timeCounter);
  legoFace.setAttribute('src', 'images/lego-happy.png');
  resultIntro.textContent = 'Congrautulations...';
  resultHeader.textContent = 'You won!';
  scoreStars.textContent = starRating.textContent;
  scoreMoves.textContent = totalCardsClicked;
  scoreTime.textContent = timeSinceStart;
  retryButton.textContent = 'Try to beat your score!';
  resultAlert.style.visibility = 'visible';
}

// Display losing overlay
function youLose() {
  clearInterval(timeCounter);
  legoFace.setAttribute('src', 'images/lego-sad.png');
  resultIntro.textContent = 'Things were going so well, but...';
  resultHeader.textContent = 'Game over';
  scoreMoves.innerHTML = totalCardsClicked + '</br></br><strong><em>All matches must be made in less than 40 moves!</em></strong>';
  scoreTime.textContent = timeSinceStart;
  retryButton.textContent = 'Try again';
  resultAlert.style.visibility = 'visible';
}

// Compare card backs and returns boolean
function compareCards() {
  if(selectedCards[1].textContent === selectedCards[3].textContent) {
    return true;
  } else {
    return false;
  }
}

// Take card and color as input and sets background color for card
function changeBackgroundColor(card, color) {
  card.style.backgroundColor = color;
}

// Display matching cards
function isMatch() {
  const allPairs = 8;
  changeBackgroundColor(selectedCards[1], '#00b894');
  changeBackgroundColor(selectedCards[3], '#00b894');
  selectedCards = [];
  totalPairs++;
  if(totalPairs === allPairs) {
    youWin();
  }
}

// Reset cards not matching
function noMatch() {
  // Prevent more clicks until cards are turned back over
  box.removeEventListener('click', checkCard);
  changeBackgroundColor(selectedCards[1], '#e17055');
  changeBackgroundColor(selectedCards[3], '#e17055');
  // Allow user time to view non-matching cards before card reset
  setTimeout(function resetCards() {
    flipCard(selectedCards[1], selectedCards[0]);
    flipCard(selectedCards[3], selectedCards[2]);
    changeBackgroundColor(selectedCards[1], '#74b9ff');
    changeBackgroundColor(selectedCards[3], '#74b9ff');
    selectedCards = [];
    box.addEventListener('click', checkCard);
  }, 650);
}

// Take two cards as input and hide/show them directed
function flipCard(hide, show) {
  hide.style.visibility = 'hidden';
  show.style.visibility = 'visible';
}

// Track number of card clicks
function cardClicked() {
    totalCardsClicked++;
    moves.textContent = totalCardsClicked;
  // Start timer
  if(totalCardsClicked === 1) {
    timeCounter = setInterval(function addSecond() {
      timeSinceStart++;
      timer.textContent = timeSinceStart;
    }, 1000);
  }
  if(totalCardsClicked === 40) {
    // Game over if 40 moves
    youLose();
  } else if(totalCardsClicked >= 36) {
    // One star rating if 36 or more moves
    starRating.textContent = '★ ☆ ☆';
  } else if(totalCardsClicked >= 28) {
    // Two star rating if 28 or more moves
    starRating.textContent = '★ ★ ☆';
  } else {
    // Three star rating if less than 28 moves
    starRating.textContent = '★ ★ ★';
  }
}

// Record card clicked and look for matches
function checkCard(event) {
  if(event.target.classList.contains('front')) {
    const cardFront = event.target;
    const cardBack = event.target.nextElementSibling;
    cardClicked();
    flipCard(cardFront, cardBack);
    selectedCards.push(cardFront);
    selectedCards.push(cardBack);
    // Run compareCard function if two cards selected
    if(selectedCards.length === 4) {
      const result = compareCards();
      if(result === true) {
        isMatch();
      } else {
        noMatch();
      }
    }
  }
}

newGame();

refresh.addEventListener('click', newGame);
restart.addEventListener('click', newGame);

// Set event listener on each card
box.addEventListener('click', checkCard);



/*
  x Create an array that holds images.
  x Create a newGame function that:
        x Randomize array (aka: shuffle deck)
        x Uses shuffled deck to build out new LI elements in HTML
        x For each (for each loop) item in that array, create a card and append it to  the UL in the DOM.
  x Run newGame function when page loads.
  x Run newGame function when refresh button clicked.
  x Set up an event listener on each card.
        x When clicked, card should flip over.
        x Run compareCards function that records 1st and 2nd card and looks for pair
              x If card is the 1st card flipped, store image name.
              x Else if card is second card flipped, compare image name to first image name.
                    x If match, perform action.
                    x Else, flip both cards back over.
  x If all cards are flipped over, display winning screen
  x Build timer
  x Build move counter
  x Build star rating system

TODO: NEXT ITERATION OF GAME

  - Animate card flip
  - Swap text on card backs for photos
  - Track and display number of wrong guesses
  - Track and display % of guesses right
  - Give point system (both stars and points)

  FOR NEXT ITERATION OF GAME, USE PHOTOS INSTEAD OF TEXT
  let deck = [
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/elephant.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/elephant.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727598/memory/zebra.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727598/memory/zebra.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/hyena.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/hyena.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727594/memory/ostrich.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727594/memory/ostrich.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/baboon.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/baboon.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/giraffe.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727595/memory/giraffe.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727596/memory/peacock.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727596/memory/peacock.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727594/memory/warthog.jpg',
    'http://res.cloudinary.com/dtqevfsxh/v1519727594/memory/warthog.jpg'
  ];

*/
