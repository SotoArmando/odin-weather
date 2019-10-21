/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'express'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar app = express();\n\napp.get('/', function (req, res) {\n  res.sendFile('./dis/index.html');\n});\n\napp.listen(3000, function () {\n  console.log('Example app listening on port 3000!');\n});\n\n\nvar map;\nvar geocoder;\nlet userinput = document.querySelector(\"input[placeholder='Type any place']\");\nlet cardsstateready = document.querySelector(\"card.search-results.active\");\nlet thereisarequest = false;\nlet service = undefined;\nlet initialized = false;\nlet resultscontainer = document.querySelector(\"card > state.ready\");\n\nlet initialindex = 0;\nvar list = document.querySelectorAll('wrapped-sections > scroll-flex');\nvar map;\nvar timer = setInterval(nextSectionWeather, 3000);\n\n\nfunction nextSectionWeather() {\n    initialindex += 1;\n    initialindex %= 3;\n    // console.log(initialindex)\n    list.forEach((value, index) => {\n        // console.log(index)\n        if (index == initialindex) {\n            list[index].classList.add(\"active\")\n        } else {\n            list[index].classList.remove(\"active\")\n        }\n    })\n\n}\n\n\nfunction initMap() {\n    geocoder = new google.maps.Geocoder();\n    map = new google.maps.Map(document.getElementById('map'), {\n        center: {\n            lat: -34.397,\n            lng: 150.644\n        },\n        zoom: 8,\n        disableDefaultUI: true\n    });\n}\n\nfunction codeAddress(place_id) {\n    document.querySelector(\".search-results\").classList.toggle(\"active\");\n    geocoder.geocode({ placeId: place_id }, function(results, status) {\n        if (status == 'OK') {\n            map.setCenter(results[0].geometry.location);\n            var marker = new google.maps.Marker({\n                map: map,\n                position: results[0].geometry.location\n            });\n        } else {\n            alert('Geocode was not successful for the following reason: ' + status);\n        }\n    });\n}\n\nfunction setLocation(lat) {\n    map.map.setCenter(new google.maps.LatLng(45, 19));\n}\n\nconst switchthis = () => {\n    document.querySelector(\".search-results\").classList.toggle(\"active\");\n}\n\nfunction iLikeit() {\n    document.querySelectorAll(\"card.search-results > state\").forEach(value => {\n        value.classList.toggle(\"active\")\n    });\n}\n\n// if (document.querySelector('#test').reportValidity()) { findTicket() }\n// var key = [...form.elements].reduce((map, input) => { (input.type == 'checkbox') ? map[input.name] = input.checked : map[input.name] = input.value; return map }, {})\nwindow.onload = () => {\n    initMap();\n}\nconst displaySuggestions = function(predictions, status) {\n    if (status != google.maps.places.PlacesServiceStatus.OK) {\n        alert(status);\n        return;\n    }\n\n    predictions.forEach(function(prediction) {\n        console.log(prediction)\n        let item = document.createElement('item');\n\n        item.addEventListener('click', () => {\n            codeAddress(prediction.place_id);\n        })\n\n        item.setAttribute(\"style\", \"display: flex;flex-direction: column;padding: .5em .5em;border-bottom: 1px solid rgba(0,0,0,.10);\");\n\n        let itemtitle = document.createElement('title');\n        let itemspan = document.createElement('span');\n\n        itemtitle.innerHTML = prediction.description;\n        itemspan.innerHTML = prediction.types[0];\n\n        item.appendChild(itemtitle);\n        item.appendChild(itemspan);\n\n        resultscontainer.appendChild(item);\n        console.log(prediction)\n            // var li = document.createElement('li');\n            // li.appendChild(document.createTextNode(prediction.description));\n            // document.getElementById('results').appendChild(li);\n    });\n\n    iLikeit();\n};\n\nfunction initService() {\n    service = new google.maps.places.AutocompleteService();\n    service.getQueryPredictions({ input: userinput.value }, displaySuggestions);\n}\n\nfunction getResults() {\n    iLikeit();\n    resultscontainer.innerHTML = \"\";\n    if (initialized) {\n        service.getQueryPredictions({ input: userinput.value }, displaySuggestions);\n    } else {\n        service = new google.maps.places.AutocompleteService();\n        service.getQueryPredictions({ input: userinput.value }, displaySuggestions);\n    }\n}\n\nconst autoComplete = () => {\n\n    let defaultBounds = new google.maps.LatLngBounds(\n        new google.maps.LatLng(-33.8902, 151.1759),\n        new google.maps.LatLng(-33.8474, 151.2631));\n\n    let input = document.getElementById('searchTextField');\n    let options = {\n        bounds: defaultBounds,\n        types: ['establishment']\n    };\n\n    if (userinput.checkValidity() && !thereisarequest) {\n        debugger;\n        let text = userinput.value;\n        var autocompleted = new google.maps.places.Autocomplete(userinput, options);\n        console.log(autocompleted);\n    }\n\n}\n\ndocument.querySelector(\"input[placeholder='Type any place']\").addEventListener('keyup', () => {\n    if (document.querySelector(\"input[placeholder='Type any place']\").checkValidity()) {\n        document.querySelector(\".search-results\").classList.remove(\"active\");\n        getResults()\n    } else {\n        document.querySelector(\".search-results\").classList.add(\"active\");\n    }\n})\n\nconst fetchWeather = () => {\n    var data = null;\n\n    var xhr = new XMLHttpRequest();\n    xhr.withCredentials = true;\n\n    xhr.addEventListener(\"readystatechange\", function() {\n        if (this.readyState === this.DONE) {\n            console.log(this.responseText);\n        }\n    });\n\n    xhr.open(\"GET\", \"https://api.aerisapi.com/observations/within?p=18.464264,-69.887801&radius=50mi&format=json&filter=allstations&limit=5&client_id=GKhqzAm00XJbOHGWi5VDH&client_secret=MPPBdhN48OF6rM9FH7AT3Kzd6fV1V1bkKCf61cVB\");\n\n\n    xhr.send(data);\n}\n\nfetchWeather();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });