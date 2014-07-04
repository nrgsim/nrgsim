/*jslint node: true */
"use strict";

/*
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  underscore = require('underscore');
*/

exports.render = function(req, res) {
  console.log('app.render: ' + req.isAuthenticated() + " " + req.url);
  res.sendfile('./public/dist/index.html');
};

exports.redirect = function(req, res) {
  console.log('app.redirect: ' + req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
};

