let isGameFinished;
let userPoints;

const buttonPlayEl = document.getElementById("btn-new-game");

buttonPlayEl.addEventListener("click", function() {
    newGame("game-table", "score", "level");
});





// -------------------------- FUNCTIONS -----------------------------------------

function newGame(gameTableId, scoreId, levelInputId) {
    isGameFinished = false;
    userPoints = 0;

    let gameTableEl = initGameTable(gameTableId);
    let scoreEl = initScore(scoreId);

    const levelEl = document.getElementById(levelInputId);
    let numSquares = getNumSquaresByLevel(levelEl.value);
    
    const bombs = generateBombs(numSquares, 16);

    generateGame(gameTableEl, scoreEl, numSquares, bombs);
}

function initGameTable(gameTableId) {
    const gameTableEl = document.getElementById(gameTableId);

    gameTableEl.innerHTML = "";
    gameTableEl.style.filter = "";

    return gameTableEl;
}

function initScore(scoreId) {
    const scoreEl = document.getElementById(scoreId);
    
    scoreEl.style.display = "none";

    return scoreEl;
}

function getNumSquaresByLevel(level) {
    if(level == "1") {
        return 100;
    }
    else if (level == "2") {
        return 81;
    }
    else {
        return 49;
    }
}

function generateBombs(numSquares, numBombs) {
    const bombs = [];

    while(bombs.length < numBombs) {
        newBomb = generateRandomNumber(1, numSquares);
        if(!bombs.includes(newBomb)) {
            bombs.push(newBomb);
        }
    }

    return bombs;
}

/**
 * Genera un numero casuale compreso tra min e max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateGame(gameTableEl, scoreEl, numSquares, bombs) {
    let squareSize = Math.sqrt(numSquares);

    for(let i = 1; i <= numSquares; i++) {

        const newSquareEl = generateSquare(squareSize, i);

        if(bombs.includes(i)) {
            newSquareEl.classList.add("bomb");
        }

        gameTableEl.append(newSquareEl);

        newSquareEl.addEventListener("click", function() {
            if(!isGameFinished) {
                newSquareEl.classList.add("active");
                console.log(i);

                if(bombs.includes(i)) {
                    endGame(gameTableEl, scoreEl, "Hai perso..");
                    showBombs();
                }
                else {
                    userPoints++;
                    if(userPoints >= (numSquares - bombs.length)) {
                        endGame(gameTableEl, scoreEl, "Hai vinto!");
                    }
                }
            }
        });
        
    }
}

function generateSquare(squareSize, text) {
    let newEl = document.createElement("div");

    newEl.classList.add("square");
    newEl.style.width = "calc(100% / " + squareSize + ")";
    newEl.style.height = "calc(100% / " + squareSize + ")";
    newEl.innerText = text;

    return newEl;
}

function endGame(gameTableEl, scoreEl, text) {
    isGameFinished = true;

    gameTableEl.style.filter = "blur(5px)";
                        
    displayScore(scoreEl, text);
}

function displayScore(scoreEl, text) {
    scoreEl.innerHTML = "<strong>" + text + "</strong><div>Il tuo punteggio è: " + userPoints + "</div>";
    scoreEl.style.display = "block";
}

function showBombs() {
    let bombSquares = document.querySelectorAll(".bomb");

    for(let i = 0; i < bombSquares.length; i++) {
        bombSquares[i].classList.add("active");
    }
}