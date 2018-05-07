export default class LoginController {   
    controller (model, view, observer, utils) {
        this.model = model;
        this.view = view;
        this.observe = observer;
        this.utils = utils;
    }

    initListeners() {
        this.view.domElements.logIn.addEventListeners("click", this.logInHandler.bind(this));
        this.view.domElements.logOut.addEventListeners("click", this.logOutHandler.bind(this));
        console.log("alert");
    }
    logInHandler(event) {

        event.preventDefault();
             console.log("hello");
        let credentials = this.view.getCradentials();
        if (this.model.validate(credentials)) {
            this.model.login(credentials).then(
                data => {
                    if (data.loginStatus){
                        this.view.hideMsg();
                        this.view.showLinks();
                        this.utils.navigateTo("gallery");
                    } else {
                        this.view.showMsg(this.model.getErrorMsg());
                    }
                }
            );
        } else {
            this.view.showMsg(this.model.getErrorMsg());
        }
    }

    logoutHandler() {
        this.view.hideLinks();
        this.model.logout();
        this.utils.navigateTo("");
    }
}