var app = angular.module('demo', ['angular-progress-arc']);

let data = {};
data.topSet = false;

$("document").ready(function () {
    $(".slider").rangeslider();

});

//version 2

function makeSliders() {

    let smaller = document.createElement('span');
    smaller.classList.add('smaller');
    smaller.innerText = "/100";
    let circles = document.getElementsByClassName('pie-wrapper');
    let isDraggingArray = [];
    for (let i = 0; i < circles.length; i++) {
        let score = data.categoryValues[i];
        let slider = document.getElementsByClassName('circleslider')[i];

        slider.style.transform = `rotate(${score * 3.6}deg)`;
        isDraggingArray.push('false');

        circles[i].addEventListener('mousedown', () => { isDraggingArray[i] = true });
        circles[i].addEventListener('mouseup', () => { isDraggingArray[i] = false });
        circles[i].addEventListener('mousemove', e => {


            const box = circles[i].getBoundingClientRect()
            const { atan2, PI, round } = Math
            let angle
            let centerX
            let centerY
            let deltaX
            let deltaY
            let posX
            let posY
            if (isDraggingArray[i]) {
                centerX = (circles[i].offsetWidth / 2) + box.left
                centerY = (circles[i].offsetHeight / 2) + box.top
                posX = e.pageX
                posY = e.pageY
                deltaY = centerY - posY
                deltaX = centerX - posX
                angle = atan2(deltaY, deltaX) * (180 / PI)
                angle -= 90
                if (angle < 0)
                    angle += 360
                angle = round(angle)
                slider.style.transform = `rotate(${angle}deg)`;
                let info = circles[i].getElementsByClassName('label')[0];


                info.textContent = Math.ceil(angle / 3.6);
                info.appendChild(smaller)
                data.categoryValues[i] = Math.ceil(angle / 3.6);
                setTopBar()
            }
        })
    }
}

$.fn.rangeslider = function (options) {

    makeSliders();
};
//bubble
function modifyBubble() {
    var el, newPoint, newPlace, offset, siblings, k;
    width = this.offsetWidth;
    newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
    offset = -1;
    if (newPoint < 0) { newPlace = 0; }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint; }
    siblings = this.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        sibling = siblings[i];
        if (sibling.id == this.id) { k = true; }
        if ((k == true) && (sibling.nodeName == "OUTPUT")) {
            outputTag = sibling;
        }
    }
    outputTag.style.left = newPlace + "px";
    outputTag.innerHTML = this.value + '%';
}

function modifyTopbarInputs() {

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("type") == "range") {
            inputs[i].onchange = modifyBubble;

            //http://stackoverflow.com/questions/2856513/trigger-onchange-event-manually
            if ("fireEvent" in inputs[i]) {
                inputs[i].fireEvent("onchange");
            } else {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                inputs[i].dispatchEvent(evt);
            }
        }
    }
}

