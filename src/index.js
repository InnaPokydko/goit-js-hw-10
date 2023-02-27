import './css/styles.css';

import API from './js/fetchCountries';

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

    fetchCountries(searchQuery)
    .then(renderCountries)
    .catch(error => console.log(error));

    API.fetchCountries()
  .then(renderCountries)
  .catch(error => console.log(error))
  .finally(() => form.reset());
}

function renderCountries(country) {}
