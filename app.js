/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scorePlayer, roundScore, activePlayer, gamePlaying, lastDice;
reset();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random math deci, display image deci sync with random number
    var deci1 = Math.floor(Math.random() * 6) + 1;
    var deci2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    // deciSelector.style.display = "block";
    document.getElementById("dice-1").src = "dice-" + deci1 + ".png";
    document.getElementById("dice-2").src = "dice-" + deci2 + ".png";
    //   console.log(deci);
    // if (deci === 6 && lastDice === 6) {
    //   scorePlayer[activePlayer] = 0;
    //   document.querySelector("#score" + activePlayer).textContent = "0";
    // } else
    if (deci1 !== 1 && deci2 !== 1) {
      roundScore += deci1 + deci2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextplayer();
    }
    lastDice = deci;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scorePlayer[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scorePlayer[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winnigScore;
    if (input) {
      winnigScore = input;
    } else {
      winnigScore = 10;
    }

    if (scorePlayer[activePlayer] >= winnigScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector("#dice-2").style.display = "none";
      document.querySelector("#dice-1").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextplayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", reset);

function nextplayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}

function reset() {
  scorePlayer = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // document.querySelector("#current-" + activePlayer).textContent = deci;
  // var x = document.querySelector("#score-0").textContent;
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
