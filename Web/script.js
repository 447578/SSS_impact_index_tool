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
  var myJasonObject = {"response": [
          {
              "name": "Amsterdam",
              "categories": [
                  {
                      "name": "External environment",
                      "pitfall": "Explosive vegetation",
                      "opportunity": "Increased bicycling",
                      "items": [
                          {
                              "name": "Air pollution",
                              "score": 6.9,
                              "story": "Great smoke clouds over the hills bring darkness from above"
                          },
                          {
                              "name": "Climate",
                              "score": 7.1,
                              "story": "Too cool for school"
                          },
                          {
                              "name": "Co-participation",
                              "score": 6.7,
                              "story": "Lonely bicyclists are lonely."
                          },
                          {
                              "name": "Culture",
                              "score": 9.5,
                              "story": "Many cultures, handle it!"
                          },
                          {
                              "name": "Infrastructure",
                              "score": 8.4,
                              "story": "Many roundabouts and great Public Transport"
                          },
                          {
                              "name": "Innovation",
                              "score": 9,
                              "story": "This is a journey into innovation, loads of innovation."
                          },
                          {
                              "name": "Municipal policy",
                              "score": 10,
                              "story": "Bicycle centric municipality"
                          },
                          {
                              "name": "Noise pollution",
                              "score": 8.2,
                              "story": "High buildings block sound"
                          },
                          {
                              "name": "Physical geography",
                              "score": 8.5,
                              "story": "ponttijden.nl"
                          },
                          {
                              "name": "SES",
                              "score": 8.2,
                              "story": "I dunno"
                          }
                      ],
                      "steps": [
                          "step1",
                          "step2"
                      ]
                  },
                  {
                      "name": "Lifestyle and behaviour",
                      "pitfall": "Unhealthy lifestyle and behaviour",
                      "opportunity": "Healthy lifestyle and behaviour",
                      "items": [
                          {
                              "name": "Eating behaviour",
                              "score": 5.5,
                              "story": "Too much cheese"
                          },
                          {
                              "name": "Health awareness",
                              "score": 4.4,
                              "story": " 'I dunno' - Amsterdammer"
                          },
                          {
                              "name": "Sport",
                              "score": 5.6,
                              "story": "Bicycling"
                          }
                      ],
                      "steps": [
                          "step1",
                          "step2"
                      ]
                  },
                  {
                      "name": "Medical care and prevention",
                      "pitfall": "Mental retardation",
                      "opportunity": "Supremacy",
                      "items": [
                          {
                              "name": "Medical care",
                              "score": 8.8,
                              "story": " asdf"
                          },
                          {
                              "name": "Preventive care",
                              "score": 10,
                              "story": "We have no data on this xD"
                          },
                          {
                              "name": "Selfmanagement",
                              "score": 8.9,
                              "story": "Cheese"
                          }
                      ],
                      "steps": [
                          "step1",
                          "step2"
                      ]
                  },
                  {
                      "name": "Personal wellbeing",
                      "pitfall": "Cheese overdose",
                      "opportunity": "asdf",
                      "items": [
                          {
                              "name": "Aging",
                              "score": 4.7,
                              "story": "Malding"
                          },
                          {
                              "name": "High blood pressure",
                              "score": 8.7,
                              "story": "Stress"
                          },
                          {
                              "name": "Obesity",
                              "score": 4.5,
                              "story": "Cheese overdose"
                          },
                          {
                              "name": "Physical health",
                              "score": 8.9,
                              "story": "Because"
                          }
                      ],
                      "steps": [
                          "step1",
                          "step2"
                      ]
                  }
              ]
          }
      ] }

        data.cities = myJasonObject.response;

        var citylist = document.getElementById("myList");

        for (const city of data.cities) {
            var singleCityNode = document.createElement("LI");
            singleCityNode.classList.add("BTN");
            let singleCityA = document.createElement("A");
            singleCityA.innerText = city.name;
            singleCityNode.appendChild(singleCityA);
            citylist.appendChild(singleCityNode);
            citylist.insertBefore(singleCityNode, citylist.childNodes[2]);
        }
        inflateCity(data.cities[0])
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

        categoryDiv.addEventListener("click", openPopup(category));

        totalScore += categoryScore;
        categoryBlockContainer.appendChild(categoryDiv);
        categoryCounter++;
    }



}

function openPopup(category) {
    document.getElementById("myPopup").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
}

function closePopup() {
    document.getElementById("myPopup").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
}




getAllCities();
