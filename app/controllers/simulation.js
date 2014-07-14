
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Simulation =  mongoose.model('Simulation'),
    pyShell = require('python-shell');

var zone = {
  zone:
    [
      { BuildingSurface:
        { name: "Floor", type: "Floor",
          vertices: [
            { x: 3.4909079445, y: 0.0164379644, z: 0 },
            { x: 0.0099079445, y: 0.0164379644, z: 0 },
            { x: 0.0099079445, y: 3.4974379644, z: 0 },
            { x: 3.4909079445, y: 3.4974379644, z: 0}
          ]
        },
      },
      { BuildingSurface:
        { name: "Ceiling", type: "Ceiling",
          vertices: [
            { x: 0.0099079445, y: 0.0164379644, z: 3.501 },
            { x: 3.4909079445, y: 0.0164379644, z: 3.501 },
            { x: 3.4909079445, y: 3.4974379644, z: 3.501 },
            { x: 0.0099079445, y: 3.4974379644, z: 3.501 }
          ]
        }
      },
      { BuildingSurface:
        { name: "EastWall", type: "Wall",
          vertices: [
            { x: 3.4909079445, y: 0.0164379644, z: 0 },
            { x: 3.4909079445, y: 3.4974379644, z: 0 },
            { x: 3.4909079445, y: 3.4974379644, z: 3.501 },
            { x: 3.4909079445, y: 0.0164379644, z: 3.501 }
          ]
        },
      },
      { BuildingSurface:
        { name: "NorthWall", type: "Wall",
          vertices: [
            { x: 3.4909079445, y: 3.4974379644, z: 0 },
            { x: 0.0099079445, y: 3.4974379644, z: 0 },
            { x: 0.0099079445, y: 3.4974379644, z: 3.501 },
            { x: 3.4909079445, y: 3.4974379644, z: 3.501 }
          ]
        },
      },
      { BuildingSurface:
        { name: "WestWall", type: "Wall",
           vertices: [
            { x: 0.0099079445, y: 3.4974379644, z: 0 },
            { x: 0.0099079445, y: 0.0164379644, z: 0 },
            { x: 0.0099079445, y: 0.0164379644, z: 3.501 },
            { x: 0.0099079445, y: 3.4974379644, z: 3.501 }
          ]
        }
      },
      { BuildingSurface:
        { name: "SouthWall", type: "Wall",
          vertices: [
            { x: 0.0099079445, y: 0.0164379644, z: 0 },
            { x: 3.4909079445, y: 0.0164379644, z: 0 },
            { x: 3.4909079445, y: 0.0164379644, z: 3.501 },
            { x: 0.0099079445, y: 0.0164379644, z: 3.501 }
          ]
        },
      },
      { FenestrationSurface:
        { name: "EastWindow", type: "Window",
           vertices: [
            { x: 3.4909079445, y: 0.07143796, z: 1.04 },
            { x: 3.4909079445, y: 3.44243796, z: 1.04 },
            { x: 3.4909079445, y: 3.44243796, z: 2.3715738626 },
            { x: 3.4909079445, y: 0.07143796, z: 2.3715738626 }
          ]
        }
      }
    ]
};

// Show the main index page
exports.load = function(req, res) {
  console.log('simulation.load: ' + req.params.id);
  res.json({ "status": 0, "data": zone});
};

exports.run = function(req, res) {
  var simulation = Simulation.create({ userInput: req.body });

  simulation.save();
  var jobId = simulation.get('_id');

  var options = {
    scriptPath: 'scripts',
    args: [ jobId, JSON.stringify(req.body) ]
  };

  pyShell.run('runsimulation.py', options, function (err, results) {
    if (err) {
      // TODO: probably need to set an error on the simulation object
      console.log("Error running python script: " + err);
    }
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    simulation.set('finished', true);
    simulation.save();
  });

  res.json({ "status": 0, jobId: simulation.get('_id')});
};

exports.checkForResults = function(req, res) {
  var id = req.params.jobId;
  Simulation.findById(req.params.jobId, function(err, simulation) {
    if (err) {
      res.status(500).json({'error': err});
      return;
    } else if (!simulation) {
      res.status(400).json({ error: "simulation " + req.params.jobId + " not found" });
      return;
    }

    res.status(200).json({ jobId: id, finished: simulation.get('finished') });
  });
};
