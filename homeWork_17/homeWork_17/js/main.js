'use strict';
var btn = document.getElementById("play");
var newData;
//Creat a new arrey.
let transform = data => {
  newData = [];
  data.forEach((item)  => {
    newData.push({
      url: item.url,
      name: item.name,
      params: item.params,
      description: item.description,
      date: item.date
    });
  });
  return newData;
 }
let newDataArrey = transform(data);
// Delet sixth element from an arrey.
let newArrey = param => param.splice(6,1);
newArrey(newDataArrey);

//Edit the key 'url' of an arrey.
let editUrl = url => `http://${url}`;
//Edit the key 'name' of an arrey. 
let editName = name => name.substr(0,1) + name.substr(1).toLowerCase();
//Creat string param.
let editParams = params => `${params.status}=>${params.progress}`;
//Edit the key 'date' of an arrey.
let editDate = date => moment(date).format('YYYY/MM/DD HH:mm');
//Edit the key 'description' of an arrey.
let editDescription = description => {
  if(description.length > 15){
    return `${description.substring(0,15)} ...`;
  }else{
    return description;
  }
}

//Filter an arrey.
let useFilter = data => data.filter(newArrey => newArrey.params.status); 
//Creat a new arrey with map().
let modifyArrey = data => {
  return data.map((item) => {
    return {
        url: editUrl(item.url),
        name: editName(item.name),
        params: editParams(item.params),
        isVisible: item.params.status,
        description: editDescription(item.description),
        date: editDate(item.date)
      }
    });
}     
//Print result.
let printResult = () => console.log(modifyArrey(useFilter(newDataArrey)));

btn.addEventListener("click", printResult);