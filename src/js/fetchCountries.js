export default { fetchCountries };

function fetchCountries(countryId) {
  return fetch('https://restcountries.com/v3.1/name/${countryId}https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages')
  .then(response => {
    return response.json();
  });
}

