let activePlayer, scores, dice, rollCount, finalDice, tempDice, chanceScore, globalCounter, p1Score, score;


initGame();

document.querySelectorAll(".btn-roll").forEach(rollBtn => {
  rollBtn.addEventListener("click", function() {
    console.log("roll button clicked");
    showDice();
    //check roll count
    if (rollCount < 4) {
      diceRoll();
      for (let i = 1; i < dice.length; i++) {
        document.querySelector(".dice-" + i).src = "./images/dice-" + dice[i] + ".png";
      }
      calcScore();
    } else {
      document.querySelector(".btn-roll-" + activePlayer).disabled = true;
      document.querySelector(".btn-roll-" + activePlayer).textContent = "No more rolls";
      calcScore();
      rollCount = 0;
    }
  })
});

document.querySelectorAll(".btn-score").forEach(scoreBtn => {
  scoreBtn.addEventListener("click", function(e) {
    saveScore(e);
    toggleActive();
  });
});

document.querySelectorAll(".dice").forEach(dice => {
  dice.addEventListener("click", e => {
    e.target.classList.toggle("active-dice");
  })
});


/****************************************************
 * FUNCTIONS
 */

function hideDice() {
  document.querySelector(".dice-1").classList.add("hidden");
  document.querySelector(".dice-2").classList.add("hidden");
  document.querySelector(".dice-3").classList.add("hidden");
  document.querySelector(".dice-4").classList.add("hidden");
  document.querySelector(".dice-5").classList.add("hidden");
}

function showDice() {
  document.querySelector(".dice-1").classList.remove("hidden");
  document.querySelector(".dice-2").classList.remove("hidden");
  document.querySelector(".dice-3").classList.remove("hidden");
  document.querySelector(".dice-4").classList.remove("hidden");
  document.querySelector(".dice-5").classList.remove("hidden");
}

function hideRollBtns() {}

function diceRoll() {
  for (let i = 1; i < 6; i++) {
    if (document.querySelector(".dice-" + i).classList.contains("active-dice")) {
      continue
    } else {
      dice[i] = (Math.floor(Math.random() * 6) + 1);
    }
  }
  rollCount++;
  return dice, rollCount;

}

function initGame() {
  activePlayer = 0;
  p1Score = 0;
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
      [] //chanceScore
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
      [] //chanceScore
      ]
  };

  // Detects end of turn
  rollCount = 0;

  // Sets initial dice line up
  dice = [0, 1, 2, 3, 4, 5];

  // Detects End of game
  globalCounter = 0;

  hideDice();
  removeUsed();
  removeActiveDice();


  // Reset the active player to P1 (0)
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Hide P2 (1) Roll button
  document.querySelector(".btn-roll-1").classList.add("hidden");

  // Disable p2 (1) scorecard for first turn
  document.querySelectorAll(".btn-1").forEach(btn => {
    btn.disabled = true;
  });
};

// Remove strikethrough on score card
function removeUsed() {
  let elems = document.querySelectorAll(".btn-score");
  [].forEach.call(elems, function(el) {
    el.classList.remove("used");
  });
};

// Removes styling to selected dice
function removeActiveDice() {
  let elems = document.querySelectorAll(".dice");
  [].forEach.call(elems, function(el) {
    el.classList.remove("active-dice");
  });
};

// Toggles between P1 (0) & P2 (1)
function toggleActive() {
  activePlayer = activePlayer ? 0 : 1;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  if (activePlayer == 0) {
    document.querySelector(".btn-roll-1").classList.add("hidden");
    document.querySelector(".btn-roll-0").classList.remove("hidden");
    document.querySelector(".btn-roll-1").disabled = true;
    document.querySelector(".btn-roll-0").disabled = false;
    document.querySelector(".btn-roll-0").innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
    document.querySelector(".btn-roll-1").innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
    document.querySelectorAll(".btn-1").forEach(btn => {
      btn.disabled = true;
    });
    document.querySelectorAll(".btn-0").forEach(btn => {
      btn.disabled = false;
    });
  } else {
    document.querySelector(".btn-roll-0").classList.add("hidden");
    document.querySelector(".btn-roll-1").classList.remove("hidden");
    document.querySelector(".btn-roll-0").disabled = true;
    document.querySelector(".btn-roll-1").disabled = false;
    document.querySelector(".btn-roll-0").innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
    document.querySelector(".btn-roll-1").innerHTML = "<i class=\"fas fa-dice-d6\"></i> Roll Dice";
    document.querySelectorAll(".btn-0").forEach(btn => {
      btn.disabled = true;
    });
    document.querySelectorAll(".btn-1").forEach(btn => {
      btn.disabled = false;
    });
  };

  // Resets the turns
  rollCount = 0;
  // Reset Dice
  removeActiveDice();

};

