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
  res.render('user/login', {
    title: req.i18n.t('user.login'),
    message: req.flash('error')
  });
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/login');
};

exports.signup = function (req, res) {
  res.render('user/signup', {
    title: req.i18n.t('user.signup'),
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
    // TODO: do we really want to log in immediately?
    /*
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
*/
  });
};

// Not sure if we really need a page to display user info
// exports.show = function (req, res) {
//   var user = req.profile;
//   res.render('user/show', {
//     title: user.name,
//     user: user
//   });
// };

// exports.user = function (req, res, next, id) {
//   User.findOne({ _id : id }).exec(function (err, user) {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return next(new Error('Failed to load User ' + id));
//       }
//       req.profile = user;
//       next();
//     });
// };

exports.edit = function(req, res) {
  var user = req.user;
  res.render('user/edit', { user: user, stringify: JSON.stringify });
};

exports.update = function(req, res) {
  var user = req.user;

  user = underscore.extend(user, req.body);

  user.save(function(err, doc) {
    if (err) {
      res.render('user/edit', { user: user });
    } else {
      res.redirect('/');
    }
  });
};
