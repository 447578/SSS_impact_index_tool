var app = angular.module('demo', ['angular-progress-arc']);

let data = {};


$("document").ready(function () {
    $(".slider").rangeslider();

});

  $.fn.rangeslider = function (options) {
    //How to make this into a loop of pie- ? Now it only works on the 1st one.
  (function() {

  	const circleRange = document.querySelector('.pie-wrapper')
  	let isDragging

  	circleRange.addEventListener('mousedown',()=>{isDragging = true})
  	circleRange.addEventListener('mouseup',()=>{isDragging = false})

  	window.addEventListener('mousemove',e=>{
  		const slider = document.querySelector('.circleslider')
      //why doesn't this work?
      slider.style.transform = "rotate(180degree)"
  		const info = document.querySelector('.label')
  		const box = circleRange.getBoundingClientRect()
  		const {atan2, PI, round} = Math
  		let angle
  		let centerX
  		let centerY
  		let deltaX
  		let deltaY
  		let posX
  		let posY
  		if(isDragging) {
  			centerX = (circleRange.offsetWidth / 2) + box.left
  			centerY = (circleRange.offsetHeight / 2) + box.top
  			posX = e.pageX
  			posY = e.pageY
  			deltaY = centerY - posY
  			deltaX = centerX - posX
  			angle = atan2(deltaY, deltaX) * (180 / PI)
  			angle -= 90
  			if(angle < 0)
  				angle += 360
  			angle = round(angle)
  			slider.style.transform = `rotate(${angle}deg)`
  			info.textContent = Math.ceil(angle/3.6)
        document.getElementById("myRange").value = Math.ceil(angle/3.6*0.25);

		     console.log(angle)
}
  	})
  })()




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

        let label = document.createElement('div');
        label.classList.add('label');

        label.classList.add('ng-binding');

        let smaller = document.createElement('span');
        smaller.classList.add('smaller');
        smaller.innerText = "/100";

        let circleslider = document.createElement('div');
        circleslider.classList.add('circleslider');




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
        pieWrapper.appendChild(circleslider);


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
