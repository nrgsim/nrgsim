window.app.services.AuthenticationService = {

  login: function(credentials, success, failure) {
    $.ajax({
      type: "POST",
      url: '/user/session',
      data: credentials,
      success: success,
      error: failure
    });
  },

  logout: function() {
    return $.post('/logout');
  }

};