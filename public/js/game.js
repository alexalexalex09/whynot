//Globals
var DECK, TURN;
//PLAYER_ARRAY is an array of Player objects accessible by array location
const PLAYER_ARRAY = getPlayerArray();
//Player Object
/*
Player.hand
Player.table
Player.name
*/

//The user sets up how many players, rule variants, etc.
setupPlayArea();
//Set up the game based on number of players, put players in their seats, put aces in front of them
setupGame();
//Set up deck
DECK = initDeck();
//Shuffle the deck
DECK = shuffleCards(DECK);
//Deal cards
dealCards(7 * PLAYER_ARRAY.length, 0, "hand");
//Assign turn to player 1;
setTurn(1);

//When a player starts a click on a card in their hand
function onHandMouseDown(card, currentPlayer) {
  if (!isActivePlayer(currentPlayer)) {
    wrongCard(card, currentPlayer, "Not your turn!");
  } else {
    //If the card isn't playable, stop
    if (!getPlayable(card, currentPlayer)) {
      wrongCard(card, currentPlayer, "Can't play this card");
    }
    //Set the current card to be "playing" so that the player can click where it goes next
    setPlayingCard(card, currentPlayer);
  }
}

//When a player releases their mouse on a space on the board
function onBoardMouseUp(space, currentPlayer) {
  const playingCard = getPlayingCard();
  if (!playingCard) {
    //If there is no card, mouse release doesn't need to be tracked
    wrongSpace(space, currentPlayer, "A card has not been selected");
  } else {
    //If the card isn't a valid play, error
    if (!isValidPlay(space, playingCard)) {
      wrongSpace(space, currentPlayer, "This card can't be played here");
    } else {
      //Play the card (TODO: and evaluate for win condition)
      playCard(space, playingCard);
      if (hasWon(currentPlayer)) {
        win(currentPlayer);
      } else {
        nextTurn(currentPlayer);
      }
    }
  }
}

//When the player decides to "Why Not"
function whyNot(currentPlayer) {
  animateHandValue();
  const handValue = getHandValue(currentPlayer);
  drawCards(1, currentPlayer, "table");
  const tableValue = getTableValue(currentPlayer);
  if (tableValue > handValue) {
    //if the value of the card on the table is larger than the
    //value of the player's hand, the current player wins
    win(currentPlayer);
  } else {
    //otherwise, continue drawing until a number of cards is drawn
    //equal to the value of the previously drawn card
    drawCards(tableValue - 1, currentPlayer, "hand");
    //Then, pick up the initally drawn card
    pickUpTableCards(currentPlayer);
  }
  //Turn is over
  nextTurn(currentPlayer);
}

//Deal cards
function dealCards(numCards, startPlayer, destination) {
  //Get the cards from the top of the deck
  const cardsToDeal = DECK.splice(0, numCards);
  //Set the current player being dealt to
  let dealingTo = startPlayer;
  //As long as there are cards left to deal, deal one out
  while (cardsToDeal.length > 0) {
    //Get the top card from the cards to deal
    let cardToDeal = cardsToDeal.splice(0, 1);
    //Deal the card to the player's hand or the table in front of them
    if (destination === "hand") {
      dealingTo.hand.push(cardToDeal);
    } else {
      dealingTo.table.push(cardToDeal);
    }
    //Increment the player to be dealt to
    dealingTo++;
    //If there are no more players, wrap around to the beginning
    if (dealingTo > players.length) {
      dealingTo = 0;
    }
  }
}

function drawCards(numCards, player, destination) {}

function setupPlayArea() {}

function setupGame() {}

function getPlayerArray() {}

function initDeck() {}

function shuffleCards(deck) {}

function setTurn(player) {
  TURN = player;
}

function isActivePlayer(player) {}

function wrongCard(card, player, message) {}

function getPlayable(card, player) {}

function setPlayingCard(card, player) {}

function getPlayingCard() {}

function wrongSpace(space, player, message) {}

function isValidPlay(space, playingCard) {
  const currentCard = getCurrentCard(space);
  return nextCard(currentCard) !== playingCard;
}

function playCard(space, card) {}

function hasWon(player) {}

function win(player) {}

function nextTurn(player) {}
