"use strict";
let BaseGallery = function () {	
	this.nameBtnAnchor = document.querySelector("#dropdown-name");
	this.dateBtnAnchor = document.querySelector("#dropdown-date");
	this.hiddenArray = [];
	this.visibleArray = [];
	this.counter = 0;
	this.result = "";
	this.sum = [];
}

BaseGallery.prototype = {
	initGallery : function () {
	 	this.initListeners();
      		this.checkSortingMethod(); 		
      		this.hiddenArray = galleryService.applySortMethod(galleryService.getLocalStorage("sorting-method"), galleryService.modifyArray(data));  
      		this.counter = +galleryService.getLocalStorage("imgQuantity");
      		this.showLastSessionGallery(this.counter, this.hiddenArray)
      	},

      	initListeners : function () {
      		this.nameBtnAnchor.addEventListener("click", this.determineSortMethod.bind(this));
      		this.dateBtnAnchor.addEventListener("click", this.determineSortMethod.bind(this));
      	},
      
      	checkSortingMethod : function () {
      		this.result = galleryService.getLocalStorage("sorting-method");
      		if (this.result == null) {
      		 	galleryService.setLocalStorage("sorting-method", "abc");
      		 	galleryService.determineBtnText("abc");
      		} else {
      			galleryService.determineBtnText(this.result);
      		}
      	},

      	showLastSessionGallery :function (quantity, array) {
      		if(quantity > 0) {
	      		this.getSavedArray();
	      		this.buildGallery(this.visibleArray);
	      	} else {
	      		return;
	      	}   
      	},

      increaseCounter : function () {
      		this.counter ++;
      	},

      decreaseCounter : function () {
      		this.counter --;
      	},

      buildGallery : function (array) {
      		galleryService.createMarkUp(array);
             galleryService.setQuantityText(this.counter);
             galleryService.changeBtnColor(this.counter);
             this.saveVisibleArray();
      },

      	determineSortMethod : function (event) {
    		event.preventDefault();
    		let test = event.currentTarget.querySelector("button");
    		event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
      		let sortingType = event.target.getAttribute("sorting-type");
    		galleryService.setLocalStorage("sorting-method", sortingType);
    		galleryService.createMarkUp(galleryService.applySortMethod(sortingType, this.visibleArray)); 
    		this.saveVisibleArray();
  	},     
}

let ExtendedGallery = function () {
    	BaseGallery.apply(this);
  	this.addImgBtn = document.querySelector('#add-img');
  	this.gallery = document.querySelector('#gallery');
  	this.addBtn = document.querySelector('#add-img');
}
ExtendedGallery.prototype = {
  	initComponent : function () {
    		this.initListeners()
  	},

  	initListeners : function () {
    		BaseGallery.prototype.initListeners.apply(this);
    		this.addImgBtn.addEventListener("click", this.addItem.bind(this));
    		this.gallery.addEventListener("click", this.deleteItem.bind(this))
    	},

    	addItem : function () {
    		this.increaseCounter();
    		if(this.counter > data.length){
    			galleryService.runModalWindow(this.counter);
  			return;
  		} else {		      
		      this.showElement(this.hiddenArray);
		    	this.buildGallery(this.visibleArray);
		    	galleryService.setLocalStorage("imgQuantity", this.counter);
		    	this.saveVisibleArray();
		}
    	},

    	deleteItem : function (event) {
  		this.decreaseCounter()
             this.moveElement()
  	 	this.buildGallery(this.visibleArray);
  	 	this.addBtn.hasAttribute("disabled") && this.addBtn.removeAttribute("disabled");             	 
      		galleryService.setLocalStorage("imgQuantity", this.counter);
      		this.saveVisibleArray();
  	},

  	showElement : function (array) {
   	 	let obj = array.splice(0, 1);
          	this.visibleArray = this.visibleArray.concat(obj);        				
  	},

//Запись в loca storage текущие изображениями
  	saveVisibleArray : function () {
  		let sum = [];
  		this.visibleArray.forEach(item => {
  			sum = sum.concat(item.id);
  		})
  		galleryService.setLocalStorage("saved-gallery", sum)
  	},

//функция по id создает массив с видимыми изображениями как в последней сессии
  	getSavedArray : function () {
  		let arr = galleryService.getLocalStorage("saved-gallery");
  		arr = arr.split(",");
  		this.hiddenArray.forEach(item => {
  			arr.forEach(elem => {
  				if(elem == item.id) {
  					this.visibleArray = this.visibleArray.concat(item);
  				}
  			})
  		})
  	},

  	moveElement : function () {
          	let cutedElement = [];
             let imgNumber = parseInt(event.target.getAttribute("Img-number"));
          	this.visibleArray.forEach((item, arr) => {
              	if (item.id === imgNumber) {
              		cutedElement = this.visibleArray.splice(arr,1);
              		this.hiddenArray = this.hiddenArray.concat(cutedElement);              
              	}
         	})
    	}
}

galleryService.inheritance(BaseGallery, ExtendedGallery);

