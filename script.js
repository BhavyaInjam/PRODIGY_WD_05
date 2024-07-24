const apiKey = "033f19189a8ab629d8ac47ab098e86ef"; 
const weatherDataDiv = document.getElementById("weather-data");
const getLocationButton = document.getElementById("get-weather");
const userInput = document.getElementById("user-location");

getLocationButton.addEventListener("click", () => {
  const location = userInput.value;
  fetchWeatherData(location);
});

function fetchWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`; // Replace with your chosen API

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Invalid location entered. Please try again.");
      }
      return response.json();
    })
    .then(data => {
      const weatherDescription = data.weather[0].main;
      const temperature = Math.round(data.main.temp);
      const city = data.name;
      const humidity = data.main.humidity;
      const clouds = data.clouds.all; 

      weatherDataDiv.innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>Description: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Cloudiness: ${clouds}%</p>
      `;
    })
    .catch(error => {
      console.error(error);
      weatherDataDiv.innerHTML = `<span style="color: red;">${error.message}</span>`; 
    });
}
