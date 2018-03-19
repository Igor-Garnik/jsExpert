"use strict"

function UserValidation (log, pass, regExp, alertWindow) {
      this.log = log;
      this.pass = pass;
      this.regExp = regExp;
      this.alertWindow = alertWindow;
      this.checkLogAndPass = () => {
             alertWindow.innerHTML = "";
             if (this.log == "" && this.pass == "") {
                   alertWindow.innerHTML = "Заполните email и password";
                  return false;
             } else if (!this.regExp.test(this.log)) {
                   alertWindow.innerHTML = "Неверный формат email";
                   return false;
             } else if (this.pass.length < 8){
                   alertWindow.innerHTML = "Пароль должен содержате не меньше 8 символов";
                   return false;
             } else if (this.log !== localStorage.login || this.pass !== localStorage.password) {
                   alertWindow.innerHTML = "Введен неверный email или password";
                   return false;
             } else {
                   return true;
             }
       }
}