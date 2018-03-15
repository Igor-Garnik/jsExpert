"use strict";
let createGallary = (function(){
	const btn = document.getElementById("play");
	const block = document.querySelector('#first-line');
	const abc = document.querySelector('#abc');
	const zyx = document.querySelector('#zyx');
	const first = document.querySelector('#first');
	const last = document.querySelector('#last');
	const date = document.querySelector("#date");
	const name = document.querySelector("#name");
	const quantity = document.querySelector('#quantity');

	let counter = 0;
	let amount = [];
	let result = [];

	let runEventListeners = () => {
		btn.addEventListener("click", init);
		block.addEventListener("click", deleteItem);
		abc.addEventListener("click", determineSortMethod);
	 	zyx.addEventListener("click", determineSortMethod);
	 	first.addEventListener("click", determineSortMethod);
	 	last.addEventListener("click", determineSortMethod);
	}
//Проверка и установка значения в local storfge
	let checkLocalStorage = () => (localStorage.length === 0) ? localStorage.setItem("method", "abc") : determineBtnText(localStorage.getItem("method"));

	let determineBtnText = (method) =>{
    		switch(method){
	             case "abc" : name.innerHTML = abc.innerText;
	                   break;
	             case "zyx" : name.innerHTML = zyx.innerText;
	                   break;
	             case "first" : date.innerHTML = first.innerText;
	                   break;
	             case "last" : date.innerHTML = last.innerText;
	             default : return;
             }
    	}
		
//Установка счетчика
	let getCounter = () => {
		let length = data.length;
		if (counter < length) {
			counter++;
		} else if (counter = length) { 
			counter;
		}
		return counter;
	}

//Вывод галереи
	let buildGallary = (array) => {
             let stringResult = "";
             array.map(item => {
                  return stringResult += 
                  `<div class="col-sm-3 col-xs-6" ${item.id}>\
                    <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
                    <div class="info-wrapper">\
                      <div class="text-muted">Изображение № ${item.id}</div>
                      <div class="text-muted top-padding">${item.name}</div>\
                      <div class="text-muted">${item.description}</div>\
                      <div class="text-muted bottom-padding">${item.date}</div>\
                      <div class="btn btn-success" id="delete" number="${item.id}">Удалить элемент</div>\
                    </div>\
                  </div>`;
                })
             block.innerHTML = stringResult;     
      }  
	
//Определениеметода сортировки
	let determineSortMethod = (event) => {
		event.preventDefault();
		let btnTarget = event.target.closest("div").children[0];
	       btnTarget.innerHTML = event.target.innerText;
	   	let methodClass = event.target.getAttribute("date-type");
		localStorage.setItem("method", methodClass);
		buildGallary(transformData.applyMethod(methodClass, result)); 
		showMessages(); 
	}

//Удаление элементов и перенос в конец массива
	let deleteElement = (array) => {
		 let element = parseInt(event.target.getAttribute("number"));
		 array.forEach((item, arr) => {
			if (item.id === element) {
				array.splice(arr,1);
				amount.push(element);
				counter--;
			}
		})
		 return array;
	}
	let deleteItem = () => buildGallary(deleteElement(result));

	let moveDeletedItem = (array, amount) =>{
		let deletedObject = [];
		amount.forEach((elem) => {
			array.forEach((item) => {
				if (item.id == elem) {
					deletedObject = array;
					array.splice(item,1);
					array = array.concat(deletedObject);
				}  
			})    
		})
		return array;
	}   

//Модальное окно, смена цвета кнопки и количество показаных картинок
	let setQuantity = (counter) => quantity.innerHTML = `Добавлено картинок: ${counter}`;
	let changeBtnColor = (counter) => (counter === 10) ? btn.setAttribute("style", "background-color:grey") : btn.removeAttribute("style"); 
	let showModal = (counter) => {
		if (counter === 10) {
			$("#myModal").modal('show');
		}
	}
	
	let showMessages = () => {
		setQuantity(counter);
		changeBtnColor(counter);
		showModal (counter)
	}

	let init = () => {
		let method = localStorage.getItem("method")
		let editArray = transformData.applyMethod(method, transformData.modifyArray(data));
		result = transformData.cutEditArray(transformData.chooseArr(editArray, amount),getCounter());
		buildGallary(result);
		showMessages();
	}  

//Запуск приложения
	checkLocalStorage();
	runEventListeners();

	return{
		moveDeletedItem : moveDeletedItem
	}

})()