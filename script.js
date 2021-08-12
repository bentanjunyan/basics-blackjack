// GAMEMODES:
// GAMEMODE_DEFAULT
// GAMEMODE_NAME_INPUT
// GAMEMODE_BET_INPUT
// GAMEMODE_BLACKJACK_START
// GAMEMODE_BLACKJACK_INPUT
// GAMEMODE_BLACKJACK_END

// GLOBAL VARIABLES:
var GAMEMODE = "GAMEMODE_DEFAULT";
var PLAYERNAMES = [];
var PLAYERCREDIT = 100;
var PLAYERBET = 0;
var PLAYERHAND = [];
var PLAYERHANDVALUE = "";
var DEALERHAND = [];
var DEALERHANDVALUE = "";
var CARDSINHAND = 2;

// HELPER FUNCTION: CREATE DECK
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥", "♦", "♣", "♠"];

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
  return cardDeck;
};

// HELPER FUNCTION: GENERATE RANDOM INDEX [0 - MAX]
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// HELPER FUNCTION: SHUFFLE "MAKEDECK"
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

// HELPER FUNCTION: SAVE INPUT TO "PLAYERNAMES"
var savePlayerName = function (input) {
  PLAYERNAMES.push(input);
  console.log(PLAYERNAMES);
};

// HELPER FUNCTION: CALCULATE SUM OF POWER IN "HAND"
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

// HELPER FUNCTION: OUTPUT NAME & SUIT OF CARDS DRAWN
var cardDisplay = function (playerHand) {
  var counter = 0;
  var tellHand = "";
  while (counter < playerHand.length) {
    var tellHand =
      tellHand +
      "[" +
      PLAYERHAND[counter].name +
      " of " +
      PLAYERHAND[counter].suit +
      "]<br>";
    counter += 1;
  }
  return tellHand;
};

// HELPER FUNCTION: RESET CARDS IN HAND
var handReset = function (playerHand) {
  CARDSINHAND = 2;
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
  playerHand.pop();
};

// HELPER FUNCTION: DEALER DRAWS & CALCULATE SUM OF POWER OF CARDS IN HAND
var dealer = function (DECK) {
  var drawCardDealer = 0;

  while (drawCardDealer < 2) {
    DEALERHAND.push(DECK.pop());
    drawCardDealer += 1;
  }

  var DEALERHANDVALUE = calcSumOfCardsInHand(DEALERHAND);
  var dealerCARDSINHAND = 2;
  while (DEALERHANDVALUE < 16 && dealerCARDSINHAND < 5) {
    DEALERHAND.push(DECK.pop());
    dealerCARDSINHAND += 1;
    DEALERHANDVALUE = calcSumOfCardsInHand(DEALERHAND);
  }
  return DEALERHANDVALUE;
};

