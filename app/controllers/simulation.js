
/*jslint node: true */
"use strict";

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
  console.log('simulation.run: ' + JSON.stringify(req.body));
  res.json({ "status": 0, "data": "this would be some simulation results"});
};
