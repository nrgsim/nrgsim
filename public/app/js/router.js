window.app.router = Backbone.Router.extend({
  routes: {
    "login" : "login",
    "home"  : "home",
    "*path" : "home"
  },

  login: function() {
    window.console.log("login");
    this.renderPage(window.app.views.LoginPage, {
      AuthenticationService: window.app.services.AuthenticationService
    });
  },

  home:  function() {
    window.console.log("home");
    this.renderPage(window.app.views.HomePage, {
      AuthenticationService: window.app.services.AuthenticationService
    });
  },

  renderPage: function(PageClass, options) {
    window.console.log("renderPage: " + PageClass);
    var page = new PageClass(options);
    $("#view").empty().append(page.render().el);
  }
});

$(function() {
  window.router = new window.app.router();
  Backbone.history.start({pushState: true});
});
