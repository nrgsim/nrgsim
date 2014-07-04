/*jslint node: true */
"use strict";

/*
 *  Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  console.log("Checking authentication: " + req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};


/*
 *  User authorizations routing middleware
 */
exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id !== req.user.id) {
        return res.redirect('/user/' + req.profile.id);
      }
      next();
    }
};

