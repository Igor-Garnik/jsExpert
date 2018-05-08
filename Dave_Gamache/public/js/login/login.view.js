export default class LoginView {
    constructor () {
        this.domElements = {
            logInBtn : document.querySelector("#log-in-btn"),
            logOutBtn : document.querySelector("#log-out-btn"),

            logIn : document.querySelector("#inputEmail"),
            password : document.querySelector("#inputPassword")
        };
        this.linksElement = {
            home : document.querySelector(".home-state"),
            gallery : document.querySelector(".gallery-state"),
            profile : document.querySelector(".profile-state")
        };
    }

    showMsg(msg) {
        if (msg) {
            this.domElements.alert.classList.remove("hide");
            this.domElements.alert.innerHTML = msg;
        }
    }

    hideMsg() {
        this.domElements.alert.classList.add("hide");
    }

    showLinks() {
        this.linksElements.forEach(item => item.classList.remove("hide"));
    }

    hideLinks() {
        his.linksElements.forEach(item => item.classList.add("hide"));
    }

    getCredentials() {
        return {
            login: this.DOMElements.login.value,
            password: this.DOMElements.password.value
        }
    }
}