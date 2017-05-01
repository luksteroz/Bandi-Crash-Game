var Game = require("./game.js");

var Game = new Game();
Game.startGame();
Game.showBandi();
Game.showCoin();

function tryAgain(){
    var overButton = document.querySelector(".try_again");
        overButton.addEventListener("click", function(event){
            event.preventDefault();
            var over = document.querySelector("#over");
            over.classList.toggle("invisible");
            location.reload()
        });
}
