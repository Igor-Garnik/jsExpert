"use strict";

let user = {
      login : "i@ukr.net",
      password : "Test1234"
};		

let validatorModule = new Validator();
//let galleryModule = new BaseGallery();
let galleryModule = new ExtendedGallery();
let loginModule = new LoginModule(validatorModule, galleryModule, user);
loginModule.initComponent();
  
      