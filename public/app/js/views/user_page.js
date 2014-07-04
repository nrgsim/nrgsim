window.app.views.UserPage = Backbone.View.extend({

  el: "#view",

  template: JST["app/templates/user.us"],

  UserService: null,

  events: {
    'click #save'   : 'save',
    'click #cancle' : 'cancel'
  },

  save: function(evt) {
    var id = $('#id').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm = $('#confirm-password').val();

    // TODO validate fields
    window.console.log('create user: ' + name + ' ' + email + ' ' + password);
    this.UserService.create(name, email, password);
  },

  cancel: function(evt) {
    window.location.replace('/');
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
