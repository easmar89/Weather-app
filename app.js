//Selecting DOM elements
const london = document.querySelector('.london');
const gothenburg = document.querySelector('.gothenburg');
const newYork = document.querySelector('.new-york');
const mainCards = document.querySelector('.main-cards');
const input = document.querySelector('#search-area');
const btn = document.querySelector('#btn');
let currentTime = new Date();

//Function to get weather data from the API
async function getData(city, div) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=774397c7a2be48a162cc7a0d5c93b708`);
    const data = await response.json();
    let html;
    html = `
        <p class="city-name">${data.name}, ${data.sys.country}</p>
        <p class="time">${currentTime.getHours()}:${currentTime.getMinutes()}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon" class="icon" />
        <h1 class="temperature">${Math.round(data.main.temp)}°</h1>
        <p class="description">${data.weather[0].description}</p>
        <p class="feels-like">Feels like: ${Math.round(data.main.feels_like)}°</p>
        <p class="humidty">Humidity: ${data.main.humidity}%</p>
    `;
    div.innerHTML = html;
}

//function to get the city image from unsplash
function setImage(city, div) {
    div.style.background = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://source.unsplash.com/800x450/?${city}') no-repeat center/cover`;
    div.classList.add('card');
}

//setting data for the main cards
getData('london', london);
getData('gothenburg', gothenburg);
getData('New york', newYork);

//adding the search functionality
btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.value) {
        let newDiv = document.createElement('article');
        getData(input.value, newDiv);
        setImage(input.value, newDiv);
        mainCards.appendChild(newDiv);
    }
});
