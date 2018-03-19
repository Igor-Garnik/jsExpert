"use strict";
let validationForm = (function () {
	const submitBtn = document.querySelector("#submit");
	const showBtn = document.querySelector("#btnShow");
	const backBtn = document.querySelector("#btnComeBack");
	const main = document.querySelector("#main");
	const alertWindow = document.querySelector(".alert-window");
	const newWindow = document.querySelector(".new-Window");
	const inputPassword = document.querySelector("#otputPassword");
	const inputEmail = document.querySelector("#otputEmail");
	const log = document.querySelector("#inputEmail");
	const pass = document.querySelector("#inputPassword");
	let regExp =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

	let setLogAndPass = (element) => {
		element.forEach(item => {
			localStorage.setItem("login", item.login);
			localStorage.setItem("password", item.password);
		})
	}

	let showScreens = (result) => (result) ? showNewWindow() : showAlertWindow();

	let showAlertWindow = () => alertWindow.classList.remove("hide");
             
	let showNewWindow = () => {
        	if (!alertWindow.classList.contains("hide")) {
        		alertWindow.classList.add("hide");
        	}
		main.classList.add('hide');
		newWindow.classList.remove("hide");
		inputEmail.value = localStorage.getItem("login");
		inputPassword.value = localStorage.getItem("password");
	}
	let showPassword = () => {
		let type = inputPassword.getAttribute("type");
		if (type == "password") {
			inputPassword.type = "text";
			btnShow.innerHTML = "Спрятать пароль";
		} else {
			inputPassword.type = "password";
			btnShow.innerHTML = "Показать пароль";
		}
	}

	let showLogInForm = () => {
		newWindow.classList.add("hide"); 
		main.classList.remove("hide");
	}

	let runComponent = (event) => {
		event.preventDefault();
		let userValidation = new UserValidation (log.value, pass.value, regExp, alertWindow);
		let result = userValidation.checkLogAndPass()
		showScreens(result);
	}

	let  initComponent = () => {	
		submitBtn.addEventListener("click", runComponent);
		showBtn.addEventListener("click", showPassword);
		backBtn.addEventListener("click", showLogInForm);
	}
	return{
		setLogAndPass : setLogAndPass, 
		initComponent : initComponent
	}
})();
validationForm.setLogAndPass(user);
validationForm.initComponent();