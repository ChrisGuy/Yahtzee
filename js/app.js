let activePlayer, scores, dice, rollCount, finalDice, tempDice, chanceScore, globalCounter, p1Score;


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
    console.log(e.target);
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
  console.log(rollCount);
  return dice, rollCount;

}

function initGame() {
  activePlayer = 0;
  p1Score = 0;
  scores = [{
      "ones-score-0": "",
      "twos-score-0": "",
      "threes-score-0": "",
      "fours-score-0": "",
      "fives-score-0": "",
      "sixes-score-0": "",
      "toak-score-0": "",
      "foak-score-0": "",
      "fullhouse-score-0": "",
      "ss-score-0": "",
      "ls-score-0": "",
      "yahtzee-score-0": "",
      "chance-score-0": ""
    },
    {
      "ones-score-1": "",
      "twos-score-1": "",
      "threes-score-1": "",
      "fours-score-1": "",
      "fives-score-1": "",
      "sixes-score-1": "",
      "toak-score-1": "",
      "foak-score-1": "",
      "fullhouse-score-1": "",
      "ss-score-1": "",
      "ls-score-1": "",
      "yahtzee-score-1": "",
      "chance-score-1": ""
    }
  ];

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
    if (scores[activePlayer]["ones-score-" + activePlayer] === "") {
      if (onesScore.length === 0) {
        document.querySelector(".ones-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".ones-score-" + activePlayer).textContent = onesScore.reduce(reduce);
      };
    } else {
      document.querySelector(".ones-score-" + activePlayer).textContent = scores[activePlayer]["ones-score-" + activePlayer];
    }
  })(dice);

  // TWOS
  (function twos(dice) {
    let twosScore = dice.filter(num => num === 2);
    if (scores[activePlayer]["twos-score-" + activePlayer] === "") {
      if (twosScore.length === 0) {
        document.querySelector(".twos-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".twos-score-" + activePlayer).textContent = twosScore.reduce(reduce);
      };
    } else {
      document.querySelector(".twos-score-" + activePlayer).textContent = scores[activePlayer]["twos-score-" + activePlayer];
    }
  })(dice);

  // THREES
  (function threes(dice) {
    let threesScore = dice.filter(num => num === 3);
    if (scores[activePlayer]["threes-score-" + activePlayer] === "") {
      if (threesScore.length === 0) {
        document.querySelector(".threes-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".threes-score-" + activePlayer).textContent = threesScore.reduce(reduce);
      };
    } else {
      document.querySelector(".threes-score-" + activePlayer).textContent = scores[activePlayer]["threes-score-" + activePlayer];
    }
  })(dice);

  // FOURS
  (function fours(dice) {
    let foursScore = dice.filter(num => num === 4);
    if (scores[activePlayer]["fours-score-" + activePlayer] === "") {
      if (foursScore.length === 0) {
        document.querySelector(".fours-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".fours-score-" + activePlayer).textContent = foursScore.reduce(reduce);
      };
    } else {
      document.querySelector(".fours-score-" + activePlayer).textContent = scores[activePlayer]["fours-score-" + activePlayer];
    }
  })(dice);

  // FIVES
  (function fives(dice) {
    let fivesScore = dice.filter(num => num === 5);
    if (scores[activePlayer]["fives-score-" + activePlayer] === "") {
      if (fivesScore.length === 0) {
        document.querySelector(".fives-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".fives-score-" + activePlayer).textContent = fivesScore.reduce(reduce);
      };
    } else {
      document.querySelector(".fives-score-" + activePlayer).textContent = scores[activePlayer]["fives-score-" + activePlayer];
    }
  })(dice);

  // SIXES
  (function sixes(dice) {
    let sixesScore = dice.filter(num => num === 6);
    if (scores[activePlayer]["sixes-score-" + activePlayer] === "") {
      if (sixesScore.length === 0) {
        document.querySelector(".sixes-score-" + activePlayer).textContent = "0";
      } else {
        document.querySelector(".sixes-score-" + activePlayer).textContent = sixesScore.reduce(reduce);
      };
    } else {
      document.querySelector(".sixes-score-" + activePlayer).textContent = scores[activePlayer]["sixes-score-" + activePlayer];
    }
  })(dice);

  // SMALL STRAIGHT
  (function smStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
      if (scores[activePlayer]["ss-score-" + activePlayer]) {
        document.querySelector(".ss-score-" + activePlayer).textContent = scores[activePlayer]["ss-score-" + activePlayer];
      } else {
        document.querySelector(".ss-score-" + activePlayer).textContent = "30";
      }
    } else {
      if (scores[activePlayer]["ss-score-" + activePlayer]) {
        document.querySelector(".ss-score-" + activePlayer).textContent = scores[activePlayer]["ss-score-" + activePlayer];
      } else {
        document.querySelector(".ss-score-" + activePlayer).textContent = "0";
      }
    }
  })(dice);

  // LARGE STRAIGHT
  (function lgStraight(dice) {

    let copy = dice.slice(0);

    copy = copy.sort();

    if (/12345|23456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
      if (scores[activePlayer]["ls-score-" + activePlayer]) {
        document.querySelector(".ls-score-" + activePlayer).textContent = scores[activePlayer]["ls-score-" + activePlayer];
      } else {
        document.querySelector(".ls-score-" + activePlayer).textContent = "40";
      }
    } else {
      if (scores[activePlayer]["ls-score-" + activePlayer]) {
        document.querySelector(".ls-score-" + activePlayer).textContent = scores[activePlayer]["ls-score-" + activePlayer];
      } else {
        document.querySelector(".ls-score-" + activePlayer).textContent = "0";
      }
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
    if (scores[activePlayer]["toak-score-" + activePlayer] === "") {
      if (toak.length) {

        document.querySelector(".toak-score-" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.querySelector(".toak-score-" + activePlayer).textContent = "0";
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
    if (scores[activePlayer]["foak-score-" + activePlayer] === "") {
      if (foak.length) {

        document.querySelector(".foak-score-" + activePlayer).textContent = dice.reduce(reduce);
      } else {
        document.querySelector(".foak-score-" + activePlayer).textContent = "0";
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
    if (scores[activePlayer]["fullhouse-score-" + activePlayer] === "") {
      if (fullhouse.length == 2) {
        if (fullhouse[0].count == "2" && fullhouse[1].count == "3" || fullhouse[0].count == "3" && fullhouse[1].count == "2") {

          document.querySelector(".fullhouse-score-" + activePlayer).textContent = "25";
        } else {
          document.querySelector(".fullhouse-score-" + activePlayer).textContent = "0";
        }
      }
    } else {
      if (scores[activePlayer]["fullhouse-score-" + activePlayer]) {
        document.querySelector(".fullhouse-score-" + activePlayer).textContent = scores[activePlayer]["fullhouse-score-" + activePlayer];
      } else {
        document.querySelector(".fullhouse-score-" + activePlayer).textContent = "0"
      }
    }
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
    if (scores[activePlayer]["yahtzee-score-" + activePlayer] === "") {
      if (yahtzee.length) {

        document.querySelector(".yahtzee-score-" + activePlayer).textContent = "50";
      } else {
        document.querySelector(".yahtzee-score-" + activePlayer).textContent = "0";
      }
    } else {
      if (scores[activePlayer]["yahtzee-score-" + activePlayer]) {
        document.querySelector(".yahtzee-score-" + activePlayer).textContent = scores[activePlayer]["yahtzee-score-" + activePlayer];
      } else {
        document.querySelector(".yahtzee-score-" + activePlayer).textContent = "0";
      }
    }
  })(dice);


  // CHANCE
  (function chance(dice) {
    if (scores[activePlayer]["chance-score-" + activePlayer]) {
      document.querySelector(".chance-score-" + activePlayer).textContent = scores[activePlayer]["chance-score-" + activePlayer];
    } else {
      document.querySelector(".chance-score-" + activePlayer).textContent = dice.reduce(reduce);
    };
  })(dice);


  function reduce(a, b) {
    return a + b;
  }
}

function saveScore(e) {
  score = document.querySelector("." + e.target.name).textContent;
  scores[activePlayer][e.target.name] = score;
  e.target.classList.add("used");
  console.log(scores[activePlayer][e.target.name]);
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
  let aP = activePlayer;
  if (scores[activePlayer]["ones-score-" + aP] === "") {
    document.querySelector(".ones-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["twos-score-" + aP] === "") {
    document.querySelector(".twos-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["threes-score-" + aP] === "") {
    document.querySelector(".threes-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["fours-score-" + aP] === "") {
    document.querySelector(".fours-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["fives-score-" + aP] === "") {
    document.querySelector(".fives-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["sixes-score-" + aP] === "") {
    document.querySelector(".sixes-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["toak-score-" + aP] === "") {
    document.querySelector(".toak-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["foak-score-" + aP] === "") {
    document.querySelector(".foak-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["fullhouse-score-" + aP] === "") {
    document.querySelector(".fullhouse-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["ss-score-" + aP] === "") {
    document.querySelector(".ss-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["ls-score-" + aP] === "") {
    document.querySelector(".ls-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["yahtzee-score-" + aP] === "") {
    document.querySelector(".yahtzee-score-" + aP).textContent = "0";
  }
  if (scores[activePlayer]["chance-score-" + aP] === "") {
    document.querySelector(".chance-score-" + aP).textContent = "0";
  };
}

function globalScore() {
  // for (let i = 0; i < scores[0].length; i++) {
  //   p1Score += scores[0][i];
  //   return p1Score;
  // }

}

function gameOver() {
  console.log("End of Game!");
  document.querySelector(".btn-roll-0").classList.add("hidden");
}
