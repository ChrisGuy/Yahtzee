let activePlayer, scores, dice, rollCount, finalDice, tempDice, chanceScore, onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, smallStraight;


initGame();

document.querySelector(".btn-roll-0").addEventListener("click", function(){
  console.log("roll button clicked");
  showDice();
  //check roll count
  if (rollCount <= 500){
    diceRoll();
    for (let i = 1; i < dice.length; i++){
      document.querySelector(".dice-" + i).src = "./images/dice-" + dice[i] + ".png";
    }
    calcScore();
  } else {
    calcScore();
    rollCount = 0;
    toggleActive();
  }
})

document.querySelector(".btn-roll-1").addEventListener("click", function(){
  console.log("roll button clicked");
  showDice();
  //check roll count
  if (rollCount < 500){
    diceRoll();
    for (let i = 1; i < dice.length; i++){
      document.querySelector(".dice-" + i).src = "./images/dice-" + dice[i] + ".png";
    }
    calcScore();
  } else {
    calcScore();
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
  scores = [
    {
      ones: "",
      twos: "",
      threes: "",
      fours: "",
      fives:  "",
      sixes: "",
      toak: "",
      foak: "",
      fh: "",
      ss: "",
      ls: "",
      yahtzee: "",
      chance: ""
    },
  {
    ones: "",
    twos: "",
    threes: "",
    fours: "",
    fives:  "",
    sixes: "",
    toak: "",
    foak: "",
    fh: "",
    ss: "",
    ls: "",
    yahtzee: "",
    chance: ""
  }
];
  rollCount = 0;
  dice = [0, 1, 2, 3, 4, 5];

  hideDice();
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
  let elems = document.querySelectorAll(".btn-score");
  [].forEach.call(elems, function(el) {
    el.classList.remove("used");
  });
};

function removeActiveDice() {
  let elems = document.querySelectorAll(".dice");
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

  removeActiveDice();

};

function calcScore() {
  threeOfAKind(dice);
  fourOfAKind(dice);
  yahtzee(dice);
  fullhouse(dice);
  smStraight(dice);
  lgStraight(dice);

// ONES
  onesScore = dice.filter(num => num === 1);

  if (onesScore.length === 0){
  document.querySelector(".ones-score-" + activePlayer).textContent = "0";
} else {
  document.querySelector(".ones-score-" + activePlayer).textContent = onesScore.reduce(reduce);
};

// TWOS
twosScore = dice.filter(num => num === 2);

if (twosScore.length === 0){
document.querySelector(".twos-score-" + activePlayer).textContent = "0";
} else {
document.querySelector(".twos-score-" + activePlayer).textContent = twosScore.reduce(reduce);
};

// THREES
threesScore = dice.filter(num => num === 3);
if (threesScore.length === 0){
document.querySelector(".threes-score-" + activePlayer).textContent = "0";
} else {
document.querySelector(".threes-score-" + activePlayer).textContent = threesScore.reduce(reduce);
};

// FOURS
foursScore = dice.filter(num => num === 4);
if (foursScore.length === 0){
document.querySelector(".fours-score-" + activePlayer).textContent = "0";
} else {
document.querySelector(".fours-score-" + activePlayer).textContent = foursScore.reduce(reduce);
};

// FIVES
fivesScore = dice.filter(num => num === 5);
if (fivesScore.length === 0){
document.querySelector(".fives-score-" + activePlayer).textContent = "0";
} else {
document.querySelector(".fives-score-" + activePlayer).textContent = fivesScore.reduce(reduce);
};

// SIXES
sixesScore = dice.filter(num => num === 6);
if (scores[activePlayer].sixes === "") {
  if (sixesScore.length === 0){
  document.querySelector(".sixes-score-" + activePlayer).textContent = "0";
  } else {
  document.querySelector(".sixes-score-" + activePlayer).textContent = sixesScore.reduce(reduce);
  };
} else {
  document.querySelector(".sixes-score-" + activePlayer).textContent = scores[activePlayer].sixes;
}


// SMALL STRAIGHT
function smStraight(dice) {

  let copy = dice.slice(0);

  copy = copy.sort();

  if (/1234|2345|3456/.test(copy.join("").replace(/(.)\1/,"$1"))) {
    if (scores[activePlayer].ss === "") {
      document.querySelector(".ss-score-" + activePlayer).textContent = "30";
    } else {
      document.querySelector(".ss-score-" + activePlayer).textContent = scores[activePlayer].ss;
    }
  }
  else {
    document.querySelector(".ss-score-" + activePlayer).textContent = "0";
    }
};

// LARGE STRAIGHT
function lgStraight(dice) {

  let copy = dice.slice(0);

  copy = copy.sort();

  if (/12345|23456/.test(copy.join("").replace(/(.)\1/,"$1"))) {
    if (scores[activePlayer].ss === "") {
      document.querySelector(".ls-score-" + activePlayer).textContent = "40";
    } else {
      document.querySelector(".ls-score-" + activePlayer).textContent = scores[activePlayer].ls;
    }
  }
  else {
    document.querySelector(".ls-score-" + activePlayer).textContent = "0";
    }
};


// THREE OF A KIND
function threeOfAKind(dice) {

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
  if (toak.length) {

    document.querySelector(".toak-score-" + activePlayer).textContent = dice.reduce(reduce);
  } else {
    document.querySelector(".toak-score-" + activePlayer).textContent = "0";
  }

};

// FOUR OF A KIND
function fourOfAKind(dice) {

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
  if (foak.length) {

    document.querySelector(".foak-score-" + activePlayer).textContent = dice.reduce(reduce);
  } else {
    document.querySelector(".foak-score-" + activePlayer).textContent = "0";
  }

};

// FULLHOUSE
function fullhouse(dice) {

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
  if (fullhouse.length == 2){
    if (fullhouse[0].count == "2" && fullhouse[1].count == "3" || fullhouse[0].count == "3" && fullhouse[1].count == "2") {

      document.querySelector(".fullhouse-score-" + activePlayer).textContent = "25";
    } else {
      document.querySelector(".fullhouse-score-" + activePlayer).textContent = "0";
    }
  }
};


// YAHTZEE
function yahtzee(dice) {

	let yahtzee = [];
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

		if (myCount > 4) {
			let a = new Object();
			a.count = myCount;
			yahtzee.push(a);
		}
	}
  if (yahtzee.length) {

    document.querySelector(".yahtzee-score-" + activePlayer).textContent = "50";
  } else {
    document.querySelector(".yahtzee-score-" + activePlayer).textContent = "0";
  }

};


// CHANCE
chanceScore = dice.reduce(reduce);
document.querySelector(".chance-score-" + activePlayer).textContent = chanceScore;


  function reduce(a, b) {
    return a + b;
  }
}
