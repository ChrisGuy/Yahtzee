let DOM, activePlayer, scores, dice, rollCount, finalDice, tempDice, chanceScore, globalCounter, score;

DOM = {
  // Player Elements
  plPanel: document.querySelectorAll('.player-panel'), // Player Panel P1 (0) P2 (1)
  p0Score: document.querySelector(".player-0-score"), //Player 1 (0) global score
  p1Score: document.querySelector(".player-1-score"), //Player 2 (1) global score 
  // Buttons
  btnRoll: document.querySelectorAll(".btn-roll"),  // Player Roll
  btnScore: document.querySelectorAll(".btn-score"), // Scorecard Buttons

  // Dice
  diceImg: document.querySelectorAll(".dice"),

  // Score card elements
  scorecardBtns0: document.querySelectorAll(".btn-0"),
  scorecardBtns1: document.querySelectorAll(".btn-1"),

  onesScore: document.querySelectorAll(".onesScore"),
  twosScore: document.querySelectorAll(".twosScore"),
  threesScore: document.querySelectorAll(".threesScore"),
  foursScore: document.querySelectorAll(".foursScore"),
  fivesScore: document.querySelectorAll(".fivesScore"),
  sixesScore: document.querySelectorAll(".sixesScore"),
  toakScore: document.querySelectorAll(".toakScore"),
  foakScore: document.querySelectorAll(".foakScore"),
  fullhouseScore: document.querySelectorAll(".fullhouseScore"),
  ssScore: document.querySelectorAll(".ssScore"),
  lsScore: document.querySelectorAll(".lsScore"),
  yahtzeeScore: document.querySelectorAll(".yahtzeeScore"),
  chanceScore: document.querySelectorAll(".chanceScore"),
}

initGame();

DOM.btnRoll.forEach(btnRoll => {
  btnRoll.addEventListener("click", function() {
    console.log("roll button clicked");
    showDice();
    //check roll count
    if (rollCount < 4) {
      diceRoll();
      for (let i = 1; i < dice.length; i++) {
        DOM.diceImg[i - 1].src = "./images/dice-" + dice[i] + ".png";
      }
      calcScore();
    } else {
      DOM.btnRoll[activePlayer].disabled = true;
      DOM.btnRoll[activePlayer].textContent = "No more rolls";
      calcScore();
      rollCount = 0;
    }
  })
});

DOM.btnScore.forEach(scoreBtn => {
  scoreBtn.addEventListener("click", function(e) {
    saveScore(e);
    toggleActive();
  });
});

DOM.diceImg.forEach(dice => {
  dice.addEventListener("click", e => {
    e.target.classList.toggle("active-dice");
  })
});


/****************************************************
 * FUNCTIONS
 */

 // Initialise Game
 function initGame() {
   // Sets P1 (0) as starting player
   activePlayer = 0;
   // Reset scores
   scores = {
     p0: [
       [], //onesScore
       [], //twosScore
       [], //threesScore
       [], //foursScore
       [], //fivesScore
       [], //sixesScore
       [], //toakScore
       [], //foakScore
       [], //fullhouseScore
       [], //ssScore
       [], //lsScore
       [], //yahtzeeScore
       []  //chanceScore
       ],
     p1: [
       [], //onesScore
       [], //twosScore
       [], //threesScore
       [], //foursScore
       [], //fivesScore
       [], //sixesScore
       [], //toakScore
       [], //foakScore
       [], //fullhouseScore
       [], //ssScore
       [], //lsScore
       [], //yahtzeeScore
       []  //chanceScore
       ]
   };

   // Reset counter that detects end of turn
   rollCount = 0;

   // Sets initial dice line up
   dice = [0, 1, 2, 3, 4, 5];

   // Reset counter that detects End of game
   globalCounter = 0;

   // Set up UI for start of game
   hideDice();
   removeUsed();
   removeActiveDice();

   // Reset the active player to P1 (0)
   DOM.plPanel[0].classList.remove("active");
   DOM.plPanel[0].classList.add("active");
   DOM.plPanel[1].classList.remove("active");

   // Hide P2 (1) Roll button
   DOM.btnRoll[1].classList.add("hidden");

   // Disable p2 (1) scorecard at start
   DOM.scorecardBtns1.forEach(btn => {
     btn.disabled = true;
   });
 };

