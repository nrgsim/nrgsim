window.app.services.AuthenticationService = {
  
  login: function(credentials) {
    return $.post('/login', credentials);
  },

  logout: function() {
    return $.post('/logout');
  }

};