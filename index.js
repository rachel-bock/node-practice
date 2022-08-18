import Joi from 'joi';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;
const myKey = process.env.APIKEY;
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
  response.send('To access weather information, please go to /local/{zip code}.  Thank you for visiting.');
});

app.get('/local/:zipcode', (req, res)=> {

  


  let place = getCoordinatesByZip(req.params.zipcode)
    .then(data => {
      getWeather(data)
      .then(weather => {
        return weatherOutput = {
          "city": weather.name,
          "conditions": weather.weather[0].description, 
          "high_temp": parseInt(weather.main.temp_max), 
          "low_temp": parseInt(weather.main.temp_min)
        }
      })
    });
  res.status(200).send(weatherOutput);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});