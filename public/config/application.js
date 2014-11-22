/* Exports an object that defines
 *  all of the configuration needed by the projects'
 *  depended-on grunt tasks.
 *
 * You can familiarize yourself with all of Lineman's defaults by checking out the parent file:
 * https://github.com/testdouble/lineman/blob/master/config/application.coffee
 */

module.exports = require(process.env['LINEMAN_MAIN']).config.extend('application', {

  //Override application configuration here. Common examples follow in the comments.

  compass: {
    compile: {
      options: {
        sassDir: "app/css",
        cssDir: "app/temp"
      }
    }
  },

  appendTasks: {
    dev: ["copy:dev", "watch:dev"],
    dist: ["copy:dist"]
  },


  // A task to copy the jquery UI images and the i18n files to the output directory
  copy: {
    dev: {
      files: [
        {
          flatten: true,
          expand: true,
          src: "vendor/css/images/**",
          dest: "generated/css/images",
          filter: "isFile"
        },
        {
          flatten: false,
          expand: true,
          src: "i18n/**",
          dest: "generated",
          filter: "isFile"
        }
      ]
    },
    dist: {
      files: [
        {
          flatten: true,
          expand: true,
          src: "vendor/css/images/**",
          dest: "dist/css/images",
          filter: "isFile"
        },
        {
          flatten: false,
          expand: true,
          src: "i18n/**",
          dest: "dist",
          filter: "isFile"
        }
      ]
    }
  },

  watch: {
    dev: {
      files: ["i18n/**"],
      tasks: ["copy"]
    },
    autoPrefixer: {
      files: ['app/temp/**/*.css'],
      tasks: ['autoprefixer:dev']
    }
  },

  // API Proxying
  //
  // During development, you'll likely want to make XHR (AJAX) requests to an API on the same
  // port as your lineman development server. By enabling the API proxy and setting the port, all
  // requests for paths that don't match a static asset in ./generated will be forwarded to
  // whatever service might be running on the specified port.
  //
  // server: {
  //   apiProxy: {
  //     enabled: true,
  //     host: 'localhost',
  //     port: 3000
  //   }
  // }

  // Sass
  //
  // Lineman supports Sass via grunt-contrib-sass, which requires you first
  // have Ruby installed as well as the `sass` gem. To enable it, comment out the
  // following line:
  //
  enableSass: false

});
