
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
      "WMO_1_": {
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
              name: "Libyan_Arab_Jamahiriya",
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
              name: "South_Africa",
            }
          },
          {
            "ZWE": {
              name: "Zimbabwe",
            }
          }
        ]
      },
      "wmo_2_": {
        name: "Asia",
        values: [
          {
            "ARE": {
              name: "United_Arab_Emirates",
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
              name: "Iran_Islamic_Republic_of",
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
              name: "Korea_Republic_of",
            }
          },
          {
            "KWT": {
              name: "Kuwait",
            }
          },
          {
            "LKA": {
              name: "Sri_Lanka",
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
              name: "Korea_Democratic_People's_Republic_of",
            }
          },
          {
            "RUS": {
              name: "Russian_Federation",
            }
          },
          {
            "SAU": {
              name: "Saudi_Arabia",
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
              name: "Viet_Nam",
            }
          },
        ]
      },
      "WMO_3_": {
        name: "South_America",
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
      "WMO_4_": {
        name: "North_and_Central_America",
        values: [
          {
            "USA": {
              name: "United_States",
            }
          },
          {
            "CCZ": {
              name: "California_Climate_Zones",
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
              name: "Puerto_Rico",
            }
          },
          {
            "SLV": {
              name: "El_Salvador",
            }
          },
          {
            "VIR": {
              name: "Virgin_Islands",
            }
          },
        ]
      },
      "WMO_5_": {
        name: "Southwest_Pacific",
        values: [
          {
            "AUS": {
              name: "Australia",
            }
          },
          {
            "BRN": {
              name: "Brunei_Darussalam",
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
              name: "Marshall_Islands",
            }
          },
          {
            "MYS": {
              name: "Malaysia",
            }
          },
          {
            "NZL": {
              name: "New_Zealand",
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
              name: "United_States_Minor_Outlying_Islands",
            }
          },
        ]
      },
      "WMO_6_": {
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
              name: "Bosnia_and_Herzegowina",
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
              name: "Czech_Republic",
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
              name: "United_Kingdom",
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
              name: "Russian_Federation",
            }
          },
          {
            "SRB": {
              name: "Serbia",
            }
          },
          {
            "SVK": {
              name: "Slovakia_Slovak_Republic",
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
              name: "Syrian_Arab_Republic",
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
  
    var resultRequestCount = 0;
    app.post('/simulation/run', function(req, res) {
      console.log(JSON.stringify(req.body, null, '  '));
      resultRequestCount = 0;
      res.json({ "status": 0, "data": "this would be some simulation results"});
    });

    app.get('/simulation/:jobId', function(req, res) {
      var jobId = req.params.jobId;
      //var rnd = Math.floor((Math.random() * 4) + 1);
      //var finished = (rnd === 1);
      resultRequestCount = resultRequestCount + 1;
      if (resultRequestCount > 3) {
        res.send("#,Job_ID,Reserved,E1: Heating Energy Demand [kWh],E2: Cooling Energy Demand [kWh],\r\n0,job0,,187.75,1530.01,\r\n0,job1,,112.99,1424.85,");
      } else {
        res.status(203).json({ jobId: jobId, finished: false });
      }
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