"use strict"; 
let Validator = function (log, pass, alertWindow) {  
	this.regExpLog =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
	this.regExpPas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
}
Validator.prototype = {
	isValid : function (log, pass, alertWindow) {
		alertWindow.innerHTML = "";
		if (log == "" && pass == "") {
			alertWindow.innerHTML = "Заполните email и password";
			return false;
		} else if (!this.regExpLog.test(log)) {
			alertWindow.innerHTML = "Неверный формат email";
			return false;
		} else if (!this.regExpPas.test(pass)) {
			alertWindow.innerHTML = "Пароль должен сотоять из 8 символов.  Цифр и латинских букв в верхнем, нижнем регистре";
			return false; 
		} else if (log !== service.getLocalStorage("login") || pass !== service.getLocalStorage("password")) {
			alertWindow.innerHTML = "Введен неверный email или password";
			return false;
		} else {
			!alertWindow.classList.contains("hide") && service.hideElement(alertWindow);
	      		return true;
		}
	}
}
