window.app.router = Backbone.Router.extend({
  routes: {
    "login"   : "login",
    "signup"  : "signup",
    "profile" : "profile",
    "sim"     : "sim",
    "*path"   : "home"
  },

  login: function() {
    window.console.log('route to login');
    this.renderPage(window.app.views.LoginPage, {
      AuthenticationService: window.app.services.AuthenticationService
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
    this.renderPage(window.app.views.UserPage, {
      'user': new window.app.models.User()/*todo: get current user*/
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
  Backbone.history.start({pushState: true});
});
