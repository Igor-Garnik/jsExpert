"use strict";
(function(){
    const btn = document.getElementById("play"),
          firstBlock = document.querySelector('#first-line'),
          secondBlock = document.querySelector('#second-line'),
          thirdBlock = document.querySelector('#third-line'),

          firstGroup = document.querySelector('.first-group').classList,
          secondGroup = document.querySelector('.second-group').classList,
          thirdGroup = document.querySelector('.third-group').classList;

    var quantity, variant, quantityResult;
    var newArrey = [], editArrey = [], list = [];   
    var parentDiv,img,div,firstDiv,secondDiv,thirdDiv,last;
    var error = "Data faild";
    var child; document.querySelector('.parentDiv');

    //Cортировка входящего масива данных.
    let sortArrey = data =>{
        data.forEach(item =>{
            newArrey.push({
                url: item.url,
                name : item.name,
                description : item.description,
                date : item.date
            })
        })
    }
    //Функция добавляет "http://" и проверяет есть ли в массиве "url".
    let editUrl = url => {
        var protocol = "http://";
        var fragment = url.substring(0,7);
        return (protocol === fragment||url === error) ? url : protocol + url;
    }
    //Функция делает первую букву заглавной.
    let editName = name => (name === error) ? name : name[0].toUpperCase() + name.substr(1).toLowerCase();
    //Функция обрезает текст до 15 символа.
    let editDescription = description => {
        if(description === error){
            return error;
        }else{
        return (description.length > 15) ? `${description.substring(0,15)} ...` : description;
        }
    }
    //Функция преобразовывает дату.
    let editDate = date => (date === error) ? date : moment(date).format('YYYY/MM/DD HH:mm');

    //Проверка data.js на отсутсвие значения ключа.
    let testKey = (item) => (item) ? item : error; 

    let modifyArrey = data => {
        return data.map((item) => {
            return {
                url: editUrl(testKey(item.url)),
                name: editName(testKey(item.name)),
                description: editDescription(testKey(item.description)),
                date: editDate(testKey(item.date))
            }
        })
    }  
    
    let getQuantity = () => quantity = document.querySelector("#line-selector").value;
    let getVariant = () => variant = document.querySelector("#type-selector").value;
    
    // Определение нужного количества картинок для вывода.
    let setQuantity = (number) =>{
        switch(number){
            case "0": return editArrey.length;
            break;
            case "1": return 3;
            break;
            case "2": return 6;
            break;
            default:
            null;
        }
    }
    //Определение методы вывода картинокю
    let determineMethod = param =>{
        switch(param){
            case "1": runReplace();
            break;
            case "2": runString();
            break;
            case "3": runHtmlElements();
            break;
            default:
            document.removeEventListener("click", init);
        }
    }
    //Создание нового массива нужной длины.
    let cutEditArrey = (arrey,number) => {
        let newList = [];
        newList = [... arrey];
        list = newList.splice(0,number);
    }

    //Второй вариант создания массива нужнойдлины.
    /*let cutEditArrey = (arrey,number) =>{
        let i = "";
        for(i = 0; i < number; i++){
            list.push(arrey[i]);
        }
    }*/
    //Метод "Replace"
     let setReplaceItemTemplate = () => { 
        return `<div class="col-sm-3 col-xs-6">\
        <img src="$url" alt="$name" class="img-thumbnail">\
        <div class="info-wrapper">\
        <div class="text-muted">$name</div>\
        <div class="text-muted top-padding">$description</div>\
        <div class="text-muted">$date</div>\
        </div>\
        </div>`;
    }
    let getReplaceResult = (arrey,template) =>{
        return arrey.map(item =>{
            return template
            .replace(/\$name/gi, item.name)
            .replace("$url", item.url)
            .replace("$description", item.description)
            .replace("$date", item.date); 
        })
    }
    //Метод "Щаблонные строки"
    let setStringResult = arrey =>{
        return arrey.map(item =>{
            return `<div class="col-sm-3 col-xs-6">\
            <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
            <div class="info-wrapper">\
                <div class="text-muted">${item.name}</div>\
                <div class="text-muted top-padding">${item.description}</div>\
                <div class="text-muted">${item.date}</div>\
            </div>\
            </div>`;
        })
    }

   
    //Функция удаляет "div" элементы при повторном вызове метода "createHtmlElements".
    let clearHtmlElements = () =>{
        let children = thirdBlock.children;
        if(children.length > 0){
            let i;
            let count = children.length;
            for(i = 0; i < count; i++){
                document.querySelector('.parentDiv').remove();
            }
        }else{
            return;
        }
    }
    //Метод "create Element"
    let createHtmlElements = (arrey) =>{
        return arrey.map(item => {
            parentDiv = document.createElement("Div");
            parentDiv.className = "col-sm-3 col-xs-6 parentDiv";
            img = document.createElement("Img");
            img.setAttribute("src", item.url);
            img.setAttribute("alt", item.name);
            img.className = "img-thumbnail";
            div = document.createElement("Div");
            div.className = "info-wrapper";
            firstDiv = document.createElement("Div");
            firstDiv.className = "text-muted";
            firstDiv.appendChild(document.createTextNode(item.name));
            secondDiv = document.createElement("Div");
            secondDiv.className = "text-muted top-padding";
            secondDiv.appendChild(document.createTextNode(item.description));
            thirdDiv = document.createElement("Div");
            thirdDiv.className = "text-muted";
            thirdDiv.appendChild(document.createTextNode(item.date));
            thirdBlock.appendChild(parentDiv);
            thirdBlock.lastElementChild.appendChild(img);
            thirdBlock.lastElementChild.appendChild(div);
            last = thirdBlock.lastElementChild;
            last.lastElementChild.appendChild(firstDiv);
            last.lastElementChild.appendChild(secondDiv);
            last.lastElementChild.appendChild(thirdDiv);
            return;
        })
    }
    
    let runString = () =>{
        let stringResult = setStringResult(list)
        printResult(stringResult,secondBlock); 
    }  

    let runReplace = () =>{
        let replaceItemTemplate = setReplaceItemTemplate()
        let replaceResult = getReplaceResult(list,replaceItemTemplate);
        printResult(replaceResult,firstBlock);
    }

    let runHtmlElements = () =>{ 
        clearHtmlElements();
        createHtmlElements(list);
    }
           
    let printResult = (result,block) => block.innerHTML = result;
    
    //Функция которая прячет блоки.
    let hideGroup = () =>{
        (firstGroup.contains("show")) ? (firstGroup.remove("show") || firstGroup.add("hide")) : (firstGroup.add("hide"));
        (secondGroup.contains("show")) ? (secondGroup.remove("show") || secondGroup.add("hide")) : (secondGroup.add("hide"));
        (thirdGroup.contains("show")) ? (thirdGroup.remove("show") || thirdGroup.add("hide")) : (thirdGroup.add("hide"));
    }
    //Функция которая показывает нужный блок.
    let displayGroup = (param) =>{
        switch(param){
            case "1": firstGroup.remove("hide") || firstGroup.add("show");
            break;
            case "2": secondGroup.remove("hide") || secondGroup.add("show");
            break;
            case "3": thirdGroup.remove("hide") || thirdGroup.add("show");
            break;         
            default:
            null;
        }
    }
    //Сброс селекторов.
    let resetSelectors = (param) => {
        document.querySelector("#line-selector").value = param; 
        document.querySelector("#type-selector").value = param;
    }
    //Запуск функции которая сформирует массив из data.js
    //Функция не выненена в init что бы не делать дополнительные итерации.
    sortArrey(data)
    editArrey = modifyArrey(newArrey);

    function init() {
        getQuantity();
        getVariant();
        quantityResult = setQuantity(quantity);
        cutEditArrey(editArrey, quantityResult);
        determineMethod(variant);
        hideGroup();
        displayGroup(variant);
        resetSelectors("0");
    }  

btn.addEventListener("click", init);

})()