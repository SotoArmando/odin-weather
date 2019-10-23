# Weather App
## Author 
### [Armando Soto](https://github.com/SotoArmando)
### Here [Live](heroku.com)


## Features
  - Search for places
  - Track Weather Status from Today plus Week
  - Toggle Celsius and Farenheit metrics
  
## Tecnologies
  - Fetch (Client Side)
    - Google Places API
    - Google Geocode API
  - Unirest (Server Side)
    - Weatherbit API
  - Express
    - ./ root
        - index page
    - ./getweather params { lat, long } 
        - returns weather status using latitud and longitude
  - Node JS
     - client side wrapper
  - SASS Styling 
    - file ./src/sass/app.module.css
  
## Instructions First Usage

Once you access the [live](heroku.com) link. type the place where you want know the weather and click on the result on the results list. the map will show up its position on it also a card will be shown up with all the weather info.

![Alt text](doc/png1.png?raw=true "Screenshot 1")
![Alt text](doc/png2.png?raw=true "Screenshot 2")
![Alt text](doc/png3.png?raw=true "Screenshot 3")

