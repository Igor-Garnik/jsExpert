
"use strict";
let service = new LoginService();
let LoginModule = function (validatorModule, galleryModule, user) {	
	this.validator = validatorModule;
	this.gallery = galleryModule;
    	this.user = user;

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
	initComponent : function ()  {
		this.initListeners();
		this.checkUser();
		this.setLogAndPass(this.user);	
	},

	initListeners : function () {
		this.logInFormBtn.addEventListener("click", this.runComponent.bind(this));
		this.logOutBtn.addEventListener("click", this.logOut.bind(this));
		this.userDataBtn.addEventListener("click", this.showUserData.bind(this));
		this.userGalleryBtn.addEventListener("click", this.showGalleryData.bind(this));
		this.showPasswordBtn.addEventListener("click", this.showOrHidePassword.bind(this));
	},

	checkUser : function () { //проверка повторного входа.
		(service.getLocalStorage("valid") !== null) && this.logIn();
	},

	setLogAndPass : function (user) {
		if(service.getLocalStorage("login") == null) {
			service.setLocalStorage("login", user.login);
			service.setLocalStorage("password", user.password);
		} else {
			return;
		}
	},

	runComponent : function (event) {
		event.preventDefault();
		let result = this.validator.isValid(this.log.value, this.pass.value, this.alertWindow);
		this.initWindow(result);
	},

	initWindow : function (result) {
		(result) ? this.logIn() : service.showElement(this.alertWindow);
	},

	logIn : function () {	
		service.hideElement(this.loginForm);
		service.showElement(this.galleryWindow);
		service.showElement(this.mainMenu);
		service.setLocalStorage("valid", "yes");	
		this.changeBtnColor(this.userGalleryBtn, this.userDataBtn);
		this.showGallery();
	},

	logOut : function () {
		service.hideElement(this.galleryWindow);
		service.hideElement(this.mainMenu);
		service.showElement(this.loginForm);
		localStorage.removeItem("valid");
	},

	showUserData : function (){
		service.showElement(this.userWindow);
		service.hideElement(this.galleryWindow)
		this.inputEmail.value = service.getLocalStorage("login");
		this.inputPassword.value = service.getLocalStorage("password");
		this.changeBtnColor(this.userDataBtn, this.userGalleryBtn);
	},

	showGalleryData : function () {
		service.hideElement(this.userWindow);
		service.showElement(this.galleryWindow);
		this.changeBtnColor(this.userGalleryBtn, this.userDataBtn);
	},

	showOrHidePassword : function () {
		let type = this.inputPassword.getAttribute("type");
		if (type == "password") {
			this.inputPassword.type = "text";
			this.showPasswordBtn.innerHTML = "Спрятать пароль";
		} else {
			this.inputPassword.type = "password";
			this.showPasswordBtn.innerHTML = "Показать пароль";
		}
	},

	changeBtnColor : function (param, item) {
		param.classList.remove("text-dark");
		if(!item.classList.contains("text-dark")) {
			item.classList.add("text-dark");
		}
	},

	showGallery: function(){
		this.gallery.initGallery();
	}

	
}



							
