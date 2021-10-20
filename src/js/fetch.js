/* eslint-disable no-undef */
import axios from 'axios';
import { cToF } from './translator';
// eslint-disable-next-line import/no-cycle
import {
  displaySuggestions, toggleFahrenheit, toggleSearchResults,
  userinput, fahrenheit, resultscontainer, placeselected,
} from './dom';

// eslint-disable-next-line import/no-mutable-exports
let lastrequest;
let map;

let thereisarequest = false;

function FetchWeather({
  lat,
  lng,
}) {
  const thislat = lat;
  const thislng = lng;

  fetch(`./getweather?lat=${thislat}&long=${thislng}`)
    .then((response) => response.json())
    .then((response) => {
      const { data } = response;
      const metric = (fahrenheit) ? 'F' : 'C';
      const metric1 = (fahrenheit) ? 'Fahrenheit' : 'Celsius';

      if (fahrenheit) {
        data[0].temp = parseInt(cToF(data[0].temp), 10);
        data[0].max_temp = parseInt(cToF(data[0].max_temp), 10);
        data[0].low_temp = parseInt(cToF(data[0].low_temp), 10);
        data[1].temp = parseInt(cToF(data[1].temp), 10);
        data[2].temp = parseInt(cToF(data[2].temp), 10);
        data[3].temp = parseInt(cToF(data[3].temp), 10);
        data[4].temp = parseInt(cToF(data[4].temp), 10);
      }

      const card = `
                <label>Odin-Weather</label><br>
                <title>${data[0].temp} ${data[0].max_temp} ${metric} / ${data[0].low_temp} ${metric}</title><br>
                <label>${data[0].valid_date}</label><br>
                <label>${placeselected}</label><br>
                <label>${data[0].weather.description}</label><br>
                <title>Today - ${data[0].weather.description}. Hight ${data[0].max_temp} ${metric} low ${data[0].low_temp} ${metric}, ${data[0].weather.description}.</title><br>

                <wrapped-sections style="position: relative;">

                    <scroll-flex id="firstfivedays" class="active" style="pointer-events: all;">
                        <item>
                            <span>${data[0].temp} ${metric}</span>

                            <span>Today</span>
                        </item>
                        <item>
                            <span>${data[1].temp} ${metric}</span>

                            <span>Tomorrow</span>
                        </item>
                        <item>
                            <span>${data[2].temp} ${metric}</span>

                            <span>+ 1</span>
                        </item>
                        <item>
                            <span>${data[3].temp} ${metric}</span>

                            <span>+ 2</span>
                        </item>
                        <item>
                            <span>${data[4].temp} ${metric}</span>

                            <span>+ 3</span>
                        </item>
                    </scroll-flex>
                </wrapped-sections>
                <button-grid style="pointer-events: all;pointer-events: all;
                cursor: pointer;">
                    <input id="togglecf" type="button" value="${metric1}" style="font-weight: 600;font-weight: 600;
                    border: 1px solid rgba(0,0,0,.20);
                    width: 100%;">
                </button-grid>
                `;

      document.querySelector('#cardinfo').innerHTML = card;

      document.querySelector('#togglecf').addEventListener('click', toggleFahrenheit);
    })
    .catch((err) => {
      throw err;
    });
}
function initMapGeocoder() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    zoom: 8,
    disableDefaultUI: true,
  });
}
function codeAddress([lon, lat]) {
  lastrequest = [lon, lat];
  document.querySelector('#loadingsvg').classList.remove('hidden');
  document.querySelector('.search-results').classList.add('active');
  map.setCenter({ lng: lon, lat });
  FetchWeather({ lng: lon, lat });
  document.querySelector('#loadingsvg').classList.add('hidden');
}

function getResults() {
  toggleSearchResults();
  resultscontainer.innerHTML = '';
  if (userinput.checkValidity() && !thereisarequest) {
    thereisarequest = true;
    const options = {
      method: 'GET',
      url: 'https://geoapify-address-autocomplete.p.rapidapi.com/v1/geocode/autocomplete',
      params: { text: userinput.value, type: 'country' },
      headers: {
        'x-rapidapi-host': 'geoapify-address-autocomplete.p.rapidapi.com',
        'x-rapidapi-key': 'd47e2c0a26msha5142819817b97bp1bce93jsne76fd5e28006',
      },
    };

    axios.request(options).then((response) => {
      const { features } = response.data;
      displaySuggestions(features);
      thereisarequest = false;
    }).catch(() => {
      thereisarequest = false;
    });
  }
}

function autoComplete() {
  // const defaultBounds = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(-33.8902, 151.1759),
  //   new google.maps.LatLng(-33.8474, 151.2631),
  // );

  // const input = document.getElementById('searchTextField');
  // const options = {
  //   bounds: defaultBounds,
  //   types: ['establishment'],
  // };
  if (userinput.checkValidity() && !thereisarequest) {
    // const text = userinput.value;
    // const autocompleted = new google.maps.places.Autocomplete(userinput, options);
  }
}

export {
  getResults, autoComplete, FetchWeather as fetchWeather, codeAddress, initMapGeocoder, lastrequest,
};
