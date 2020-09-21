class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = new Player(playerOne, 0, 81, 70)
    this.playerTwo = new Player(playerTwo, 0, 80, 74)
    this.cardsDeck = []
    this.middleDeck = []
    this.currentPlayer = null
  }

  createDeck() {
    var suits = ['blue', 'gold', 'green', 'red']
    var images = cardImages.slice(2, cardImages.length)
    var ranks = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'jack', 'queen', 'king']
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    for(var i = 0; i < suits.length; i++) {

       for(var j = 0; j < ranks.length; j++) {
         this.cardsDeck.push(new Card(suits[i], images[0], ranks[j], values[j]))
         images.splice(0, 1)
       }
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
    this.currentPlayer = this.playerOne
  }

  takeTurn(player) {
      if(player != this.currentPlayer) {
        return
      }
      this.middleDeck.push(player.playCard())
      this.currentPlayer = this.currentPlayer == this.playerOne ? this.playerTwo : this.playerOne
  }

  slap(player) {
    console.log(event.keyCode)
  }
}
