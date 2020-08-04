const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const SYMBOL_CLASSES = ['far fa-hand-rock', 'far fa-hand-paper', 'far fa-hand-scissors'];
const PLAYER_WIN_CLASS = 'far fa-arrow-alt-circle-left';
const COMP_WIN_CLASS = 'far fa-arrow-alt-circle-right';
const NO_WINNER_CLASS = 'fas fa-ban';

document.querySelectorAll('button').forEach(btn => btn.addEventListener("click", playOneRound));

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

function checkAndUpdateWinner(playerMove, computerMove)
{
  let playerIcon = document.querySelector('#player-mv-icon');
  let playerScore = document.querySelector('#player-score');
  playerIcon.classList = SYMBOL_CLASSES[playerMove];

  let computerIcon = document.querySelector('#comp-mv-icon');
  let computerScore = document.querySelector('#computer-score');
  computerIcon.classList = SYMBOL_CLASSES[computerMove];

  let winnerIcon = document.querySelector('#winner-icon');
  if (playerMove == computerMove)
    winnerIcon.classList = NO_WINNER_CLASS;
  else if ((playerMove == ROCK && computerMove == SCISSORS)
        || (playerMove == PAPER && computerMove == ROCK)
        || (playerMove == SCISSORS && computerMove == PAPER))
  {
    winnerIcon.classList = PLAYER_WIN_CLASS;
    playerScore.textContent++;
    
    if (playerScore.textContent == 5)
      alert("You won!");
  }
  else
  {
    winnerIcon.classList = COMP_WIN_CLASS;
    computerScore.textContent++;

    if (computerScore.textContent == 5)
      alert("Suck it.");
  }
}