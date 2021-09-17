const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const api_key = process.env.WS_API_KEY;

const forecast = (address, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=' +
    api_key +
    '&query=' +
    address;

  // use empty {} as default variable to avoid error during object destructuring
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('unable to connect forecast service', undefined);
    } else if (body.error) {
      callback('Unable to find the location, please enter again!', undefined);
    } else {
      callback(undefined, {
        condition: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        windspeed: body.current.wind_speed,
        humidity: body.current.humidity,
      });
    }
  });
};

module.exports = forecast;