function hideDice() {
  DOM.diceImg[0].classList.add("hidden");
  DOM.diceImg[1].classList.add("hidden");
  DOM.diceImg[2].classList.add("hidden");
  DOM.diceImg[3].classList.add("hidden");
  DOM.diceImg[4].classList.add("hidden");
}

function showDice() {
  DOM.diceImg[0].classList.remove("hidden");
  DOM.diceImg[1].classList.remove("hidden");
  DOM.diceImg[2].classList.remove("hidden");
  DOM.diceImg[3].classList.remove("hidden");
  DOM.diceImg[4].classList.remove("hidden");
}

function hideRollBtns() {}


// Generates random numbers for the dice
function diceRoll() {

  for (let i = 1; i < 6; i++) {
    // Identifies "held" dice and skips the roll on them
    if (DOM.diceImg[i - 1].classList.contains("active-dice")) {
      continue
    } else {
      dice[i] = (Math.floor(Math.random() * 6) + 1);
    }
  }
  // Increment roll count towards end of turn
  rollCount++;
  // return dice, rollCount;
}

// Remove strikethrough on score card
function removeUsed() {
  [].forEach.call(DOM.btnScore, function(el) {
    el.classList.remove("used");
  });
};

// Removes styling to selected dice
function removeActiveDice() {
  [].forEach.call(DOM.diceImg, function(el) {
    el.classList.remove("active-dice");
  });
};

// Toggles between P1 (0) & P2 (1)
function toggleActive() {
  activePlayer = activePlayer ? 0 : 1;
  DOM.plPanel[0].classList.toggle("active");
  DOM.plPanel[1].classList.toggle("active");

  if (activePlayer == 0) {
    // Hide/reveal Roll Btn
    DOM.btnRoll[1].classList.add("hidden");
    DOM.btnRoll[0].classList.remove("hidden");

    // Remove "NO MORE ROLLS" message if displayed
    resetDiceTxt();

    // Enable scorecard interaction for active player
    DOM.scorecardBtns1.forEach(btn => {
      btn.disabled = true;
    });
    DOM.scorecardBtns0.forEach(btn => {
      btn.disabled = false;
    });
  } else {
    // Hide/reveal Roll Btn
    DOM.btnRoll[0].classList.add("hidden");
    DOM.btnRoll[1].classList.remove("hidden");

    // Remove "NO MORE ROLLS" message if displayed
    resetDiceTxt();

    DOM.scorecardBtns0.forEach(btn => {
      btn.disabled = true;
    });
    DOM.scorecardBtns1.forEach(btn => {
      btn.disabled = false;
    });
  };



  // Resets the turns
  rollCount = 0;
  // Reset Dice
  removeActiveDice();

};

function resetDiceTxt() {
  DOM.btnRoll[0].innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
  DOM.btnRoll[1].innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
}

