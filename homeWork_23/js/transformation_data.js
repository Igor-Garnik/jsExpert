"use strict";
let transformData = function () {

      let modifyArray = data => {
             return data.map((item) => {
                    return {
                    url: editUrl(item.url),
                    name: editName(item.name),
                    description: editDescription(item.description),
                    date: editDate(item.date),
                    id: item.id
                    }
             })
      }  
      let editUrl = url => `http://${url}`;    

      let editName = name => name[0].toUpperCase() + name.substr(1).toLowerCase();

      let editDescription = description => (description.length > 15) ? `${description.substring(0,15)} ...` : description;     

      let editDate = date => (date !== NaN) ? moment(date).format('YYYY/MM/DD HH:mm') : "Missing Data";

      let chooseArr = (array, amount) => (amount.length === 0) ? array : main.moveDeletedItem(array, amount); 

      let cutEditArray = (array, counter) => array.splice(0,counter);

      let sortNameAbc = (a, b) => a.name > b.name ? 1 : -1;
      let sortNameZyx = (a, b) => a.name < b.name ? 1 : -1;
      let sortDateAsc = (a, b) => a.date < b.date ? 1 : -1;
      let sortDateDesc = (a, b) => a.date > b.date ? 1 : -1;  

      let applyMethod = (method, array) => {
             switch(method) {
             case "abc" : array.sort(sortNameAbc);
                 break;
             case "zyx" : array.sort(sortNameZyx);
                 break;
             case "first" : array.sort(sortDateAsc);
                 break;
             case "last" : array.sort(sortDateDesc);
             default: array;
             }
             return array;
             }

      return {
            applyMethod,
            sortNameAbc, 
            sortNameZyx,  
            sortDateAsc, 
            sortDateDesc,
            modifyArray,
            chooseArr,
            cutEditArray
      };
}