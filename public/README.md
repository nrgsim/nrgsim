# NRGSIM application

Note: make sure you've followed the steps in ../readme.md for getting the development environment set up. That will
take you through downloading the source code and installing some of the necessary tools. In particular you should
have git and node.js installed. MongoDB is only necessary if you are going to be running the full server/client
application. If you are working on just the client side code then you don't really need MongoDB running.

## Development Environment Setup
* Open a console window and cd to the nrgsim/public directory
* Install lineman globally: `sudo npm install -g lineman` [Linux] or `npm install -g lineman` [Windows]
* Install the projects node modules: `npm install`
* Run lineman
  * To run only client side stuff: `lineman run`
  * To run it through the web server using express (see ../readme.md): `lineman build`
* Hit the site with a browser:
  * If running only client: (http://localhost:8000/index.html)
  * If running server using express: (http://localhost:3000)
