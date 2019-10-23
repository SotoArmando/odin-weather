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

    function cToF(celsius) 
    {
        let cTemp = celsius;
        let cToFahr = cTemp * 9 / 5 + 32;
        
            
    }

    function fToC(fahrenheit) 
    {
        let fTemp = fahrenheit;
        let fToCel = (fTemp - 32) * 5 / 9;
              
    } 

    const codeAddress = (place_id) => {
        document.querySelector("#loadingsvg").classList.remove('hidden');
        document.querySelector(".search-results").classList.toggle("active");

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
        let data = null;
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", () => {

            if (this.readyState === this.DONE) {
           
                let data = JSON.parse(this.responseText).data;


                let card = `
                    <label>Odin-Weather</label><br>
                    <title>${data[0].temp} ${data[0].max_temp} C / ${data[0].low_temp} C</title><br>
                    <label>${data[0].valid_date}</label><br>
                    <label>${placeselected}</label><br>
                    <label>${data[0].weather.description}</label><br>
                    <title>Today - ${data[0].weather.description}. Hight ${data[0].max_temp} C low ${data[0].low_temp} C, ${data[0].weather.description}.</title><br>

                    <wrapped-sections style="position: relative;">

                        <scroll-flex id="firstfivedays" class="active" style="pointer-events: all;">
                            <item>
                                <span>${data[0].temp} C</span>
                                <span style="margin:1rem 0;;align-self: center;;display: flex;width:1.5rem;height:1.5rem;background: red;border-radius: 2rem;"></span>
                                <span>Today</span>
                            </item>
                            <item>
                                <span>${data[1].temp} C</span>
                                <span style="margin:1rem 0;align-self: center;;display: flex;width:1.5rem;height:1.5rem;background: red;border-radius: 2rem;"></span>
                                <span>Tomorrow</span>
                            </item>
                            <item>
                                <span>${data[2].temp} C</span>
                                <span style="margin:1rem 0;align-self: center;;display: flex;width:1.5rem;height:1.5rem;background: red;border-radius: 2rem;"></span>
                                <span>+ 1</span>
                            </item>
                            <item>
                                <span>${data[3].temp} C</span>
                                <span style="margin:1rem 0;align-self: center;;display: flex;width:1.5rem;height:1.5rem;background: red;border-radius: 2rem;"></span>
                                <span>+ 2</span>
                            </item>
                            <item>
                                <span>${data[4].temp} C</span>
                                <span style="margin:1rem 0;align-self: center;;display: flex;width:1.5rem;height:1.5rem;background: red;border-radius: 2rem;"></span>
                                <span>+ 3</span>
                            </item>
                        </scroll-flex>
                    </wrapped-sections>
                    <button-grid>
                        <input type="button" value="close" style="font-weight: 600;">
                        <input type="button" value="reset" style="font-weight: 600;">
                    </button-grid>
                    `
                document.querySelector("#cardinfo").innerHTML = card;
            }
        });

        let thislat = lat();
        let thislng = lng();
        xhr.open("get", `./getweather?lat=${thislat}&long=${thislng}`);

        xhr.send(data);
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