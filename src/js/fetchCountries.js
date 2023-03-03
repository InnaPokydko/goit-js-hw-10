export { fetchCountries };

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags.svg,languages`)
  .then((response) => {
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    return response.json();
   
  });
}

// .then(response => {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
// })
// .then(data => {
//   if (Array.isArray(data)) {
//     return data;
//   } else {
//     throw new Error("Unexpected response format");
//   }
// });}
console.log(fetchCountries(name));
