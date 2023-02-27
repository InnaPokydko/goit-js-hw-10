import './css/styles.css';
import nameCountry from 'https://restcountries.com/v3.1/name/{name}';
import API from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountries(searchQuery)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountries(country) {
  const murkUp = nameCountry(nameId);
  refs.inputForm.innerHTML = murkUp;
}

function onFetchError(error) {
  Notiflix.Notify.failure(`❌Sory, there is no country with that name`);
}
