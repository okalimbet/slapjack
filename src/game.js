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
    var length = this.cardsDeck.length
    leftPlayer.clearHands()
    rightPlayer.clearHands()
    for (var i = 0; i < length; i++) {
      if (i % 2 === 0) {
        leftPlayer.addCard(this.cardsDeck[i])
      }
      else {
        rightPlayer.addCard(this.cardsDeck[i])
      }
    }
    this.cardsDeck = []
  }

  initiateTheGame() {
    this.createDeck()
    this.shuffleDeck(this.cardsDeck)
    this.middleDeck = []
    this.createPlayersDecks(this.playerOne, this.playerTwo)
    this.currentPlayer = this.playerOne
  }

  takeTurn(player) {
      if(player != this.currentPlayer) {
        return
      }
      this.middleDeck.unshift(player.playCard()[0])
      this.currentPlayer = this.currentPlayer == this.playerOne ? this.playerTwo : this.playerOne
  }

  getMiddleDeckCards(currentPlayer) {
    currentPlayer.addCards(this.middleDeck)
    this.middleDeck = []
    this.playerOne.checkIsOutOfCards()
    this.playerTwo.checkIsOutOfCards()
  }

  getOtherPlayer(otherPlayer) {
    return otherPlayer == this.playerOne ? this.playerTwo : this.playerOne
  }

  slap(player) {

    var topCard = (this.middleDeck.length > 0) ? this.middleDeck[0].rank : null
    var secondCard = (this.middleDeck.length > 1) ? this.middleDeck[1].rank : null
    var thirdCard = (this.middleDeck.length > 2) ? this.middleDeck[2].rank : null
    var otherPlayer = this.getOtherPlayer(player)

    if(topCard === 'jack') {
      this.jackSlap(player)
      return
    }
    else if (topCard === secondCard) {
      this.getMiddleDeckCards(player)
      return
    }
    else if (topCard === thirdCard) {
      this.getMiddleDeckCards(player)
      return
    }
    else {
      otherPlayer.addCardToBottom(player.removeTopCard())
    }
  }

  jackSlap(player) {
    var otherPlayer = this.getOtherPlayer(player)
    if(otherPlayer.outOfCards == true) {
      player.wins += 1
      this.initiateTheGame()
    }
    else {
      this.getMiddleDeckCards(player.removeTopCard)
    }
  }
}
