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
      res.status(500).json({ message : req.i18n.t("error.loginFailed") });
    } else {
      console.log('login success');
      console.log(user);
      console.log(user.toJSON());
      res.status(200).json(user);
    }
  })(req, res, next);
};

exports.endSession = function(req, res) {
  req.logout();
  res.status(200).json({ message : req.i18n.t("message.logoutSucceeded") });
};

exports.authCallback = function (req, res, next) {
  res.redirect('/');
};

exports.login = function (req, res) {
  res.render('user/#login');
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
      res.status(500).json({ message: [ err ] });
    } else {
      res.status(200).json({ message: req.i18n.t("message.userCreated"), user: user.toJSON() });
    }
  });
};

exports.update = function(req, res) {
  User.findById(req.body._id, function(err, user) {
    // TODO: check for errors
    delete req.body._id;
    console.log("update: " + JSON.stringify(user.toJSON()));
    console.log("update: " + JSON.stringify(req.body));
    user.set('name', req.body.name);
    user.set('email', req.body.email);
    if (req.body.password && req.body.password.length > 0) {
      user.set('password', req.body.password);
    }
    user.set('roles', req.body.roles);
    console.log("update: " + JSON.stringify(user.toJSON()));
    user.save(function(err) {
      if (err) {
        res.status(500).json({ 'messages': [ err ] });
      } else {
        res.status(200).json({ message: req.i18n.t("message.userUpdated"), user: user.toJSON() });
      }
    });
  });
};
