const city = document.querySelector('.city');
//Display
const card = document.querySelector('.card');
//Current
const temp = document.querySelector('.tempurature');
const humid = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const uvDisplay = document.querySelector('.uv');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const iconDisplay = document.querySelector('.icon');
const localTime =  document.querySelector('.local-time')
//Forecast
const day2Date = document.querySelector('.date-2');
const day3Date = document.querySelector('.date-3');

const day1Temp = document.querySelector('.temp-1');
const day2Temp = document.querySelector('.temp-2');
const day3Temp = document.querySelector('.temp-3');

const day1Icon = document.querySelector('.icon-1');
const day2Icon = document.querySelector('.icon-2');
const day3Icon = document.querySelector('.icon-3');

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

      console.log(data.location.localtime.slice(-5));
      this.renderCurrentWeather(data, city);
      this.renderForecast(data, city);
    } catch (error) {
      console.error(`🦜Bird Problem: ${error}`);
    }
  },

  renderCurrentWeather: function (data) {
    const { name } = data.location;
    const { temp_c, humidity, wind_kph, uv } = data.current;
    const { icon } = data.current.condition;
    const time = data.location.localtime.slice(-5)

    city.textContent = `Weather in  ${name}`;
    temp.textContent = `${temp_c}°C`;
    iconDisplay.src = icon;
    localTime.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg> ${time}`
    humid.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300 60 150 135 240 150 300z"></path></svg> ${humidity}%`;
    windSpeed.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z"></path></g></svg> ${wind_kph} km/h`;
    uvDisplay.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="4"></circle><path fill-rule="evenodd" d="M8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .708z" clip-rule="evenodd"></path></svg> ${uv}`;

    document.body.style.backgroundImage = `url('${this.bgUrl}${name}')`;
    // if (document.body.style.backgroundImage === )
    card.classList.remove('loading');
  },

  renderForecast: function (data) {
    const { forecastday } = data.forecast;
    day2Date.textContent =
      weekdays[new Date(forecastday[1].date_epoch * 1000).getUTCDay()];
    day3Date.textContent =
      weekdays[new Date(forecastday[2].date_epoch * 1000).getUTCDay()];

    day1Temp.textContent = `${forecastday[0].day.avgtemp_c}°C`;
    day2Temp.textContent = `${forecastday[1].day.avgtemp_c}°C`;
    day3Temp.textContent = `${forecastday[2].day.avgtemp_c}°C`;

    day1Icon.src = forecastday[0].day.condition.icon;
    day2Icon.src = forecastday[1].day.condition.icon;
    day3Icon.src = forecastday[2].day.condition.icon;
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
