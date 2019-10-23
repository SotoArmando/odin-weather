import { codeAddress, lastrequest } from './fetch'

let userinput = document.querySelector("input[placeholder='Type any place']");
let resultscontainer = document.querySelector("card > state.ready");

let fahrenheit = false;
let placeselected = undefined;

function displaySuggestions(predictions, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
    }
    predictions.forEach((prediction) => {

        let item = document.createElement('item');

        item.addEventListener('click', () => {
            placeselected = prediction.description;
            codeAddress(prediction.place_id);
        })

        item.setAttribute("style", "display: flex;flex-direction: column;padding: .5em .5em;border-bottom: 1px solid rgba(0,0,0,.10);");

        let itemtitle = document.createElement('title');
        let itemspan = document.createElement('span');

        itemtitle.innerHTML = prediction.description;
        itemspan.innerHTML = prediction.types[0];

        item.appendChild(itemtitle);
        item.appendChild(itemspan);

        resultscontainer.appendChild(item);


    });
    toggleSearchResults();
};


function toggleFahrenheit() {

    fahrenheit = !fahrenheit;

    if (fahrenheit) {
        document.querySelector("#togglecf").setAttribute("value", "Fahrenheit")
    } else {
        document.querySelector("#togglecf").setAttribute("value", "Celsius")
    }

    if (lastrequest) {
        codeAddress(lastrequest)
    }


}

function toggleSearchResults() {
    document.querySelectorAll("card.search-results > state").forEach(value => {
        value.classList.toggle("active")
    });
}


export { displaySuggestions, toggleFahrenheit, toggleSearchResults, userinput, fahrenheit, resultscontainer, placeselected }