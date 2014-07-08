/*jslint node: true */
"use strict";

/*
 *  Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  /*
  console.log("Checking authentication: " + req.isAuthenticated());
  if (!req.isAuthenticated()) {
    res.status(403).json({ "message" : "not logged in" });
  } else {
    next();
  }
  */
  next();
};


/*
 *  User authorizations routing middleware
 */
exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id !== req.user.id) {
      res.status(403).json({ "message" : "not authorized" });
    }
    next();
  }
};

