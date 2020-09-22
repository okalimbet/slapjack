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

  getTopMiddleDeckCard() {
    if(this.middleDeck === undefined || this.middleDeck.length == 0) {
      return cardImages[0]
    }
    else {
      return this.middleDeck[0].image
    }
  }

  initiateTheGame() {
    this.createDeck()
    this.shuffleDeck(this.cardsDeck)
    this.middleDeck = []
    this.getTopMiddleDeckCard()
    this.createPlayersDecks(this.playerOne, this.playerTwo)
    this.currentPlayer = this.playerOne
  }

  takeTurn(player) {
      if(player != this.currentPlayer) {
        return
      }
      if (this.middleDeck.length < 52 && player.hasCards()) {
        this.middleDeck.unshift(player.playCard()[0])
        this.switchPlayer(this.getOtherPlayer(player))
      }
      else if (this.middleDeck.length === 52 && !player.hasCards()) {
        this.getMiddleDeckCards(player)
      }
  }

  switchPlayer(otherPlayer) {
    if(otherPlayer.hasCards()) {
      this.currentPlayer = otherPlayer
    }
  }

  getMiddleDeckCards(currentPlayer) {
    currentPlayer.addCards(this.middleDeck)
    this.middleDeck = []
    this.playerOne.hasCards()
    this.playerTwo.hasCards()
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
    }
    else if (topCard === secondCard) {
      return true
    }
    else if (topCard === thirdCard) {
      return true
    }
    else {
      if(player.hasCards()) {
        otherPlayer.addCardToBottom(player.removeTopCard())
        return
      }
      else if (!player.hasCards()) {
        this.winTheGame(otherPlayer)
      }
    }
  }

  jackSlap(player) {
    var otherPlayer = this.getOtherPlayer(player)
    if(!otherPlayer.hasCards()) {
      this.winTheGame(player)
    }
    else {
      this.getMiddleDeckCards(player)
    }
  }

    checkTheSlapConditions (player) {
      if(this.slap(player)) {
        var otherPlayer = this.getOtherPlayer(player)
        if(!player.hasCards()) {
          this.winTheGame(otherPlayer)
        }
        else {
          this.getMiddleDeckCards(player)
        }
      }
    }

  winTheGame(player) {
    player.wins += 1
    player.saveToStorage(player)
    displayWinScore()
    this.initiateTheGame()
    displayPlayerCardsCount()
  }
}