// MAIN FUNCTION
var main = function (input) {
  // GENERATE DECK & SHUFFLE
  var DECK = shuffleCards(makeDeck());

  // OUTPUT DEFAULT MESSAGE, CHANGE MODE TO ENTER NAME
  if (GAMEMODE == "GAMEMODE_DEFAULT") {
    var myOutputValue =
      "Welcome to Blackjack! <br><br> You will start with <b>$" +
      PLAYERCREDIT +
      "</b>.<br><br> Please enter your <b>name</b> and hit submit.";

    GAMEMODE = "GAMEMODE_NAME_INPUT";
    return myOutputValue;
  }

  // ENSURE INPUT FIELD IS NOT EMPTY
  if (GAMEMODE == "GAMEMODE_NAME_INPUT") {
    if (input == "") {
      var myOutputValue =
        "You left the field empty, please enter your <b>name</b> and hit submit.";
      return myOutputValue;

      // SAVE & OUTPUT PLAYER NAME, CHANGE MODE TO ENTER BETS
    } else {
      savePlayerName(input);
      GAMEMODE = "GAMEMODE_BET_INPUT";
      myOutputValue =
        "Hello <b>" +
        PLAYERNAMES[0] +
        "</b>,<br><br>Credits: <b>$" +
        PLAYERCREDIT +
        "</b><br><br>Please enter your <b>bet</b> and hit submit.";
      return myOutputValue;
    }
  }

  if (GAMEMODE == "GAMEMODE_BET_INPUT" && PLAYERCREDIT < 0) {
    myOutputValue =
      "You ran <b>out of credits</b>, the house always wins! <br><br>☺☺☺<br><br>Click on submit to <b>restart</b>.";
    PLAYERCREDIT = 100;
    PLAYERBET = 0;
    GAMEMODE = "GAMEMODE_DEFAULT";
    return myOutputValue;
  }

  if (GAMEMODE == "GAMEMODE_BET_INPUT") {
    // ENSURE INPUT FIELD IS NOT EMPTY, CHECK IF BET AMOUNT IS VALID, SAVE & DISPLAY BET AMOUNT, CHANGE MODE TO START BLACKJACK
    if (input !== "" && input <= PLAYERCREDIT) {
      PLAYERBET = Number(input);
      PLAYERCREDIT = PLAYERCREDIT - input;
      myOutputValue =
        "You have placed <b>$" +
        PLAYERBET +
        "</b> as your bet, click on submit to continue.";
      GAMEMODE = "GAMEMODE_BLACKJACK_START";
      return myOutputValue;

      // DISPLAY ERROR MESSAGE IF INPUT IS NOT VALID
    } else {
      myOutputValue =
        "Credits: <b>$" +
        PLAYERCREDIT +
        "</b><br><br>Please enter a <b>valid bet</b>.";
      return myOutputValue;
    }
  }

  // ADD 2 CARDS TO PLAYERHAND, DISPLAY CARDS, CHANGE MODE
  if (GAMEMODE == "GAMEMODE_BLACKJACK_START") {
    var drawCardP1 = 0;
    while (drawCardP1 < 2) {
      PLAYERHAND.push(DECK.pop());
      drawCardP1 += 1;
      console.log(PLAYERHAND);
    }
    myOutputValue =
      "Credit: <b>$" +
      PLAYERCREDIT +
      "<br><br> Your Hand: <br></b>" +
      cardDisplay(PLAYERHAND) +
      "<br> Enter <b>'1'</b> and hit submit <b>to draw</b> another card. <br> Enter <b>'2'</b> and hit submit to <b>end</b> you turn.";
    GAMEMODE = "GAMEMODE_BLACKJACK_INPUT";
    return myOutputValue;
  }

  // ALLOW PLAYER TO CHOOSE TO DRAW CARD OR END TURN [3RD CARD]
  if (GAMEMODE == "GAMEMODE_BLACKJACK_INPUT") {
    if (input == "1" && CARDSINHAND == 2) {
      PLAYERHAND.push(DECK.pop());
      CARDSINHAND += 1;

      myOutputValue =
        "Credit: <b>$" +
        PLAYERCREDIT +
        "<br><br> Your Hand: <br></b>" +
        cardDisplay(PLAYERHAND) +
        "<br> Enter <b>'1'</b> and hit submit <b>to draw</b> another card. <br> Enter <b>'2'</b> and hit submit to <b>end</b> you turn.";
      return myOutputValue;
    }
  }

  // ALLOW PLAYER TO CHOOSE TO DRAW CARD OR END TURN [4TH CARD]
  if (GAMEMODE == "GAMEMODE_BLACKJACK_INPUT") {
    if (input == "1" && CARDSINHAND == 3) {
      PLAYERHAND.push(DECK.pop());
      CARDSINHAND += 1;

      myOutputValue =
        "Credit: <b>$" +
        PLAYERCREDIT +
        "<br><br> Your Hand: <br></b>" +
        cardDisplay(PLAYERHAND) +
        "<br> Enter <b>'1'</b> and hit submit <b>to draw</b> another card. <br> Enter <b>'2'</b> and hit submit to <b>end</b> you turn.";
      return myOutputValue;
    }
  }

  // ALLOW PLAYER TO CHOOSE TO DRAW CARD OR END TURN [5TH CARD]
  if (GAMEMODE == "GAMEMODE_BLACKJACK_INPUT") {
    if (input == "1" && CARDSINHAND == 4) {
      PLAYERHAND.push(DECK.pop());
      CARDSINHAND += 1;

      myOutputValue =
        "Credit: <b>$" +
        PLAYERCREDIT +
        "<br><br> Your Hand: <br></b>" +
        cardDisplay(PLAYERHAND) +
        "<br> Enter <b>'1'</b> and hit submit <b>to draw</b> another card. <br> Enter <b>'2'</b> and hit submit to <b>end</b> you turn.";
      return myOutputValue;
    }
  }

  // NOTIFY PLAYER HE HAS HIT MAX NUMBER OF CARDS, DISPLAY HAND, CHANGE MODE
  if (input == "1" && CARDSINHAND == 5) {
    myOutputValue =
      "Credit: <b>$" +
      PLAYERCREDIT +
      "<br><br> Your Hand: <br></b>" +
      cardDisplay(PLAYERHAND) +
      "<br><br> You have hit the <b>draw limit</b> of 5 cards, hit submit to proceed.";
    GAMEMODE = "GAMEMODE_BLACKJACK_END";
    return myOutputValue;
  }

  // CHANGE MODE TO CHECK WIN CONDITION
  if (input == "2") {
    myOutputValue = "You have <b>ended</b> your turn, hit submit to proceed.";
    GAMEMODE = "GAMEMODE_BLACKJACK_END";
    return myOutputValue;
  }

  // GAME MODE TO DECIDE WINNER
  if (GAMEMODE == "GAMEMODE_BLACKJACK_END") {
    // PLAYER HAND IS SUMMED UP
    PLAYERHANDVALUE = calcSumOfCardsInHand(PLAYERHAND);
    console.log("this is PLAYER'S TOTAL " + PLAYERHANDVALUE);

    // DEALER DRAWS 2-5 CARDS, HAND IS SUMMED UP
    var DEALERPOWER = dealer(DECK);
    console.log("this is DEALER'S TOTAL " + DEALERPOWER);

    // WIN CONDITIONS
    // PLAYER BUST
    if (PLAYERHANDVALUE > 21 && DEALERPOWER < 22) {
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>Dealer</b>, wins!<br><br>You lost <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // DEALER BLACKJACK
    if (DEALERPOWER == 21) {
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>Dealer</b>, wins!<br><br>You lost <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // DEALER WINS BY HIGHER VALUE
    if (
      PLAYERHANDVALUE < DEALERPOWER &&
      DEALERPOWER < 22 &&
      PLAYERHANDVALUE < 22
    ) {
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>Dealer</b>, wins!<br><br>You lost <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // DEALER BUST
    if (DEALERPOWER > 21 && PLAYERHANDVALUE < 22) {
      PLAYERCREDIT = PLAYERCREDIT + PLAYERBET + PLAYERBET;
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>You</b>, win!<br><br>You received <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // PLAYER BLACKJACK
    if (PLAYERHANDVALUE == 21) {
      PLAYERCREDIT = PLAYERCREDIT + PLAYERBET + PLAYERBET;
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>You</b>, win!<br><br>You received <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // PLAYER WINS BY HIGHER VALUE
    if (
      DEALERPOWER < PLAYERHANDVALUE &&
      DEALERPOWER < 22 &&
      PLAYERHANDVALUE < 22
    ) {
      PLAYERCREDIT = PLAYERCREDIT + PLAYERBET + PLAYERBET;
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>You</b>, win!<br><br>You received <b>$" +
        PLAYERBET +
        "</b>. <br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    // DRAW
    if (
      PLAYERHANDVALUE == DEALERPOWER ||
      (PLAYERHANDVALUE > 21 && DEALERPOWER > 21)
    ) {
      myOutputValue =
        "Dealer's Hand: <b>" +
        DEALERPOWER +
        "<br>" +
        PLAYERNAMES[0] +
        "'s</b> Hand: <b>" +
        PLAYERHANDVALUE +
        "</b><br><br><b>It's a tie!</b><br><br>Remaining Credits: <b>$" +
        PLAYERCREDIT +
        "</b>. <br><br>Click on submit to start the next round.";

      PLAYERBET = "0";
      GAMEMODE = "GAMEMODE_BET_INPUT";
      handReset(PLAYERHAND);
      handReset(DEALERHAND);
    }

    return myOutputValue;

    // INVALID INPUT MESSAGE TO GUIDE USER
  } else {
    if (GAMEMODE == "GAMEMODE_BLACKJACK_START" || "GAMEMODE_BLACKJACK_INPUT") {
      myOutputValue =
        "Credit: <b>$" +
        PLAYERCREDIT +
        "<br><br> Your Hand: <br></b>" +
        cardDisplay(PLAYERHAND) +
        "<br><b>Input is invalid, please try again.</b><br><br> Enter <b>'1'</b> and hit submit <b>to draw</b> another card. <br> Enter <b>'2'</b> and hit submit to <b>end</b> you turn.";
      return myOutputValue;
    }
  }
};
