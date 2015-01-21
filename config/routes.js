/*jslint node: true */
"use strict";

module.exports = function (app, t, passport, auth) {

  var user = require('../app/controllers/user'),
    simulation = require('../app/controllers/simulation');

  // REST API
  app.post('/user', user.create);
  app.put('/user', auth.requiresLogin, user.update);
  app.post('/user/session', user.authenticate);
  app.delete('/user/session', user.endSession);
  //app.get('/user/:userId', user.show);
  //app.get('/user', auth.requiresLogin, user.edit);

  //app.param('userId', user.user);

  //app.get('/', sendApp);
  //app.get('/about', auth.requiresLogin, about.index);
  //app.get('/contact', auth.requiresLogin, contact.index);

  app.get('/simulation/load/:id', simulation.load);
  app.post('/simulation/run', simulation.run);
  app.get('/simulation/:jobId', simulation.checkForResults);
  app.get('/simulation/countries/:continent', simulation.getCountries);
  app.get('/simulation/files/:continent/:country', simulation.getWeatherFiles);

  /* general html page requests */
  /*
  app.get('/signup', appctrl.render);
  app.get('/login', appctrl.render);
  app.get('/logout', appctrl.logout);
  app.get('/home', appctrl.render);
  app.get('/profile', auth.requiresLogin, appctrl.render);
  app.get('/sim', auth.requiresLogin, appctrl.render);
  */
  app.get('/*', function(req, res) {
    res.sendfile('./public/dist/index.html');
  });

};
