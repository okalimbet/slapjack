class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = new Player(playerOne, 0)
    this.playerTwo = new Player(playerTwo, 0)
    this.cardsDeck = []
  }
  
  createDeck() {
    for (var i = 2; i < cardImages.length; i++) {
      var cardItem = cardImages[i]
      this.cardsDeck.push(cardItem)
    }
  }

  shuffleDeck(deck) {
    for (var i = deck.length-1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * i)
      var index = deck[i]
      deck[i] = deck[randomIndex]
      deck[randomIndex] = index
    }
  }

  createPlayersDecks(leftPlayer, rightPlayer) {
    var twoPlayerDecks = [leftPlayer.hand, rightPlayer.hand]
    for (var i = 0; i < twoPlayerDecks.length; i++) {
      var firstPlayer = twoPlayerDecks[i]
      for (var k = this.cardsDeck.length-1; k >=0; k--) {
        var dealingCard = this.cardsDeck[k]
          if(firstPlayer.length < 26) {
          firstPlayer.push(this.cardsDeck[k])
          this.cardsDeck.splice(k, 1)
        }
      }
    }
  }

  initiateTheGame() {
    this.createDeck()
    this.shuffleDeck(this.cardsDeck)
    this.createPlayersDecks(this.playerOne, this.playerTwo)

  }
}
