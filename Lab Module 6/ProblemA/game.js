
/* Game variables */
let wins = 0;
let losses = 0;
let draws = 0;
let round = 0;
let gameStarted = false;

// Store all game results in an array
let results = [];

/* Start the game */
function startGame() {

    let name = document.getElementById("playerName").value.trim();

    // Check whether the player entered a name
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    document.getElementById("welcome").innerHTML =
        "Welcome, " + name + "!";

    // Display starting date and time
    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();

}

/* Generate computer choice */
function getComputerChoice() {

    let choices = ["rock", "paper", "scissors"];

    let randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex];
}

/* Play one round */
function playRound(playerChoice) {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    let result;

    round++;

    // Decide the winner
    if (playerChoice === computerChoice) {

        result = "Draw";
        draws++;

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {

        result = "Win";
        wins++;

    } else {

        result = "Lose";
        losses++;

    }

    // Store the result in the array
    results.push(result);

    // Change player and computer images
    document.getElementById("playerImg").src =
        playerChoice + ".jpg";

    document.getElementById("computerImg").src =
        computerChoice + ".jpg";

    // Display the result and change its colour
    let resultElement = document.getElementById("result");

    resultElement.innerHTML =
        "You chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". Result: " + result;

    if (result === "Win") {
        resultElement.style.color = "green";
    } else if (result === "Lose") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "grey";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add a new row to the history table
    document.getElementById("history").innerHTML +=
        "<tr>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + result + "</td>" +
        "</tr>";

    // Clear previous summary after a new round
    document.getElementById("summary").innerHTML = "";
}

/* Display game summary */
function showSummary() {

    let totalWins = 0;

    // Count total wins using a for loop
    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {
            totalWins++;
        }
    }

    let totalRounds = results.length;
    let percentage = 0;

    if (totalRounds > 0) {
        percentage = Math.round(
            (totalWins / totalRounds) * 100
        );
    }

    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";
}

/* Reset the game */
function resetGame() {

    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;

    results = [];
    gameStarted = false;

    // Reset scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear game history except header row
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";

    // Clear messages
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.jpg";
    document.getElementById("computerImg").src = "rock.jpg";

    document.getElementById("playerName").value = "";
}
