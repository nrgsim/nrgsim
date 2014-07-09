var AuthRouter = Backbone.Router.extend({
  before: function(){},
  route : function(route, name, callback){
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) {
      callback = this[name];
    }

    var router = this;

    Backbone.history.route(route, function(fragment) {
      var args = router._extractParameters(route, fragment);

      var next = function() {
        if (callback) {
          callback.apply(router, args);
        }
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      };

      router.before.apply(router, [args, next]);
    });
    return this;
  }
});

window.app.router = AuthRouter.extend({
  routes: {
    "login"   : "login",
    "logout"  : "logout",
    "signup"  : "signup",
    "profile" : "profile",
    "sim"     : "sim",
    "*path"   : "home"
  },

  requresAuth : {
    "sim" : [ "User" ],
    "profile" : [ "User" ]
  },

  getRequiredRoles: function(path) {
    // Ignore the first character. If using hashes it will be # and if not it will be /.
    // By ignoring the first character we can change the scheme easily. Change the 
    // pushState parameter in router.js to change the scheme.
    var testPath = path.substr(1);
    var roles = _.find(this.requresAuth, function(elt, key) {
      if (key === testPath) {
        return elt;
      }
    });
    return roles;
  },

  before: function(params, next) {
    window.console.log('before route');
    var loggedInUser = window.app.services.AuthenticationService.getLoggedInUser();
    window.console.log('loggedInUser: ' + loggedInUser);
    var path = Backbone.history.location.hash; // Change hash to pathname if not using hashes for routing
    window.console.log('path: ' + path);
    var requiredRoles = this.getRequiredRoles(path);
    window.console.log('requiredRoles: ' + requiredRoles);
    
    //window.console.log(loggedInUser + ' ' + path + ' ' + JSON.stringify(requiredRoles));
    // TODO: need to check if the user has the required roles
    if (requiredRoles && !loggedInUser) {
      window.location.replace('/#login');
    } else {
      next();
    }
  },

  login: function() {
    window.console.log('route to login');
    this.renderPage(window.app.views.LoginPage, {
      AuthenticationService: window.app.services.AuthenticationService
    });
  },

  logout: function() {
    window.app.services.AuthenticationService.logout(function() {
      window.location.replace('/');
    });
  },

  signup: function() {
    window.console.log('route to signup');
    var user = new window.app.models.User();
    this.renderPage(window.app.views.UserPage, {
      'user': user,
      'signup' : true,
      UserService: window.app.services.UserService
    });
  },

  profile: function() {
    window.console.log('route to profile');
    var user = window.app.services.AuthenticationService.getLoggedInUser();
    this.renderPage(window.app.views.UserPage, {
      'user': user,
      'signup' : false,
      UserService: window.app.services.UserService
    });
  },

  home:  function() {
    window.console.log('route to home');
    this.renderPage(window.app.views.HomePage, {
      AuthenticationService: window.app.services.AuthenticationService
    });
  },

  sim:  function() {
    window.console.log('route to sim');
    this.renderPage(window.app.views.SimPage, {
      AuthenticationService: window.app.services.AuthenticationService
    });
  },

  renderPage: function(PageClass, options) {

    $.i18n.debug = true;
    var i18n = $.i18n();
    i18n.load('../i18n/' + i18n.locale + '.json', i18n.locale).done(function(x) {
      window.console.log($.i18n('home-title'));
      var page = new PageClass(options);
      $("#view").empty().append(page.render().el);
    });

  }
});

$(function() {
  window.router = new window.app.router();
  Backbone.history.start({pushState: false});
});
