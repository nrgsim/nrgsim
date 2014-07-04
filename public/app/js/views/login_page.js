window.app.views.LoginPage = Backbone.View.extend({

  template: JST["app/templates/login.us"],
  AuthenticationService: null,

  events: {
    'click .add-row' : 'addRow',
    'click .clear-db' : 'clearDatabase',
    'click #login' : 'login'
  },

  initialize: function(options) {
    this.AuthenticationService = options.AuthenticationService;
    this.model = new window.app.models.LoginPage();
  },

  login: function() {
    this.AuthenticationService.login({email: $('#email').val(), password: $('#password').val()}, this.loginSuccess, this.loginFailure);
  },

  loginSuccess: function() {
    window.console.log("Login succeeded");
    window.location.replace("/sim");
  },

  loginFailure: function(evt) {
    window.console.log("Login failed");
    window.console.log(evt);
    $(".alert").text(evt.responseJSON.msg);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
