/*jslint node: true */

module.exports = {
  development: {
    root: require('path').normalize(__dirname + '/..'),
      app: {
        name: "NRGSIM App",
        description: "A web application for running JEPlus simulations."
      },
      db: 'mongodb://localhost/nrgsim_dev'
  },
  test: {
    root: require('path').normalize(__dirname + '/..'),
      app: {
        name: "NRGSIM App",
        description: "A web application for running JEPlus simulations."
      },
      db: 'mongodb://localhost/nrgsim_test'
  },
  production: {
    root: require('path').normalize(__dirname + '/..'),
      app: {
        name: "NRGSIM App",
        description: "A web application for running JEPlus simulations."
      },
      db: 'mongodb://localhost/nrgsim'
  }
};
