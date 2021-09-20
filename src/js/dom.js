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

function displaySuggestions(predictions) {
  // eslint-disable-next-line no-undef

  predictions.forEach(({
    properties: {
      name, lon, lat, result_type: Resulttype,
    },
  }) => {
    const item = document.createElement('item');

    item.addEventListener('click', () => {
      placeselected = name;
      codeAddress([lon, lat]);
    });

    item.setAttribute('style', 'display: flex;flex-direction: column;padding: .5em .5em;border-bottom: 1px solid rgba(0,0,0,.10);');

    const itemtitle = document.createElement('title');
    const itemspan = document.createElement('span');

    itemtitle.innerHTML = name;
    itemspan.innerHTML = Resulttype;

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
