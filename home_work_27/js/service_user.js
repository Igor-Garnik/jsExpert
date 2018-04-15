'use strict';
let UserService = function() {
  
}
UserService.prototype = {
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
}