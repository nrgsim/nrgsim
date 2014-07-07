window.app.services.AuthenticationService = {

  currentUser: null,

  getLoggedInUser: function() {
    return this.currentUser;
  },

  loginSuccess: function(next, data, status, xhr) {
    this.currentUser = data;
    if (next) {
      next(data, status, xhr);
    }
  },

  login: function(credentials, success, failure) {
    var successFn = _.bind(this.loginSuccess, this, success);
    $.ajax({
      type: "POST",
      url: '/user/session',
      data: credentials,
      success: successFn,
      error: failure
    });
  },

  logoutSuccess: function(next, data, status, xhr) {
    this.currentUser = null;
    if (next) {
      next(data, status, xhr);
    }
  },

  logout: function(success, failure) {
    var successFn = _.bind(this.logoutSuccess, this, success);
    $.ajax({
      type: "DELETE",
      url: '/user/session',
      success: successFn,
      error: failure
    });
  }

};