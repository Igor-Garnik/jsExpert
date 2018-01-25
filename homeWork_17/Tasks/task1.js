var arrey = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];

let newArrey = arrey.reduce((result, item, index) => {
		result = item
		if(result == item){
			return;
		}
		return result + item;
	},0);

console.log(newArrey);
//массив который возвращает функция [1, 2, 4, 5, 7, 8, 3, 6]