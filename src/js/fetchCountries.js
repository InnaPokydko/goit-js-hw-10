
const COUNTRIES_DATA = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${COUNTRIES_DATA}${name}?${fields}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}


