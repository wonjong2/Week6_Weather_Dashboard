var todayEl = document.getElementById("today");
var historyEl = document.getElementById("city-history");
var searchEl = document.getElementById("search");
var searchInputEl = document.getElementById("search-input");
var cardContainerEl = document.getElementById("card-container");
var cardBodyEls = document.getElementsByClassName("card-body");
var cityList = [];
var apiKey = "652c7ffa6c3d51e61ec1fd20a0ad3d6e";

searchEl.addEventListener("submit", handleSearchResult);
historyEl.addEventListener("click", handleCityClick);

function handleCityClick(event) {
    selectedCityEl = event.target;
    getWeatherData(selectedCityEl.textContent);
}

function handleSearchResult (event) {
    event.preventDefault();
    if(searchInputEl.value === "") {
        return;
    }
    var city = searchInputEl.value;
    getWeatherData(city);
    addSearchHistory();
    searchInputEl.value = "";
}

function addSearchHistory() {
    // add the city name on top of the history
    var buttonEls = document.getElementsByClassName("city-button");
    var numOfButtons = buttonEls.length;

    cityList = JSON.parse(localStorage.getItem("history"));
    // history = localStorage.getItem("history");
    if(!cityList) {
        cityList = [];
    }

    cityList.unshift(searchInputEl.value);
    while(cityList.length > 10) {
        cityList.pop();
    }
    localStorage.setItem("history", JSON.stringify(cityList));

    var maxLength = (cityList.length < 10)?cityList.length:10;

    for(var i = 0; i < maxLength; i++){
        if((i+1) <= numOfButtons) {
            buttonEls[i].textContent = cityList[i];
        }
        else {
            var newHistoryEl = document.createElement("button");
            newHistoryEl.className = "btn btn-primary city-button mx-0 my-1";
            newHistoryEl.setAttribute("type", "button");
            newHistoryEl.textContent = cityList[i];
            historyEl.appendChild(newHistoryEl);
        }
    }

    if(numOfButtons > cityList.length) {
        for (var j = 0; j < numOfButtons-cityList.length; j++) {
            historyEl.removeChild(historyEl.lastElementChild)
        }
    }
}

function getWeatherData(cityName) {
    var requestUrl1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid="+ apiKey;
    var requestUrl2;

    fetch(requestUrl1)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        requestUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";
        fetch(requestUrl2)
        .then(function (responseWeather) {
            return responseWeather.json();
        })
        .then(function (dataWeather) {
            // console.log(dataWeather);
            var iconEl = document.createElement("img");
            todayEl.children[0].textContent = cityName + " (" + moment().format("MM/DD/YYYY)");
            iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + dataWeather.current.weather[0].icon + "@2x.png");
            iconEl.setAttribute("width", "30");
            iconEl.setAttribute("heith", "30");
            iconEl.setAttribute("alt", "weather-icon");
            todayEl.children[0].appendChild(iconEl);
            todayEl.children[1].textContent = "Temp: " + dataWeather.current.temp + " °F";
            todayEl.children[2].textContent = "Wind: " + dataWeather.current.wind_speed + " MPH";
            todayEl.children[3].textContent = "Humidity: " + dataWeather.current.humidity + " %";
            todayEl.children[4].children[0].textContent = dataWeather.current.uvi;
            switch(Math.round(dataWeather.current.uvi)) {
                case 0:
                case 1:
                case 2:
                    todayEl.children[4].children[0].className = "uvi_box uv_green";
                    break;
                case 3:
                case 4:
                case 5:
                    todayEl.children[4].children[0].className = "uvi_box uv_yellow";
                    break;
                case 6:
                case 7:
                    todayEl.children[4].children[0].className = "uvi_box uv_orange";
                    break;
                case 8:
                case 9:
                case 10:
                    todayEl.children[4].children[0].className = "uvi_box uv_red";
                    break;  
                default:
                    todayEl.children[4].children[0].className = "uvi_box uv_violet";
                    break;  
            }


            for(var i = 0; i < 5; i++) {
                cardBodyEls[i].children[0].textContent = moment.unix(dataWeather.daily[i+1].dt).format("MM/DD/YYYY");
                cardBodyEls[i].children[1].setAttribute("src", "http://openweathermap.org/img/wn/" + dataWeather.daily[i+1].weather[0].icon + "@2x.png");
                cardBodyEls[i].children[1].setAttribute("width", "30");
                cardBodyEls[i].children[1].setAttribute("height", "30");
                cardBodyEls[i].children[1].setAttribute("alt", "1 day later weather icon");
                cardBodyEls[i].children[2].textContent = "Temp: " + dataWeather.daily[i+1].temp.day + " °F";
                cardBodyEls[i].children[3].textContent = "Wind: " + dataWeather.daily[i+1].wind_speed + " MPH";
                cardBodyEls[i].children[4].textContent = "Humidity: " + dataWeather.daily[i+1].humidity + " %";
            }

        });
    });
}

function firstScreen() {
    var titleEl = document.createElement("h3");
    titleEl.textContent = "-------- " + moment().format("MM/DD/YYYY ");
    titleEl.className = "fw-bold";
    todayEl.appendChild(titleEl);

    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: --";
    todayEl.appendChild(tempEl);
    
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: --";
    todayEl.appendChild(windEl);

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: --";
    todayEl.appendChild(humidityEl);

    var uviEl = document.createElement("p");
    var valueEl = document.createElement("span");
    valueEl.textContent = "--";
    uviEl.textContent = "UV Index: ";
    uviEl.appendChild(valueEl);
    todayEl.appendChild(uviEl);

    for(var i = 0; i < 5; i++){
        var cardEl = document.createElement("div");
        var cardBodyEl = document.createElement("div");
        var cardTitleEl = document.createElement("h5");
        var cardIconEl = document.createElement("img");
        var cardText1El = document.createElement("p");
        var cardText2El = document.createElement("p");
        var cardText3El = document.createElement("p");

        cardEl.className = "card text-white bg-dark mb-3";
        // cardEl.setAttribute("style", "max-width: 11rem;");
        cardEl.setAttribute("style", "width: 10rem;");

        cardBodyEl.className = "card-body";

        cardTitleEl.className = "card-title";
        cardTitleEl.textContent = moment().add(1+i,'d').format("MM/DD/YYYY");
        cardBodyEl.appendChild(cardTitleEl);

        cardBodyEl.appendChild(cardIconEl);

        cardText1El.className = "card-text";
        cardText1El.textContent = "Temp: --";
        cardBodyEl.appendChild(cardText1El);

        cardText2El.className = "card-text";
        cardText2El.textContent = "Wind: --";
        cardBodyEl.appendChild(cardText2El);

        cardText3El.className = "card-text";
        cardText3El.textContent = "Humidity: --";
        cardBodyEl.appendChild(cardText3El);

        cardEl.appendChild(cardBodyEl);
        cardContainerEl.appendChild(cardEl);
    }

    cityList = JSON.parse(localStorage.getItem("history"));
    // history = localStorage.getItem("history");
    if(cityList) {
        for (var j=0; j<cityList.length; j++) {
            var buttonEl = document.createElement("button");
            buttonEl.className = "btn btn-primary city-button mx-0 my-1";
            buttonEl.setAttribute("type", "button");
            buttonEl.textContent = cityList[j];
            historyEl.appendChild(buttonEl);
        }
    }
    else {
        cityList = [];
    }
}

firstScreen();