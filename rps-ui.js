const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const SYMBOL_CLASSES = ['far fa-hand-rock', 'far fa-hand-paper', 'far fa-hand-scissors'];
const PLAYER_WIN_CLASS = 'far fa-arrow-alt-circle-left';
const COMP_WIN_CLASS = 'far fa-arrow-alt-circle-right';
const NO_WINNER_CLASS = 'fas fa-ban';

let MAX_WINS = 5;
let RNDS_INPT = document.querySelector("#rounds")
let RPS_BTNS = document.querySelectorAll('.rps-btns');

window.onload = function() {
  RNDS_INPT.value = 5;
  RNDS_INPT.addEventListener("change", disableButtons);

  RPS_BTNS.forEach(btn => {
    disableButtons();
    btn.addEventListener("click", playOneRound)
  });

  document.querySelector('#start-btn').addEventListener("click", startGame);
  document.querySelector('#player-mv-icon').addEventListener("animationend", removeAnimation);
  document.querySelector('#comp-mv-icon').addEventListener("animationend", removeAnimation);
}


/**
 * Function: disableButtons
 * Summary:  Sets "disabled" attribute on move selection
 *           buttons to prevent user from playing.
 * Used by:  Window refresh/load, round input change listener.
 * Inputs:   Event e.
 * Returns:  None.
*/
function disableButtons(e)
{
  RPS_BTNS.forEach(btn => btn.setAttribute("disabled", "disabled"));
}


/**
 * Function: startGame
 * Summary:  Gets user input for number of rounds to play, resets
 *           all scores and icons via resetGame(), and removes
 *           disabled attribute from buttons.
 * Used by:  Button listener for 'Start!' button.
 * Inputs:   Event e.
 * Returns:  None.
*/
function startGame(e)
{
  resetGame();
  MAX_WINS = document.querySelector("#rounds").value;
  RPS_BTNS.forEach(btn => btn.removeAttribute("disabled"));
}


/**
 * Function: playOneRound
 * Summary:  Gets user move selection based on button clicked, randomly
 *           selects computer move, and passes moves to checkAndUpdateWinner()
 *           for comparison.
 * Used by:  Button listeners for rock/paper/scissors move selections.
 * Inputs:   Event e.
 * Returns:  None.
*/
function playOneRound(e)
{
  let selection = e.target;
  let playerMove;

  //Make sure we have the button element, not the icon within it
  if (selection.tagName.toUpperCase() !== "BUTTON")
    selection = selection.parentElement;
  
  if (selection.id === "rock-btn")
    playerMove = ROCK;
  else if (selection.id === "paper-btn")
    playerMove = PAPER;
  else
    playerMove = SCISSORS;

  checkAndUpdateWinner(playerMove, Math.floor(Math.random() * 3));
}


/**
 * Function: checkAndUpdateWinner
 * Summary:  Updates the player-mv and computer-mv icons to reflect
 *           player & computer selections, compares player & computer
 *           selections to determine a winner, updates winner score,
 *           and checks for 'game over' condition and calls resetGame
 *           as necessary.
 * Used by:  playOneRound()
 * Inputs:   playerMove, computerMove: numerical values representing
 *           ROCK/PAPER/SCISSORS constants.
 * Returns:  None.
*/
function checkAndUpdateWinner(playerMove, computerMove)
{
  let playerIcon = document.querySelector('#player-mv-icon');
  let playerScore = document.querySelector('#player-score');
  playerIcon.classList = SYMBOL_CLASSES[playerMove];

  let computerIcon = document.querySelector('#comp-mv-icon');
  let computerScore = document.querySelector('#computer-score');
  computerIcon.classList = SYMBOL_CLASSES[computerMove];

  if (playerMove == computerMove)
  {
    playerIcon.classList += " draw-anim";
    computerIcon.classList += " draw-anim";
  }
  else if ((playerMove == ROCK && computerMove == SCISSORS)
        || (playerMove == PAPER && computerMove == ROCK)
        || (playerMove == SCISSORS && computerMove == PAPER))
  {
    playerIcon.classList +=  " win-anim";
    playerScore.textContent++;
    
    if (playerScore.textContent == MAX_WINS)
    {
      alert("You won!");
      resetGame();
    }
  }
  else
  {
    computerIcon.classList +=  " win-anim";
    computerScore.textContent++;

    if (computerScore.textContent == MAX_WINS)
    {
      alert("You lost.");
      resetGame();
    }
  }
}


/**
 * Function: resetGame
 * Summary:  Resets scores to 0 and icons to starting position.
 * Used by:  checkAndUpdateWinner()
 * Inputs:   None.
 * Returns:  None.
*/
function resetGame()
{
  let playerScore = document.querySelector('#player-score');
  let computerScore = document.querySelector('#computer-score');

  let playerIcon = document.querySelector('#player-mv-icon');
  let computerIcon = document.querySelector('#comp-mv-icon');

  playerScore.textContent = 0;
  computerScore.textContent = 0;

  playerIcon.classList = SYMBOL_CLASSES[ROCK] + " start";
  computerIcon.classList = SYMBOL_CLASSES[ROCK] + " start";
}



/**
 * Function: removeAnimation
 * Summary:  Removes the animation classes from player &
 *           computer move icons when the animations end.
 * Used by:  animation end listeners on move icons.
 * Inputs:   Event e.
 * Returns:  None.
*/
function removeAnimation(e)
{
  e.target.classList.remove("draw-anim");
  e.target.classList.remove("win-anim");
}