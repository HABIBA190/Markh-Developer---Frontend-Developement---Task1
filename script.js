let currentPlayer = "X"; 
let gameBoard = ["", "", "", "", "", "", "", "", ""]; 
let gameOver = false;
let player1Name = "";
let player2Name = "";
let currentPlayerName = "";

const cells = document.querySelectorAll(".cell");
const resultDiv = document.getElementById("result");
const currentPlayerDiv = document.getElementById("current-player");
const gameDiv = document.getElementById("game");
const nameEntryDiv = document.getElementById("name-entry");

function startGame() {
    player1Name = document.getElementById("player1-name").value.trim();
    player2Name = document.getElementById("player2-name").value.trim();

    if (player1Name === "" || player2Name === "") {
        alert("Please enter names for both players.");
        return;
    }

    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayerName = player1Name;

    nameEntryDiv.style.display = "none";
    gameDiv.style.display = "block";

    updateCurrentPlayerDisplay();
    resetGame();
}

function handleClick(event) {
    const index = event.target.getAttribute("data-cell");

    if (gameBoard[index] !== "" || gameOver) {
        return;
    }

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        resultDiv.textContent = `${currentPlayerName} Wins!`;
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== "")) {
        resultDiv.textContent = "It's a Draw!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
        updateCurrentPlayerDisplay();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultDiv.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

function updateCurrentPlayerDisplay() {
    currentPlayerDiv.textContent = `${currentPlayerName}'s Turn (${currentPlayer})`;
}

function startOver() {
    
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultDiv.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });

    
    nameEntryDiv.style.display = "block";
    gameDiv.style.display = "none";
}

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});
