"use strict";

let LoginModule = function (validatorModule, galleryModule, user) {	
	this.validator = validatorModule;
	this.gallery = galleryModule;
  this.user = user;

  this.service = window.service.service;
  this.serviceUser = window.service.userService;

  this.logInFormBtn = document.querySelector("#log-in-form");
	this.showPasswordBtn = document.querySelector("#show-password");
	this.logOutBtn = document.querySelector("#log-out-btn");
	this.userDataBtn = document.querySelector(".user-data-window");
	this.userGalleryBtn = document.querySelector(".user-gallery-window");

	this.loginForm = document.querySelector("#login-form");
	this.alertWindow = document.querySelector(".alert-window");
	this.galleryWindow = document.querySelector(".gallery-window");
	this.userWindow = document.querySelector(".user-window")
	this.mainMenu = document.querySelector(".main-menu");

	this.inputPassword = document.querySelector("#otputPassword");
	this.inputEmail = document.querySelector("#otputEmail");
	this.log = document.querySelector("#inputEmail");
	this.pass = document.querySelector("#inputPassword");
}

LoginModule.prototype = {
	initComponent : function()  {
    this.initListeners();
    this.setLogAndPass(this.user);
    this.showGallery();
    this.ReEntry();
	},

	initListeners : function () {
		this.logInFormBtn.addEventListener("click", this.runComponent.bind(this));
		this.logOutBtn.addEventListener("click", this.logOut.bind(this));
		this.userDataBtn.addEventListener("click", this.showUserData.bind(this));
		this.userGalleryBtn.addEventListener("click", this.showGalleryData.bind(this));
		this.showPasswordBtn.addEventListener("click", this.serviceUser.showOrHidePassword.bind(this));
	},

	setLogAndPass : function (user) {
		if(this.service.getLocalStorage("login") == null) {
			this.service.setLocalStorage("login", user.login);
			this.service.setLocalStorage("password", user.password);
		} else {
			return;
		}
	},

	showGallery: function(){
		this.gallery.initGallery();
	},

	ReEntry : function () { //проверка повторного входа.
		if (this.service.getLocalStorage("valid") !== null) {
			this.logIn();  
		}
  },

	runComponent : function (event) {
		event.preventDefault();
		let result = this.validator.isValid(this.log.value, this.pass.value, this.alertWindow);
		this.initWindow(result);
	},

	initWindow : function (result) {
		(result) ? this.logIn() : this.service.showElement(this.alertWindow);
	},

	checkListeners : function (item) {
		(!item == undefined) && this.initListeners();
	},

	logIn : function () {	
		this.service.hideElement(this.loginForm);
		this.service.showElement(this.galleryWindow);
		this.service.showElement(this.mainMenu);
		this.service.setLocalStorage("valid", "yes");	
		this.serviceUser.changeBtnColor(this.userGalleryBtn, this.userDataBtn);
	},

	logOut : function () {
		this.service.hideElement(this.service.determineOpenWindow(this.galleryWindow, this.userWindow));
		this.service.hideElement(this.mainMenu);
		this.service.showElement(this.loginForm);
		localStorage.removeItem("valid");
		this.service.removeListeners()
	},

	showUserData : function (){
		this.service.showElement(this.userWindow);
		this.service.hideElement(this.galleryWindow)
		this.inputEmail.value = this.service.getLocalStorage("login");
		this.inputPassword.value = this.service.getLocalStorage("password");
		this.serviceUser.changeBtnColor(this.userDataBtn, this.userGalleryBtn);
	},

	showGalleryData : function () {
		this.service.hideElement(this.userWindow);
		this.service.showElement(this.galleryWindow);
		this.serviceUser.changeBtnColor(this.userGalleryBtn, this.userDataBtn);
	}
}



							
