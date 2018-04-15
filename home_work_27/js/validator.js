"use strict"; 
let Validator = function () {  
	this.service = window.service.service;

	this.regExpLog =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	this.regExpPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/;
	this.config = {
		0 : "",
		1 : "Заполните email и password",
		2 : "Неверный формат email",
		3 : "Пароль должен сотоять из 8 символов.  Цифр и латинских букв в верхнем, нижнем регистре",
		4 : "Введен неверный email или password"
  };
}
Validator.prototype = {
	showMessage : function(alertWindow, message) {
		alertWindow.innerHTML = message;
	},

	isValid : function(log, pass, alertWindow) {
		this.showMessage(alertWindow, this.config[0]);
		if (log == "" && pass == "") {
			this.showMessage(alertWindow, this.config[1]);
			return false;
		} else if (!this.regExpLog.test(log)) {
			this.showMessage(alertWindow, this.config[2]);
			return false;
		} else if (!this.regExpPas.test(pass)) {
			this.showMessage(alertWindow, this.config[3]);
			return false; 
		} else if (log !== this.service.getLocalStorage("login") || pass !== this.service.getLocalStorage("password")) {
			this.showMessage(alertWindow, this.config[4]);
			return false;
		} else {
			!alertWindow.classList.contains("hide") && this.service.hideElement(alertWindow);
	      return true;
		}
	}
}
