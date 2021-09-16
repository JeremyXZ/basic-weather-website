const path = require('path');
const hbs = require('hbs');
const express = require('express');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;
//define paths for express configuration
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebar view engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicPath));

//set up routes and render files in views directory
app.get('', (req, res) => {
  res.render('index', {
    name: 'Jeremy',
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Jeremy',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Jeremy',
    message: 'Please contact us if you need more weather information.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'Address must be provided',
    });
  } else {
    forecast(req.query.address, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send(forecastData);
      console.log(forecastData);
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 page',
    message: 'Help article not found',
    name: 'Jeremy',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    message: 'Page not found',
    name: 'Jeremy',
  });
});

app.listen(port, () => {
  console.log('Server is up on' + port);
});
