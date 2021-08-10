// Global Variables
var gameMode = "default";
var playerName = [];
var dealerHand = [];
var player1Hand = [];
var player2Hand = [];
var player1Points = 100;
var player2Points = 100;
var drawCount = 2;

// Helper Function: Create a standard deck of playing cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var power = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
        power = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        power = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        power = 10;
      } else if (cardName == 13) {
        cardName = "king";
        power = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        power: power,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  console.log(cardDeck);
  return cardDeck;
};

// Helper Function: Get a random index ranging from 0 to max to be used in 'shuffleCards'
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Helper Function: Shuffle cards grenerated in 'makeDeck'
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Helper Function: Save player names into playerName array
var savePlayerName = function (input) {
  playerName.push(input);
  console.log(playerName);
};

// Helper Function: Calculate total sum of cards in hand
var calcSumOfCardsInHand = function (aHand) {
  var runningSum = 0;
  var counter = 0;
  // iterate through the array
  while (counter < aHand.length) {
    // for each element in the array, get the element.rank and add it to the running sum.
    runningSum = runningSum + aHand[counter].power;
    counter += 1;
  }
  return runningSum;
};

var cardDisplay = function (playerHand) {
  var counter = 0;
  var tellHand = "";
  while (counter < playerHand.length) {
    var tellHand =
      tellHand +
      "[" +
      player1Hand[counter].name +
      " of " +
      player1Hand[counter].suit +
      "]<br>";
    counter += 1;
  }
  return tellHand;
};

var handReset = function (playerHand) {
  drawCount = 2;
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
};

var dealer = function (DECK) {
  var drawCardDealer = 0;

  while (drawCardDealer < 2) {
    dealerHand.push(DECK.pop());
    drawCardDealer += 1;
    console.log(dealerHand);
  }

  var dealerFinalRank = calcSumOfCardsInHand(dealerHand);
  var dealerDrawCount = 2;
  while (dealerFinalRank < 16 && dealerDrawCount < 5) {
    dealerHand.push(DECK.pop());
    dealerDrawCount += 1;
    dealerFinalRank = calcSumOfCardsInHand(dealerHand);
  }

  // dealerFinalRank = calcSumOfCardsInHand(dealerHand);
  console.log(dealerFinalRank);
  console.log(dealerHand);
};

