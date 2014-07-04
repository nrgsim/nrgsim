/*jslint node: true */
"use strict";

exports.render = function(req, res) {
  console.log('app.render: ' + req.isAuthenticated() + " " + req.url);
  res.sendfile('./public/dist/index.html');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
