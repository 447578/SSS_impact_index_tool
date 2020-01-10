

var app = angular.module('demo', ['angular-progress-arc']);

let data = {};

app.controller('DemoCtrl', function ($scope) {
    // Init progress value
    $scope.progress = 0.74;
    var newNumber = 74 - 7;

});




$("document").ready(function () {
    $(".slider").rangeslider();

});
$.fn.rangeslider = function (options) {
    var obj = this;
    var defautValue = obj.attr("value");
    obj.wrap("<span class='range-slider'></span>");
    obj.after("<span class='slider-container'><span class='bar'><span></span></span><span class='bar-btn'><span>0</span></span></span>");
    obj.attr("oninput", "updateSlider(this)");
    updateSlider(this);
    return obj;

};

function updateSlider(passObj) {
    var obj = $(passObj);
    var value = obj.val();
    var min = obj.attr("min");
    var max = obj.attr("max");
    var range = Math.round(max - min);
    var percentage = Math.round((value - min) * 100 / range);
    var nextObj = obj.next();
    nextObj.find("span.bar-btn").css("left", percentage + "%");
    nextObj.find("span.bar > span").css("width", percentage + "%");
    nextObj.find("span.bar-btn > span").text(percentage);
};
//Active class
var header = document.getElementById("myList");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    });
}

function openPopup() {
    document.getElementById("myPopup").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
}

function closePopup() {
    document.getElementById("myPopup").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
}




function ajax(method, path, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (callback) callback(JSON.parse(xhr.responseText));
            }
        }
    }
    
    xhr.open(method, path, true);
    xhr.send(JSON.stringify(data));
}


function getAllCities() {
    ajax('get', 'http://wwww.localhost:8080/api/cities/', function (reply) {
        data.cities = reply.response;
        console.log(reply.response);
        for (const city of data.cities) {
            //List them into the city list on the left.
        }
    })
}


getAllCities();