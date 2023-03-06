let isGameFinished;
let userPoints;

const buttonPlayEl = document.getElementById("btn-new-game");

buttonPlayEl.addEventListener("click", function() {
    newGame("game-table", "score", "level");
});





// -------------------------- FUNCTIONS -----------------------------------------

/**
 * Dati gli IDs di game-table, score e level-input, crea una nuova partita di Campo Minato.
 * @param {text} gameTableId
 * @param {text} scoreId
 * @param {text} levelInputId
 */
function newGame(gameTableId, scoreId, levelInputId) {
    // Resetto le variabili isGameFinisced e userPoints
    isGameFinished = false;
    userPoints = 0;

    // Inizializzo il campo di gioco
    let gameTableEl = initGameTable(gameTableId);

    // Inizializzo il punteggio di gioco
    let scoreEl = initScore(scoreId);

    // Acquisisco il numero di celle necessarie in base al livello di gioco scelto
    const levelEl = document.getElementById(levelInputId);
    let numSquares = getNumSquaresByLevel(levelEl.value);
    
    // Trasformo 16 celle casuali in bombe e memorizzo la lista
    const bombs = generateBombs(numSquares, 16);

    // Compongo il piano di gioco
    generateGame(gameTableEl, scoreEl, numSquares, bombs);
}

/**
 * Svuota il contenuto del campo di gioco che ha ID=gameTableId e ritorna il riferimento al campo.
 * @param {text} gameTableId
 * @returns {HTMLElement}
 */
function initGameTable(gameTableId) {
    const gameTableEl = document.getElementById(gameTableId);

    gameTableEl.innerHTML = "";
    gameTableEl.style.filter = "";

    return gameTableEl;
}

/**
 * Rende invisibile il tabellone di punteggio che ha ID=scoreId e ritorna il riferimento al tabellone.
 * @param {text} scoreId
 * @returns {HTMLElement}
 */
function initScore(scoreId) {
    const scoreEl = document.getElementById(scoreId);
    
    scoreEl.style.display = "none";

    return scoreEl;
}

/**
 * Ritorna il numero di celle di gioco in base al livello di gioco scelto.
 * @param {number} level
 * @returns {number}
 */
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

/**
 * Genera una quantità numBombs di bombe pseudo casuale tutte diverse tra loro a scelta tra le celle totali di gioco e ritorna la lista di bombe.
 * @param {number} numSquares
 * @param {number} numBombs
 * @returns {number[]}
 */
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
 * Genera un numero pseudo casuale compreso tra min e max.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * A partire dal riferimento del campo di gioco, dal riferimento del tabellone di punteggio, dal numero di celle totali di gioco e dalla lista di bombe, popola il nuovo campo di gioco.
 * @param {HTMLElement} gameTableEl
 * @param {HTMLElement} scoreEl
 * @param {number} numSquares
 * @param {number[]} bombs
 */
function generateGame(gameTableEl, scoreEl, numSquares, bombs) {
    // Calcola il numero di quadrati per riga come la radice quadrata della quantità di quadrati totali
    let numSquaresPerRow = Math.sqrt(numSquares);

    for(let i = 1; i <= numSquares; i++) {
        // Creo un nuovo quadrato con all'interno il numero i
        const newSquareEl = generateSquare(numSquaresPerRow, i);

        // SE il nuovo quadrato fa parte della lista di bombe
        //  - Gli assegno la classe "bomb"
        if(bombs.includes(i)) {
            newSquareEl.classList.add("bomb");
        }

        // Inserisco il nuovo quadrato nel campo di gioco
        gameTableEl.append(newSquareEl);

        // Al click sul quadrato:
        // SE il gioco non è terminato:
        //  - Aggiungo la classe active al quadrato cliccato
        //  - Stampo in console il numero del quadrato cliccato
        //  - SE il quadrato cliccato fa parte della lista di bombe:
        //      - Termino la partita in sconfitta
        //      - Mostro tutte le bombe presenti sul campo
        //  - ALTRIMENTI:
        //      - Incremento il punteggio dell'utente di 1
        //      - SE il punteggio ha raggiunto (numero di quadrati - numero bombe) termino la partita in vittoria
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

/**
 * Crea un nuovo quadrato di lato numSquaresPerRow con all'interno il text e ritorna il riferimento al quadrato.
 * @param {number} numSquaresPerRow
 * @param {text} text
 * @returns {HTMLElement}
 */
function generateSquare(numSquaresPerRow, text) {
    let newEl = document.createElement("div");

    newEl.classList.add("square");
    newEl.style.width = "calc(100% / " + numSquaresPerRow + ")";
    newEl.style.height = "calc(100% / " + numSquaresPerRow + ")";
    newEl.innerText = text;

    return newEl;
}

/**
 * Termina la partita, sfoca il campo di gioco e mostra il punteggio finale.
 * @param {HTMLElement} gameTableEl
 * @param {HTMLElement} scoreEl
 * @param {text} text
 */
function endGame(gameTableEl, scoreEl, text) {
    isGameFinished = true;

    gameTableEl.style.filter = "blur(5px)";
                        
    scoreEl.innerHTML = "<strong>" + text + "</strong><div>Il tuo punteggio è: " + userPoints + "</div>";
    scoreEl.style.display = "block";
}

/**
 * Rende visibili tutte le bombe presenti sul campo di gioco.
 */
function showBombs() {
    let bombSquares = document.querySelectorAll(".bomb");

    for(let i = 0; i < bombSquares.length; i++) {
        bombSquares[i].classList.add("active");
    }
}