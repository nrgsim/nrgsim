window.app.views.HomePage = Backbone.View.extend({

  el: "#view",
  template: JST["app/templates/home.us"],

  events: {
  },


  initialize: function(options) {
    _.bindAll(this);
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
