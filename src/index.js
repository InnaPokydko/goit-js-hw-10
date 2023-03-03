import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const nameCountry = refs.inputForm.value.trim();

  if (nameCountry === '') {
    (refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = '');
  }

  fetchCountries(nameCountry)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => nameCountry.reset);
}
// Функція, яка рендерить отриманий json
function renderCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  } else if (countries.length >= 2 && countries.length <= 10) {
    const murkUp = countries
      .map(({ name, flags }) => {
        return `<li>
          <img class="img" src="${flags.svg}" alt="${flags.alt}" width="30" height="20">
          <h1 class="official-name">${name.official}</h1>
        </li>`;
      })
      .join('');
    refs.countryList.innerHTML = murkUp;
    refs.countryInfo.innerHTML = '';
    return murkUp;
  }

  const murkUp = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <img class="img" src="${flags.svg}" alt="${
        flags.alt
      }" width="30" height="20">
      <h1 class="official-name">${name.official}</h1>
      <p class="text">Capital: ${capital}</p>
      <p class="text">Population: ${population}</p>
      <p class="text">Languages:  ${Object.values(languages)}</p>
      `;
    })
    .join('');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = murkUp;
  return murkUp;
}

function onFetchError(error) {
  Notiflix.Notify.failure(`❌Oops, there is no country with that name`);
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  return error;
}
