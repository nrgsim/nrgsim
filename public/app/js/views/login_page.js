window.app.views.LoginPage = Backbone.View.extend({

  template: JST["app/templates/login.us"],
  AuthenticationService: null,

  events: {
    'keydown' : 'handleKeyDown',
    'click #login' : 'login',
    'click #forgot-password' : 'forgotPassword'
  },

  initialize: function(options) {
    this.AuthenticationService = options.AuthenticationService;
  },

  handleKeyDown: function(evt) {
    if (evt.which === 13) {
      this.login(evt);
    }
  },

  login: function() {
    this.AuthenticationService.login({email: $('#email').val(), password: $('#password').val()}, this.loginSuccess, this.loginFailure);
  },

  loginSuccess: function() {
    window.console.log("Login succeeded");
    window.location.replace("/#sim");
  },

  loginFailure: function(evt) {
    window.console.log("Login failed");
    window.console.log(evt);
    $(".messages").text(evt.responseJSON.message);
  },

  forgotPassword: function(evt) {
    window.alert('not implemented yet');
    evt.preventDefault();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
