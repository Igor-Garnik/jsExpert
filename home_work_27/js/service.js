"use strict";
let Service = function () {
}
Service.prototype = {
	setLocalStorage : function(value, key) {
		localStorage.setItem(value, key);
	},

	getLocalStorage : function(value) {
		return localStorage.getItem(value);
	},

	showElement : function(element) { 
		element.classList.remove("hide");
	},

	hideElement : function(element) {
		element.classList.add("hide");
	},

	determineOpenWindow(gallery, user) {
		return (gallery.classList.contains("hide")) ? user : gallery;
	},

	removeListeners() {
		loginModule.logInFormBtn.removeEventListener("click", loginModule.runComponent);
		loginModule.logOutBtn.removeEventListener("click", loginModule.logOut);
		loginModule.userDataBtn.removeEventListener("click", loginModule.showUserData);
		loginModule.userGalleryBtn.removeEventListener("click", loginModule.showGalleryData);
		loginModule.showPasswordBtn.removeEventListener("click", loginModule.serviceUser.showOrHidePassword);
		galleryModule.nameBtnAnchor.addEventListener("click", galleryModule.determineSortMethod);
		galleryModule.dateBtnAnchor.addEventListener("click", galleryModule.determineSortMethod);
		galleryModule.addImgBtn.addEventListener("click", galleryModule.addItem);
		galleryModule.gallery.addEventListener("click", galleryModule.deleteItem);
	}
}

