var app = angular.module('demo', ['angular-progress-arc']);

let data = {};


app.controller('DemoCtrl', function ($scope) {

    $scope.progress = 0.70;
})




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
        var citylist = document.getElementById("myList");
        for (const city of data.cities) {
            var singleCityNode = document.createElement("LI");
            singleCityNode.classList.add("BTN");
            let singleCityA = document.createElement("A");
            singleCityA.innerText = city.name;
            singleCityNode.appendChild(singleCityA);
            citylist.appendChild(singleCityNode);
        }
        inflateCity(data.cities[0])
    })
}

function inflateCity(city) {
    let totalScore = 0;
    let categoryBlockContainer = document.getElementsByClassName("charts-container")[0];
    let categoryCounter = 1;
    for (const category of city.categories) {
        //Make the block
        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add("square");
        let name = document.createElement('H2');
        let text = document.createTextNode(category.name);
        name.appendChild(text);

        let pieWrapper = document.createElement('div');
        pieWrapper.classList.add('pie-wrapper');

        let bigPie = document.createElement('div');
        bigPie.classList.add('big');
        let pieName = "pie-" + categoryCounter;
        bigPie.classList.add(pieName);

        let label = document.createElement('span');
        label.classList.add('label')
        label.classList.add('ng-binding');

        let smaller = document.createElement('span');
        smaller.classList.add('smaller');
        smaller.innerText = "/100";


        let categoryScore = 0;
        //Set block name to category.name

        for (const item of category.items) {
            categoryScore += item.score;
            //Inflate a bar on the popup

        }
        let oneDecimalCategoryScore = Math.round(categoryScore);
        //Set score
        label.innerText = oneDecimalCategoryScore;

        label.appendChild(smaller);
        pieWrapper.appendChild(bigPie);
        pieWrapper.appendChild(label);

        categoryDiv.appendChild(name);
        categoryDiv.appendChild(pieWrapper);

        categoryDiv.addEventListener("click", function(){openPopup(category, categoryScore)});

        totalScore += categoryScore;
        categoryBlockContainer.appendChild(categoryDiv);
        categoryCounter++;
    }
    let finalScore = totalScore / 4;



}

function openPopup(category, score) {
    let myPopup = document.getElementById("myPopup")
    let overlay = document.getElementById("overlay")

    let title = document.createElement('div');
    title.classList.add('popup-title');
    let titleText = document.createElement('h3');
    titleText.appendChild(document.createTextNode(category.name));

    let categoryScore = document.createElement('h4');
    let roundedScore = Math.round(score);
    categoryScore.innerText = roundedScore;
    let tinyScore = document.createElement('span');
    tinyScore.classList.add('tiny');
    tinyScore.innerText = '/100';

    categoryScore.appendChild(tinyScore);
    title.appendChild(titleText);
    title.appendChild(categoryScore);

    let report = document.createElement('div');
    report.classList.add('report');
    
    let smallSlider = document.createElement('div');
    smallSlider.classList.add('smallSlider');
    for(const item of category.items){
        let itemName = document.createElement('h4');
        itemName.appendChild(document.createTextNode(item.name));

        let progressBar = document.createElement('div');
        progressBar.id = "progressBar";
        let itemScore = item.score * 10;
        progressBar.style = "width: " + itemScore + "%";

        let actualBar = document.createElement('div');
        actualBar.classList.add("bar1");

        progressBar.appendChild(actualBar);
        smallSlider.appendChild(itemName);
        smallSlider.appendChild(progressBar);
    }
    


    let description = document.createElement('h5');
    description.appendChild(document.createTextNode('DESCRIPTION'));
    let descriptionText = document.createElement('p');
    descriptionText.innerText = category.description; 

    let pitfall = document.createElement('h5');
    pitfall.appendChild(document.createTextNode('PITFALL'));
    let pitfallText = document.createElement('p');
    pitfallText.innerText = category.pitfall;

    let opportunity = document.createElement('h5');
    opportunity.appendChild(document.createTextNode('OPPORTUNITY'));
    let opportunityText = document.createElement('p');
    opportunityText.innerText = category.opportunity;

    report.appendChild(smallSlider);

    report.appendChild(description);
    report.appendChild(descriptionText);

    report.appendChild(pitfall);
    report.appendChild(pitfallText);

    report.appendChild(opportunity);
    report.appendChild(opportunityText);
    
    myPopup.appendChild(title);
    myPopup.appendChild(report);
    
    
    
    myPopup.style.visibility = "visible";
    overlay.style.visibility = "visible";
}

function closePopup() {
    const popup = document.getElementById('myPopup');
    while(popup.firstChild){
        popup.removeChild(popup.firstChild)
    }
    popup.style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
}




getAllCities();
