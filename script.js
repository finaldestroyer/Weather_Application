const WeatherStack_apiKey = '11afad88a6585bcaf98b52a3d94c5e37';
const apiUrl = `http://api.weatherstack.com/current?access_key=${WeatherStack_apiKey}&query=`;

// Create the UI elements
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const title = document.createElement('h1');
title.textContent = 'Weather App';
container.appendChild(title);

const searchDiv = document.createElement('div');
searchDiv.className = 'search';
container.appendChild(searchDiv);

const cityInput = document.createElement('input');
cityInput.type = 'text';
cityInput.id = 'citySearch';
cityInput.placeholder = 'City name';
searchDiv.appendChild(cityInput);

const zipInput = document.createElement('input');
zipInput.type = 'text';
zipInput.id = 'zipSearch';
zipInput.placeholder = 'Enter ZIP code';
searchDiv.appendChild(zipInput);

const searchButton = document.createElement('button');
searchButton.id = 'searchButton';
searchButton.textContent = 'Search';
searchDiv.appendChild(searchButton);

const resultDiv = document.createElement('div');
resultDiv.className = 'result';
container.appendChild(resultDiv);

const cityElement = document.createElement('div');
cityElement.className = 'city';
cityElement.id = 'city';
cityElement.textContent = 'City';
resultDiv.appendChild(cityElement);

const tempElement = document.createElement('div');
tempElement.className = 'temp';
tempElement.id = 'temp';
tempElement.textContent = 'Temperature';
resultDiv.appendChild(tempElement);

const descriptionElement = document.createElement('div');
descriptionElement.className = 'description';
descriptionElement.id = 'description';
descriptionElement.textContent = 'Description';
resultDiv.appendChild(descriptionElement);

const weatherIcon = document.createElement('img');
weatherIcon.id = 'weatherIcon';
resultDiv.appendChild(weatherIcon);

const backgroundImage = document.createElement('img');
backgroundImage.id = 'backgroundImage';
document.body.appendChild(backgroundImage);

const weatherDescription = document.createElement('div');
weatherDescription.className = 'weatherDescription';
weatherDescription.id = 'weatherDescription';
container.appendChild(weatherDescription);

// JavaScript for handling the weather API response
document.getElementById('searchButton').addEventListener('click', function () {
    const citySearch = document.getElementById('citySearch').value;
    let searchInput = citySearch;

    if (document.getElementById('zipSearch').value !== '') {
        searchInput = document.getElementById('zipSearch').value;
    }

    fetch(apiUrl + searchInput)
        .then(response => response.json())
        .then(data => handleApiResponse(data))
        .catch(error => {
            console.error(error);
            alert('City not found. Please try again.');
        });
});

function handleApiResponse(data) {
    if (data.error) {
        throw new Error(data.error.info);
    }

    document.getElementById('city').textContent = `Weather in ${data.location.name}`;
    document.getElementById('temp').textContent = `${data.current.temperature}°C`;
    document.getElementById('description').textContent = data.current.weather_descriptions[0];
    document.getElementById('weatherIcon').setAttribute('src', data.current.weather_icons[0]);

    document.getElementById('description').style.display = 'block';
    document.getElementById('weatherIcon').style.display = 'block';

    updateBackgroundImage(data.current.temperature, new Date().getHours(), data.current.weather_descriptions[0]);
}

function updateBackgroundImage(temperature, time, description) {
    let imageUrl = '';

    if (time >= 6 && time < 18) {
        if (temperature > 30) {
            imageUrl = 'images/hot_day.jpg';
            weatherDescription.textContent = "It's a hot day!";
        } else if (temperature > 20) {
            imageUrl = 'images/warm_day.jpg';
            weatherDescription.textContent = "It's a warm day!";
        } else {
            imageUrl = 'images/cool_day.jpg';
            weatherDescription.textContent = "It's a cool day!";
        }
    } else {
        if (temperature > 20) {
            imageUrl = 'images/warm_night.jpg';
            weatherDescription.textContent = "It's a warm night!";
        } else if (temperature > 10) {
            imageUrl = 'images/cool_night.jpg';
            weatherDescription.textContent = "It's a cool night!";
        } else {
            imageUrl = 'images/cold_night.jpg';
            weatherDescription.textContent = "It's a cold night!";
        }
    }

    if (description.toLowerCase().includes('rain')) {
        imageUrl = 'images/rainy.jpg';
        weatherDescription.textContent = "It's rainy!";
    } else if (description.toLowerCase().includes('clear')) {
        imageUrl = 'images/clear.jpg';
        weatherDescription.textContent = "It's clear!";
    }

    const backgroundImage = document.getElementById('backgroundImage');
    backgroundImage.setAttribute('src', imageUrl);
    backgroundImage.style.display = 'block';
    weatherDescription.style.display = 'block';
}