function calcScore() {

  // ONES
  (function ones(dice) {
    let onesScore = dice.filter(num => num === 1);
    if (scores["p" + activePlayer][0].length == 0) {
      if (onesScore.length > 0) {
         DOM.onesScore[activePlayer].textContent = onesScore.reduce(reduce);
      } else {
        DOM.onesScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.onesScore[activePlayer].textContent = scores["p" + activePlayer][0];
    }
  })(dice);

  // TWOS
  (function twos(dice) {
    let twosScore = dice.filter(num => num === 2);
    if (scores["p" + activePlayer][1].length == 0 ) {
      if (twosScore.length > 0) {
        DOM.twosScore[activePlayer].textContent = twosScore.reduce(reduce);
      } else {
        DOM.twosScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.twosScore[activePlayer].textContent = scores["p" + activePlayer][1];
    }
  })(dice);

  // THREES
  (function threes(dice) {
    let threesScore = dice.filter(num => num === 3);
    if (scores["p" + activePlayer][2].length == 0 ) {
      if (threesScore.length > 0) {
        DOM.threesScore[activePlayer].textContent = threesScore.reduce(reduce);
      } else {
        DOM.threesScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.threesScore[activePlayer].textContent = scores["p" + activePlayer][2];
    }
  })(dice);

  // FOURS
  (function fours(dice) {
    let foursScore = dice.filter(num => num === 4);
    if (scores["p" + activePlayer][3].length == 0 ) {
      if (foursScore.length > 0) {
        DOM.foursScore[activePlayer].textContent = foursScore.reduce(reduce);
      } else {
        DOM.foursScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.foursScore[activePlayer].textContent = scores["p" + activePlayer][3];
    }
  })(dice);

  // FIVES
  (function fives(dice) {
    let fivesScore = dice.filter(num => num === 5);
    if (scores["p" + activePlayer][4].length == 0) {
      if (fivesScore.length > 0) {
        DOM.fivesScore[activePlayer].textContent = fivesScore.reduce(reduce);
      } else {
        DOM.fivesScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.fivesScore[activePlayer].textContent = scores["p" + activePlayer][4];
    }
  })(dice);

  // SIXES
  (function sixes(dice) {
    let sixesScore = dice.filter(num => num === 6);
    if (scores["p" + activePlayer][5].length == 0 ) {
      if (sixesScore.length > 0) {
        DOM.sixesScore[activePlayer].textContent = sixesScore.reduce(reduce);
      } else {
        DOM.sixesScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.sixesScore[activePlayer].textContent = scores["p" + activePlayer][5];
    }
  })(dice);

  // THREE OF A KIND
  (function threeOfAKind(dice) {

    let toak = [];
    // make a copy of the input array
    let copy = dice.slice(0);

    // first loop goes over every element
    for (let i = 0; i < dice.length; i++) {

      let myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (dice[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 2) {
        let a = new Object();
        a.count = myCount;
        toak.push(a);
      }
    }
    if (scores["p" + activePlayer][6].length == 0 ) {
      if (toak.length) {

        DOM.toakScore[activePlayer].textContent = dice.reduce(reduce);
      } else {
        DOM.toakScore[activePlayer].textContent = "0";
      }
    }

  })(dice);

  // FOUR OF A KIND
  (function fourOfAKind(dice) {

    let foak = [];
    // make a copy of the input array
    let copy = dice.slice(0);

    // first loop goes over every element
    for (let i = 0; i < dice.length; i++) {

      let myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (dice[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 3) {
        let a = new Object();
        a.count = myCount;
        foak.push(a);
      }
    }
    if (scores["p" + activePlayer][7].length == 0 ) {
      if (foak.length) {

        DOM.foakScore[activePlayer].textContent = dice.reduce(reduce);
      } else {
        DOM.foakScore[activePlayer].textContent = "0";
      }
    }

  })(dice);

  // FULLHOUSE
  (function fullhouse(dice) {

    let fullhouse = [];
    // make a copy of the input array
    let copy = dice.slice(0);

    // first loop goes over every element
    for (let i = 0; i < dice.length; i++) {

      let myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (dice[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 1) {
        let a = new Object();
        a.count = myCount;
        fullhouse.push(a);
      }
    }
    if (scores["p" + activePlayer][8].length === 0 ) {
      if (fullhouse.length == 2) {
        if (fullhouse[0].count == "2" && fullhouse[1].count == "3" || fullhouse[0].count == "3" && fullhouse[1].count == "2") {

          DOM.fullhouseScore[activePlayer].textContent = "25";
        } else {
          DOM.fullhouseScore[activePlayer].textContent = "0";
        }
      }
    } else {
        DOM.fullhouseScore[activePlayer].textContent = scores["p" + activePlayer][8];
    }
  })(dice);

  // SMALL STRAIGHT
  (function smStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][9].length == 0){
      if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          DOM.ssScore[activePlayer].textContent = "30";
      } else {
         DOM.ssScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.ssScore[activePlayer].textContent = scores["p" + activePlayer][9];
    };
  })(dice);

  // LARGE STRAIGHT
  (function lgStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][10].length == 0){
      if (/12345|23456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          DOM.lsScore[activePlayer].textContent = "40";
      } else {
          DOM.lsScore[activePlayer].textContent = "0";
      };
    } else {
      DOM.lsScore[activePlayer].textContent = scores["p" + activePlayer][10];
    };
  })(dice);



  // YAHTZEE
  (function yahtzee(dice) {

    let yahtzee = [];
    // make a copy of the dice array
    let copy = dice.slice(0);

    // first loop goes over every element
    for (let i = 0; i < dice.length; i++) {

      let myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (let w = 0; w < copy.length; w++) {
        if (dice[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 4) {
        let a = new Object();
        a.count = myCount;
        yahtzee.push(a);
      }
    }
    if (scores["p" + activePlayer][11].length == 0 ) {
      if (yahtzee.length) {

        DOM.yahtzeeScore[activePlayer].textContent = "50";
      } else {
        DOM.yahtzeeScore[activePlayer].textContent = "0";
      }
    } else {
        DOM.yahtzeeScore[activePlayer].textContent = scores["p" + activePlayer][11];
      }
  })(dice);


  // CHANCE
  (function chance(dice) {
    if (scores["p" + activePlayer][12].length == 0) {
      DOM.chanceScore[activePlayer].textContent = dice.reduce(reduce);
    } else {
      DOM.chanceScore[activePlayer].textContent = scores["p" + activePlayer][12];
    };
  })(dice);


  function reduce(a, b) {
    return a + b;
  }
}

function saveScore(e) {
  //
  const str = e.target.name;
  // Remove first number to identify location to post to in score array
  const targetNum = str.substring(1, str.length);
  // score type classname
  const target = e.target.nextElementSibling.classList[1];

  // Set score to text content in next element
  score = document.querySelector("." + target).textContent;
  // Apply score to score array - Parse int first
  scores["p" + activePlayer][targetNum] = parseInt(score);
  // Add strikethrough class to button text
  e.target.classList.add("used");

  // Update UI
  hideDice();
  clearTempScores();

  // Update global score
  globalScore();

  // Increment global turn counter
  globalCounter++;
  // Perform check to see if end of game
  if (globalCounter === 26) {
    gameOver();
  }
};

// Clear temporary scores from player card at end of return

function clearTempScores() {

  // for (let i = 0; i < 14; i++){
  //
  //   let label;
  //     switch (i){
  //       case 0: label = "onesScore";
  //       console.log(i + " " + label);
  //       break;
  //       case 1: label = "twosScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 2: label = "threesScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 3: label = "foursScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 4: label = "fivesScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 5: label = "sixesScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 6: label ="toakScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 7: label = "foakScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 8: label = "fullhouseScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 9: label = "ssScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 10: label = "lsScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 11: label = "yahtzeeScore";
  //       break;
  //       console.log(i + " " + label);
  //       case 12: label = "chanceScore";
  //       break;
  //       console.log(i + " " + label);
  //   }
    //   if (scores["p" + activePlayer][i] === "") {
    //   document.getElementById(label + activePlayer).textContent = "0";
    // };
  if (scores["p" + activePlayer][0].length === 0) {
    DOM.onesScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][1].length === 0) {
    DOM.twosScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][2].length === 0) {
    DOM.threesScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][3].length === 0) {
    DOM.foursScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][4].length === 0) {
    DOM.fivesScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][5].length === 0) {
    DOM.sixesScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][6].length === 0) {
    DOM.toakScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][7].length === 0) {
    DOM.foakScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][8].length === 0) {
    DOM.fullhouseScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][9].length === 0) {
    DOM.ssScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][10].length === 0) {
    DOM.lsScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][11].length === 0) {
    DOM.yahtzeeScore[activePlayer].textContent = "0";
  };
  if (scores["p" + activePlayer][12].length === 0) {
    DOM.chanceScore[activePlayer].textContent = "0";
  };
}

function globalScore() {

  globalScore0 = scores["p0"].reduce((a, b) => (a + Number(b)), 0);
  globalScore1 = scores["p1"].reduce((a, b) => (a + Number(b)), 0);

  console.log(globalScore0);

  DOM.p0Score.innerHTML = "Score: " + globalScore0;
  DOM.p1Score.innerHTML = "Score: " + globalScore1;

  return globalScore0, globalScore1;
}

function gameOver() {
  console.log("End of Game!");

  if (globalScore0 > globalScore1){
    document.getElementById("name-0").textContent = "WINNER!";

  } else {
    document.getElementById("name-1").textContent = "WINNER!";
  }

  document.querySelector(".btn-roll-0").classList.add("hidden");

}
