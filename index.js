import Joi from 'joi';
import express, { json } from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

const getCoordinatesByZip = (zip) => {
  return fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${process.env.APIKEY}`)
    .then(response => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

const getWeather = (coords) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.APIKEY}&units=imperial`)
    .then(response => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

let weatherOutput = {};

app.use(express.json()); 

app.get('/', (request, response) => {
  response.status(200).send('To access weather information, please go to /local/{zip code}.  Thank you for visiting.');
});

app.get('/local', (request, response) => {
  response.status(200).send('To access weather information, please go to /local/{zip code}.  Thank you for visiting.');
});

app.get('/local/:zipcode', (req, res)=> {

  // test req.params.zipcode to ensure it is a 5-digit string.
  if (req.params.zipcode.length !== 5) return res.status(400).send('Zip code must have 5 characters.');

  // test if the characters in the string are numbers or letters.  If letters then throw errors.
  let schema = Joi.string().pattern(new RegExp(`^[0-9]{5}`)).required();
  let result = schema.validate(req.params.zipcode);

  if (result.error) return res.status(400).send('Zip code did not match a 5-digit numeric pattern and is required.');

  let place = getCoordinatesByZip(req.params.zipcode)
    .then(data => {
      // Check that the data has a latitude and longitude before fetching the weather information.
      return getWeather(data)
      .then(weather => {
        weatherOutput = {
          "city": weather.name,
          "conditions": weather.weather[0].description, 
          "high_temp": parseInt(weather.main.temp_max), 
          "low_temp": parseInt(weather.main.temp_min)
        }
        res.status(200).send(JSON.stringify(weatherOutput));
      })
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});