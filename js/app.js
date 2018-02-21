const box = document.querySelector('#box');
const refresh = document.querySelector('#refresh-game');

// Holds value of user selected cards
let selectedCards = [];

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

// Takes shuffled list as input and assigns to cards
function dealCards(newDeck) {
  const cardsList = box.querySelectorAll('li');
  for(let i = 0; i < cardsList.length; i++) {
    const cardAssign = cardsList[i].querySelector('.back');
    cardAssign.textContent = newDeck[i];
  }
}

// Randomize the items in an array and append to page
function newGame() {
  // Randomize array (aka: shuffle deck)
  const newDeck = deck.sort(function() { return 0.5 - Math.random() });
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //
  // TODO: UNCOMMENT THE DEALCARDS() FUNCTION BELOW WHEN DONE TESTING!!!
  // dealCards(newDeck);
  //
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

// Run newGame function when page loads
newGame();
// Run newGame function when refresh button clicked
refresh.addEventListener('click', newGame);


function isPair() {
  if(selectedCards[1].textContent === selectedCards[3].textContent) {
    return true;
  } else {
    return false;
  }
}

function isMatch() {
  selectedCards[1].style.backgroundColor = 'green';
  selectedCards[3].style.backgroundColor = 'green';
  selectedCards = [];
  console.log(selectedCards = []);
}

function noMatch() {
  // selectedCards[1].style.backgroundColor = 'red';
  // selectedCards[3].style.backgroundColor = 'red';


    selectedCards[0].style.visibility = "visible";
    selectedCards[1].style.visibility = "hidden";
    selectedCards[2].style.visibility = "visible";
    selectedCards[3].style.visibility = "hidden";


  selectedCards = [];
  console.log(selectedCards = []);

}

function flipCard(hide, show) {
  hide.style.visibility = "hidden";
  show.style.visibility = "visible";
}

function checkCard(event) {
  if(event.target.classList.contains('front')) {
    const cardFront = event.target;
    const cardBack = event.target.nextElementSibling;
    console.log(cardBack);

    flipCard(cardFront, cardBack);
    selectedCards.push(cardFront);
    selectedCards.push(cardBack);
    console.log(selectedCards);
    if(selectedCards.length === 4) {
      const result = isPair();
      if(result === true) {
        isMatch();
      } else {
        noMatch();
      }
    }
  }
}

    /*
      User clicks card
      First card is recorded to an array
      User clicks second card
      Second card is recorded to an array
      If array length is === 2,
            Compare card textContent.
            If the same, go green and clear array value.
            If different, flip cards back over, and clear array value.


    */



/*
- user clicks card
- get card clicked
- add card clicked to array

I want a function that gets the card clicked when user clicks it and adds it to an array.

If array length to === 2, then compare cards



*/










// Set up an event listener on each card
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
        - Run isPair function that records 1st and 2nd card and looks for pair
              - If card is the 1st card flipped, store image name.
              - Else if card is second card flipped, compare image name to first image name.
                    - If match, perform action.
                    - Else, flip both cards back over.
  - If all cards are flipped over, display winning screen

*/
