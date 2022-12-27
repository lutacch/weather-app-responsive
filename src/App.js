import yellowGIF from "./assets/yellowGIF.gif";
import clearGIF from "./assets/clearGIF.gif";
import cloudsGIF from "./assets/cloudsGIF.gif";
import violetGIF from "./assets/violetGIF.gif";
import greyGIF from "./assets/greyGIF.gif";

import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

import "./index.css";

function App() {
  const [city, setCity] = useState("Madrid");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(yellowGIF);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);

      setWeather(data);

      const main = data.main;
      console.log(main);

      switch (main) {
        case "Thunderstorm":
          setBg(greyGIF);

          break;
        case "Drizzle":
          setBg(clearGIF);
          break;
        case "Rain":
          setBg(greyGIF);
          break;
        case "Snow":
          setBg(violetGIF);
          break;
        case "Clear":
          setBg(yellowGIF);
          break;
        case "Clouds":
          setBg(cloudsGIF);
          break;

        default:
          setBg(yellowGIF);
          break;
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div>
              <h3 className="ciudad">{weather.name}</h3>
              <h3 className="country">{weather.country}</h3>
              
              </div>
          
              <div className="icon">
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
