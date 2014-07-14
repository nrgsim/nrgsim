/*jslint node: true*/
"use strict";

var express = require('express'),
  passport = require('passport'),
  i18n = require('i18next'),
  env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
  auth = require('./config/middleware/authorization'),
  mongoose = require('mongoose');

// Set up database connection
mongoose.connect(config.db);

// Set up models
require('./app/models/user');
require('./app/models/simulation');

// Set up passport authentication
require('./config/passport')(passport, config);

// Initialize express
var app = express();
require('./config/express')(app, config, i18n, passport);

// Initialize i18n and set up routes
i18n.init({ fallbackLng: 'en', cookieName: 'lang', debug: true },
  function(t) {
    require('./config/routes')(app, t, passport, auth);
  }
);


// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('App listening on port ' + port);
