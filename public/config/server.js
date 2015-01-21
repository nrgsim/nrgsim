
module.exports = {
  drawRoutes: function(app, excel) {

    var _ = require('lodash');
    var fs = require('fs');
  
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
          {
            "DZA": {
              name: "Algiers",
            }
          },
          {
            "EGY": {
              name: "Egypt",
            }
          },
          {
            "ETH": {
              name: "Ethiopia",
            }
          },
          {
            "GHA": {
              name: "Ghana",
            }
          },
          {
            "KEN": {
              name: "Kenya",
            }
          },
          {
            "LBY": {
              name: "Libyan Arab Jamahiriya",
             }
           },
          {
            "MAR": {
              name: "Morocco",
            }
          },
          {
            "MDG": {
              name: "Madagascar",
            }
          },
          {
            "SEN": {
              name: "Senegal",
            }
          },
          {
            "TUN": {
              name: "Tunisia",
            }
          },
          {
            "ZAF": {
              name: "South Africa",
            }
          },
          {
            "ZWE": {
              name: "Zimbabwe",
            }
          }
        ]
      },
      "2": {
        name: "Asia",
        values: [
          {
            "ARE": {
              name: "United Arab Emirates",
            }
          },
          {
            "BGD": {
              name: "Bangladesh",
            }
          },
          {
            "CHN": {
              name: "China",
            }
          },
          {
            "IND": {
              name: "India",
            }
          },
          {
            "IRN": {
              name: "Iran - Islamic Republic of",
            }
          },
          {
            "JPN": {
              name: "Japan",
            }
          },
          {
            "KAZ": {
              name: "Kazakhstan",
            }
          },
          {
            "KOR": {
              name: "Korea - Republic of",
            }
          },
          {
            "KWT": {
              name: "Kuwait",
            }
          },
          {
            "LKA": {
              name: "Sri Lanka",
            }
          },
          {
            "MAC": {
              name: "Macau",
            }
          },
          {
            "MDV": {
              name: "Maldives",
            }
          },
          {
            "MNG": {
              name: "Mongolia",
            }
          },
          {
            "NPL": {
              name: "Nepal",
            }
          },
          {
            "PAK": {
              name: "Pakistan",
            }
          },
          {
            "PRK": {
              name: "Korea - Democratic People's Republic of",
            }
          },
          {
            "RUS": {
              name: "Russian Federation",
            }
          },
          {
            "SAU": {
              name: "Saudi Arabia",
            }
          },
          {
            "THA": {
              name: "Thailand",
            }
          },
          {
            "TWN": {
              name: "Taiwan",
            }
          },
          {
            "UZB": {
              name: "Uzbekistan",
            }
          },
          {
            "VNM": {
              name: "Viet Nam",
            }
          },
        ]
      },
      "3": {
        name: "South America",
        values: [
          {
            "ARG": {
              name: "Argentina",
            }
          },
          {
            "BOL": {
              name: "Bolivia",
            }
          },
          {
            "BRA": {
              name: "Brazil",
            }
          },
          {
            "CHL": {
              name: "Chile",
            }
          },
          {
            "COL": {
              name: "Colombia",
            }
          },
          {
            "ECU": {
              name: "Ecuador",
            }
          },
          {
            "PER": {
              name: "Peru",
            }
          },
          {
            "PRY": {
              name: "Paraguay",
            }
          },
          {
            "URY": {
              name: "Uruguay",
            }
          },
          {
            "VEN": {
              name: "Venezuela",
            }
          },
        ]
      },
      "4": {
        name: "North and Central America",
        values: [
          {
            "USA": {
              name: "United States",
            }
          },
          {
            "CCZ": {
              name: "California Climate Zones",
            }
          },
          {
            "CAN": {
              name: "Canada",
            }
          },
          {
            "BLZ": {
              name: "Belize",
            }
          },
          {
            "CUB": {
              name: "Cuba",
            }
          },
          {
            "GTM": {
              name: "Guatemala",
            }
          },
          {
            "HND": {
              name: "Honduras",
            }
          },
          {
            "MEX": {
              name: "Mexico",
            }
          },
          {
            "MTQ": {
              name: "Martinique",
            }
          },
          {
            "NIC": {
              name: "Nicaragua",
            }
          },
          {
            "PRI": {
              name: "Puerto Rico",
            }
          },
          {
            "SLV": {
              name: "El Salvador",
            }
          },
          {
            "VIR": {
              name: "Virgin Islands (U.S.)",
            }
          },
        ]
      },
      "5": {
        name: "Southwest Pacific",
        values: [
          {
            "AUS": {
              name: "Australia",
            }
          },
          {
            "BRN": {
              name: "Brunei Darussalam",
            }
          },
          {
            "FJI": {
              name: "Fiji",
            }
          },
          {
            "GUM": {
              name: "Guam",
            }
          },
          {
            "MHL": {
              name: "Marshall Islands",
            }
          },
          {
            "MYS": {
              name: "Malaysia",
            }
          },
          {
            "NZL": {
              name: "New Zealand",
            }
          },
          {
            "PHL": {
              name: "Philippines",
            }
          },
          {
            "PLW": {
              name: "Palau",
            }
          },
          {
            "SGP": {
              name: "Singapore",
            }
          },
          {
            "UMI": {
              name: "United States Minor Outlying Islands",
            }
          },
        ]
      },
      "6": {
        name: "Europe",
        values: [
          {
            "AUT": {
              name: "Austria",
            }
          },
          {
            "BEL": {
              name: "Belgium",
            }
          },
          {
            "BGR": {
              name: "Bulgaria",
            }
          },
          {
            "BIH": {
              name: "Bosnia and Herzegowina",
            }
          },
          {
            "BLR": {
              name: "Belarus",
            }
          },
          {
            "CHE": {
              name: "Switzerland",
            }
          },
          {
            "CYP": {
              name: "Cyprus",
            }
          },
          {
            "CZE": {
              name: "Czech Republic",
            }
          },
          {
            "DEU": {
              name: "Germany",
            }
          },
          {
            "DNK": {
              name: "Denmark",
            }
          },
          {
            "ESP": {
              name: "Spain",
            }
          },
          {
            "FIN": {
              name: "Finland",
            }
          },
          {
            "FRA": {
              name: "France",
            }
          },
          {
            "GBR": {
              name: "United Kingdom",
            }
          },
          {
            "GRC": {
              name: "Greece",
            }
          },
          {
            "HUN": {
              name: "Hungary",
            }
          },
          {
            "IRL": {
              name: "Ireland",
            }
          },
          {
            "ISL": {
              name: "Iceland",
            }
          },
          {
            "ISR": {
              name: "Israel",
            }
          },
          {
            "ITA": {
              name: "Italy",
            }
          },
          {
            "LTU": {
              name: "Lithuania",
            }
          },
          {
            "NLD": {
              name: "Netherlands",
            }
          },
          {
            "NOR": {
              name: "Norway",
            }
          },
          {
            "POL": {
              name: "Poland",
            }
          },
          {
            "PRT": {
              name: "Portugal",
            }
          },
          {
            "ROU": {
              name: "Romania",
            }
          },
          {
            "RUS": {
              name: "Russian Federation",
            }
          },
          {
            "SRB": {
              name: "Serbia",
            }
          },
          {
            "SVK": {
              name: "Slovakia (Slovak Republic)",
            }
          },
          {
            "SVN": {
              name: "Slovenia",
            }
          },
          {
            "SWE": {
              name: "Sweden",
            }
          },
          {
            "SYR": {
              name: "Syrian Arab Republic",
            }
          },
          {
            "TUR": {
              name: "Turkey",
            }
          },
          {
            "UKR": {
              name: "Ukraine",
            }
          },
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

    app.get('/simulation/countries/:continent', function(req, res) {
      var continent = req.params.continent;
      res.json(WEATHER_DATA[continent]);
    });

    app.get('/simulation/files/:continent/:country', function(req, res) {
      var continent = req.params.continent;
      var country = req.params.country;
      var weatherDir = process.cwd()+'\\..\\..\\weather\\'+continent+'\\'+country;
      fs.readdir(weatherDir, function(err, files) {
        if (!err) {
          res.json(files);
        } else {
          console.log("Failed to get weather files for " + continent + ' ' + country + ': ' + err.message);
        }
      });
    });
  }
};