let activePlayer, scores, dice, rollCount, finalDice, roundScore, tempDice;


initGame();

document.querySelector(".btn-roll-0").addEventListener("click", function(){
  console.log("roll button clicked");
  //check roll count
  if (rollCount < 5){
    diceRoll();

    for (let i = 0; i < dice.length; i++){
      document.querySelector(".dice-" + i).src = "./images/dice-" + dice[i] + ".png";
    }
  } else {
    rollCount = 0;
    toggleActive();
  }
})

document.querySelector(".btn-roll-1").addEventListener("click", function(){
  console.log("roll button clicked");
  //check roll count
  if (rollCount < 5){
    diceRoll();
    for (let i = 0; i < dice.length; i++){
      document.querySelector(".dice-" + i).src = "./images/dice-" + dice[i] + ".png";
    }
  } else {
    rollCount = 0;
    toggleActive();

  }
})

document.querySelectorAll(".dice").forEach(dice => {
  dice.addEventListener("click", e => {
    e.target.classList.toggle("active-dice");
    console.log(e.target);
  })
});


function diceRoll() {
  for (let i = 0; i < 6; i++) {
    if (document.querySelector(".dice-" + i).classList.contains("active-dice")) {
      continue
    } else {
      dice[i] = (Math.floor(Math.random() * 6));
    }
  }
      rollCount++;
      console.log(dice);
      return dice, rollCount;

}

function initGame() {
  activePlayer = 0;
  scores = [0,0];
  rollCount = 0;
  dice = [0,0,0,0,0,0];
  removeUsed();
  removeActiveDice();

  // Reset the active player to P1 (0)
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Hide P2 (1) Roll button
  document.querySelector(".btn-roll-1").classList.add("hidden");

};

function removeUsed() {
  var elems = document.querySelectorAll(".btn-score");
  [].forEach.call(elems, function(el) {
    el.classList.remove("used");
  });
};

function removeActiveDice() {
  var elems = document.querySelectorAll(".dice");
  [].forEach.call(elems, function(el) {
    el.classList.remove("active-dice");
  });
};

function toggleActive() {
  activePlayer =  activePlayer ? 0 : 1;
  console.log(activePlayer);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  if (activePlayer == 0){
    document.getElementById("btn-roll-1").disabled = true;
    document.querySelector(".btn-roll-1").classList.add("hidden");
    document.querySelector(".btn-roll-0").classList.remove("hidden");
  } else {
    document.getElementById("btn-roll-0").disabled = true;
    document.querySelector(".btn-roll-0").classList.add("hidden");
    document.querySelector(".btn-roll-1").classList.remove("hidden");
  }

};

// function calcScore() {
//
//   roundScore = tempDice.reduce((a, b) => {
//     return a + b;
//   }, 0);
//   // for (let i = 0; i < tempDice.length; i++){
//   //   roundScore = roundScore + tempDice[i];
//   // }
//   console.log(dice);
//   console.log(roundScore);
// }
