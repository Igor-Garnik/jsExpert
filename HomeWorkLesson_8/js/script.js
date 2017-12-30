var first, 
	second,
	total = 0, 
	result = "",
	output = document.getElementById("result");

for (let i = 0; i <= 15; i++){
	if(i == 8 || i == 13){
		continue;
	}

	first = Math.floor((Math.random() * 6) + 1);
	second = Math.floor((Math.random() * 6) + 1);

	result += "Первая кость: " + first + "Вторая кость: " + second + " " + "<br>";

	if(first === second){
		result += "Выпал дубль. Число: " + first + "<br>";
	}

	if(first < 3 && second > 4){
		result += "Большой разброс между костями. Разница составляет " + Math.abs(first - second) + "<br>";
	}

	total += first + second;
}
result += ((total > 100)? "Победа, вы набрали очков":"Вы проигралиб у Вас") + total + "очков!";
output.innerHTML = result;