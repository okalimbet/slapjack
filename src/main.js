var playerOneWinCount = document.querySelector("#player-one-win")
var playerTwoWinCount = document.querySelector("#player-two-win")
var middleDeck = document.querySelector("#middle-deck")

var startGameButton = document.querySelector("#start-game-button")
var clearButton = document.querySelector("#clear-game-button")

var gameInstance
var topMiddleDeckCard
var parsedPlayersScore = []

//EVENT LISTENERS
window.addEventListener("keyup", checkUserKeyControl)
window.addEventListener("load", function() {
  startTheGame("playerOne", "playerTwo")
})
startGameButton.addEventListener("click",  startTheGame)
clearButton.addEventListener("click", resetWinScores)

//FUNCTIONS
function startTheGame(playerOneName, playerTwoName) {
  gameInstance = new Game(playerOneName, playerTwoName)
  gameInstance.initiateTheGame()
  hideDeckIfNoCards(middleDeck)
  displayWinScore()
  displayPlayerCardsCount()
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
    gameInstance.checkTheSlapConditions (gameInstance.playerOne)
    highlightPlayerTurn()
  }
  else if (event.keyCode == gameInstance.playerTwo.keySlap) {
    gameInstance.checkTheSlapConditions (gameInstance.playerTwo)
    highlightPlayerTurn()
  }

  displayMiddleDeckCard()
  displayPlayerCardsCount()
  displayPlayersDeck()
}

function highlightPlayerTurn() {
  var middleCardDeck = document.querySelector("#middle-card .card" )
  if(gameInstance.currentPlayer == gameInstance.playerOne) {
    middleCardDeck.classList.remove("right-player-color")
    middleCardDeck.classList.add("left-player-color")
  }
  else if (gameInstance.currentPlayer == gameInstance.playerTwo) {
    middleCardDeck.classList.remove("left-player-color")
    middleCardDeck.classList.add("right-player-color")
  }
}

function displayPlayerCardsCount() {
  var playerOneCount = document.querySelector("#player-one-count")
  var playerTwoCount = document.querySelector("#player-two-count")
  playerOneCount.innerText = `Cards: ${gameInstance.playerOne.showPlayersCards()}`
  playerTwoCount.innerText = `Cards: ${gameInstance.playerTwo.showPlayersCards()}`
}

function displayPlayersDeck() {
  var playerOneDeck = document.querySelector("#player-one")
  var playerTwoDeck = document.querySelector("#player-two")
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

function getScoreFromStorage() {
  var scores = Object.values(localStorage)
  for (var i = 0; i < scores.length; i++) {
      var savedScore = scores[i];
      parsedPlayersScore.push(JSON.parse(savedScore))
  }
}

function displayWinScore() {
  if(localStorage.length === 0) {
    playerOneWinCount.innerText = `WINS: 0`
    playerTwoWinCount.innerText = `WINS: 0`
    return;
  }
  else {
    getScoreFromStorage()
    for (var i = 0; i < parsedPlayersScore.length; i++) {
      var newScore = parsedPlayersScore[i]

      if(newScore.player === "playerOne") {
        gameInstance.playerOne.wins = newScore.score
        playerOneWinCount.innerText = `WINS: ${newScore.score}`
      }
      else if(newScore.player === "playerTwo") {
        gameInstance.playerTwo.wins = newScore.score
        playerTwoWinCount.innerText = `WINS: ${newScore.score}`
      }
      else {
        return
      }
    }
  }
}

function displayMiddleDeckCard() {

  var middleDeckCardImg = document.querySelector("#middle-deck-card")
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

function resetWinScores() {
  localStorage.clear()
  gameInstance.playerOne.clearScore()
  gameInstance.playerTwo.clearScore()
  displayWinScore()
}
