'use strict';

let BaseGallery = function(){ 
  this.galleryService = window.service.galleryService;
  this.service = window.service.service;

	this.nameBtnAnchor = document.querySelector("#dropdown-name");
	this.dateBtnAnchor = document.querySelector("#dropdown-date");
	this.hiddenArray = [];
	this.visibleArray = [];
	this.counter = 0;
	this.result = "";
	this.sum = [];
}

BaseGallery.prototype = {
	initGallery : function() {
		this.initListeners();
		this.checkSortingMethod();    
		this.hiddenArray = this.galleryService.applySortMethod(this.service.getLocalStorage("sorting-method"), this.galleryService.modifyArray(data));  
		this.counter = +this.service.getLocalStorage("imgQuantity");
		this.galleryService.showLastSessionGallery(this.counter, this.hiddenArray)
	},

	initListeners : function() {
		this.nameBtnAnchor.addEventListener("click", this.determineSortMethod.bind(this));
		this.dateBtnAnchor.addEventListener("click", this.determineSortMethod.bind(this));
	},
	
	checkSortingMethod : function() {
		this.result = this.service.getLocalStorage("sorting-method");
		if (this.result == null) {
			this.service.setLocalStorage("sorting-method", "abc");
			this.galleryService.determineBtnText("abc");
		} else {
			this.galleryService.determineBtnText(this.result);
		}
	},

	buildGallery : function(array) {
	  this.galleryService.createMarkUp(array);
		this.galleryService.setQuantityText(this.counter);
		this.galleryService.changeBtnColor(this.counter);
		this.galleryService.saveVisibleArray();
	},

	determineSortMethod : function(event) {
		event.preventDefault();
		let test = event.currentTarget.querySelector("button");
		event.currentTarget.querySelector("button").innerHTML = event.target.innerText;
		let sortingType = event.target.getAttribute("sorting-type");
		this.service.setLocalStorage("sorting-method", sortingType);
		this.galleryService.createMarkUp(this.galleryService.applySortMethod(sortingType, this.visibleArray)); 
		this.galleryService.saveVisibleArray();
	},     
}

let ExtendedGallery = function() {
	BaseGallery.apply(this);
	this.addImgBtn = document.querySelector('#add-img');
	this.gallery = document.querySelector('#gallery');
	this.addBtn = document.querySelector('#add-img');
}
ExtendedGallery.prototype = {
	initComponent : function() {
			this.initListeners()
	},

	initListeners : function() {
		BaseGallery.prototype.initListeners.apply(this);
		this.addImgBtn.addEventListener("click", this.addItem.bind(this));
		this.gallery.addEventListener("click", this.deleteItem.bind(this));
	},

	addItem : function() {
		this.galleryService.increaseCounter();
		if(this.counter > data.length) {
			this.galleryService.runModalWindow(this.counter);
		return;
		} else {          
			this.galleryService.showElement(this.hiddenArray);
			this.buildGallery(this.visibleArray);
			this.service.setLocalStorage("imgQuantity", this.counter);
			this.galleryService.saveVisibleArray();
		}
	},

	deleteItem : function(event) {
		this.galleryService.decreaseCounter()
		this.galleryService.moveElement()
		this.buildGallery(this.visibleArray);
		this.addBtn.hasAttribute("disabled") && this.addBtn.removeAttribute("disabled");               
		this.service.setLocalStorage("imgQuantity", this.counter);
		this.galleryService.saveVisibleArray();
	}
},
window.service.galleryService.inheritance(BaseGallery, ExtendedGallery);


