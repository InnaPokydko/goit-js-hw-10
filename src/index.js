import './css/styles.css';
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('submit', debounce(onSubmit, DEBOUNCE_DELAY));

function onSubmit(e) {
  e.preventDefault();

  const nameCountry = inputForm.value.trim();

  if (nameCountry === '') {
    API.fetchCountries(searchQuery)
      .then(renderCountries)
      .catch(onFetchError)
      .finally(() => form.reset());
  }
 }

function renderCountries(nameCountry) {
  if (nameCountry.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length >= 2 && countries.length <= 10) {
    const murkUp = nameCountry
      .map(({ name, flags }) => {
        return `<li>
          <img class="img" src="${flags.svg}" alt="${flags.alt}" width="30" height="20">
          <h1 class="official-name">${name.official}</h1>
                    </li>`;
      })
      .join('');
    refs.countryList.innerHTML = murkUp;
  }

  const murkUp = nameCountry
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <img class="img" src="${flags.svg}" alt="${flags.alt}" width="30" height="20">
      <h1 class="official-name">${name.official}</h1>
      <p class="text">Capital: ${capital}</p>
      <p class="text">Population: ${population}</p>
      <p class="text">Languages: ${languages}</p>
      `;
    })
    .join('');
  refs.countryInfo.innerHTML = murkUp;
}

function onFetchError(error) {
  Notiflix.Notify.failure(`❌Oops, there is no country with that name`);
}
