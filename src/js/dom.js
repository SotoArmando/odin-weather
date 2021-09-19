/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line import/no-cycle
import { codeAddress, lastrequest } from './fetch';

const userinput = document.querySelector("input[placeholder='Type any place']");
const resultscontainer = document.querySelector('card > state.ready');

let fahrenheit = false;
let placeselected;

function toggleSearchResults() {
  document.querySelectorAll('card.search-results > state').forEach((value) => {
    value.classList.toggle('active');
  });
}

function displaySuggestions(predictions, status) {
  // eslint-disable-next-line no-undef
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    // eslint-disable-next-line no-alert
    alert(status);
    return;
  }
  predictions.forEach((prediction) => {
    const item = document.createElement('item');

    item.addEventListener('click', () => {
      placeselected = prediction.description;
      codeAddress(prediction.place_id);
    });

    item.setAttribute('style', 'display: flex;flex-direction: column;padding: .5em .5em;border-bottom: 1px solid rgba(0,0,0,.10);');

    const itemtitle = document.createElement('title');
    const itemspan = document.createElement('span');
    const { description, types: [type0] } = prediction;
    itemtitle.innerHTML = description;
    itemspan.innerHTML = type0;

    item.appendChild(itemtitle);
    item.appendChild(itemspan);

    resultscontainer.appendChild(item);
  });
  toggleSearchResults();
}

function toggleFahrenheit() {
  fahrenheit = !fahrenheit;

  if (fahrenheit) {
    document.querySelector('#togglecf').setAttribute('value', 'Fahrenheit');
  } else {
    document.querySelector('#togglecf').setAttribute('value', 'Celsius');
  }

  if (lastrequest) {
    codeAddress(lastrequest);
  }
}

export {
  displaySuggestions, toggleFahrenheit, toggleSearchResults,
  userinput, fahrenheit, resultscontainer, placeselected,
};
