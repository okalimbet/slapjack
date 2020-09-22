var playerOneCount = document.querySelector("#player-one-count")
var playerTwoCount = document.querySelector("#player-two-count")
var middleDeckCardImg = document.querySelector("#middle-deck-card")
var playerOneWinCount = document.querySelector("#player-one-win")
var playerOneWinCount = document.querySelector("#player-one-win")
var middleDeck = document.querySelector("#middle-deck")
var playerOneDeck = document.querySelector("#player-one")
var playerTwoDeck = document.querySelector("#player-two")
var startGameButton = document.querySelector("#start-game-button")

var middleCardDeck = document.querySelector("#middle-card .card" )

var gameInstance
var topMiddleDeckCard

var winCount

//EVENT LISTENERS
window.addEventListener("keyup", checkUserKeyControl)
startGameButton.addEventListener("click",  startTheGame)
window.addEventListener("load", hideDeckIfNoCards(middleDeck))

//FUNCTIONS
function startTheGame(playerOneName, playerTwoName) {
  gameInstance = new Game("Player 1", "Player 2")
  gameInstance.initiateTheGame()
}

function checkUserKeyControl() {
  if(!gameInstance) {
    return
  }
  if (event.keyCode == gameInstance.playerOne.keyDeal) {
    gameInstance.takeTurn(gameInstance.playerOne)
    highlightPlayerTurn()
  }
  else if (event.keyCode == gameInstance.playerTwo.keyDeal) {
    gameInstance.takeTurn(gameInstance.playerTwo)
    highlightPlayerTurn()
  }
  if (event.keyCode == gameInstance.playerOne.keySlap) {
    gameInstance.slap(gameInstance.playerOne)
    highlightPlayerTurn()
  }
  else if (event.keyCode == gameInstance.playerTwo.keySlap) {
    gameInstance.slap(gameInstance.playerTwo)
    highlightPlayerTurn()
  }
  displayMiddleDeckCard()
  displayPlayerCounts()
  removePlayersDeck()
}

function highlightPlayerTurn() {
  if(gameInstance.currentPlayer !== gameInstance.playerOne) {
    middleCardDeck.classList.remove("right-player-color")
    middleCardDeck.classList.add("left-player-color")
  }
  else if (gameInstance.currentPlayer !== gameInstance.playerTwo) {
    middleCardDeck.classList.remove("left-player-color")
    middleCardDeck.classList.add("right-player-color")
  }
}

function displayPlayerCounts() {
  playerOneCount.innerText = `Cards: ${gameInstance.playerOne.showPlayersCards()}`
  playerTwoCount.innerText = `Cards: ${gameInstance.playerTwo.showPlayersCards()}`
}

function removePlayersDeck() {
  if(gameInstance.playerOne.cardsLeft === 0) {
    hideDeckIfNoCards(playerOneDeck)
  }
  else {
    unhideDeckIfNoCards(playerOneDeck)
  }
  if (gameInstance.playerTwo.cardsLeft === 0) {
    hideDeckIfNoCards(playerTwoDeck)
  }
  else {
    unhideDeckIfNoCards(playerTwoDeck)
  }
}

function displayMiddleDeckCard() {
  topMiddleDeckCard = gameInstance.getTopMiddleDeckCard()

  if(topMiddleDeckCard === cardImages[0]) {
    hideDeckIfNoCards(middleDeck)
    middleDeckCardImg.src = topMiddleDeckCard
  }
  else {
    middleDeckCardImg.src = topMiddleDeckCard
    unhideDeckIfNoCards(middleDeck)
  }
}

function unhideDeckIfNoCards(deck) {
    deck.classList.remove("hidden")
}

function hideDeckIfNoCards(deck) {
    deck.classList.add("hidden")
}
