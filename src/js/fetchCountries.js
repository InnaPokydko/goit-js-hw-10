export default { fetchCountries };

function fetchCountries() {
  return fetch('https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages')
  .then(response => {
    return response.json();
  });
}

