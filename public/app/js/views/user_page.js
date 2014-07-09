window.app.views.UserPage = Backbone.View.extend({

  el: "#view",

  template: JST["app/templates/user.us"],

  UserService: null,

  events: {
    'keydown' : 'handleKeyDown',
    'click #save' : 'save',
    'click #cancel' : 'cancel'
  },

  handleKeyDown: function(evt) {
    if (evt.which === 13) {
      this.save(evt);
    }
  },

  saveSucceeded: function(data) {
    window.console.log('saveSucceeded');
    window.console.log(data);
    window.location.replace('/#login');
  },

  updateSucceeded: function(data) {
    window.console.log('updateSucceeded');
    window.console.log(data);
    var user = new app.models.User(data.user);
    window.console.log(user);
    window.app.services.AuthenticationService.setLoggedInUser(user);
    $('.messages').text(data.responseJSON.message);
  },

  saveFailed: function(data) {
    window.console.log('saveFailed');
    window.console.log(data);
    $('.messages').text(data.responseJSON.message);
  },

  save: function(evt) {
    var id = $('#id').val();
    var ver = $('#version').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm = $('#confirm-password').val();
    var roles = ['User'];

    $('.messages').text('');
    var validationErr = this.validate(id, ver, name, email, password, confirm, roles);
    if (validationErr) {
      $('.messages').text(validationErr);
      return;
    }

    // TODO validate fields
    if (id && id.length > 0) {
      window.console.log('update user: ' + name + ' ' + email + ' ' + password);
      this.UserService.update(id, ver, name, email, password, roles, this.updateSucceeded, this.saveFailed);
    } else {
      window.console.log('create user: ' + name + ' ' + email + ' ' + password);
      this.UserService.create(name, email, password, roles, this.saveSucceeded, this.saveFailed);
    }
  },

  updateMessage: function(msg, stringid) {
    if (msg.length > 0) {
      msg += ' ';
    }
    msg += $.i18n(stringid);
    return msg;
  },

  validate: function(id, ver, name, email, password, confirm, roles) {
    var msg = '';
    if (name.length < 1) {
      msg = this.updateMessage(msg, 'user-name-req');
    }

    if (email.length < 1) {
      msg = this.updateMessage(msg, 'user-email-req');
    } else {
      var emailCheck = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
      if (!emailCheck.test(email)) {
        msg = this.updateMessage(msg, 'user-email-invalid');
      }
    }

    if ((id.length < 1 && password.length < 6) || (password.length > 0 && password.length < 6)) {
      msg = this.updateMessage(msg, 'user-password-required');
    } else if (password !== confirm) {
      msg = this.updateMessage(msg, 'user-password-mismatch');
    }

    return (msg.length > 0) ? msg : null;
  },

  cancel: function(evt) {
    window.history.back();
  },

  initialize: function(options) {
    this.UserService = options.UserService;
    this.model = options.user;
    this.title = options.signup ? $.i18n('user-register') : $.i18n('user-profile');
    _.bindAll(this);
  },

  render: function() {
    this.$el.html(this.template({ user: this.model, title: this.title }));
    return this;
  }

});
