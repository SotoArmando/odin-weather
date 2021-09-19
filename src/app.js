import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import './sass/main.scss';

const app = express();
app.use(express.static(path.join(process.cwd(), '/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/dist/index.html'));
});

app.get('/getweather', (req, res) => {
  const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=eng&lat=${req.query.lat}&lon=${req.query.long}&hours=48`;
  const headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
    'x-rapidapi-key': 'b7f80d2847msha3e556539a614c3p12cb51jsn29380fd29fa8',
  };

  fetch(url, { method: 'GET', headers })
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    }).catch((err) => {
      res.send({ body: `CODE RED ALL GONE WRONG. STAY BACK!${err}` });
    });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Find me running at 127.0.0.1:3000');
});