modifyTopbarInputs();

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
    var myJasonObject = {
        "response": [
            {
                "name": "Amsterdam",
                "categories": [{
                    "name": "Personal Wellbeing",
                    "description": "Personal well-being consists of physiological and psychological factors in humans that influence health or health problems. Examples of acquired determinants are obesity, high blood pressure and ageing. An example of a physical determinant is physical health.",
                    "pitfall": "The GGD did research to personal wellbeing in Amsterdam, 95 % of the citizens admitted that they felt physically healthy. However, research also showed that 48.9% of citizens had a BMI (Body Mass Index) score of 25 or higher. The Netherlands is ageing, the population of age 65+ is growing.",
                    "opportunity": "By making an intervention we want to bring the city to a higher level. To improve mental health, the initiative 'Break the cycle' has been created. By cycling your body will create endorphins and serotonin, a sort of antidepressant without negative side effects. By giving information and workshops about how to life healthy, citizens may become more aware, and adapt a healthier lifestyle and eating behaviour. The municipality can also create water taps, so that citizens can choose between free water or to buy soda. The 'Doortrappen' initiative can be good to motivate and help elderly to cycle better, safer and more.",
                    "items": [
                        {
                            "name": "Physical health",
                            "score": 8.9,
                            "story": "According to the CBS health survey, most Dutch people aged 12 and older feel psychologically healthy: almost 89%. Within the group of young people from 12 to 16 years, even 95% feel psychologically healthy. That is a higher percentage than for all other age groups. Slightly more men than women feel psychologically healthy (91% versus 86%)."
                        },
                        {
                            "name": "Obesity",
                            "score": 4.5,
                            "story": "The percentage of overweight adults is the lowest in the GGD region of Amsterdam (40.7%). The proportion of overweight adults in the Gooi and Vecht region is also lower than in the rest of the Netherlands (42.9%). The percentage of overweight adults is highest in the GGD regions of Drenthe, Flevoland, South Limburg and Twente. Over 52% of these regions are overweight. This means that these people have a BMI of 25 or higher. In the Netherlands, an average of 48.9% of adults aged 19 years and over is overweight."
                        },
                        {
                            "name": "High blood pressure",
                            "score": 8.7,
                            "story": "In 2018 there were an estimated 242,300 people diagnosed with heart failure by the general practitioner: 113,300 men and 129,000 women (annual prevalence). This corresponds to 13.2 per 1,000 men and 14.9 per 1,000 women. The age-specific prevalence rates are higher for most age groups for men than for women. However, because there are many older women, there were a total of more women with heart failure in 2018 than men. The annual prevalence concerns all people who were known to the heart failure doctor sometime in the year 2018. These people do not all need to have had contact with the heart failure doctor in 2018."
                        },
                        {
                            "name": "Aging",
                            "score": 4.7,
                            "story": "The population of the Netherlands is gradually ageing. Ageing means that the proportion of older people in the total population is increasing. In the twentieth century, the number of people over 65 in the Netherlands increased more than tenfold: from 0.3 million in 1900 to 3.2 million in 2018. The share of people over 65 in the total population thus increased from 6% to 18%. In addition, there is 'double ageing'. This means that within the over-65s group the proportion of over-80s is increasing. On January 1, 2018, there were more than 779,000 people aged 80 and over, representing 4.5% of the population. Of the over-65s, 24% were older than 80 years."
                        }
                    ],
                    "steps": ["Exercise at least 150 minutes per week.", "Give information about healthy living.", "'Doortrappen' initiative to help elderly cycle."]
                },
                {
                    "name": "Lifestyle and behaviour",
                    "description": "The health determinant lifestyle and behaviour concerns all behaviours that have a positive or negative influence on health and/or the health problem. This concerns eating behaviour, health skills and sport.",
                    "pitfall": "Data about Amsterdam citizens show that their eating behaviour does not meet the health standards. The citizens struggle to eat enough fruit, and a part of them even skip breakfast. Strikingly enough, only 21.9% meet the so-called 'Fitnorm'. The Fitnorm means that a person should be intensively exercising at least three times a week for 20 minutes.",
                    "opportunity": "Opportunities for Amsterdam are mainly to find in improving the health of their citizens by giving health education. By health education, citizens will be informed about healthy eating behaviour and the effect on the human body. During health education, citizens can be motivated to move more so that they can meet the Fitnorm. Amsterdam is already a so-called 'JOGG' municipality, this means that neigbourhoods, schools, companies, city leaders and parents help to make people healthier by movement and sports.",
                    "items": [
                        {
                            "name": "Eating behaviour",
                            "score": 5.5,
                            "story": "GGD did research amongst Amsterdammers from 19 years and older. People are recommended to eat 250 grams of vegetables on average per day. It turned out that only 36.6% actually eat 250 grams of vegetables per day. GGD did the same research on fruit consumption. Only 45.9% of the people actually eat 200 grams of fruit per day."
                        },
                        {
                            "name": "Sport",
                            "score": 5.6,
                            "story": "21.9% of the Amsterdam population meets the so-called 'Fitnorm'. This norm states that a person should do intensive exercise three times a week for at least 20 minutes. A shocking result."
                        }
                    ],
                    "steps": ["Adopt a healthier eating behaviour.", "Provide knowledge about the 'Fitnorm' and healthy food.", "Make sport more accessible for everyone."]
                },
                {
                    "name": "Medical care and prevention",
                    "description": "The health determinant medical care & prevention involves all kinds of healthcare facilities.These facilities can be used curatively as well as preventively in the care of health and the prevention or worsening of health problems. This health determinant is also called health care organization.For example, we see a favorable development in the mortality and morbidity of stroke. This is due to both improved care and optimized treatment and a changed lifestyle of people after a stroke. There is also a positive trend for heart diseases and especially for heart attacks, due to improved care and treatment and behavioural changes in people. In diabetes care it is also noticeable that complications occur less because of better treatment in primary care and in outpatient clinics.",
                    "pitfall": "Research showed that the Netherlands scored high on medical care and prevention. They score a 8.8 on the Euro Health Consumer Index 2018. Even-though this is really high, the Netherlands has been higher on the list, they have been on top for a long time up until 2016. This is because there has been an unexpected increase in suicides. Also waiting times for paediatric psychiatry have been increased.",
                    "opportunity": "There are opportunities to improve the coordination between all involved medics and other caretakers in Amsterdam. This can be improved by multidisciplinary cooperation in networks or teams, wherein caretakers of different corporations are involved. To realize this, integral funding of health-care is needed. It is also necessary to improve the skills of all involved caretakers so that they will get a basic knowledge of care, diagnostics and treatment of complex care.",
                    "items": [
                        {
                            "name": "Selfmanagement",
                            "score": 8.9,
                            "story": "Research about Amsterdam citizens (By: RIVM, ministry) show that 89% of the population has the ability to direct one's own life."
                        },
                        {
                            "name": "Medical care",
                            "score": 8.8,
                            "story": "The Netherlands ranks second in Europe, the Euro Health Consumer Index 2018. Scoring 883 out of 1000 it was only just outscored by Switzerland."
                        },
                        {
                            "name": "Preventive care",
                            "score": 10,
                            "story": "Medical care contributes for about 20% to the decrease in total mortality. Collective prevention also contributes approximately 20% to the decrease in total mortality. Medical care and collective prevention also make an important contribution to the quality of life."
                        }
                    ],
                    "steps": ["Improve coordination in medical care", "Inform about safe cycling"]
                },
                {
                    "name": "External environment",
                    "description": "The external environment is classified into the physical and social environment. Examples of the physical environment are noise pollution, air pollution, infrastructure, climate, physical geography and innovation. Examples of the social environment are social-cultural environment, municipal policy and SES.",
                    "pitfall": "Amsterdam has a good external environment for cycling. Infrastructure is great and the environmental quality is good. Co-participation and climate could be improved. Co-participation can help motivate cyclist to cycle more, cycling together is more fun than cycling alone. The climate is not something you can change, you can however adapt your bicycle parking to it.",
                    "opportunity": "Amsterdam can improve co-participation by setting up a cycle buddy system. A system that can match/discover people that cycle the same route at the same time. By doing this, there is also a bigger feeling of a social community. To conquer bad weather on a bicycle, covered bike paths or tunnels can be created so that cyclist can stay dry at all times. Highly educated people cycle (on average) more than less educated people, the municipality could give information to its citizens to make less educated people aware of why cycling can be so important.",
                    "items": [
                        {
                            "name": "Noise pollution",
                            "score": 8.2,
                            "story": "Noise pollution in Amsterdam is relatively low, Zurich is seen as the most silent city in the world (50th place), Amsterdam ranks forty-one."
                        },
                        {
                            "name": "Air pollution",
                            "score": 9.2,
                            "story": "Air pollution is low in Amsterdam, 2018 average was 11.5, where a index rating of 0 to 50 means good air quality. Some cities around the world scored an average of 150."
                        },
                        {
                            "name": "Infrastructure",
                            "score": 8.4,
                            "story": "Public transport, bicycle infrastructure and traffic congestion play a role in the infrastructure score."
                        },
                        {
                            "name": "Climate",
                            "score": 7.1,
                            "story": "Amsterdam has a moderate climate, temperatures are relatively mild, but it can be windy sometimes and downfall is common. Melbourne in Australia (A warmer and dryer city) was given a 78.86 (the highest score in the Coya bicycle cities index), whereas Amsterdam was rated a 63.42."
                        },
                        {
                            "name": "Physical geography",
                            "score": 8.5,
                            "story": "Amsterdam's physical geography is near perfect for cycling. It's as flat as a pancake. There is a lot of water in and around the city, but plenty of infrastructural features have been built to coop with this."
                        },
                        {
                            "name": "Innovation",
                            "score": 9,
                            "story": "Amsterdam scores high on innovation indexes. With a score of 50 (the highest in the Cities Innovation Index being 56) it is right up there with world leading cities (innovation wise)."
                        },
                        {
                            "name": "Municipal policy",
                            "score": 10,
                            "story": "Amsterdam spends relatively (compared to their GDP) the most amount of money on its bicycle plan (Meerjaren fietsplan). Amsterdam spends around 70 million per year on bicycle improvements, and has a GDP of 151 bn€, whereas London spends 190 million per year, but it has a much larger GDP of 541 bn€."
                        },
                        {
                            "name": "SES",
                            "score": 8.2,
                            "story": "Compared to the Dutch average, the population of the Amsterdam metropolitan area is characterized by a higher share of working-age individuals. The unemployment rate, however, is also higher. The population in the Amsterdam metropolitan region is clearly relatively higher educated: 47% of individuals aged 15-65 have earned a degree at either a UAS or a research university.."
                        },
                        {
                            "name": "Culture",
                            "score": 9.5,
                            "story": "Amsterdam scores high on this (3.8 out of 4 on Copenhagenize) subject because of the bicycle gender split, modal share, indicators of safety, imago of the bicycle & cargo bikes."
                        },
                        {
                            "name": "Co-participation",
                            "score": 6.7,
                            "story": "According to our research, around 67% of cyclist in Amsterdam cycle together sometimes. This means that the other part (33%) always cycles alone. Co-participation can make cycling much more fun."
                        }
                    ],
                    "steps": ["Cycle together with others", "Provide dry bicycle parking in the city", "X-Fittt 2.0 initiative, low SES person guidance"]
                }
                ]
            },
            {
                "name": "Enschede",
                "categories": [{
                    "name": "Personal wealth",
                    "description": "Personal wealth is how much money someone has",
                    "pitfall": "Having too much money",
                    "opportunity": "Getting even richer",
                    "items": [
                        {
                            "name": "Physical health",
                            "score": 6.9,
                            "story": "I dunno bro!"
                        },
                        {
                            "name": "Obesity",
                            "score": 10,
                            "story": "The percentage of overweight adults is the lowest in the GGD region of Amsterdam (40.7%). The proportion of overweight adults in the Gooi and Vecht region is also lower than in the rest of the Netherlands (42.9%). The percentage of overweight adults is highest in the GGD regions of Drenthe, Flevoland, South Limburg and Twente. Over 52% of these regions are overweight. This means that these people have a BMI of 25 or higher. In the Netherlands, an average of 48.9% of adults aged 19 years and over is overweight."
                        },
                        {
                            "name": "High blood pressure",
                            "score": 8.0,
                            "story": "In 2018 there were an estimated 242,300 people diagnosed with heart failure by the general practitioner: 113,300 men and 129,000 women (annual prevalence). This corresponds to 13.2 per 1,000 men and 14.9 per 1,000 women. The age-specific prevalence rates are higher for most age groups for men than for women. However, because there are many older women, there were a total of more women with heart failure in 2018 than men. The annual prevalence concerns all people who were known to the heart failure doctor sometime in the year 2018. These people do not all need to have had contact with the heart failure doctor in 2018."
                        },
                        {
                            "name": "Aging",
                            "score": 4.7,
                            "story": "The population of the Netherlands is gradually ageing. Ageing means that the proportion of older people in the total population is increasing. In the twentieth century, the number of people over 65 in the Netherlands increased more than tenfold: from 0.3 million in 1900 to 3.2 million in 2018. The share of people over 65 in the total population thus increased from 6% to 18%. In addition, there is 'double ageing'. This means that within the over-65s group the proportion of over-80s is increasing. On January 1, 2018, there were more than 779,000 people aged 80 and over, representing 4.5% of the population. Of the over-65s, 24% were older than 80 years."
                        }
                    ],
                    "steps": ["'Doortrappen' initiative to help elderly cycle."]
                },
                {
                    "name": "Mindfulness",
                    "description": "The health determinant lifestyle and behaviour concerns all behaviours that have a positive or negative influence on health and/or the health problem. This concerns eating behaviour, health skills and sport.",
                    "pitfall": "Data about Amsterdam citizens show that their eating behaviour does not meet the health standards. The citizens struggle to eat enough fruit, and a part of them even skip breakfast. Strikingly enough, only 21.9% meet the so-called 'Fitnorm'. The Fitnorm means that a person should be intensively exercising at least three times a week for 20 minutes.",
                    "opportunity": "Opportunities for Amsterdam are mainly to find in improving the health of their citizens by giving health education. By health education, citizens will be informed about healthy eating behaviour and the effect on the human body. During health education, citizens can be motivated to move more so that they can meet the Fitnorm. Amsterdam is already a so-called 'JOGG' municipality, this means that neigbourhoods, schools, companies, city leaders and parents help to make people healthier by movement and sports.",
                    "items": [
                        {
                            "name": "Eating behaviour",
                            "score": 5.5,
                            "story": "GGD did research amongst Amsterdammers from 19 years and older. People are recommended to eat 250 grams of vegetables on average per day. It turned out that only 36.6% actually eat 250 grams of vegetables per day. GGD did the same research on fruit consumption. Only 45.9% of the people actually eat 200 grams of fruit per day."
                        },
                        {
                            "name": "Meditation",
                            "score": 5.6,
                            "story": "21.9% of the Amsterdam population meets the so-called 'Fitnorm'. This norm states that a person should do intensive exercise three times a week for at least 20 minutes. A shocking result."
                        }
                    ],
                    "steps": ["Adopt a healthier eating behaviour.", "Provide knowledge about the 'Fitnorm' and healthy food.", "Make sport more accessible for everyone."]
                },
                {
                    "name": "Wellness",
                    "description": "The health determinant medical care & prevention involves all kinds of healthcare facilities.These facilities can be used curatively as well as preventively in the care of health and the prevention or worsening of health problems. This health determinant is also called health care organization.For example, we see a favorable development in the mortality and morbidity of stroke. This is due to both improved care and optimized treatment and a changed lifestyle of people after a stroke. There is also a positive trend for heart diseases and especially for heart attacks, due to improved care and treatment and behavioural changes in people. In diabetes care it is also noticeable that complications occur less because of better treatment in primary care and in outpatient clinics.",
                    "pitfall": "Research showed that the Netherlands scored high on medical care and prevention. They score a 8.8 on the Euro Health Consumer Index 2018. Even-though this is really high, the Netherlands has been higher on the list, they have been on top for a long time up until 2016. This is because there has been an unexpected increase in suicides. Also waiting times for paediatric psychiatry have been increased.",
                    "opportunity": "There are opportunities to improve the coordination between all involved medics and other caretakers in Amsterdam. This can be improved by multidisciplinary cooperation in networks or teams, wherein caretakers of different corporations are involved. To realize this, integral funding of health-care is needed. It is also necessary to improve the skills of all involved caretakers so that they will get a basic knowledge of care, diagnostics and treatment of complex care.",
                    "items": [
                        {
                            "name": "Selfmanagement",
                            "score": 0,
                            "story": "Research about Amsterdam citizens (By: RIVM, ministry) show that 89% of the population has the ability to direct one's own life."
                        },
                        {
                            "name": "Medical care",
                            "score": 0.8,
                            "story": "The Netherlands ranks second in Europe, the Euro Health Consumer Index 2018. Scoring 883 out of 1000 it was only just outscored by Switzerland."
                        },
                        {
                            "name": "Preventive care",
                            "score": 5,
                            "story": "Medical care contributes for about 20% to the decrease in total mortality. Collective prevention also contributes approximately 20% to the decrease in total mortality. Medical care and collective prevention also make an important contribution to the quality of life."
                        }
                    ],
                    "steps": ["Improve coordination in medical care", "Inform about safe cycling"]
                },
                {
                    "name": "By all known laws of aviation a bee should not be able to fly, its wings are too small to get its fat little body of the ground, sadly, bees do not care about your science and do it anyway.",
                    "description": "The external environment is classified into the physical and social environment. Examples of the physical environment are noise pollution, air pollution, infrastructure, climate, physical geography and innovation. Examples of the social environment are social-cultural environment, municipal policy and SES.",
                    "pitfall": "Amsterdam has a good external environment for cycling. Infrastructure is great and the environmental quality is good. Co-participation and climate could be improved. Co-participation can help motivate cyclist to cycle more, cycling together is more fun than cycling alone. The climate is not something you can change, you can however adapt your bicycle parking to it.",
                    "opportunity": "Amsterdam can improve co-participation by setting up a cycle buddy system. A system that can match/discover people that cycle the same route at the same time. By doing this, there is also a bigger feeling of a social community. To conquer bad weather on a bicycle, covered bike paths or tunnels can be created so that cyclist can stay dry at all times. Highly educated people cycle (on average) more than less educated people, the municipality could give information to its citizens to make less educated people aware of why cycling can be so important.",
                    "items": [
                        {
                            "name": "Noise pollution",
                            "score": 8.2,
                            "story": "Noise pollution in Amsterdam is relatively low, Zurich is seen as the most silent city in the world (50th place), Amsterdam ranks forty-one."
                        },
                        {
                            "name": "Air pollution",
                            "score": 9.2,
                            "story": "Air pollution is low in Amsterdam, 2018 average was 11.5, where a index rating of 0 to 50 means good air quality. Some cities around the world scored an average of 150."
                        },
                        {
                            "name": "Infrastructure",
                            "score": 8.4,
                            "story": "Public transport, bicycle infrastructure and traffic congestion play a role in the infrastructure score."
                        },
                        {
                            "name": "Climate",
                            "score": 7.1,
                            "story": "Amsterdam has a moderate climate, temperatures are relatively mild, but it can be windy sometimes and downfall is common. Melbourne in Australia (A warmer and dryer city) was given a 78.86 (the highest score in the Coya bicycle cities index), whereas Amsterdam was rated a 63.42."
                        },
                        {
                            "name": "Physical geography",
                            "score": 8.5,
                            "story": "Amsterdam's physical geography is near perfect for cycling. It's as flat as a pancake. There is a lot of water in and around the city, but plenty of infrastructural features have been built to coop with this."
                        },
                        {
                            "name": "Innovation",
                            "score": 9,
                            "story": "Amsterdam scores high on innovation indexes. With a score of 50 (the highest in the Cities Innovation Index being 56) it is right up there with world leading cities (innovation wise)."
                        },
                        {
                            "name": "Municipal policy",
                            "score": 10,
                            "story": "Amsterdam spends relatively (compared to their GDP) the most amount of money on its bicycle plan (Meerjaren fietsplan). Amsterdam spends around 70 million per year on bicycle improvements, and has a GDP of 151 bn€, whereas London spends 190 million per year, but it has a much larger GDP of 541 bn€."
                        },
                        {
                            "name": "SES",
                            "score": 8.2,
                            "story": "Compared to the Dutch average, the population of the Amsterdam metropolitan area is characterized by a higher share of working-age individuals. The unemployment rate, however, is also higher. The population in the Amsterdam metropolitan region is clearly relatively higher educated: 47% of individuals aged 15-65 have earned a degree at either a UAS or a research university.."
                        },
                        {
                            "name": "Culture",
                            "score": 9.5,
                            "story": "Amsterdam scores high on this (3.8 out of 4 on Copenhagenize) subject because of the bicycle gender split, modal share, indicators of safety, imago of the bicycle & cargo bikes."
                        },
                        {
                            "name": "Bee being",
                            "score": 10,
                            "story": "According to our research, around 67% of cyclist in Amsterdam cycle together sometimes. This means that the other part (33%) always cycles alone. Co-participation can make cycling much more fun."
                        }, {
                            "name": "asdf",
                            "score": 6.7,
                            "story": "According to our research, around 67% of cyclist in Amsterdam cycle together sometimes. This means that the other part (33%) always cycles alone. Co-participation can make cycling much more fun."
                        }, {
                            "name": "Nothing here",
                            "score": 6.7,
                            "story": "According to our research, around 67% of cyclist in Amsterdam cycle together sometimes. This means that the other part (33%) always cycles alone. Co-participation can make cycling much more fun."
                        }, {
                            "name": "Eine bloomelein, und das heist",
                            "score": 6.7,
                            "story": "According to our research, around 67% of cyclist in Amsterdam cycle together sometimes. This means that the other part (33%) always cycles alone. Co-participation can make cycling much more fun."
                        }
                    ],
                    "steps": ["Cycle together with others", "Provide dry bicycle parking in the city", "X-Fittt 2.0 initiative, low SES person guidance"]
                }
                ]
            }
            , {
                "name": "Nairobi",
                "categories": ""
            }, {
                "name": "Jakarta",
                "categories": ""
            }, {
                "name": "Bogota",
                "categories": ""
            }, {
                "name": "Manilla",
                "categories": ""
            }, {
                "name": "Accra",
                "categories": ""
            }, {
                "name": "Mumbai",
                "categories": ""
            }, {
                "name": "Lagos",
                "categories": ""
            }, {
                "name": "Dakar",
                "categories": ""
            }, {
                "name": "Kampala",
                "categories": ""
            }, {
                "name": "Pretoria",
                "categories": ""
            }, {
                "name": "Delhi",
                "categories": ""
            }, {
                "name": "Saigon",
                "categories": ""
            }, {
                "name": "Bangkok",
                "categories": ""
            }, {
                "name": "Dhaka",
                "categories": ""
            }, {
                "name": "Cairo",
                "categories": ""
            }
        ]
    }

    data.cities = myJasonObject.response;

    var citylist = document.getElementById("myList");

    for (let i = 0; i < data.cities.length; i++) {
        var singleCityNode = document.createElement("LI");
        singleCityNode.classList.add("BTN");
        let singleCityA = document.createElement("A");
        singleCityA.innerText = data.cities[i].name;

        singleCityNode.appendChild(singleCityA);
        singleCityNode.addEventListener('click', function () { inflateCity(data.cities[i]) });
        citylist.appendChild(singleCityNode);
        citylist.insertBefore(singleCityNode, citylist.childNodes[2]);

    }
    inflateCity(data.cities[0])

}
// Active class
/*
function activeBar() {
var header = document.getElementById("myList");
var btns = header.getElementsByClassName("BTN");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += "active";
    });
}
}  */

