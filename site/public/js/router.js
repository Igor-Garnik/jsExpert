import utils from "./utils.js";

import LoginController from "./login/login.controller.js";
import LoginModel from "./login/login.model.js";
import LoginView from "./login/login.view.js";

import GalleryController from "./gallery/gallery.controller.js";
import GalleryModel from "./gallery/gallery.model.js";
import GalleryView from "./gallery/gallery.view.js";
import Observer from "./gallery/observer.js";

import HomeController from "./home/home.controller.js";
import HomeModel from "./home/home.model.js";
import HomeView from "./home/home.view.js";

import ProfileController from "./profile/profile.controller.js";
import ProfileModel from './profile/profile.model.js';
import ProfileView from "./profile/profile.view.js";

let wraper = document.querySelector("#wrapper");
let login = document.querySelector("#login-view");
let home = document.querySelector("#home-view");
let gallery = document.querySelector("#gallery-view");
let profile = document.querySelector("#profile-view");
let navBar = document.querySelector("#navbarResponsive");
let activatedRoutes = {};

let routeConfig = {
    "" : () => {
        utils.initTemplate(wrapper, login);
        let model = new LoginModel();
        let view = new LoginView();
        let controller = new LoginController(model, view, utils);
    }, 
    "home" : () => {
        utils.initTemplate(wrapper, home);
        let model = new HomeModel;
        let view = new HomeView;
        new HomeController(model, view, utils);
    },
    "gallery" : () => {
        utils.initTemplate(wrapper, gallery);
        let model = new GalleryModel;
        let view = new GalleryView;
        let observer = new Observer;
        new GalleryController(model, view, observer, utils);
    },
    "profile" : () => {
        utils.initTemplate(wrapper, profile);
        let model = new ProfileModel;
        let view = new ProfileView;
        new ProfileController(model, view, utils);
    }
}

function activateRoute(routeName){
    let route = routeConfig[routeName];
    route && route();    
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName) {
        utils.navigateTo(routeName); 
        activateRoute(routeName);
    } else {
        activateRoute(routeName);
    }
    
}

