
import { cToF, fToC } from './translator'
import { displaySuggestions, toggleFahrenheit, toggleSearchResults, userinput, fahrenheit, resultscontainer, placeselected } from './dom'

let service = undefined;
let lastrequest = undefined;
let map = undefined;
let geocoder = undefined;

let thereisarequest = false;
let initialized = false;


function initMapGeocoder() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8,
        disableDefaultUI: true
    });
}
function codeAddress (place_id) 
{
    lastrequest = place_id;
    document.querySelector("#loadingsvg").classList.remove('hidden');
    document.querySelector(".search-results").classList.add("active");

    geocoder.geocode({
        placeId: place_id
    }, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            fetchWeather(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            document.querySelector("#loadingsvg").classList.add('hidden');
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function getResults() {
    toggleSearchResults();
    resultscontainer.innerHTML = "";
    if (initialized) {
        service.getQueryPredictions({
            input: userinput.value
        }, displaySuggestions);
    } else {
        service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({
            input: userinput.value
        }, displaySuggestions);
    }
}

function autoComplete() {
    let defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));

    let input = document.getElementById('searchTextField');
    let options = {
        bounds: defaultBounds,
        types: ['establishment']
    };
    if (userinput.checkValidity() && !thereisarequest) {
        let text = userinput.value;
        let autocompleted = new google.maps.places.Autocomplete(userinput, options);

    }

}

function fetchWeather({
    lat,
    lng
}) {

    let thislat = lat();
    let thislng = lng();

    let allOk = false;

    fetch(`./getweather?lat=${thislat}&long=${thislng}`)
        .then(response => response.json())
        .then(response => {
            allOk = true;
            let data = response.data;
            let metric = (fahrenheit) ? "F" : "C";
            let metric1 = (fahrenheit) ? "Fahrenheit" : "Celsius";

            if (fahrenheit) {
                data[0].temp = parseInt(cToF(data[0].temp))
                data[0].max_temp = parseInt(cToF(data[0].max_temp))
                data[0].low_temp = parseInt(cToF(data[0].low_temp))
                data[1].temp = parseInt(cToF(data[1].temp))
                data[2].temp = parseInt(cToF(data[2].temp))
                data[3].temp = parseInt(cToF(data[3].temp))
                data[4].temp = parseInt(cToF(data[4].temp))
            }

            let card = `
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
                `

            debugger;
            document.querySelector("#cardinfo").innerHTML = card;

            document.querySelector("#togglecf").addEventListener('click', toggleFahrenheit);
        })
        .catch(function(err) {
            allOk = false;
            throw err;
        });





}

export { getResults, autoComplete, fetchWeather, codeAddress, initMapGeocoder, lastrequest }