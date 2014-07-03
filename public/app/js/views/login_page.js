window.app.views.LoginPage = Backbone.View.extend({

  template: JST["app/templates/login.us"],

  events: {
    'click .add-row' : 'addRow',
    'click .clear-db' : 'clearDatabase',
    'click .exit-app' : 'exitApp'
  },

  initialize: function(options) {
    /*
    // Add hourglass and timer for when we are running in a browser
    if (!window.hourglass) { window.hourglass = {}; }

    _.bindAll(this);
    this.DatabaseService = options.DatabaseService;
    this.model = new window.app.models.HomePage();
    this.model.on("change:data", this.updateTable);
    this.updateModel();
    */
    this.model = new window.app.models.LoginPage();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});
