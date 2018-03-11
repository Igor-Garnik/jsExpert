"use strict";
(function(){
    const btn = document.getElementById("play");
    const block = document.querySelector('#first-line');
    const abc = document.querySelector('#abc');
    const zyx = document.querySelector('#zyx');
    const first = document.querySelector('#first');
    const last = document.querySelector('#last');
    const date = document.querySelector("#date");
    const name = document.querySelector("#name");
    const quantity = document.querySelector('#quantity');

    let editArray = [];
    let result = [];
    let counter = 0;
    let amount = [];
    let method = "";
//Установка и проврка localStorage*****************************************************************
	
	let setLocalStorage = (type, method) => localStorage.setItem(type, method);
    	let getLocalStorage = () => localStorage.getItem("method");
   	let checkLocalStorage = () => (localStorage.length === 0) ? setLocalStorage("method", "abc") : determineBtnText(getLocalStorage());
   		
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
//Построение галереи********************************************************************************

    let runEventListeners = () => {
        btn.addEventListener("click", init);
        block.addEventListener("click", deleteItem);
        abc.addEventListener("click", determineSortMethod);
 	 zyx.addEventListener("click", determineSortMethod);
 	 first.addEventListener("click", determineSortMethod);
 	 last.addEventListener("click", determineSortMethod);
    }
   
    let getCounter = () =>{
        let length = data.length;
        if(counter < length){
            counter++;
        }else if(counter = length){ 
            counter;
        }
        return counter;
    }

    let modifyArray = data => {
        return data.map((item) => {
            return {
                url: editUrl(item.url),
                name: editName(item.name),
                description: editDescription(item.description),
                date: editDate(item.date),
                id: item.id
            }
        })
    }  
    let editUrl = url => `http://${url}`;      
    let editName = name => name[0].toUpperCase() + name.substr(1).toLowerCase();
    let editDescription = description => (description.length > 15) ? `${description.substring(0,15)} ...` : description;     
    let editDate = date => (date !== NaN) ? moment(date).format('YYYY/MM/DD HH:mm') : "Missing Data";

    let chooseArr = (array, amount) => (amount.length === 0) ? array : moveDeletedItem(array, amount); 

    let cutEditArray = (array, counter) => array.splice(0,counter);

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

//Сортировка массива******************************************************************************************

    let sortNameAbc = (a, b) => a.name > b.name ? 1 : -1;
    let sortNameZyx = (a, b) => a.name < b.name ? 1 : -1;
    let sortDateAsc = (a, b) => a.date < b.date ? 1 : -1;
    let sortDateDesc = (a, b) => a.date > b.date ? 1 : -1;  
   
    
    let determineSortMethod = (event) => {
    	event.preventDefault();
    	let btnTarget = event.target.closest("div").children[0];
       btnTarget.innerHTML = event.target.innerText;
       method = event.target.getAttribute("date-type");
        setLocalStorage("method", method);
        buildGallary(applyMethod(method, result)); 
        showMessages(); 
    }
    
    let applyMethod = (method, array) => {
         switch(method){
            case "abc" : array.sort(sortNameAbc);
                break;
            case "zyx" : array.sort(sortNameZyx);
                break;
            case "first" : array.sort(sortDateAsc);
                break;
            case "last" : array.sort(sortDateDesc);
            default: array;
        }
        return array;
    }
    
//Удаление элементов***********************************************************************************

    let deleteElement = (array) => {
         let element = parseInt(event.target.getAttribute("number"));
         array.forEach((item, arr) => {
            if(item.id === element){
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
                if(item.id == elem){
                    deletedObject = array;
                    array.splice(item,1);
                    array = array.concat(deletedObject);
                }  
            })    
        })
        return array;
    }   

    let showMessages = () =>{
        setQuantity(counter);
        changeBtnColor(counter);
        showModal (counter)
    }
//Модальное окно, смена цвета кнопки и количество показаных картинок*****************************
    
    let setQuantity = (counter) => quantity.innerHTML = `Добавлено картинок: ${counter}`;
    let changeBtnColor = (counter) => (counter === 10) ? btn.setAttribute("style", "background-color:grey") : btn.removeAttribute("style"); 
    let showModal = (counter) => (counter === 10) && $("#myModal").modal('show');

//Запуск функций*************************************************************************************** 
    let init = () => {
        editArray = applyMethod(getLocalStorage(), modifyArray(data));
        result = cutEditArray(chooseArr(editArray, amount),getCounter());
        buildGallary(result);
        showMessages();
    }  

    checkLocalStorage();
    runEventListeners();

})()