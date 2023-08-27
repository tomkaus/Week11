// Selecting all cell elements on the game board
const cells = document.querySelectorAll(".cell");

// Selecting elements for status text and restart button
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// Arrays representing all possible winning conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Array to keep track of player choices
let options = ["", "", "", "", "", "", "", "", ""];

// Current player' turn (starts with X)
let currentPlayer = "X";

//Flag to indicates the game is running
let running = false;

// Initializing the game
initializeGame();

//Function1 to initialize the game
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

//Function2 to handle cell click
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    //if cell is already chosen or the game is not running, exit
    if(options[cellIndex] != "" || !running){
        return;
    }
    //Update the cell and check for a winner
    updateCell(this, cellIndex);
    checkWinner();
}

//Function3 to update the cell with the current player's choice
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

//Function4 to switch to the other player
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

//Function5 to check if there's a winner or a draw
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

//Function6 restarts the game
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
