/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  underscore = require('underscore');

// route handler and session setup for passport login
exports.passport = function (req, res) {};
exports.session = function (req, res) {
  res.redirect('/');
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
      return res.render('user/signup', { errors: err.errors, user: user });
    }
    // TODO: do we really want to log in immediately?
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
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
