const buttonPlayEl = document.getElementById("btn-new-game");

buttonPlayEl.addEventListener("click", function() {
    newGame();
});





// -------------------------- FUNCTIONS -----------------------------------------

function newGame() {
    const gameTableEl = document.getElementById("game-table");
    gameTableEl.innerHTML = "";
    
    const levelEl = document.getElementById("level");
    let numSquares;
    if(levelEl.value == "1") {
        numSquares = 100;
    }
    else if (levelEl.value == "2") {
        numSquares = 81;
    }
    else {
        numSquares = 49;
    }

    generateAndShowSquares(gameTableEl, numSquares);
}

function generateAndShowSquares(gameTableEl, numSquares) {
    let squareSize = Math.sqrt(numSquares);

    for(let i = 1; i <= numSquares; i++) {

        const newSquareEl = generateSquare(squareSize);
        newSquareEl.innerText = i;
        gameTableEl.append(newSquareEl);

        newSquareEl.addEventListener("click", function() {
            console.log(i);
            newSquareEl.style.backgroundColor = "lightblue";
        });
        
    }
}

function generateSquare(squareSize) {
    let newEl = document.createElement("div");

    newEl.classList.add("square");
    newEl.style.width = "calc(100% / " + squareSize + ")";
    newEl.style.height = "calc(100% / " + squareSize + ")";

    return newEl;
}