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

import utils from "./utils.js ";

let home = document.querySelector("#home");
let gallery = document.querySelector("#gallery");
let profile = document.querySelector("#profile");
let activatedRoutets = {};

let homeLink = document.querySelector(".home-link");
let galleryLink = document.querySelector(".gallery-link");
let profileLink = document.querySelector(".profile-link");

let routeConfig = {
    "home" : {
        show : () => {
            utils.showView(home);
            utils.hideView([gallery, profile]);
            utils.changeLinkColor(homeLink, [galleryLink, profileLink]);
        },
        init : () => {
            let model = new HomeModel();
            let view = new HomeView();
            new HomeController(model, view, utils);
        }
    },

    "gallery" : {
        show : () => {
            utils.showView(gallery);
            utils.hideView([home, profile]);
            utils.changeLinkColor(galleryLink, [homeLink, profileLink]);
        },
        init : () => {
            let model = new GalleryModel();
            let view = new GalleryView();
            let observer = new Observer();
            new GalleryController(model, view, observer, utils);
        }
    },

    "profile" : {
        show : () => {
            utils.showView(profile);
            utils.hideView([home, gallery]);
            utils.changeLinkColor(profileLink, [homeLink ,galleryLink ]);
        },
        init : () => {
            let model = new ProfileModel();
            let view = new ProfileView();
            new ProfileController(model, view, new utils);
        }
    }
}

export function updateRoute (routeName) {
    var routeName = document.location.hash.replace(/^#/, '');
    if (activatedRoutets[routeName]) {
        activatedRoutets[routeName]();
    } else {
        let route = routeConfig[routeName];
        if (route) {
            route.init();
            route.show();
            activatedRoutets[routeName] = route.show;
        }
    }
}

