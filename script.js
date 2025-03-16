document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");

  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const weatherImg = document.getElementById("weather-img");

  const errorMessage = document.getElementById("error-message");


  const API_KEY = window.API_KEY;

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }
  });

  async function fetchWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.status, "Error fetching weather");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    const { name, main, weather, wind } = weatherData;

    cityNameDisplay.innerHTML = `City name : ${name}`;
    temperatureDisplay.innerHTML = `Temperature : ${Math.floor(main.temp.toFixed(2))}°C`;
    windSpeedDisplay.innerHTML = `Wind : ${wind.speed.toFixed(2)} km/hr`;
    descriptionDisplay.innerHTML = `Weather description : ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    if (main.temp < 0) {
      weatherImg.src =
        "https://media.istockphoto.com/id/868098786/photo/thermometer-on-snow-shows-low-temperatures-zero-low-temperatures-in-degrees-celsius-and.jpg?s=1024x1024&w=is&k=20&c=A_D48BLCy76ux8guBDeYxk5c8i8WqWvQOcNVlFKOGk4=";
    } else if (main.temp > 0 && main.temp < 15) {
      weatherImg.src =
        "https://media.istockphoto.com/id/960213848/photo/its-cold-out-here-i-have-to-cover-up.jpg?s=1024x1024&w=is&k=20&c=kJQKmi3u0I9pfLfdQ1RsNam1mdZRQ6i4sRwwK0BCs8I=";
    } else if (main.temp > 15 && main.temp < 25) {
      weatherImg.src =
        "https://media.istockphoto.com/id/1485705128/photo/happy-freedom-and-smile-with-woman-in-nature-for-peace-relax-and-youth-with-blue-sky-mockup.jpg?s=1024x1024&w=is&k=20&c=k8WC-B5gy7Vh_0ZXnGwCHh__N5dHfB8ZhZwM0rpCpXA=";
    } else if (main.temp > 25) {
      weatherImg.src =
        "https://media.istockphoto.com/id/1264078618/photo/heatwave.jpg?s=1024x1024&w=is&k=20&c=joqVt6zb-ZI3lhKb-VHRAWlI7hH93Ii90YB-YXFLjT4=";
    }
  }

  function displayError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }

  let darkmode = localStorage.getItem("darkmode");
  const themeSwitch = document.getElementById("theme-switch");

  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "inactive");
  };

  if (darkmode === "active") {
    enableDarkmode();
  }

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  });
});
