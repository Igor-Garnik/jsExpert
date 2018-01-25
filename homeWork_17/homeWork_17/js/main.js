'use strict';
var btn = document.getElementById("play");
var newArrey = [];
var error = "Data Faild";
//Creat a new arrey.
let creatNewArrey = data => {
    newArrey = [];
    data.forEach((item)  => {
        newArrey.push({
            url: item.url,
            name: item.name,
            params: item.params,
            description: item.description,
            date: item.date
        });
    });
    return newArrey;
 }
// Delet sixth element from an arrey.
let deletElement = (arrey, item) => arrey.splice(item - 1,1);
//Edit the key 'url' of an arrey.
let editUrl = url => {
    var protocol = "http://";
    var fragment = url.substring(0,6);
    return (protocol === fragment||url === error) ? url : protocol + url;
}
//Edit the key 'name' of an arrey. 
let editName = name => (name === error) ? name : name[0].toUpperCase() + name.substr(1).toLowerCase();
//Creat string param.
let editParams = params => (params === error) ? name : `${params.status}=>${params.progress}`
//Edit the key 'date' of an arrey.
let editDate = date => (date === error) ? date : moment(date).format('YYYY/MM/DD HH:mm');
//Edit the key 'description' of an arrey.
let editDescription = description => {
    if(description === error){
        return error;
    }else{
    return (description.length > 15) ? `${description.substring(0,15)} ...` : description;
    }
}
//Filter an arrey.
let useFilter = data => data.filter(newArrey => newArrey.params.status); 
//Creat a new arrey with map().
let modifyArrey = data => {
    return data.map((item) => {
        return {
            url: editUrl(testKey(item.url)),
            name: editName(testKey(item.name)),
            params: editParams(testKey(item.params)),
            isVisible: item.params.status,
            description: editDescription(testKey(item.description)),
            date: editDate(testKey(item.date))
        }
    });
}   
//Test an object.key for errors.
let testKey = (item) => (item)? item :error; 
//Print result.
let printResult = (result) => console.log(result);

//Run Code
let transform = () =>{
    creatNewArrey(data);
    deletElement(newArrey, 6);
    printResult(modifyArrey(useFilter(newArrey)));
} 

btn.addEventListener("click", transform);