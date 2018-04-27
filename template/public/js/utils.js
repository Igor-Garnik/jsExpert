export default class Utils {
    constructor (){
    }

    static showView(element) {
        element.classList.remove("hide");
    }

    static hideView(views) {
        views.forEach(element => {
            element.classList.add("hide");
        });
    }

    static changeLinkColor(link, array) {
        array.forEach(item => {
            item.classList.add("white");
        })
        link.classList.add("blue");
    }

    static navigateTo(routeName) {
        window.location.hash= "#" + routeName;
    }

    static isLoggedIn() {
        let credentials = JSON.parse(localStorage.getItem('credentials'));
        return !!credentials;
    }
}
