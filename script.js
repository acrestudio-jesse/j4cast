const city = document.querySelector('.city');
//Display
const card =  document.querySelector('.card')
//Current
const temp = document.querySelector('.tempurature');
const humid = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const uvDisplay = document.querySelector('.uv');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const iconDisplay = document.querySelector('.icon');
//Forecast
const day2Date = document.querySelector('.date-2')
const day3Date = document.querySelector('.date-3')

const day1Temp = document.querySelector('.temp-1')
const day2Temp = document.querySelector('.temp-2')
const day3Temp = document.querySelector('.temp-3')

const day1Icon = document.querySelector('.icon-1')
const day2Icon = document.querySelector('.icon-2')
const day3Icon = document.querySelector('.icon-3')

const weekdays = ["Sunday", 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const weather = {
  url: 'http://api.weatherapi.com/v1',
  key: '4603e403a6ba467980431518222006',
  bgUrl: 'https://source.unsplash.com/1920x1080/?',

  getCurrentWeather: async function (city) {
    try {
      const response = await fetch(
        `${this.url}/forecast.json?key=${this.key}&q=${city}&days=3&aqi=no`
      );
      const data = await response.json();

      console.log(data);
      this.renderCurrentWeather(data, city);
      this.renderForecast(data, city)
    } catch (error) {
      console.error(`🦜Bird Problem: ${error}`);
    }
  },

  renderCurrentWeather: function (data) {
    const { name } = data.location;
    const { temp_c, humidity, wind_kph, uv } = data.current;
    const { icon } = data.current.condition;

    city.textContent = `Weather in  ${name}`;
    temp.textContent = `${temp_c}°C`;
    iconDisplay.src = icon;
    humid.textContent = `${humidity}%`;
    windSpeed.textContent = `${wind_kph} km/h`;
    uvDisplay.textContent = `${uv}`;

    document.body.style.backgroundImage = `url('${this.bgUrl}${name}')`;
    // if (document.body.style.backgroundImage === )
    card.classList.remove('loading')
  },


  renderForecast: function(data) {
    const { forecastday } = data.forecast;
day2Date.textContent = weekdays[new Date(forecastday[1].date_epoch*1000).getUTCDay()]
day3Date.textContent = weekdays[new Date(forecastday[2].date_epoch*1000).getUTCDay()]

day1Temp.textContent = `${forecastday[0].day.avgtemp_c}°C`
day2Temp.textContent = `${forecastday[1].day.avgtemp_c}°C`
day3Temp.textContent = `${forecastday[2].day.avgtemp_c}°C`

day1Icon.src = forecastday[0].day.condition.icon
day2Icon.src = forecastday[1].day.condition.icon
day3Icon.src = forecastday[2].day.condition.icon
  },

  searchCity: function () {
    this.getCurrentWeather(searchBar.value);
    searchBar.value = '';
  },
};

// navigator.geolocation.getCurrentPosition(pos => {
//     console.log(pos)
//     const {latitude, longitude} = pos.coords
// weather.getCurrentWeather(`${latitude} ${longitude}`)
// }
//     )

weather.getCurrentWeather('Taipei');

searchBtn.addEventListener('click', function () {
  weather.searchCity();
});

searchBar.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    weather.searchCity();
  }
});

//Add 3 Day Forecast