function inflateCity(city) {
    fullReset();
    let totalScore = 0;
    let categoryBlockContainer = document.getElementsByClassName("charts-container")[0];
    let categoryCounter = 1;
    data.categoryValues = [];
    let header = document.getElementsByClassName('cityheader')[0];
    let cityTitle = document.createElement('h1');
    cityTitle.innerText = city.name.toUpperCase();
    header.appendChild(cityTitle);

    let quote = document.getElementsByClassName('title')[0];
    let cityQuote = document.createElement('h2');
    let quoteText = document.createTextNode('HOW CAN ' + city.name.toUpperCase() + ' BE 100% BICYCLE FRIENDLY?');
    cityQuote.appendChild(quoteText);
    quote.appendChild(cityQuote);
    for (const category of city.categories) {
        //Make the block
        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add("square");
        let name = document.createElement('H2');
        let text = document.createTextNode(category.name);
        name.appendChild(text);
        name.addEventListener("click", function () { openPopup(category, categoryScore) });

        let pieWrapper = document.createElement('div');
        pieWrapper.classList.add('pie-wrapper');

        let bigPie = document.createElement('div');
        bigPie.classList.add('big');
        let pieName = "pie-" + categoryCounter;
        bigPie.classList.add(pieName);

        let label = document.createElement('div');
        label.classList.add('label');

        let smaller = document.createElement('span');
        smaller.classList.add('smaller');
        smaller.innerText = "/100";

        let circleslider = document.createElement('div');
        circleslider.classList.add('circleslider');

        let categoryScore = 0;

        for (const item of category.items) {
            categoryScore += item.score;
        }
        let oneDecimalCategoryScore = Math.round(categoryScore);

        label.innerText = oneDecimalCategoryScore;

        label.appendChild(smaller);
        pieWrapper.appendChild(bigPie);
        pieWrapper.appendChild(label);
        pieWrapper.appendChild(circleslider);


        categoryDiv.appendChild(name);
        categoryDiv.appendChild(pieWrapper);

        totalScore += categoryScore;
        categoryBlockContainer.appendChild(categoryDiv);
        categoryCounter++;
        data.categoryValues.push(categoryScore);
    }

    let finalScore = totalScore / 4;
    data.totalScore = finalScore;
    setTopBar();

}

