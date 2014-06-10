
module.exports = {
  drawRoutes: function(app, excel) {

    var parser = require('node-xlsx');
    var _ = require('lodash');
  
    /*
    var zone = [
      { name: "Mid_Ceiling", type: "Ceiling",
        vertices: [ { x: 4.5732, y: 4.5732, z: 22.56 }, { x: 0, y: 0, z: 22.56 }, { x: 73.1072, y: 0, z: 22.56 }, { x: 68.534, y: 4.5732, z: 22.56 } ] },
      { name: "Mid_Floor", type: "Floor",
        vertices: [ { x: 68.534, y: 4.5732, z: 19.816 }, { x: 73.1072, y: 0, z: 19.816 }, { x: 0, y: 0, z: 19.816 }, { x: 4.5732, y: 4.5732, z: 19.816 } ] },
      { name: "Mid_InteriorWall_1", type: "Wall",
        vertices: [ { x: 73.1072, y: 0, z: 22.56 }, { x: 73.1072, y: 0, z: 19.816 }, { x: 68.534, y: 4.5732, z: 19.816 }, { x: 68.534, y: 4.5732, z: 22.56 } ] },
      { name: "Mid_InteriorWall_2", type: "Wall",
        vertices: [ { x: 68.534, y: 4.5732, z: 22.56 }, { x: 68.534, y: 4.5732, z: 19.816 }, { x: 4.5732, y: 4.5732, z: 19.816 }, { x: 4.5732, y: 4.5732, z: 22.56 } ] },
      { name: "Mid_InteriorWall_3", type: "Wall",
        vertices: [ { x: 4.5732, y: 4.5732, z: 22.56 }, { x: 4.5732, y: 4.5732, z: 19.816 }, { x: 0, y: 0, z: 19.816 }, { x: 0, y: 0, z: 22.56 } ] },
      { name: "Exterior Wall", type: "Wall",
        vertices: [ { x: 0, y: 0, z: 22.56 }, { x: 0, y: 0, z: 19.816 }, { x: 73.1072, y: 0, z: 19.816 }, { x: 73.1072, y: 0, z: 22.56 } ] }
    ];
    */
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

    /*
    var windows = [
      { name: "Window", type: "Window", vertices: [ { x: 0, y: 0, z: 22.316 }, { x: 0, y: 0, z: 21.2185 }, { x: 73.107, y: 0, z: 21.2185 }, { x: 73.107, y: 0, z: 22.316 } ] }
    ];
    */
    /*
    var windows = [
      { name: "Window", type: "Window",
         vertices: [
          { x: 0.000000000000, y: 0.000000000000, z: 21.218500000000 },
          { x: 73.107000000000, y: 0.000000000000, z: 21.218500000000 },
          { x: 73.107000000000, y: 0.000000000000, z: 22.316000000000 },
          { x: 0.000000000000, y: 0.000000000000, z: 22.316000000000 }
        ]
      }
    ];
    */

    function parseWorksheet(data) {
      zone = [];
      var col = 1;
      while (data[0][col] !== undefined) {
        var plane = {};
        plane.name = data[0][col].value;
        plane.type = data[1][col].value;
        plane.vertices = [];
        for (var row=10; row<22; row+=3) {
          var vertex = { x: data[row][col].value, y: data[row+1][col].value, z: data[row+2][col].value, };
          plane.vertices.push(vertex);
        }
        zone.push(plane);
        col += 1;
      }

      return zone;
    }

    function buildResults(data) {
      var result = {};
      _.each(data.worksheets, function(worksheet) {
        if (worksheet.name.toLowerCase() === 'zone') {
          result.zone = parseWorksheet(worksheet.data);
        } else if (worksheet.name.toLowerCase() === 'window') {
          result.windows = parseWorksheet(worksheet.data);
        }
      });
      return result;
    }
  
    app.get('/load/:zoneid', function(req, res) {
      res.json({ "status": 0, "data": zone});
    });
  
    /*
    app.get('/windows/:zoneid', function(req, res) {
      res.json(windows);
    });
    */

    app.get('/excel/:filename', function(req, res) {
      try {
        var data = parser.parse(req.params.filename);
        var result = buildResults(data);
        res.json({ "status": 0, "data": result });
      } catch (err) {
        console.log(err);
        res.json({"status": "-1", "error": "Failed to parse file"});
      }
    });

    app.post('/simulate', function(req, res) {
      console.log(JSON.stringify(req.body, null, '  '));
      res.json({ "status": 0, "data": "this would be some simulation results"});
    });
  }
};