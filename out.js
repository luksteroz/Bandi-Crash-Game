/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(3);
var Trap = __webpack_require__(4);
var Bandi = __webpack_require__(2);


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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Bandi() {
    this.x =0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Bandi;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin(){
    this.x = Math.floor((Math.random() * 10));
    this.y = Math.floor((Math.random() * 10));
}
// function Trap() {
//     this.x = Math.floor(Math.random()*10);
//     this.y = Math.floor(Math.random()*10);
// }

module.exports = Coin;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Trap() {
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}

module.exports = Trap;


/***/ })
/******/ ]);