function calcScore() {

  // ONES
  (function ones(dice) {
    let onesScore = dice.filter(num => num === 1);
    if (scores["p" + activePlayer][0].length == 0) {
      if (onesScore.length > 0) {
        document.getElementById("onesScore" + activePlayer).textContent = onesScore.reduce(reduce);
      } else {
        document.getElementById("onesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("onesScore" + activePlayer).textContent = scores["p" + activePlayer][0];
    }
  })(dice);

  // TWOS
  (function twos(dice) {
    let twosScore = dice.filter(num => num === 2);
    if (scores["p" + activePlayer][1].length == 0 ) {
      if (twosScore.length > 0) {
        document.getElementById("twosScore" + activePlayer).textContent = twosScore.reduce(reduce);
      } else {
        document.getElementById("twosScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("twosScore" + activePlayer).textContent = scores["p" + activePlayer][1];
    }
  })(dice);

  // THREES
  (function threes(dice) {
    let threesScore = dice.filter(num => num === 3);
    if (scores["p" + activePlayer][2].length == 0 ) {
      if (threesScore.length > 0) {
        document.getElementById("threesScore" + activePlayer).textContent = threesScore.reduce(reduce);
      } else {
        document.getElementById("threesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("threesScore" + activePlayer).textContent = scores["p" + activePlayer][2];
    }
  })(dice);

  // FOURS
  (function fours(dice) {
    let foursScore = dice.filter(num => num === 4);
    if (scores["p" + activePlayer][3].length == 0 ) {
      if (foursScore.length > 0) {
        document.getElementById("foursScore" + activePlayer).textContent = foursScore.reduce(reduce);
      } else {
        document.getElementById("foursScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("foursScore" + activePlayer).textContent = scores["p" + activePlayer][3];
    }
  })(dice);

  // FIVES
  (function fives(dice) {
    let fivesScore = dice.filter(num => num === 5);
    if (scores["p" + activePlayer][4].length == 0) {
      if (fivesScore.length > 0) {
        document.getElementById("fivesScore" + activePlayer).textContent = fivesScore.reduce(reduce);
      } else {
        document.getElementById("fivesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("fivesScore" + activePlayer).textContent = scores["p" + activePlayer][4];
    }
  })(dice);

  // SIXES
  (function sixes(dice) {
    let sixesScore = dice.filter(num => num === 6);
    if (scores["p" + activePlayer][5].length == 0 ) {
      if (sixesScore.length > 0) {
        document.getElementById("sixesScore" + activePlayer).textContent = sixesScore.reduce(reduce);
      } else {
        document.getElementById("sixesScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("sixesScore" + activePlayer).textContent = scores["p" + activePlayer][5];
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

        document.getElementById("toakScore" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.getElementById("toakScore" + activePlayer).textContent = "0";
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

        document.getElementById("foakScore" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.getElementById("foakScore" + activePlayer).textContent = "0";
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

          document.getElementById("fullhouseScore" + activePlayer).textContent = "25";
        } else {
          document.getElementById("fullhouseScore" + activePlayer).textContent = "0";
        }
      }
    } else {
        document.getElementById("fullhouseScore" + activePlayer).textContent = scores["p" + activePlayer][8];
    }
  })(dice);

  // SMALL STRAIGHT
  (function smStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][9].length == 0){
      if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          document.getElementById("ssScore" + activePlayer).textContent = "30";
      } else {
          document.getElementById("ssScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("ssScore" + activePlayer).textContent = scores["p" + activePlayer][9];
    };
  })(dice);

  // LARGE STRAIGHT
  (function lgStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (scores["p" + activePlayer][10].length == 0){
      if (/12345|23456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
          document.getElementById("lsScore" + activePlayer).textContent = "40";
      } else {
          document.getElementById("lsScore" + activePlayer).textContent = "0";
      };
    } else {
      document.getElementById("lsScore" + activePlayer).textContent = scores["p" + activePlayer][10];
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

        document.getElementById("yahtzeeScore" + activePlayer).textContent = "50";
      } else {
        document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
      }
    } else {
      if (scores["p" + activePlayer][11].length == 0) {
        document.getElementById("yahtzeeScore" + activePlayer).textContent = scores["p" + activePlayer][11];
      } else {
        document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
      }
    }
  })(dice);


  // CHANCE
  (function chance(dice) {
    if (scores["p" + activePlayer][12].length == 0) {
      document.getElementById("chanceScore" + activePlayer).textContent = dice.reduce(reduce);
    } else {
      document.getElementById("chanceScore" + activePlayer).textContent = scores["p" + activePlayer][12];
    };
  })(dice);


  function reduce(a, b) {
    return a + b;
  }
}

function saveScore(e) {
  let str = e.target.name;
  let targetNum = str.substring(1, str.length);
  let target = str.substring(0, str.length -1);
  let name = (e.target.nextElementSibling.id).substring(0, e.target.nextElementSibling.id.length -1);
  score = document.getElementById(e.target.nextElementSibling.id).textContent;
  scores["p" + activePlayer][targetNum] = parseInt(score);
  e.target.classList.add("used");
  console.log(scores["p" + activePlayer]);
  hideDice();
  clearTempScores();
  globalScore();
  globalCounter++;
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
  if (scores["p" + activePlayer][0] == false ) {
    document.getElementById("onesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][1] == false ) {
    document.getElementById("twosScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][2] == false ) {
    document.getElementById("threesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][3] == false ) {
    document.getElementById("foursScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][4] == false ) {
    document.getElementById("fivesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][5] == false ) {
    document.getElementById("sixesScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][6] === false ) {
    document.getElementById("toakScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][7] == false ) {
    document.getElementById("foakScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][8] == false ) {
    document.getElementById("fullhouseScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][9] == false ) {
    document.getElementById("ssScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][10] == false ) {
    document.getElementById("lsScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][11] === false ) {
    document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
  };
  if (scores["p" + activePlayer][12] == false ) {
    document.getElementById("chanceScore" + activePlayer).textContent = "0";
  };
}

function globalScore() {

  globalScore0 = scores["p0"].reduce((a, b) => (a + Number(b)), 0);
  globalScore1 = scores["p1"].reduce((a, b) => (a + Number(b)), 0);

  console.log(globalScore0);

  document.querySelector(".player-0-score").innerHTML = "Score: " + globalScore0;
  document.querySelector(".player-1-score").innerHTML = "Score: " + globalScore1;

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
