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
  scores = {
      p0: {
        onesScore: "",
        twosScore: "",
        threesScore: "",
        foursScore: "",
        fivesScore: "",
        sixesScore: "",
        toakScore: "",
        foakScore: "",
        fullhouseScore: "",
        ssScore: "",
        lsScore: "",
        yahtzeeScore: "",
        chanceScore: ""
      },
      p1: {
          onesScore: "",
          twosScore: "",
          threesScore: "",
          foursScore: "",
          fivesScore: "",
          sixesScore: "",
          toakScore: "",
          foakScore: "",
          fullhouseScore: "",
          ssScore: "",
          lsScore: "",
          yahtzeeScore: "",
          chanceScore: ""
        }
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
          if (scores["p" + activePlayer].onesScore === "") {
            if (onesScore.length === 0) {
              document.getElementById("onesScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("onesScore" + activePlayer).textContent = onesScore.reduce(reduce);
            };
          } else {
            document.getElementById("onesScore" + activePlayer).textContent = scores["p" + activePlayer].onesScore;
          }
        })(dice);

        // TWOS
        (function twos(dice) {
          let twosScore = dice.filter(num => num === 2);
          if (scores["p" + activePlayer].twosScore === "") {
            if (twosScore.length === 0) {
              document.getElementById("twosScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("twosScore" + activePlayer).textContent = twosScore.reduce(reduce);
            };
          } else {
            document.getElementById("twosScore" + activePlayer).textContent = scores["p" + activePlayer].twosScore;
          }
        })(dice);

        // THREES
        (function threes(dice) {
          let threesScore = dice.filter(num => num === 3);
          if (scores["p" + activePlayer].threesScore === "") {
            if (threesScore.length === 0) {
              document.getElementById("threesScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("threesScore" + activePlayer).textContent = threesScore.reduce(reduce);
            };
          } else {
            document.getElementById("threesScore" + activePlayer).textContent = scores["p" + activePlayer].threesScore;
          }
        })(dice);

        // FOURS
        (function fours(dice) {
          let foursScore = dice.filter(num => num === 4);
          if (scores["p" + activePlayer].foursScore === "") {
            if (foursScore.length === 0) {
              document.getElementById("foursScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("foursScore" + activePlayer).textContent = foursScore.reduce(reduce);
            };
          } else {
            document.getElementById("foursScore" + activePlayer).textContent = scores["p" + activePlayer].foursScore;
          }
        })(dice);

        // FIVES
        (function fives(dice) {
          let fivesScore = dice.filter(num => num === 5);
          if (scores["p" + activePlayer].fivesScore === "") {
            if (fivesScore.length === 0) {
              document.getElementById("fivesScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("fivesScore" + activePlayer).textContent = fivesScore.reduce(reduce);
            };
          } else {
            document.getElementById("fivesScore" + activePlayer).textContent = scores["p" + activePlayer].fivesScore;
          }
        })(dice);

        // SIXES
        (function sixes(dice) {
          let sixesScore = dice.filter(num => num === 6);
          if (scores["p" + activePlayer].sixesScore === "") {
            if (sixesScore.length === 0) {
              document.getElementById("sixesScore" + activePlayer).textContent = "0";
            } else {
              document.getElementById("sixesScore" + activePlayer).textContent = sixesScore.reduce(reduce);
            };
          } else {
            document.getElementById("sixesScore" + activePlayer).textContent = scores["p" + activePlayer].sixesScore;
          }
        })(dice);

        // SMALL STRAIGHT
        (function smStraight(dice) {

          let copy = dice.slice(0);

          copy = copy.sort();

          if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
            if (scores["p" + activePlayer].ssScore) {
              document.getElementById("ssScore" + activePlayer).textContent = scores["p" + activePlayer].ssScore;
            } else {
              document.getElementById("ssScore" + activePlayer).textContent = "30";
            }
          } else {
            if (scores["p" + activePlayer].ssScore) {
              document.getElementById("ssScore" + activePlayer).textContent = scores["p" + activePlayer].ssScore;
            } else {
              document.getElementById("ssScore" + activePlayer).textContent = "0";
            }
          }
        })(dice);

        // LARGE STRAIGHT
        (function lgStraight(dice) {

          let copy = dice.slice(0);

          copy = copy.sort();

          if (/12345|23456/.test(copy.join("").replace(/(.)\1/, "$1"))) {
            if (scores["p" + activePlayer].lsScore) {
              document.getElementById("lsScore" + activePlayer).textContent = scores["p" + activePlayer].lsScore;
            } else {
              document.getElementById("lsScore" + activePlayer).textContent = "40";
            }
          } else {
            if (scores["p" + activePlayer].lsScore) {
              document.getElementById("lsScore" + activePlayer).textContent = scores["p" + activePlayer].lsScore;
            } else {
              document.getElementById("lsScore" + activePlayer).textContent = "0";
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
          if (scores["p" + activePlayer].toakScore === "") {
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
          if (scores["p" + activePlayer].foakScore === "") {
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
          if (scores["p" + activePlayer].fullhouseScore === "") {
            if (fullhouse.length == 2) {
              if (fullhouse[0].count == "2" && fullhouse[1].count == "3" || fullhouse[0].count == "3" && fullhouse[1].count == "2") {

                document.getElementById("fullhouseScore" + activePlayer).textContent = "25";
              } else {
                document.getElementById("fullhouseScore" + activePlayer).textContent = "0";
              }
            }
          } else {
            if (scores["p" + activePlayer].fullhouseScore) {
              document.getElementById("fullhouseScore" + activePlayer).textContent = scores["p" + activePlayer].fullhouseScore;
            } else {
              document.getElementById("fullhouseScore" + activePlayer).textContent = "0"
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
          if (scores["p" + activePlayer].yahtzeeScore === "") {
            if (yahtzee.length) {

              document.getElementById("yahtzeeScore" + activePlayer).textContent = "50";
            } else {
              document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
            }
          } else {
            if (scores[activePlayer]["yahtzeeScore" + activePlayer]) {
              document.getElementById("yahtzeeScore" + activePlayer).textContent = scores["p" + activePlayer].yahtzeeScore;
            } else {
              document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
            }
          }
        })(dice);


        // CHANCE
        (function chance(dice) {
          if (scores["p" + activePlayer].chanceScore) {
            document.getElementById("chanceScore" + activePlayer).textContent = scores["p" + activePlayer].chanceScore;
          } else {
            document.getElementById("chanceScore" + activePlayer).textContent = dice.reduce(reduce);
          };
        })(dice);


        function reduce(a, b) {
          return a + b;
        }
      }

      function saveScore(e) {
        let target = (e.target.name).substring(0, (e.target.name).length - 1);
        score = document.getElementById(e.target.name).textContent;
        console.log(e);
        scores["p" + activePlayer][target] = score;
        e.target.classList.add("used");
        console.log(scores["p" + activePlayer][target]);
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
        if (scores["p" + activePlayer].onesScore === "") {
          document.getElementById("onesScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].twosScore === "") {
          document.getElementById("twosScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].threesScore === "") {
          document.getElementById("threesScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].foursScore === "") {
          document.getElementById("foursScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].fivesScore === "") {
          document.getElementById("fivesScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].sixesScore === "") {
          document.getElementById("sixesScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].toakScore === "") {
          document.getElementById("toakScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].foakScore === "") {
          document.getElementById("foakScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].fullhouseScore === "") {
          document.getElementById("fullhouseScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].ssScore === "") {
          document.getElementById("ssScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].lsScore === "") {
          document.getElementById("lsScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].yahtzeeScore === "") {
          document.getElementById("yahtzeeScore" + activePlayer).textContent = "0";
        };
        if (scores["p" + activePlayer].chanceScore === "") {
          document.getElementById("chanceScore" + activePlayer).textContent = "0";
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
