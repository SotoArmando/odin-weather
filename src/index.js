    import './sass/app.module.scss'
    
    let map = undefined;
    let geocoder = undefined;
    let userinput = document.querySelector("input[placeholder='Type any place']");
    let cardsstateready = document.querySelector("card.search-results.active");
    let thereisarequest = false;
    let service = undefined;
    let initialized = false;
    let resultscontainer = document.querySelector("card > state.ready");
    let initialindex = 0;
    let placeselected = "";
    let list = document.querySelectorAll('wrapped-sections > scroll-flex');
    let fahrenheit = false;
    let lastrequest = undefined;

    

    const nextSectionWeather = () => {
        initialindex += 1;
        initialindex %= 3;

        list.forEach((value, index) => {

            if (index == initialindex) {
                list[index].classList.add("active")
            } else {
                list[index].classList.remove("active")
            }
        })

    }


    const initMap = () => {
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

    const cToF = (celsius) => 
    {
        let cTemp = celsius;
        let cToFahr = cTemp * 9 / 5 + 32;
        return cToFahr;
    }

    const fToC = (fahrenheit) =>
    {
        let fTemp = fahrenheit;
        let fToCel = (fTemp - 32) * 5 / 9;
              
    } 

    const toggleFahrenheit = () => { 
        
        fahrenheit = !fahrenheit; 

        if (fahrenheit) {
            document.querySelector("#togglecf").setAttribute("value","Fahrenheit")
        } else {
            document.querySelector("#togglecf").setAttribute("value","Celsius")
        }

        if (lastrequest) {
            codeAddress(lastrequest)
        }
        
        
    }
    
    const codeAddress = (place_id) => 
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

    const setLocation = (lat) => {
        map.map.setCenter(new google.maps.LatLng(45, 19));
    }

    const switchthis = () => {
        document.querySelector(".search-results").classList.toggle("active");
    }

    const iLikeit = () => {
        document.querySelectorAll("card.search-results > state").forEach(value => {
            value.classList.toggle("active")
        });
    }

    const displaySuggestions = (predictions, status) => {
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
        iLikeit();
    };

    const initService = () => {
        service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({
            input: userinput.value
        }, displaySuggestions);
    }

    const getResults = () => {
        iLikeit();
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

    const autoComplete = () => {
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

    const fetchWeather = ({
            lat,
            lng
        }) => {

        let thislat = lat();
        let thislng = lng();

        let allOk = false;

        fetch(`./getweather?lat=${thislat}&long=${thislng}`)
        .then(response=>response.json())
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
        }); 
            
          
     


    }

    window.onload = () => {
        initMap();
    }

    document.querySelector("input[placeholder='Type any place']").addEventListener('keyup', () => {
        if (document.querySelector("input[placeholder='Type any place']").checkValidity()) {
            document.querySelector(".search-results").classList.remove("active");
            getResults()
        } else {
            document.querySelector(".search-results").classList.add("active");
        }
    })