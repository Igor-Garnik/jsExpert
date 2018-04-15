'use strict';

(function () {
  let checkObject = () => {
    if (!window.service) {
      window.service = {}
    }
  }
  let initServices = () => {
    window.service.service = new Service();
    window.service.galleryService = new GalleryService();
    window.service.userService = new UserService();
  }
  let init = () => {
    checkObject();
    initServices();
  }
  init();
})();