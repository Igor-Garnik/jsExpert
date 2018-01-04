"use strict";
(function run(){
	var btn = document.getElementById("play");
	var player1 = document.getElementById("player1");
	var player2 = document.getElementById("player2");
	var result = document.getElementById("result")

	function getPlayerResult() {
	    return Math.floor((Math.random() * 3) + 1);
	}

	function getNameById(result){
		var word = "";

		if(result === 1){
			word = "камень";
		} else if (result === 2){
			word = "ножницы";
		} else {
			word = "бумага";
		}
		return word;
	}

	function determinWinner(num1,num2){
		var winner;
		if(num1 ===1 && num2 ===2 || num1 === 1 && num2 === 3 || num1 === 2 && num2 === 3){
			winner = 1;
		}else if (num1 === 3 && num2 === 1 || num1 === 3 && num2 === 2 || num1 === 2 && num2 === 1) {
			winner = 2;
		}else{
			winner = null;
		}
		return winner;
	}

	function printResult(player){
		if(player === 1){
			return result.innerHTML = "Выиграл первый игрок!"
		}else if (player === 2){
			return result.innerHTML = "Выиграл второй игрок!"
		}else{
			return result.innerHTML = "Ничья!"
		}
	}

	function runGame() {
		var playerRes1 = getPlayerResult(),
			playerRes2 = getPlayerResult();

	    
	    player1.innerHTML = getNameById(playerRes1);
	    player2.innerHTML = getNameById(playerRes2);

	    printResult(determinWinner(playerRes1, playerRes2));    
	}

	btn.addEventListener("click", runGame);
})();