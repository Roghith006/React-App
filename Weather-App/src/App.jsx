import { useState, useEffect } from "react";
import "./App.css";
import searchIcon from "./assets/icons8-search-24.png";
import defaultWeatherIcon from "./assets/black-sun-with-rays-emoji-256x256-5kdw62lj.png";
import humidityIcon from "./assets/icons8-humidity-40.png";
import windIcon from "./assets/icons8-windsock-48.png";
import visibilityIcon from "./assets/icons8-visibility.gif";
import airIcon from "./assets/icons8-air-quality-48.png";

const WeatherDetails = ({icon, temp,city,country,wind,humidity,airpressure,visibility,
  forecast, hourlyForecast,}) => (
  <>
    <div className="weather-info">
      <div className="image">
        <img src={icon} alt="weather-icon" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
    </div>

    <div className="sidebar">
      <div className="sidebar-section">
        <img src={humidityIcon} alt="Humidity Icon" />
        <span>{humidity}% Humidity</span>
      </div>
      <div className="sidebar-section">
        <img src={windIcon} alt="Wind Icon" />
        <span>{wind} m/s Wind</span>
      </div>
      <div className="sidebar-section">
        <img src={visibilityIcon} alt="Visibility Icon" />
        <span>{(visibility / 1000).toFixed(1)} km Visibility</span>
      </div>
      <div className="sidebar-section">
        <img src={airIcon} alt="Air Pressure Icon" />
        <span>{airpressure} hPa Air Pressure</span>
      </div>
    </div>

    <div className="forecast-panel">
      <h2 className="header1">Daily forecast</h2>
      {forecast.map((day, idx) => (
        <div className="forecast-day" key={idx}>
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="forecast icon"
          />
          <p>{Math.round(day.main.temp)}°C</p>
          <p>{day.weather[0].main}</p>
        </div>
      ))}
    </div>

    <div className=" hourly-panel">
      <h2 className="header1">Hourly Forecast</h2>
      <div className="hourly-forecast-scroll">
        {hourlyForecast.length > 0 ? (
          hourlyForecast.map((hour, index) => (
            <div key={index} className="hourly-forecast-item">
              <p>{new Date(hour.dt * 1000).getHours()}:00</p>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt="hourly-icon"
              />
              <p>{Math.round(hour.main.temp)}°C</p>
            </div>
          ))
        ) : (
          <p>No hourly data available</p>
        )}
      </div>
    </div>
  </>
);

function App() {
  const apiKey = "c44da65fb412f333ca5896a9bb8ac061"; // Replace with your actual key

  const [icon, setIcon] = useState(defaultWeatherIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [wind, setWind] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [visibility, setVisibility] = useState("0");
  const [airpressure, setAirpressure] = useState("0");
  const [searchInput, setSearchInput] = useState("chennai");
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) {
        alert("City not found");
        return;
      }

      const { lat, lon } = geoData[0];

      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const weatherData = await weatherRes.json();

      setIcon(
        `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
      );
      setTemp(Math.round(weatherData.main.temp));
      setCity(weatherData.name);
      setCountry(weatherData.sys.country);
      setHumidity(weatherData.main.humidity);
      setWind(weatherData.wind.speed);
      setVisibility(weatherData.visibility);
      setAirpressure(weatherData.main.pressure);

      // Forecast (3-hour intervals for 5 days)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const forecastData = await forecastRes.json();
      const forecastList = forecastData.list;

      if (!forecastList || forecastList.length === 0) {
        setForecast([]);
        setHourlyForecast([]);
        return;
      }

      // Daily forecast (1 entry per day)
      const dailyForecast = forecastList.filter((item, index) => index % 8 === 0);
      setForecast(dailyForecast.slice(1, 6));

      // Hourly forecast for next 24 hours (8 intervals)
      const next24Hours = forecastList.slice(0, 8);
      setHourlyForecast(next24Hours);
    } catch (error) {
      console.error("Error fetching data", error);
      alert("Error fetching weather data");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search here"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="search-icon" onClick={handleSearch}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <div className="main-layout">
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            humidity={humidity}
            wind={wind}
            visibility={visibility}
            airpressure={airpressure}
            forecast={forecast}
            hourlyForecast={hourlyForecast}
          />
        </div>
      </div>
    </>
  );
}

export default App;