function setTopBar() {
    let totalScore = 0;
    for (let value of data.categoryValues) {
        totalScore += value;
    }
    document.getElementById("myRange").value = totalScore / 4;
    modifyTopbarInputs();
    modifyBubble();

    if (data.topSet == false) {
        document.getElementById('myRange').addEventListener('change', function () { updateBottomSliders() })
        data.topSet = true;
    }
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
    for (const item of category.items) {
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

    let steps = document.createElement('h5');
    steps.appendChild(document.createTextNode('STEPS'));
    let stepList = document.createElement('li');
    for (let step of category.steps) {
        let stepText = document.createElement('A');
        stepText.innerText = step;
        stepList.appendChild(stepText);
    }

    report.appendChild(smallSlider);

    report.appendChild(description);
    report.appendChild(descriptionText);

    report.appendChild(pitfall);
    report.appendChild(pitfallText);

    report.appendChild(opportunity);
    report.appendChild(opportunityText);

    report.appendChild(steps);
    report.appendChild(stepList);

    myPopup.appendChild(title);
    myPopup.appendChild(report);

    myPopup.style.visibility = "visible";
    overlay.style.visibility = "visible";
}

function fullReset() {
    let chartsContainer = document.getElementsByClassName('charts-container')[0];
    while (chartsContainer.hasChildNodes()) {
        chartsContainer.removeChild(chartsContainer.firstChild);
    }
    let header = document.getElementsByClassName('cityheader')[0];
    header.removeChild(header.firstChild);
    let title = document.getElementsByClassName('title')[0];
    title.removeChild(title.firstChild);
}

function closePopup() {
    const popup = document.getElementById('myPopup');
    while (popup.firstChild) {
        popup.removeChild(popup.firstChild)
    }
    popup.style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
}

getAllCities();
