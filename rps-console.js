function computerPlay()
{
    let rps = ['Rock', 'Paper', 'Scissors'];
    return rps[Math.floor(Math.random() * 3)];
}

function getWinner(playerSelection, computerSelection)
{
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();
    if (playerSelection == computerSelection)
        return "draw";
    else if ((playerSelection == 'ROCK' && computerSelection == 'SCISSORS')
            || (playerSelection == 'PAPER' && computerSelection == 'ROCK')
            || (playerSelection == 'SCISSORS' && computerSelection == 'PAPER'))
        return "player";
    else
        return "computer";
}

function alertAndAwardWinner(winner, playerChoice, computerChoice)
{
    switch(winner)
    {
        case "draw":
            alert(`You both played ${playerChoice}, it's a draw!`);
            break;
        case "player":
            alert(`${playerChoice} beats ${computerChoice} - you win this round!`);
            playerPoints++;
            break;
        case "computer":
            alert(`${computerChoice} beats ${playerChoice} - you lose this round!`);
            computerPoints++;
            break;
    }
}

function game()
{
    let playerPoints = 0;
    let computerPoints = 0;

    for (let i = 0; i < 5; i++)
    {
        let playerChoice = prompt("Rock, Paper, or Scissors?");
        let computerChoice = computerPlay();

        switch(getWinner(playerChoice, computerChoice))
        {
            case "draw":
                console.log(`You both played ${playerChoice}, it's a draw!`);
                break;
            case "player":
                console.log(`${playerChoice} beats ${computerChoice} - you win this round!`);
                playerPoints++;
                break;
            case "computer":
                console.log(`${computerChoice} beats ${playerChoice} - you lose this round!`);
                computerPoints++;
                break;
        }

        console.log(`The current point tally is Player ${playerPoints} - Computer ${computerPoints}`);
    }

    console.log(`Final results: Player ${playerPoints} - Computer ${computerPoints}`)
    if (playerPoints > computerPoints)
        console.log("You win!");
    else
        console.log("You lose!");
}

game();