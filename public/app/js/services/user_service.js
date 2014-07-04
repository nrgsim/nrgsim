window.app.services.UserService = {

  create: function(id, name, email, password, success, failure) {
    var user = { id: id, name: name, email: email, password: password, provider: 'local' };
    $.ajax({
      type: "POST",
      url: '/user',
      data: user,
      success: success,
      error: failure
    });
  }

};