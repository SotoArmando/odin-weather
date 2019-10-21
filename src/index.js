var express = require('express');
var app = express();
var unirest = require("unirest");
const path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../dist/index.html'));
});

app.get('/getweather', function (req, res) {
    var req0 = unirest("GET", `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lang=eng&lat=${req.params.lat}&lon=${req.params.long}&hours=48`);

    req0.headers({
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": "352fae4cc4msh403045479e456c0p1c2ce7jsnc94ed5a5de5d"
    });
    

    req0.end(function (res0) {
        if (res0.error) {
            res.send(res0.error);
        };
        
        console.log(res0.body);
        res.send(res0.body);
    })

  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

