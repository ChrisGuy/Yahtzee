let DOM, activePlayer, scores, dice, rollCount, finalDice, tempDice, chanceScore, globalCounter, score;

DOM = {
  // Player Elements
  plPanel: document.querySelectorAll('.player-panel'), // Player Panel P1 (0) P2 (1)
  p0Score: document.querySelector(".player-0-score"), //Player 1 (0) global score
  p1Score: document.querySelector(".player-1-score"), //Player 2 (1) global score
  p0Name: document.getElementById("name-0"),
  p1Name: document.getElementById("name-1"),
  icon: document.querySelectorAll(".icon"),

  // Buttons
  btnRoll: document.querySelectorAll(".btn-roll"),  // Player Roll
  btnScore: document.querySelectorAll(".btn-score"), // Scorecard Buttons
  btnNew: document.querySelector(".btn-new"),
  start: document.getElementById("startGame"),

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
  chanceScore: document.querySelectorAll(".chanceScore")
};

// Dice roll sound
const diceSnd = new Audio("sounds/diceroll.mp3");

// Cash register sound
const scoreSnd = new Audio("sounds/score.mp3");

initGame();

/*******************************************************
** EVENT LISTENERS
*/

DOM.btnRoll.forEach(btnRoll => {
  btnRoll.addEventListener("click", function() {
    console.log("roll button clicked");
    showDice();
    //check roll count
    if (rollCount < 3) {
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

DOM.btnNew.addEventListener("click", function() {
  console.log("New Game");
  initGame();
});

DOM.start.addEventListener("click", function() {
  let p0Name = document.getElementById("p0").value;
  let p1Name = document.getElementById("p1").value;


  // SET PLAYER NAMES

  if (p0Name) {
    DOM.p0Name.textContent = p0Name;
  } else {
    DOM.p0Name.textContent = "Player 1";
  }
  if (p1Name) {
    DOM.p1Name.textContent = p1Name;
  } else {
    DOM.p1Name.textContent = "Player 2";
  }

  document.getElementById("start").classList.add("hidden");

  document.getElementById("p0").value = null;
  document.getElementById("p1").value = null;
});


/****************************************************
 * FUNCTIONS
 */

 // Initialise Game
 function initGame() {
   // Open Player name screen
   document.getElementById("start").classList.remove("hidden");


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

   // Clears both scores
   activePlayer = 1;
   clearTempScores();
   // Sets P1 (0) as starting player
   activePlayer = 0;
   clearTempScores();


   globalScore();

   // Reset the active player to P1 (0)
   DOM.plPanel[0].classList.remove("active");
   DOM.plPanel[0].classList.add("active");
   DOM.plPanel[1].classList.remove("active");

   // Display P1 (0) Roll Button & Hide P2 (1) Roll Button
   DOM.btnRoll[0].classList.remove("hidden")
   DOM.btnRoll[1].classList.remove("hidden")
   DOM.btnRoll[1].classList.add("hidden");

   // Disable p2 (1) scorecard at start
   DOM.scorecardBtns1.forEach(btn => {
     btn.disabled = true;
   });

   // Hide crowns
   DOM.icon[0].innerHTML = "<i class='fas fa-chess-pawn fa-2x'></i>";
   DOM.icon[1].innerHTML = "<i class='fas fa-chess-pawn fa-2x'></i>";


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

function hideRollBtns() {};


// Generates random numbers for the dice
function diceRoll() {

  diceSnd.play();

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
};

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

    // Enable roll Button
    DOM.btnRoll[0].disabled = false;
    DOM.btnRoll[1].disabled = false;

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

  // Update UI
  hideDice();

  // Resets the turns
  rollCount = 0;
  // Reset Dice
  removeActiveDice();

  return rollCount, activePlayer

};

function resetDiceTxt() {
  DOM.btnRoll[0].innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
  DOM.btnRoll[1].innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
}

function calcScore() {

  // ONES
  (function ones(dice) {
    let onesScore = dice.filter(num => num === 1);
    if (scores["p" + activePlayer][0].length  < 1) {
      if (onesScore.length > 0) {
         document.querySelector(".onesScore" + activePlayer).textContent = onesScore.reduce(reduce);
      } else {
        document.querySelector(".onesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".onesScore" + activePlayer).textContent = scores["p" + activePlayer][0];
    }

  })(dice);

  // TWOS
  (function twos(dice) {
    let twosScore = dice.filter(num => num === 2);
    if (scores["p" + activePlayer][1].length  < 1 ) {
      if (twosScore.length > 0) {
        document.querySelector(".twosScore" + activePlayer).textContent = twosScore.reduce(reduce);
      } else {
        document.querySelector(".twosScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".twosScore" + activePlayer).textContent = scores["p" + activePlayer][1];
    }
  })(dice);

  // THREES
  (function threes(dice) {
    let threesScore = dice.filter(num => num === 3);
    if (scores["p" + activePlayer][2].length  < 1 ) {
      if (threesScore.length > 0) {
        document.querySelector(".threesScore" + activePlayer).textContent = threesScore.reduce(reduce);
      } else {
        document.querySelector(".threesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".threesScore" + activePlayer).textContent = scores["p" + activePlayer][2];
    }
  })(dice);

  // FOURS
  (function fours(dice) {
    let foursScore = dice.filter(num => num === 4);
    if (scores["p" + activePlayer][3].length < 1 ) {
      if (foursScore.length > 0) {
        document.querySelector(".foursScore" + activePlayer).textContent = foursScore.reduce(reduce);
      } else {
        document.querySelector(".foursScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".foursScore" + activePlayer).textContent = scores["p" + activePlayer][3];
    }
  })(dice);

  // FIVES
  (function fives(dice) {
    let fivesScore = dice.filter(num => num === 5);
    if (scores["p" + activePlayer][4].length < 1) {
      if (fivesScore.length > 0) {
        document.querySelector(".fivesScore" + activePlayer).textContent = fivesScore.reduce(reduce);
      } else {
        document.querySelector(".fivesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".fivesScore" + activePlayer).textContent = scores["p" + activePlayer][4];
    }
  })(dice);

  // SIXES
  (function sixes(dice) {
    let sixesScore = dice.filter(num => num === 6);
    if (scores["p" + activePlayer][5].length < 1 ) {
      if (sixesScore.length > 0) {
        document.querySelector(".sixesScore" + activePlayer).textContent = sixesScore.reduce(reduce);
      } else {
        document.querySelector(".sixesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".sixesScore" + activePlayer).textContent = scores["p" + activePlayer][5];
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
    if (scores["p" + activePlayer][6].length < 1 ) {
      if (toak.length) {
        document.querySelector(".toakScore" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.querySelector(".toakScore" + activePlayer).textContent = "0";
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
    if (scores["p" + activePlayer][7].length  < 1 ) {
      if (foak.length) {

        document.querySelector(".foakScore" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.querySelector(".foakScore" + activePlayer).textContent = "0";
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
    if (scores["p" + activePlayer][8].length  < 1 ) {
      if (fullhouse.length == 2) {
        if (fullhouse[0].count == "2" && fullhouse[1].count == "3" || fullhouse[0].count == "3" && fullhouse[1].count == "2") {

          document.querySelector(".fullhouseScore" + activePlayer).textContent = "25";
        } else {
          document.querySelector(".fullhouseScore" + activePlayer).textContent = "0";
        }
      }
    } else {
        document.querySelector(".fullhouseScore" + activePlayer).textContent = scores["p" + activePlayer][8];
    }
  })(dice);

  // SMALL STRAIGHT
  (function smStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][9].length < 1){
      if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          document.querySelector(".ssScore" + activePlayer).textContent = "30";
      } else {
         document.querySelector(".ssScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".ssScore" + activePlayer).textContent = scores["p" + activePlayer][9];
    };
  })(dice);

  // LARGE STRAIGHT
  (function lgStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][10].length  < 1){
      if (/12345|23456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          document.querySelector(".lsScore" + activePlayer).textContent = "40";
      } else {
          document.querySelector(".lsScore" + activePlayer).textContent = "0";
      };
    } else {
      document.querySelector(".lsScore" + activePlayer).textContent = scores["p" + activePlayer][10];
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
    if (scores["p" + activePlayer][11].length  < 1) {
      if (yahtzee.length) {

        document.querySelector(".yahtzeeScore" + activePlayer).textContent = "50";
      } else {
        document.querySelector(".yahtzeeScore" + activePlayer).textContent = "0";
      }
    } else {
        document.querySelector(".yahtzeeScore" + activePlayer).textContent = scores["p" + activePlayer][11];
      }
  })(dice);


  // CHANCE
  (function chance(dice) {
    if (scores["p" + activePlayer][12].length < 1) {
        console.log("Empty");
        document.querySelector(".chanceScore" + activePlayer).textContent = dice.reduce(reduce);
    } else {
      document.querySelector(".chanceScore" + activePlayer).textContent = scores["p" + activePlayer][12];
    };
  })(dice);


  function reduce(a, b) {
    return a + b;
  }
}

function saveScore(e) {
  //Play score sound
  scoreSnd.play();


  const str = e.target.name;
  console.log(str);
  // Remove first number to identify location to post to in score array
  const targetNum = str.substring(1, str.length);
  console.log(targetNum);

  const player = str.substring(0, 1);
  // score type classname
  const target = e.target.nextElementSibling.classList[1];
  console.log(target);

  // Set score to text content in next element
  score = document.querySelector("." + target).textContent;
  console.log(score);
  // Apply score to score array - Parse int first
  scores["p" + player][targetNum] = parseInt(score);
  // Add strikethrough class to button text
  e.target.classList.add("used");

  // Update global score
  globalScore();

  // Clear unsaved scores
  clearTempScores();

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
  if (scores["p" + activePlayer][0].length < 1) {
    document.querySelector(".onesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][1].length < 1) {
    document.querySelector(".twosScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][2].length < 1) {
    document.querySelector(".threesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][3].length < 1) {
    document.querySelector(".foursScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][4].length < 1) {
    document.querySelector(".fivesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][5].length < 1) {
    document.querySelector(".sixesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][6].length < 1) {
    document.querySelector(".toakScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][7].length < 1) {
    document.querySelector(".foakScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][8].length < 1) {
    document.querySelector(".fullhouseScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][9].length < 1) {
    document.querySelector(".ssScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][10].length < 1) {
    document.querySelector(".lsScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][11].length < 1) {
    document.querySelector(".yahtzeeScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][12].length < 1) {
    document.querySelector(".chanceScore" + activePlayer).textContent = "0";
  };
}

function globalScore() {

  // Total Player score
  globalScore0 = scores["p0"].reduce((a, b) => (a + Number(b)), 0);
  globalScore1 = scores["p1"].reduce((a, b) => (a + Number(b)), 0);

  if (globalScore0 > globalScore1){
    DOM.icon[0].classList.remove("hidden");
    DOM.icon[1].classList.remove("hidden");
    DOM.icon[1].classList.add("hidden");
    DOM.icon[0].innerHTML = "<i class='fas fa-crown fa-2x'></i>";
  } else if (globalScore1 > globalScore0){
    DOM.icon[1].classList.remove("hidden");
    DOM.icon[0].classList.remove("hidden");
    DOM.icon[0].classList.add("hidden");
    DOM.icon[1].innerHTML = "<i class='fas fa-crown fa-2x'></i>";
  } else {
    DOM.icon[1].classList.remove("hidden");
    DOM.icon[0].classList.remove("hidden");
    DOM.icon[0].innerHTML = "<i class='fab fa-black-tie fa-2x'></i>"
    DOM.icon[1].innerHTML = "<i class='fab fa-black-tie fa-2x'></i>"
  }

  // Update score display
  DOM.p0Score.innerHTML = "Score: " + globalScore0;
  DOM.p1Score.innerHTML = "Score: " + globalScore1;

  return globalScore0, globalScore1;
};

function gameOver() {
  console.log("End of Game!");

  if (globalScore0 > globalScore1){

    DOM.icon[0].classList.remove("hidden");
    DOM.icon[1].classList.remove("hidden");
    DOM.icon[1].classList.add("hidden");
    DOM.icon[0].innerHTML = "<i class='fas fa-trophy fa-2x'></i>";
    DOM.p0Name.textContent = "WINNER!";

  } else {
    DOM.icon[0].classList.remove("hidden");
    DOM.icon[1].classList.remove("hidden");
    DOM.icon[0].classList.add("hidden");
    DOM.icon[1].innerHTML = "<i class='fas fa-trophy fa-2x'></i>";
    DOM.p1Name("name-1").textContent = "WINNER!";
  }

  document.querySelector(".btn-roll-0").classList.add("hidden");

};

(function copyright() {
  let date = new Date();
  let year = date.getFullYear();

  document.querySelector(".copyright").innerHTML = "Copyright " + year + " Chris Morgan";
})();


// RULES POP UP

const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", e => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
