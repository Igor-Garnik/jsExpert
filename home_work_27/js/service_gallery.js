"use strict";
let GalleryService = function () {
      this.quantity = document.querySelector('#quantity');
	this.visibleArray = [];
      this.abc = document.querySelector('#abc');
      this.zyx = document.querySelector('#zyx');
      this.first = document.querySelector('#first');
      this.last = document.querySelector('#last');
      this.dateBtn = document.querySelector("#date");
      this.nameBtn = document.querySelector("#name")
}

GalleryService.prototype = {	
      modifyArray : function (data) {
             return data.map((item) => {
                   return {
                   url: this.editUrl(item.url),
                   name: this.editName(item.name),
                   description: this.editDescription(item.description),
                   date: this.editDate(item.date),
                   id: item.id
                   }
             })
      },
      editUrl : url => (url.length > 0) ? `http://${url}` :  `url отсутствует`,

      editName : name => (name.length > 0) ? name[0].toUpperCase() + name.substr(1).toLowerCase() : `имя отсутствует`,

      editDescription : description => (description.length > 15) ? `${description.substring(0,15)} ...` : description,    

      editDate : date => (date !== NaN) ? moment(date).format('YYYY/MM/DD HH:mm') : "дата отсутствует",

      sortNameAbc : (a, b) => a.name > b.name ? 1 : -1,
      sortNameZyx : (a, b) => a.name < b.name ? 1 : -1,
      sortDateAsc : (a, b) => a.date < b.date ? 1 : -1,
      sortDateDesc : (a, b) => a.date > b.date ? 1 : -1,  

      applySortMethod : function (method, array) {
             switch(method) {
             case "abc" : array.sort(this.sortNameAbc);
                 break;
             case "zyx" : array.sort(this.sortNameZyx);
                 break;
             case "first" : array.sort(this.sortDateAsc);
                 break;
             case "last" : array.sort(this.sortDateDesc);
             default: array;
             }
             return array;
      },

      	createMarkUp : function (array) {
             let stringResult = "";
             array.map(item => {
                  return stringResult += 
                   `<div class="col-md-4">\
                        	<div class="card mb-4 box-shadow">\
                  			<img class="card-img-top" alt="${item.name}" src="${item.url}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
            				<div class="card-body">\
            					<div class="text-muted">Изображение № ${item.id}</div>\
                      			<div class="text-muted top-padding">${item.name}</div>\
                     			<div class="text-muted">${item.description}</div>\
            					<div class="d-flex justify-content-between align-items-center">\
                  					<div class="btn-group">\
                      					<button type="button" class="btn btn-outline-secondary">View</button>\
                      					<button type="button" class="btn btn-outline-secondary">Edit</button>\
                  					</div>\
                					<button type="button" Img-number="${item.id}" class="btn btn-danger">Удалить</button>\
                					<div class="text-muted bottom-padding delete-button album-date">${item.date}</div>\
            					</div>
              			</div>
              		</div>
            		</div>`
             })
             galleryModule.gallery.innerHTML = stringResult;      
      },

      setQuantityText : function (counter) {
		if (( counter % 100 > 4 && counter % 100 < 20 ) || counter % 10 === 0 || counter % 10 > 4 ) {
		    	this.quantity.innerHTML = `Добавлено ${counter} изображений. `;
		} else if ( counter % 10 < 5 && counter % 10 > 1 ) {
		    	this.quantity.innerHTML = `Добавлено ${counter} изображения. `;
		} else {
		    	this.quantity.innerHTML = `Добавлено ${counter} изображение. `;
		}
	},

      determineBtnText : function (method) {
        	switch(method){
               	case "abc" : this.nameBtn.innerHTML = this.abc.innerText;
                     	break;
               	case "zyx" : this.nameBtn.innerHTML = this.zyx.innerText;
                     	break;
               	case "first" : this.dateBtn.innerHTML = this.first.innerText;
                     	break;
               	case "last" : this.dateBtn.innerHTML = this.last.innerText;
               	default : return;
             }
      },

      changeBtnColor : function (counter) {
      		if (counter === 10) {
      			galleryService.removeClass(galleryModule.addBtn, "btn-success");
                	galleryService.addClass(galleryModule.addBtn, "btn-grey");	
             } else if (galleryModule.addBtn.classList.contains("btn-success")) { 
             	return; 
             } else {
             	galleryService.removeClass(galleryModule.addBtn, "btn-grey");
			galleryService.addClass(galleryModule.addBtn, "btn-success");
             }
      	},

      	runModalWindow : function (counter) {
		$("#myModal").modal('show');
		galleryModule.addBtn.setAttribute("disabled", "disabled");
		galleryModule.decreaseCounter();
      },

      setLocalStorage : function (value, key) {
      		localStorage.setItem(value, key);
      },

  	getLocalStorage : function (value) {
  		return localStorage.getItem(value);
  	},
    		
  	addClass : function (element, value) {
  		element.classList.add(value);
  	},

  	removeClass : function (element, value) {
  		element.classList.remove(value);
  	},

  	inheritance : function (parent, child) {
		let tempChild = child.prototype;
		child.prototype = Object.create(parent.prototype);
		child.prototype.constructor = child;

		for (let key in tempChild) {
			if (tempChild.hasOwnProperty(key)) {
				child.prototype[key] = tempChild[key];
			}
		}
	}
}
let galleryService = new GalleryService();