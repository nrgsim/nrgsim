/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  underscore = require('underscore'),
  passport = require('passport');

// route handler and session setup for passport login
exports.passport = function (req, res) {};

exports.authenticate = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(500).json({ "messages" : [ "login failed", err ] });
    } else {
      res.status(200).json(user);
    }
  })(req, res, next);
};

exports.endSession = function(req, res) {
  req.logout();
  res.status(200).json({ "messages" : [ "logged out" ]});
};

exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

exports.login = function (req, res) {
  res.render('user/login');
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/#login');
};

exports.signup = function (req, res) {
  res.render('user/#signup', {
    user: new User()
  });
};

exports.create = function (req, res, next) {
  var user = User.create(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      res.status(500).json({ 'messages': [ err ] });
    } else {
      res.status(200).json({ 'messages': [ 'user saved' ]});
    }
  });
};

exports.edit = function(req, res) {
  var user = req.user;
  res.render('/user', { user: user, stringify: JSON.stringify });
};

exports.update = function(req, res) {
  var user = req.user;

  user = underscore.extend(user, req.body);

  user.save(function(err, doc) {
    if (err) {
      res.render('/user', { user: user });
    } else {
      res.redirect('/');
    }
  });
};
