var Game = require("./game.js");

var Game = new Game();
Game.startGame();
Game.showFurry();
Game.showCoin();


var overButton = document.querySelector(".try_again");
    overButton.addEventListener("click", function(event){
        event.preventDefault();
        var over = document.querySelector("#over");
        over.classList.toggle("invisible");
        location.reload()
    });
