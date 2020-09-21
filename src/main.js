var gameOne = new Game("1", "2")//example

//EVENT LISTENERS
window.addEventListener("keyup", checkUserKeyControl)


//FUNCTIONS
function checkUserKeyControl() {

  if (event.keyCode == gameOne.playerOne.keyDeal) {
    gameOne.takeTurn(gameOne.playerOne)
  }
  else if (event.keyCode == gameOne.playerTwo.keyDeal) {
    gameOne.takeTurn(gameOne.playerTwo)
  }

  if (event.keyCode == gameOne.playerOne.keySlap) {
    gameOne.slap(gameOne.playerOne)
  }
  else if (event.keyCode == gameOne.playerTwo.keySlap) {
    gameOne.slap(gameOne.playerTwo)
  }
}
