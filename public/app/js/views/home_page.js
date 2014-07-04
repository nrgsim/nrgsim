window.app.views.HomePage = Backbone.View.extend({

  el: "#view",
  template: JST["app/templates/home.us"],

  events: {
  },


  initialize: function(options) {
    _.bindAll(this);
    this.model = new window.app.models.HomePage();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
