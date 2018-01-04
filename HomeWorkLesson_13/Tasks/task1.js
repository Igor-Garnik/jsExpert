"use strict"
let onBranch = "На ветке сидит ";
			
function getArrey(count){

	var array = String(count).split("");	//Преобразование числа в массив
	
	for(let i = 0; i < array.length; i++){

		let numbers = array.length - 1,		//Количество введеных чисел.
				lastNumber = (array[numbers]);   //Номинал последнего числа.

		if(lastNumber < 2) {
			console.log(onBranch + count + " ворона.");
		} else if (lastNumber > 1 && lastNumber < 5){
			console.log(onBranch + count + " вороны.");
		} else {
			console.log(onBranch + count + " ворон.");
		}
	}
}

getArrey(3);