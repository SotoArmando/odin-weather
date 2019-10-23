
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let app = express();
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '../dist/index.html'));
});

app.get('/getweather', function(req, res) {

    let url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=eng&lat=${req.query["lat"]}&lon=${req.query["long"]}&hours=48`;
    let headers = {
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
        }).catch(function(err) {
            res.send("CODE RED ALL GONE WRONG. STAY BACK!");
        }); ;   



});

app.listen(3000, function() {
    console.log("Find me running at 127.0.0.1:3000")
});