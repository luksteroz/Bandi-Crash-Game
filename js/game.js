var Coin = require("./coin.js");
var Furry = require("./furry.js");

// var overButton = document.querySelector(".try_again");
//     overButton.addEventListener("click", function(event){
//         event.preventDefault();
//         console.log(this);
//         var over = document.querySelector("#over");
//         over.classList.toggle("invisible");
//         var Game = new Game();
//         Game.startGame();
//         Game.showFurry();
//         Game.showCoin();
//     });



function Game() {
    var board = document.querySelectorAll("#board div");
    var score = document.querySelector("#score strong");
    var over = document.querySelector("#over");
    this.board = board;
    this.furry= new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
      return x + (y * 10);
    }

    var self = this;
    this.showFurry = function(){
    this.board[this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }

    this.hideVisibleFurry = function(){
        var clearFurry = document.querySelector('.furry')
        clearFurry.classList.remove("furry");
    }

    this.showCoin = function(){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }

    this.moveFurry = function(){
        if(this.furry.direction === "right"){
            this.furry.x = this.furry.x + 1;
        }else if (this.furry.direction === "left"){
            this.furry.x = this.furry.x - 1;
        }else if (this.furry.direction === "up"){
            this.furry.y = this.furry.y - 1;
        }else if (this.furry.direction === "down"){
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.hideVisibleFurry();
        this.showFurry();
        this.checkCoinCollision();
    }

    this.turnFurry = function(event){
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    this.checkCoinCollision = function(){
        var coinDisplay = document.querySelector(".coin")

        if((this.board[this.index(this.furry.x,this.furry.y) ].classList.length == 2) ) {//lepiej dziala
        //if ((this.coin.x == this.furry.x) && (this.coin.y == this.furry.y)) {

            coinDisplay.classList.remove("coin");
            console.log("zderzenie");
            this.score++;
            score.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });

    this.gameOver = function (){
        if (this.furry.x<0||this.furry.x>9||this.furry.y<0||this.furry.y>9) {

            clearInterval(this.idSetInterval);
            over.classList.remove("invisible");
            over.children[1].firstElementChild.innerText = this.score;
        }
    }
    this.startGame = function(){
        this.idSetInterval = setInterval(function () {
            self.moveFurry();

        }, 250);

    }
}

module.exports = Game;
