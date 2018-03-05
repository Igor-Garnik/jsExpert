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
	let log = "";
	let pass = "";
	let regExp =  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

	let setLogAndPass = (element) =>  {
		element.forEach(item => {
			localStorage.setItem("login", item.login);
			localStorage.setItem("password", item.password);
		})
	}

	let getLogAndPass = () => {
		log = document.querySelector("#inputEmail").value;
		pass = document.querySelector("#inputPassword").value;
	}
	
	let validationLogAndPass = () => (log == localStorage.login && pass == localStorage.password) ? true : false;

	let showError = (validation) => {
		if(validation === true){
			alertWindow.innerHTML = "";
			return;
		}
		else if(log == "" && pass == ""){
			alertWindow.innerHTML = "Заполните email и password";
		}
		else if(!regExp.test(log)){
			alertWindow.innerHTML = "Неверный формат email";
		}
		else if(log !== localStorage.login || pass !== localStorage.password){
			alertWindow.innerHTML = "Введен неверный email или password";
		}
		else {
			return;
		}
	}

	let showScreens = (validation) => (validation) ? showNewWindow() : showAlertWindow(showError(validation));

	let showAlertWindow = () => alertWindow.classList.remove("hide");
             
	let showNewWindow = () => {
        	(!alertWindow.classList.contains("hide"))&&(alertWindow.classList.add("hide"));
		main.classList.add('hide');
		newWindow.classList.remove("hide");
		inputEmail.value = log;
		inputPassword.value = pass;
	}
	let showPassword = () => {
		let type = inputPassword.getAttribute("type");
		if(type == "password"){
			inputPassword.type = "text";
			btnShow.innerHTML = "Спрятать пароль";
		}
		else{
			inputPassword.type = "password";
			btnShow.innerHTML = "Показать пароль";
		}
	}

	let showLogInForm = () => {
		newWindow.classList.add("hide"); 
		(main.classList.remove("hide"));
	}

	let runComponent = (event) => {
		event.preventDefault();
		let validation = "";
		getLogAndPass();
		validation = validationLogAndPass()
		showScreens(validation);
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