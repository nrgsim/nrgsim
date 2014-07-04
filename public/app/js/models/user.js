window.app.models.User = Backbone.Model.extend({

  initialize: function() {
    this.set('name', '');
    this.set('email', '');
    this.set('password', '');
  }
  
});
