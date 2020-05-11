let activePlayer, scores;

initGame();

document.querySelector("#btn-roll-0").addEventListener("click", function(){
  diceRoll()
  console.log(dice1, dice2, dice3, dice4, dice5, dice6);
  document.querySelector(".dice-1").src = "./images/dice-" + dice1 + ".png";
  document.querySelector(".dice-2").src = "./images/dice-" + dice2 + ".png";
  document.querySelector(".dice-3").src = "./images/dice-" + dice3 + ".png";
  document.querySelector(".dice-4").src = "./images/dice-" + dice4 + ".png";
  document.querySelector(".dice-5").src = "./images/dice-" + dice5 + ".png";
  document.querySelector(".dice-6").src = "./images/dice-" + dice6 + ".png";
})


function diceRoll() {
  return (
    dice1 = (Math.floor(Math.random() * 6) + 1),
    dice2 = (Math.floor(Math.random() * 6) + 1),
    dice3 = (Math.floor(Math.random() * 6) + 1),
    dice4 = (Math.floor(Math.random() * 6) + 1),
    dice5 = (Math.floor(Math.random() * 6) + 1),
    dice6 = (Math.floor(Math.random() * 6) + 1)
  )
}

function initGame() {
  activePlayer = 0;
  scores = [0,0];
  removeUsed();

  // Reset the active player to P1 (0) 
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}

function removeUsed() {
  var elems = document.querySelectorAll(".btn-score");
  [].forEach.call(elems, function(el) {
    el.classList.remove("used");
  });
}
