
/*jslint node: true */
"use strict";

var express = require('express'),
  MongoStore = require('connect-mongo')(express);

module.exports = function (app, config, i18n, passport) {

  app.set('showStackError', true);
  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));
  app.use(express['static'](config.root + '/public/dist'));
  app.use(express.logger('dev'));

  // set views path, template engine and default layout
  //app.set('views', config.root + '/app/views');
  //app.set('view engine', 'jade');

  app.configure(function () {
    // dynamic helpers
    //app.use(viewHelpers(config));

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    //app.use(i18n.handle);
    //app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
      secret: 'session hash secret',
      store: new MongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // register language helper for jade
    //i18n.registerAppHelper(app);

    // connect flash for flash messages
    //app.use(flash());

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.favicon());

    // routes should be at the last
    app.use(app.router);

    // handle server errors
    app.use(function(err, req, res, next){
      console.error(err.stack);
      res.status(500).json({'err': 'internal server error'});
    });

    // if it got this far then it is a non-existent page - just send the default page
    app.use(function(req, res, next){
      res.sendfile('./public/dist/index.html');
    });
  });
};
