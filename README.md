# NRGSIM Application

## Development Environment Setup (Linux)
* Install Git if you don't have it already: `sudo apt-get install git`
* Install MongoDB if you don't have it already: `sudo apt-get install mongodb-server`
* Install node.js if you don't have it already: `sudo apt-get install nodejs` (and `sudo apt-get install nodejs-legacy` on Debian distros)
* Open a console window and cd to the parent directory of where you want to work on code
* Clone the git repository: `git clone git@github.com:nrgsim/nrgsim.git`
* Move into the project directory: `cd nrgsim`
* Install the projects node modules: `npm install`
* Start MongoDB: `sudo /etc/init.d/mongodb start`
* Run the server app
  * Standalone: `node server.js` or `npm start`
  * With nodemon (auto restarts when changes made during development): `nodemon [--debug] server.js`

## Development Environment Setup (Windows)
* Install Git if you don't have it already: (http://git-scm.com/)
* Install MongoDB if you don't have it already: (http://docs.mongodb.org)
* Install node.js if you don't have it already: (http://nodejs.org/)
* Open a console window and cd to the parent directory of where you want to work on code
* Clone the git repository: `git clone git@github.com:nrgsim/nrgsim.git`
* Move into the project directory: `cd nrgsim`
* Install the projects node modules: `npm install`
* Start MongoDB: `sudo /etc/init.d/mongodb start`
* Run the server app:
  * Standalone: `node server.js` or `npm start`
  * With nodemon (auto restarts when changes made during development): `nodemon [--debug] server.js`

At this point the server application is ready to run but nothing will happen without the client application getting built first.
To build the client application, see the readme.md file at public/readme.md. In particular if you want to run this app using
this server side code, you need to run `lineman dist` in order to build the client app so that it can get served by the
web server.

## Useful global node.js modules
Nodemon - useful for restarting express when something changes: `npm install -g nodemon`  

## Testing
Run from command line at root of project: `runTests.cmd` or `npm test`  
It runs all the tests under the 'tests/' directory. They can be written in JavaScript or CoffeeScript.

## Running on production server
The following is how to run the app on the production server.
`cd /data/app-dev/nrgsim`
`sudo PORT=8000 forever start servers.js &`

To stop the app use the following command:
`sudo forever stop 0`

