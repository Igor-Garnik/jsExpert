"use strict";
(function run(){
	var first, 
		second,
		total = 0, 
		result = "",
		resultTotal = 0;
	const output = document.getElementById("result");

	for (let i = 0; i <= 15; i++){
		if(i == 8 || i == 13){
			continue;
	}

	first = getRndNumber();
	second = getRndNumber();

	setResult("Первая кость: " + first +". " + "Вторая кость: " + second + ". " + "<br>");

	isNumberEqual(first, second);

	isBigDifference(first, second);

	total = getTotal(first,second);


	resultTotal = (((total > 100)? "Победа, вы набрали : " : "Вы проиграли у Вас : ") + total + "очков!");
}

	printResult(result);
	printResult(resultTotal);
		
	function getRndNumber(){
		return Math.floor((Math.random() * 6) + 1);
	}

	function setResult(resultString){
		return result += resultString;
	}

	function isNumberEqual(first, second){
		if(first === second){
		setResult("Выпал дубль. Число: " + first + "<br>");
		}
	}

	function isBigDifference(first, second){
		if(first < 3 && second > 4 || first >4 && second < 3){
		setResult("Большой разброс между костями. Разница составляет " + Math.abs(first - second) + "<br>");
		}
	}

	function getTotal(){
		return total += (first + second);
	}

	function getResult(){

	}

	function printResult(result){
		output.innerHTML += result;
	}

})();