
module.exports = {
  drawRoutes: function(app, excel) {

    var _ = require('lodash');
  
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

    var WEATHER_DATA = {
      "1": {
        name: "Africa",
        values: [
          { "DZA": { name: "Algiers", values: [] } },
          { "EGY": { name: "Egypt", values: [] } },
          { "ETH": { name: "Ethiopia", values: [] } },
          { "GHA": { name: "Ghana", values: [] } },
          { "KEN": { name: "Kenya", values: [] } },
          { "LBY": { name: "Libyan Arab Jamahiriya", values: [] } },
          { "MAR": { name: "Morocco", values: [] } },
          { "MDG": { name: "Madagascar", values: [] } },
          { "SEN": { name: "Senegal", values: [] } },
          { "TUN": { name: "Tunisia", values: [] } },
          { "ZAF": { name: "South Africa", values: [] } },
          { "ZWE": { name: "Zimbabwe", values: [] } }
        ]
      },
      "2": {
        name: "Asia",
        values: [
          { "ARE": { name: "United Arab Emirates", values: [] } },
          { "BGD": { name: "Bangladesh", values: [] } },
          { "CHN": { name: "China", values: [] } },
          { "IND": { name: "India", values: [] } },
          { "IRN": { name: "Iran - Islamic Republic of", values: [] } },
          { "JPN": { name: "Japan", values: [] } },
          { "KAZ": { name: "Kazakhstan", values: [] } },
          { "KOR": { name: "Korea - Republic of", values: [] } },
          { "KWT": { name: "Kuwait", values: [] } },
          { "LKA": { name: "Sri Lanka", values: [] } },
          { "MAC": { name: "Macau", values: [] } },
          { "MDV": { name: "Maldives", values: [] } },
          { "MNG": { name: "Mongolia", values: [] } },
          { "NPL": { name: "Nepal", values: [] } },
          { "PAK": { name: "Pakistan", values: [] } },
          { "PRK": { name: "Korea - Democratic People's Republic of", values: [] } },
          { "RUS": { name: "Russian Federation", values: [] } },
          { "SAU": { name: "Saudi Arabia", values: [] } },
          { "THA": { name: "Thailand", values: [] } },
          { "TWN": { name: "Taiwan", values: [] } },
          { "UZB": { name: "Uzbekistan", values: [] } },
          { "VNM": { name: "Viet Nam", values: [] } },
        ]
      },
      "3": {
        name: "South America",
        values: [
          { "ARG": { name: "Argentina", values: [] } },
          { "BOL": { name: "Bolivia", values: [] } },
          { "BRA": { name: "Brazil", values: [] } },
          { "CHL": { name: "Chile", values: [] } },
          { "COL": { name: "Colombia", values: [] } },
          { "ECU": { name: "Ecuador", values: [] } },
          { "PER": { name: "Peru", values: [] } },
          { "PRY": { name: "Paraguay", values: [] } },
          { "URY": { name: "Uruguay", values: [] } },
          { "VEN": { name: "Venezuela", values: [] } }
        ]
      },
      "4": {
        name: "North and Central America",
        values: [
          { "USA": { name: "United States", values: [] } },
          { "CCZ": { name: "California Climate Zones", values: [] } },
          { "CAN": { name: "Canada", values: [] } },
          { "BLZ": { name: "Belize", values: [] } },
          { "CUB": { name: "Cuba", values: [] } },
          { "GTM": { name: "Guatemala", values: [] } },
          { "HND": { name: "Honduras", values: [] } },
          { "MEX": { name: "Mexico", values: [] } },
          { "MTQ": { name: "Martinique", values: [] } },
          { "NIC": { name: "Nicaragua", values: [] } },
          { "PRI": { name: "Puerto Rico", values: [] } },
          { "SLV": { name: "El Salvador", values: [] } },
          { "VIR": { name: "Virgin Islands (U.S.)", values: [] } }
        ]
      },
      "5": {
        name: "Southwest Pacific",
        values: [
          { "AUS": { name: "Australia", values: [] } },
          { "BRN": { name: "Brunei Darussalam", values: [] } },
          { "FJI": { name: "Fiji", values: [] } },
          { "GUM": { name: "Guam", values: [] } },
          { "MHL": { name: "Marshall Islands", values: [] } },
          { "MYS": { name: "Malaysia", values: [] } },
          { "NZL": { name: "New Zealand", values: [] } },
          { "PHL": { name: "Philippines", values: [] } },
          { "PLW": { name: "Palau", values: [] } },
          { "SGP": { name: "Singapore", values: [] } },
          { "UMI": { name: "United States Minor Outlying Islands", values: [] } },
        ]
      },
      "6": {
        name: "Europe",
        values: [
          { "AUT": { name: "Austria", values: [] } },
          { "BEL": { name: "Belgium", values: [] } },
          { "BGR": { name: "Bulgaria", values: [] } },
          { "BIH": { name: "Bosnia and Herzegowina", values: [] } },
          { "BLR": { name: "Belarus", values: [] } },
          { "CHE": { name: "Switzerland", values: [] } },
          { "CYP": { name: "Cyprus", values: [] } },
          { "CZE": { name: "Czech Republic", values: [] } },
          { "DEU": { name: "Germany", values: [] } },
          { "DNK": { name: "Denmark", values: [] } },
          { "ESP": { name: "Spain", values: [] } },
          { "FIN": { name: "Finland", values: [] } },
          { "FRA": { name: "France", values: [] } },
          { "GBR": { name: "United Kingdom", values: [] } },
          { "GRC": { name: "Greece", values: [] } },
          { "HUN": { name: "Hungary", values: [] } },
          { "IRL": { name: "Ireland", values: [] } },
          { "ISL": { name: "Iceland", values: [] } },
          { "ISR": { name: "Israel", values: [] } },
          { "ITA": { name: "Italy", values: [] } },
          { "LTU": { name: "Lithuania", values: [] } },
          { "NLD": { name: "Netherlands", values: [] } },
          { "NOR": { name: "Norway", values: [] } },
          { "POL": { name: "Poland", values: [] } },
          { "PRT": { name: "Portugal", values: [] } },
          { "ROU": { name: "Romania", values: [] } },
          { "RUS": { name: "Russian Federation", values: [] } },
          { "SRB": { name: "Serbia", values: [] } },
          { "SVK": { name: "Slovakia (Slovak Republic)", values: [] } },
          { "SVN": { name: "Slovenia", values: [] } },
          { "SWE": { name: "Sweden", values: [] } },
          { "SYR": { name: "Syrian Arab Republic", values: [] } },
          { "TUR": { name: "Turkey", values: [] } },
          { "UKR": { name: "Ukraine", values: [] } },
        ]
      }
    };

    app.post('/user/session', function(req, res) {
      var email = req.body.email;
      var pwd = req.body.password;
      if (email === pwd) {
        var user = { _id: 1, __v: 0, name: req.body.name, email: email, password: pwd };
        res.status(200).json(user);
      } else {
        res.status(400).json({"msg": "login failed"});
      }
    });

    app.delete('/user/session', function(req, res) {
      res.status(200).json({ "message" : "logged out" });
    });

    app.post('/user', function(req, res) {
      if (req.body.email === 'taken@taken.com') {
        res.status(400).json({ message: "That email address is already taken." });
      } else {
        res.status(200).json({ "message" : "user registered" });
      }
    });

    app.put('/user', function(req, res) {
      res.status(200).json({ "message" : "user updated" });
    });

    app.get('/simulation/load/:id', function(req, res) {
      res.json({ "status": 0, "data": zone});
    });
  
    app.post('/simulation/run', function(req, res) {
      console.log(JSON.stringify(req.body, null, '  '));
      res.json({ "status": 0, "data": "this would be some simulation results"});
    });

    app.get('/simulation/:jobId', function(req, res) {
      var jobId = req.params.jobId;
      var rnd = Math.floor((Math.random() * 4) + 1);
      var finished = (rnd === 1);
      res.send("This would be the results streamed back from the server");
    });

    app.get('/simulation/countries/:id', function(req, res) {
      var continent = req.params.id;
      res.json(WEATHER_DATA[continent]);
    });
  }
};