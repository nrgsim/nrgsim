window.app = {
  views: {},
  models: {},
  services: {}
};

$.ajaxSetup({
  statusCode: {
    401: function(){
      // Redirect the to the login page.
      window.location.replace('/login');
    },
    403: function() {
      // 403 -- Access denied
      window.location.replace('/login');
    }
  }
});