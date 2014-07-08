window.app.services.UserService = {

  create: function(name, email, password, roles, success, failure) {
    var user = { name: name, email: email, password: password, provider: 'local', roles: roles };
    $.ajax({
      type: 'POST',
      url: '/user',
      data: user,
      success: success,
      error: failure
    });
  },

  update: function(id, version, name, email, password, roles, success, failure) {
    var user = { _id: id, __v: version, name: name, email: email, provider: 'local', roles: roles };
    if (password && password.length > 0) {
      user.password = password;
    }
    window.console.log("about to do update");
    $.ajax({
      type: 'PUT',
      url: '/user',
      data: user,
      success: success,
      error: failure
    });
  }

};