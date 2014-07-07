window.app.views.UserPage = Backbone.View.extend({

  el: "#view",

  template: JST["app/templates/user.us"],

  UserService: null,

  events: {
    'click #save'   : 'save',
    'click #cancel' : 'cancel'
  },

  saveSucceeded: function(data) {
    window.console.log('saveSucceeded');
    window.console.log(data);
  },

  saveFailed: function(data) {
    window.console.log('saveFailed');
    window.console.log(data);
  },

  save: function(evt) {
    var id = $('#id').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm = $('#confirm-password').val();
    var roles = ['User'];

    // TODO validate fields
    window.console.log('create user: ' + name + ' ' + email + ' ' + password);
    this.UserService.create(null, name, email, password, roles, this.saveSucceeded, this.saveFailed);
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
