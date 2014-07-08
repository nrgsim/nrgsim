window.app.models.User = Backbone.Model.extend({

  defaults: {
    _id : null,
    __v : null,
    name : '',
    email : '',
    password : '',
    roles : null
  }
  
});
