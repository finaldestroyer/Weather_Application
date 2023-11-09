const WeatherStack_apiKey = '11afad88a6585bcaf98b52a3d94c5e37';
//const apiUrl = 'http://api.weatherstack.com/current?access_key=${WeatherStack_apiKey}&query=${searchInput}';
const apiUrl = 'http://api.weatherstack.com/current?access_key='+ WeatherStack_apiKey +'&query=';
const port = 3000;

createHead();
createBody();


document.getElementById('searchButton').addEventListener('click', function () {
    const citySearch = document.getElementById('citySearch').value;
    var searchInput = citySearch;
    if (document.getElementById('zipSearch').value != '') {searchInput = document.getElementById('zipSearch').value;}
    fetch(apiUrl + searchInput)
        .then(response => response.json())
        .then(data => {
            const cityElement = document.getElementById('city');
            //const zipElement = document.getElementById('zip');
            const tempElement = document.getElementById('temp');
            const descriptionElement = document.getElementById('description');
            var weatherIcon = document.getElementById('weatherIcon');


            cityElement.textContent = `Weather in ${data.location.name}`;
            tempElement.textContent = `${data.current.temperature}°C`;
            descriptionElement.textContent = data.current.weather_descriptions[0];
            weatherIcon.setAttribute("src", data.current.weather_icons[0]);

        })
        .catch(error => {
            console.error(error);
            alert('City not found. Please try again.');
        });
});

function createHead(){
    var title = document.createElement('title');
    document.title = "Weather App";
}

function createBody() {
    var container1 = document.createElement('div');
    container1.className = 'container';
    container1.id = 'container1';
    document.body.appendChild(container1)

    var weatherAppHeader = document.createElement("h1");
    weatherAppHeader.textContent = "Weather App";
    container1.appendChild(weatherAppHeader);
    
    var searchClass = document.createElement('div');
    var resultClass = document.createElement('div');
    searchClass.className = 'search';
    resultClass.className ='result';
    container1.appendChild(searchClass);
    container1.appendChild(resultClass);

    var citySearch = document.createElement("input");
    citySearch.setAttribute("type", "text");
    citySearch.setAttribute("id", "citySearch");
    citySearch.setAttribute("placeholder", "City name");

    var zipSearch = document.createElement("input");
    zipSearch.setAttribute("type", "text");
    zipSearch.setAttribute("id", "zipSearch");
    zipSearch.setAttribute("placeholder", "Enter zipcode");

    var searchButton = document.createElement("button");
    searchButton.setAttribute("id", "searchButton");
    searchButton.textContent = "Search";

    var cityElement = document.createElement("div");
    cityElement.className ='city';
    cityElement.setAttribute("id", "city");
    cityElement.textContent = "City";
    
    var tempElement = document.createElement("div");
    tempElement.className ='temp';
    tempElement.setAttribute("id", "temp");
    tempElement.textContent = "Temperature";
    
    var descriptionElement = document.createElement("div");
    descriptionElement.className = 'description';
    descriptionElement.setAttribute("id", "description");
    descriptionElement.textContent = "Description";

    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("id", "weatherIcon");



    var searcher = document.querySelector(".search");
    searcher.appendChild(citySearch);
    searcher.appendChild(zipSearch);
    searcher.appendChild(searchButton);

    var result = document.querySelector(".result");
    result.appendChild(cityElement);
    result.appendChild(tempElement);
    result.appendChild(descriptionElement);
    result.appendChild(weatherIcon);
}
