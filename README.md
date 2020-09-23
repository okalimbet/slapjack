
---
# SlapJack - a simple card game to have a good time!
<img width="1047" alt="Screen Shot 2020-09-22 at 7 49 48 PM" src="https://user-images.githubusercontent.com/66269306/93955401-e6b0c200-fd0c-11ea-8e59-d9900ed77c77.png">

---
## Table of Contents
* [Introduction](#introduction)
* [Project Overview](#project-overview)
* [How To Play](#how-to-play)
* [Roadmap](#roadmap)
* [Contributors](#contributors)

## Introduction
**SlapJack** game is a project that aims to display developer skills of Turing students by the end of module 1. The project demonstrates the understanding of DRY and SRP rules for JavaScript, localStorage, understanding of Data Model, manipulating the DOM, and problem-solving skills.

The site lets users to play SlapJack with a friend. It allows to start a new game, keep and clear players' score.

## Project Overview
* [Challenges And Wins](#challenges-and-wins)
* [Build With](#build-with)

#### Challenges And Wins
The biggest challenge was to be able to plan the project without provided iterations. However, splitting the game into small parts with assigned deadlines solves the problem and helps to stay on the right track.
Another challenge was understanding the mechanic of the game and consider all possible scenarios which affected the workflow and many features that would make the game more user friendly were being postponed until the next update.

One of the biggest wins was understanding the Data Model and how efficiently separate data from DOM logic. It is still in progress, but there was a huge step in understanding the process: why do we need to separate it.
Another win was applying all the knowledge into this project and being able to figure out the logic behind the game mechanic and make it work.  

#### Build With

* **JavaScript**
* **HTML**
* **CSS**

## How to Play
* [Object Of The Game](#object-of-the-game)
* [Controls](#controls)
* [Rules](#rules)
* [Reset The Game](#reset-the-game)

#### Object Of The Game
The goal is to gather all the cards by being first to slap each jack, double, or sandwich.

<details>
  <summary>**Under the Hood**</summary>

A database of assets for the cards (images) was provided at outset of the project. Upon page load, a page shows the default clean game with players having a deck of 26 cards. The score for both players is zero. There are two buttons `RESTART` and `CLEAR SCORE`. `RESTART` starts a new game but doesn't clean the score. `CLEAR SCORE` resets the players' score.
</details>

#### Controls
The game is made for two players.

Player 1:
`"q" to deal`
`"f" to slap`

Player 2:
`"p" to deal`
`"j" to slap`

`RESTART` - starts a new game
`CLEAN SCORE` - removes saved score


<details>
  <summary>**Under the Hood**</summary>

Key binds are automatically assigned to players from the beginning when the new game instance is created:

`q`: key 81
`f`: key 70
`p`: key 80
`j`: key 74

```
class Game {
  constructor(playerOne, playerTwo) {
    this.playerOne = new Player(playerOne, 0, 81, 70)
    this.playerTwo = new Player(playerTwo, 0, 80, 74)
    ...
  }
  ...
}
```
`RESTART` button as relaoding the page calls function `startTheGame` that creates a new instance of the game class by using the game class methods:

    ```
    gameInstance.initiateTheGame()

    initiateTheGame() {
    this.createDeck()
    this.shuffleDeck(this.cardsDeck)
    this.middleDeck = []
    this.getTopMiddleDeckCard()
    this.createPlayersDecks(this.playerOne, this.playerTwo)
    this.currentPlayer = this.playerOne
    }
    ```

`CLEAR SCORE` button calls the `resetWinScores` function which bring scores to zero allowing users to start from the beginning.

Example of CLEAR SCORE button in action

![Clearing the score](https://media.giphy.com/media/QqaEdIbMpiAvUoSwXU/giphy.gif)

</details>

#### Rules
By default, the Player 1 (left) gets to go first. Players alternate turns playing cards face-up into the central pile. Any player can slap anytime with the following outcomes:

* Player slaps JACK, the entire middle deck goes to the player's hand and gets shuffled.
* Player slaps DOUBLE, the entire middle deck goes to the player's hand and gets shuffled.
* Player slaps SANDWICH, the entire middle deck goes to the player's hand and gets shuffled.
* Player slaps any other combination of cards, this player loses the card on top of their hand and it is added to the bottom of their opponent’s hand

When one player loses all cards, this player has the last chance to come back to the game. The opponent starts dealing cards in a row and if the player slaps JACK, this player takes the middle deck and the game continues. If the player slaps anything else (including DOUBLE and SANDWICH) the game ends, their opponent wins. The game also ends if the opponent slaps JACK first.

Players can click `Rules` button to review controls and rules.

![Simple gameplay sample](https://media.giphy.com/media/r6RFFhOxkYGNCKf0GP/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>

 The project includes four seperate .js files:
    `player.js`,
    `game.js`,
    `card.js`,
    `main.js`.

`player.js` contains class Player which is responsible for methods and properties that are directly related to players.

`game.js` contains properties and methods that are in control of gameplay.

`card.js` is a card class with all informaoin we need for cards

`main.js` is responsible for using returned values from the classes above and displaying it on the website
</details>

#### Reset The Game
To reset the game, players can press the RESTART button or reload the page. To reset the score, players have to use the CLEAR SCORE button *It is important to note that the RESTART button doesn't reset the score however*

![Resetting the game](https://media.giphy.com/media/gFuwMLCRKZ4N2VTSJP/giphy.gif)

<details>
  <summary>**Under the Hood**</summary>

Function `saveToStorage()` in a `player.js` is only responsible for savind player's score data to the storage

 ```
 saveToStorage(player) {
    var playerWinCount = {
      player: player.id,
      score: player.wins
    }
    var stringifiedPlayerScore = JSON.stringify(playerWinCount)
    localStorage.setItem(`${player.id}`, stringifiedPlayerScore)
  }
 ```
 `CLEAR SCORE` button is assigned to the event listener in `main.js` which uses `getScoreFromStorage()` and `displayWinScore()` functions to get information from the storage and display it on the website. To keep the score for players on reload and restart, `displayWinScore()` also transfers each player's score to both player instances.
</details>

## Roadmap
* In the next iteration, we hope to add:
 * Save the games to continue them in the future
 * Opportunity for players to create nicknames
 * Possibility for players to stylize the game by choosing their colors and changing the background.

## Contributors

<img src="https://avatars0.githubusercontent.com/u/66269306?s=400&u=b59f8ccc1002269319d952aa028ee270629b2ead&v=4" alt="Coding Mermaid"
 width="150" height="auto" />\
**Olga Morgan**
[GitHub Profile](https://github.com/scripka)
