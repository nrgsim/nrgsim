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

  saveFailed: function(data) {
    window.console.log('saveFailed');
    window.console.log(data);
    // TODO: show error message
  },

  save: function(evt) {
    var id = $('#id').val();
    var ver = $('#version').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm = $('#confirm-password').val();
    var roles = ['User'];

    // TODO validate fields
    if (id && id.length() > 0) {
      window.console.log('update user: ' + name + ' ' + email + ' ' + password);
      this.UserService.save(id, name, email, password, roles, this.saveSucceeded, this.saveFailed);
    } else {
      window.console.log('create user: ' + name + ' ' + email + ' ' + password);
      this.UserService.create(name, email, password, roles, this.saveSucceeded, this.saveFailed);
    }
  },

  cancel: function(evt) {
    window.history.back();
  },

  initialize: function(options) {
    this.UserService = options.UserService;
    this.model = options.user;
    _.bindAll(this);
  },

  render: function() {
    this.$el.html(this.template(this.model));
    return this;
  }

});
