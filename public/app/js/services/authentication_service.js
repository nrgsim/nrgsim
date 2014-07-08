window.app.services.AuthenticationService = {

  getLoggedInUser: function() {
    var userInfo = window.sessionStorage.getItem('currentUser');
    if (userInfo && userInfo.length > 0) {
      try {
        var user = JSON.parse(userInfo);
        return new app.models.User(user);
      } catch (err) {
        window.console.log(err);
        window.sessionStorage.removeItem('currentUser');
      }
    }
    return null;
  },

  setLoggedInUser: function(user) {
    window.sessionStorage.setItem('currentUser', JSON.stringify(user.toJSON()));
  },

  loginSuccess: function(next, data, status, xhr) {
    var user = new window.app.models.User(data);
    this.setLoggedInUser(user);
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
    window.sessionStorage.removeItem('currentUser');
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