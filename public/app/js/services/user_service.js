window.app.services.UserService = {

  create: function(name, email, password, roles, success, failure) {
    var user = { name: name, email: email, password: password, provider: 'local', roles: roles };
    $.ajax({
      type: "POST",
      url: '/user',
      data: user,
      success: success,
      error: failure
    });
  }

};