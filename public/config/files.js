/* Exports an object that defines
 *  all of the paths & globs that the project
 *  is concerned with.
 *
 * The "configure" task will require this file and
 *  then re-initialize the grunt config such that
 *  directives like <config:files.js.app> will work
 *  regardless of the point you're at in the build
 *  lifecycle.
 *
 * To see the default definitions for all of Lineman's file paths and globs, look at:
 * https://github.com/testdouble/lineman/blob/master/config/files.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('files', {
  //Override file patterns here
  js: {
    
    vendor: [
      "vendor/js/jquery-2.1.0.js",
      "vendor/js/underscore.js",
      "vendor/js/backbone.js",
      "vendor/js/three.js",
      "vendor/js/**/*.js"
    ],

    app: [
      "app/js/app.js",
      "app/js/models/**/*.js",
      "app/js/services/**/*.js",
      "app/js/views/**/*.js",
      "app/js/router.js",
      "app/js/**/*.js"
    ]
  },

  css: {
    vendor: [
      "vendor/css/**/*.css"
    ]
  }
});
