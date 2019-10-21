var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())
var unirest = require("unirest");
const fetch = require('node-fetch');
const path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.get('/getweather', function(req, res) {
    
    // console.log(req.params.lat, req.params.long)
    // console.log(req.query);
    // console.log();
    // console.log();
    

    var url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=eng&lat=${req.query["lat"]}&lon=${req.query["long"]}&hours=48`;
    var headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": "352fae4cc4msh403045479e456c0p1c2ce7jsnc94ed5a5de5d"
    }

    fetch(url, { method: 'GET', headers: headers })
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            
            res.send(json);
        });



});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});