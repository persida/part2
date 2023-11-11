import { useState, useEffect } from "react";
import services from "./services/countries";
import FoundCountries from "./FoundCountries";
import Country from "./Country";
import getCurrentWeather from "./services/weather";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [foundCountries, setFoundCountries] = useState([]);
  const [displayCountry, setDisplayCountry] = useState(null);
  const [weather, setWeather] = useState({temp: undefined, wind: undefined, icon: undefined});

  useEffect(() => {
    services
      .getAll()
      .then((result) =>
        setAllCountries(result.map((country) => country.name.common))
      );
  }, []);

  useEffect(() => {
    if (foundCountries.length === 1) {
      services.getCountry(foundCountries[0])
        .then(result => {
          setDisplayCountry(prevCountry => prevCountry = result);
          getCurrentWeather(result.capital, result.cca3)
            .then(weatherResult => {
              const weatherParameters = { temp: weatherResult.main.temp, wind: weatherResult.wind.speed, icon: weatherResult.weather[0].icon};
              setWeather(weatherParameters);
            });
        });
    } else {
      setDisplayCountry(null);
    }
  }, [foundCountries, searchCountry]);

  const handleInputChange = (e) => {
    setSearchCountry(e.target.value);
    setFoundCountries(
      allCountries.filter((country) =>
        country.toLowerCase().includes(e.target.value)
      )
    );
  };

  return (
    <div>
      <p>find countries</p>
      <input value={searchCountry} onChange={handleInputChange} />
      <FoundCountries foundCountries={foundCountries} setFoundCountries={setFoundCountries}/>
      {displayCountry && <Country country={displayCountry} weather={weather} />}
    </div>
  );
}

export default App;
