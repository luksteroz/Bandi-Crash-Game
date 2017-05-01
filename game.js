var Coin = require("./coin.js");
var Trap = require("./trap.js");
var Bandi = require("./bandi.js");


var level = 4;


function Game() {
    var board = document.querySelectorAll("#board div");
    var score = document.querySelector("#score strong");
    var over = document.querySelector("#over");

    this.board = board;
    this.bandi= new Bandi();
    this.coin = new Coin();
    this.trap = new Trap();
    this.score = 0;
    this.index = function(x,y) {
      return x + (y * 10);
    }

    var self = this;
    this.showBandi = function(){
    this.board[this.index(this.bandi.x,this.bandi.y) ].classList.add('bandi');
    }

    this.hideVisibleBandi = function(){
        var clearBandi = document.querySelector('.bandi')
        clearBandi.classList.remove("bandi");
    }

    this.showCoin = function(){
        if (this.board[ this.index(this.coin.x,this.coin.y) ].classList != "trap") {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
        }else {
            console.log("jest TAKA SAMA JAK TRAP!!!!");
            this.coin = new Coin();
            this.showCoin();
        }

    }

    this.showTrap = function(){
        // this.trapTime = setTimeout(function () {
        if(this.board[ this.index(this.trap.x,this.trap.y) ].classList != "coin") {
        this.board[ this.index(this.trap.x,this.trap.y) ].classList.add('trap');
        console.log(this.board[ this.index(this.trap.x,this.trap.y) ].classList);
        }
    // }, 500);
    }
    this.clearTrap = function(){
        console.log("clear działa");
        var clearTrap = document.querySelectorAll('.trap')
        if (clearTrap.length > level) {
            for (var i = 0; i < clearTrap.length; i++) {
                clearTrap[i].classList.remove("trap");
            }
            level = level + 2;
        }
    }


    this.moveBandi = function(){
        if(this.bandi.direction === "right"){
            this.bandi.x = this.bandi.x + 1;
        }else if (this.bandi.direction === "left"){
            this.bandi.x = this.bandi.x - 1;
        }else if (this.bandi.direction === "up"){
            this.bandi.y = this.bandi.y - 1;
        }else if (this.bandi.direction === "down"){
            this.bandi.y = this.bandi.y + 1;
        }
        this.gameOver();
        this.hideVisibleBandi();
        this.showBandi();
        this.checkCoinCollision();
    }

    this.turnBandi = function(event){
        switch (event.which) {
            case 37:
                this.bandi.direction = 'left';
                break;
            case 38:
                this.bandi.direction = 'up';
                break;
            case 39:
                this.bandi.direction = 'right';
                break;
            case 40:
                this.bandi.direction = 'down';
                break;
        }
    }

    this.checkCoinCollision = function(){
        var coinDisplay = document.querySelector(".coin")

        if((this.board[this.index(this.bandi.x,this.bandi.y) ].classList.length == 2) ) {

            coinDisplay.classList.remove("coin");
            console.log("zderzenie");
            this.score++;
            score.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            this.trap = new Trap();
            this.showTrap();
            this.clearTrap();
        }
    }
    document.addEventListener('keydown', function(event){
        self.turnBandi(event);
    });

    this.gameOver = function (){
        if (this.bandi.x<0||this.bandi.x>9||this.bandi.y<0||this.bandi.y>9 || ((this.trap.x == this.bandi.x) && (this.trap.y == this.bandi.y))) {
            clearInterval(this.idSetInterval, this.trapInterval);
            over.classList.remove("invisible");
            over.children[1].firstElementChild.innerText = this.score;
        }
    }
    this.startGame = function(){
        this.idSetInterval = setInterval(function () {
            self.moveBandi();
        }, 250);

    }
}

module.exports = Game;
