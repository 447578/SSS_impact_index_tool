
let data = {};


function ajax(method, path, data, callback){
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function(){
   if(xhr.readyState == XMLHttpRequest.DONE){
     if(xhr.status === 200){
      if(callback) callback(JSON.parse(xhr.responseText)); 
         }
     }
    }
    xhr.open(method, path, true);
    if(data){
     xhr.setRequestHeader('Content-Type', 'application/json'); 
}
xhr.send(JSON.stringify(data));
}


function getAllCities(){
    ajax('get', 'http://localhost:8080/api/cities/', null, function(reply){
        data.cities = reply.response;
        console.log(reply.response);
        for(const city of data.cities){
            //List them into the city list on the left.
        }
    })
}

function getOneCity(cityname){
    ajax('get', 'http://localhost:8080/api/cities/' + cityname, null, function(reply){
        data.currentCity = reply.response;
        console.log(city)
        //HERE YOU SET THE WEBSITE TO THE VALUES LISTED INSIDE city, if you want to do this later, it will be stored in data.currentCity
    })
}
getAllCities();
getOneCity('Amsterdam');