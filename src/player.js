class Player {
  constructor(id, wins, keyDeal, keySlap) {
    this.id = id
    this.wins = 0
    this.hand = []
    this.keyDeal = keyDeal
    this.keySlap = keySlap
  }

  playCard() {
    var lostCard = this.hand.splice(0, 1)
    return lostCard
  }
  saveToStorage() {

  }

}
