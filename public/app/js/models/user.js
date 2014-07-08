window.app.models.User = Backbone.Model.extend({

  initialize: function() {
    this.set('_id', null);
    this.set('__v', null);
    this.set('name', '');
    this.set('email', '');
    this.set('password', '');
    this.set('roles', null);
  }
  
});
