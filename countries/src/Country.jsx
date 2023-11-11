const Country = ({ country, weather }) => {
  const languages = country ? Object.values(country.languages) : null;
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <strong>languages:</strong>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png} />
      <h1>Weather in {country.capital}</h1>
      <p>temperature {weather.temp} Celcius</p>
      <img src={iconUrl}/>
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default Country;
