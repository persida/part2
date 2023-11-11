import React, { useEffect } from 'react';

const FoundCountries = ({ foundCountries, setFoundCountries}) => {

  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  const handleClick = (country) => {
    setFoundCountries([country]);
  }

  if (foundCountries.length > 1) {
  return foundCountries.map((country) => <div key={country}>{country} <button onClick={() => handleClick(country)}>show</button></div>);
  }
};

export default FoundCountries;
