const levelEl = document.getElementById("level");
const buttonPlayEl = document.getElementById("btn-play");

buttonPlayEl.addEventListener("click", function() {
    const playTableEl = document.getElementById("play-table");
    playTableEl.innerHTML = "";

    let numSquares;
    if(levelEl.value == "1") {
        numSquares = 100;
        widthSquare = "calc(100% / 10)";
        heightSquare = "calc(100% / 10)";
    }
    else if (levelEl.value == "2") {
        numSquares = 81;
        widthSquare = "calc(100% / 9)";
        heightSquare = "calc(100% / 9)";
    }
    else {
        numSquares = 49;
        widthSquare = "calc(100% / 7)";
        heightSquare = "calc(100% / 7)";
    }

    for(let i = 1; i <= numSquares; i++) {

        let newEl = document.createElement("div");
        newEl.classList.add("square");
        newEl.innerText = i;
        newEl.style.width = widthSquare;
        newEl.style.height = heightSquare;
        playTableEl.append(newEl);

        newEl.addEventListener("click", function() {
            console.log(i);
            newEl.style.backgroundColor = "lightblue";
        });
        
    }
});