"use strict";
let LoginService = function () {

}
LoginService.prototype = {
	setLocalStorage : function (value, key) {
		localStorage.setItem(value, key);
	},

	getLocalStorage : function (value) {
		return localStorage.getItem(value);
	},

	showElement : function (element) { 
		element.classList.remove("hide");
	},

	hideElement : function (element) {
		element.classList.add("hide");
	},
}

