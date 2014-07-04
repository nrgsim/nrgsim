/*jslint node: true */
"use strict";

module.exports = function (app, t, passport, auth) {

  var appctrl = require('../app/controllers/app'),
    user = require('../app/controllers/user'),
    simulation = require('../app/controllers/simulation');

  // user and authentication routes
  //app.get('/login', user.login);
  //app.get('/signup', user.signup);
  //app.get('/logout', user.logout);
  app.post('/user', user.create);
  app.post('/user/session', passport.authenticate('local', { failureRedirect: '/login', failureFlash: t('user.loginFailed') }), user.session);
  //app.get('/user/:userId', user.show);
  //app.get('/user', auth.requiresLogin, user.edit);
  app.put('/user', auth.requiresLogin, user.update);

  //app.param('userId', user.user);

  //app.get('/', sendApp);
  //app.get('/about', auth.requiresLogin, about.index);
  //app.get('/contact', auth.requiresLogin, contact.index);

  app.get('/simulation/load/:id', simulation.load);
  app.post('/simulation/run', simulation.run);

  app.get('/login', appctrl.render);
  app.get('/logout', appctrl.logout);
  app.get('/home', appctrl.render);
  app.get('/sim', auth.requiresLogin, appctrl.render);
  app.get('/', appctrl.render);

};
