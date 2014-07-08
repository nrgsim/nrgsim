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
    "sim" : [ "User" ]
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
    var loggedInUser = window.app.services.AuthenticationService.getLoggedInUser();
    var path = Backbone.history.location.hash; // Change hash to pathname if not using hashes for routing
    var requiredRoles = this.getRequiredRoles(path);
    
    window.console.log(loggedInUser + ' ' + path + ' ' + requiredRoles);
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
      UserService: window.app.services.UserService
    });
  },

  profile: function() {
    window.console.log('route to profile');
    window.console.log(window.app.services.AuthenticationService);
    var user = window.app.services.AuthenticationService.getLoggedInUser();
    window.console.log(user);
    this.renderPage(window.app.views.UserPage, {
      'user': user
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
    var page = new PageClass(options);
    $("#view").empty().append(page.render().el);
  }
});

$(function() {
  window.router = new window.app.router();
  Backbone.history.start({pushState: false});
});
