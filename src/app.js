import express from 'express';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
app.use('/static/', express.static(path.join(process.cwd(), '/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/dist/index.html'));
});

app.get('/getweather', (req, res) => {
  fetch(`https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=${req.query.lat}&lon=${req.query.long}&hours=48`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'x-rapidapi-key': 'd47e2c0a26msha5142819817b97bp1bce93jsne76fd5e28006',
    },
  }).then((res) => res.json())
    .then((json) => {
      res.send(json);
    }).catch((err) => {
      res.send({ body: `CODE RED ALL GONE WRONG. STAY BACK!${err}` });
    });
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Find me running at 0.0.0.0:${process.env.PORT || 3000}`);
});