// Main Function: Blackjack
var main = function (input) {
  // Generate deck and shuffle it
  var DECK = shuffleCards(makeDeck());

  dealer(DECK);

  // [Player 1] welcome message, change mode to player 1
  if (gameMode == "default") {
    var myOutputValue =
      "Welcome to Blackjack! <br><br> You are Player 1, please enter your name and hit submit.";
    gameMode = "player1Name";
    return myOutputValue;
  }

  // [Player 1] save name, draw 2 cards, output cards drawn, change mode
  if (gameMode == "player1Name") {
    if (input == "") {
      var myOutputValue =
        "You are Player 1, please enter your name and hit submit.";
      return myOutputValue;
    } else {
      savePlayerName(input);
      gameMode = "player1";
    }
  }

  if (gameMode == "player1") {
    var drawCardP1 = 0;

    while (drawCardP1 < 2) {
      player1Hand.push(DECK.pop());
      drawCardP1 += 1;
      console.log(player1Hand);
    }

    myOutputValue =
      playerName[0] +
      "<br><br> You Drew: <br><br>" +
      cardDisplay(player1Hand) +
      "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";

    gameMode = "player1Choice";

    return myOutputValue;
  }

  // [Player 1] draws first extra card, option to draw another or end turn
  if (gameMode == "player1Choice") {
    if (input == "1" && drawCount == 2) {
      player1Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player1Hand);
      myOutputValue =
        playerName[0] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player1Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 1] draws second extra card, option to draw another or end turn
    if (input == "1" && drawCount == 3) {
      player1Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player1Hand);
      myOutputValue =
        playerName[0] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player1Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 1] draws last extra card and ends turn
    if (input == "1" && drawCount == 4) {
      player1Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player1Hand);
      myOutputValue =
        playerName[0] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player1Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 1] prevent exceeding card draw limit and ends turn
    if (input == "1" && drawCount == 5) {
      myOutputValue =
        playerName[0] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player1Hand) +
        "<br><br> You have hit the draw limit of 5 cards, hit submit to proceed";

      gameMode = "default2";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 1] ends turn
    if (input == "2") {
      myOutputValue = "You have ended your turn, hit submit to proceed";
      gameMode = "default2";
      return myOutputValue;
    }
  }

  // [Player 2] welcome message, change mode to player 2
  if (gameMode == "default2" && playerName.length == 1) {
    myOutputValue =
      "Welcome to Blackjack! <br><br> You are Player 2, please enter your name and hit submit.";
    gameMode = "player2Name";
    return myOutputValue;
  }

  if (gameMode == "default2" && playerName.length == 2) {
    gameMode = "player2";
  }

  if (gameMode == "player2Name") {
    if (input == "") {
      var myOutputValue =
        "You are Player 2, please enter your name and hit submit.";
      return myOutputValue;
    } else {
      savePlayerName(input);
      gameMode = "player2";
    }
  }

  // [Player 2] save name, draw 2 cards, output cards drawn, change mode
  if (gameMode == "player2") {
    var p2FinalRank = 0;
    drawCount = 2;
    var drawCardP2 = 0;

    while (drawCardP2 < 2) {
      player2Hand.push(DECK.pop());
      drawCardP2 += 1;
      console.log(player2Hand);
    }

    myOutputValue =
      playerName[1] +
      "<br><br> You Drew: <br><br>" +
      cardDisplay(player2Hand) +
      "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";

    gameMode = "player2Choice";

    return myOutputValue;
  }

  // [Player 2] draws first extra card, option to draw another or end turn
  if (gameMode == "player2Choice") {
    if (input == "1" && drawCount == 2) {
      player2Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player2Hand);
      myOutputValue =
        playerName[1] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player2Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 2] draws second extra card, option to draw another or end turn
    if (input == "1" && drawCount == 3) {
      player2Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player2Hand);
      myOutputValue =
        playerName[1] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player2Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 2] draws last extra card and ends turn
    if (input == "1" && drawCount == 4) {
      player2Hand.push(DECK.pop());
      drawCount += 1;
      console.log(player2Hand);
      myOutputValue =
        playerName[1] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player2Hand) +
        "<br><br> Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 2] prevent exceeding card draw limit, ends turn, proceed to check for winner
    if (input == "1" && drawCount == 5) {
      myOutputValue =
        playerName[1] +
        "<br><br> You Drew: <br><br>" +
        cardDisplay(player2Hand) +
        "<br><br> You have hit the draw limit of 5 cards, hit submit to proceed";

      gameMode = "compare";
      console.log(drawCount);
      return myOutputValue;
    }

    // [Player 2] ends turn, proceed to check for winner
    if (input == "2") {
      myOutputValue = "You have ended your turn, hit submit to proceed";
      gameMode = "compare";
      return myOutputValue;
    }
  }

  // Win Condition
  if (gameMode == "compare") {
    p1FinalRank = calcSumOfCardsInHand(player1Hand);
    console.log("this is p1FinalRank" + p1FinalRank);
    p2FinalRank = calcSumOfCardsInHand(player2Hand);
    console.log("this is p2FinalRank" + p2FinalRank);

    if (p1FinalRank > 21) {
      myOutputValue = playerName[1] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[1] win, reset draw count, place cards back into deck

    if (p2FinalRank > 21) {
      myOutputValue = playerName[0] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[0] win, reset draw count, place cards back into deck

    if (p1FinalRank == 21) {
      myOutputValue = playerName[0] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[0] win [blackjack], reset draw count, place cards back into deck

    if (p2FinalRank == 21) {
      myOutputValue = playerName[1] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[1] win [blackjack], reset draw count, place cards back into deck

    if (p1FinalRank < p2FinalRank && p2FinalRank <= 21) {
      myOutputValue = playerName[1] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[1] win, reset draw count, place cards back into deck

    if (p2FinalRank < p1FinalRank && p1FinalRank <= 21) {
      myOutputValue = playerName[0] + ", wins!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // playerName[0] win, reset draw count, place cards back into deck

    if (p1FinalRank == p2FinalRank || (p1FinalRank > 21 && p2FinalRank > 21)) {
      myOutputValue = "Its a draw, better luck next time!";
      gameMode = "player1";
      handReset(player1Hand);
      handReset(player2Hand);
    } // draw, reset draw count, place cards back into deck

    return myOutputValue;

    // Redirect players if they enter invalid input
  } else {
    if (
      gameMode == "player1" ||
      "player2" ||
      "player1Choice" ||
      "player2Choice"
    ) {
      myOutputValue =
        "Input is invalid, please try again.<br><br>Enter '1' and hit submit to draw another card. <br> Enter '2' and hit submit to end you turn";
      return myOutputValue;
    }
  }
};
