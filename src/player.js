class Player {
  constructor(id, wins, keyDeal, keySlap) {
    this.id = id
    this.wins = 0
    this.hand = []
    this.keyDeal = keyDeal
    this.keySlap = keySlap
    this.cardsLeft = 0
  }

  showPlayersCards() {
    this.cardsLeft = this.hand.length
    return this.cardsLeft
  }

  hasCards() {
    return this.hand.length > 0
  }

  playCard() {
    if(this.hand.length > 0) {
      var lostCard = this.hand.splice(0, 1)
      return lostCard
    }
    return
  }

  addCard(card) {
    this.hand.unshift(card)
  }

  addCards(cards) {
    this.hand = this.hand.concat(cards)
    this.shuffleDeck()
  }

  removeTopCard() {
    var card = this.hand.splice(0, 1)[0]
    return card
  }

  addCardToBottom(card) {
    this.hand.push(card)
  }

  clearHands() {
    this.hand = []
  }

  shuffleDeck() {
    for (var i = this.hand.length-1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * i)
      var index = this.hand[i]
      this.hand[i] = this.hand[randomIndex]
      this.hand[randomIndex] = index
    }
  }

  saveToStorage(player) {
    var playerWinCount = {
      player: player.id,
      score: player.wins
    }
    var stringifiedPlayerScore = JSON.stringify(playerWinCount)
    localStorage.setItem(`${player.id}`, stringifiedPlayerScore)
  }
}
