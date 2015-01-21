
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
              values: [
                { name: "Algiers", file: "1_africa_wmo_region_1/DZA_Algiers.603900_IWEC.zip" }
              ]
            }
          },
          {
            "EGY": {
              name: "Egypt",
              values: [
                { name: "Al Minya 623870 (ETMY)", file: "1_africa_wmo_region_1/EGY_Al.Minya.623870_ETMY.zip" },
                { name: "Alexandria 623180 (ETMY)", file: "1_africa_wmo_region_1/EGY_Alexandria.623180_ETMY.zip" },
                { name: "Aswan 624140 (ETMY)", file: "1_africa_wmo_region_1/EGY_Aswan.624140_ETMY.zip" },
                { name: "Aswan 624140 (IWEC)", file: "1_africa_wmo_region_1/EGY_Aswan.624140_IWEC.zip" },
                { name: "Asyut 623930 (ETMY)", file: "1_africa_wmo_region_1/EGY_Asyut.623930_ETMY.zip" },
                { name: "Cairo 623660 (IWEC)", file: "1_africa_wmo_region_1/EGY_Cairo.623660_IWEC.zip" },
                { name: "Cairo Intl Airport 623660 (ETMY)", file: "1_africa_wmo_region_1/EGY_Cairo.Intl.Airport.623660_ETMY.zip" },
                { name: "El Arish 623370 (ETMY)", file: "1_africa_wmo_region_1/EGY_El.Arish.623370_ETMY.zip" },
                { name: "Helwan 623780 (ETMY)", file: "1_africa_wmo_region_1/EGY_Helwan.623780_ETMY.zip" },
                { name: "Hurghada 624630 (ETMY)", file: "1_africa_wmo_region_1/EGY_Hurghada.624630_ETMY.zip" },
                { name: "Ismailia 624400 (ETMY)", file: "1_africa_wmo_region_1/EGY_Ismailia.624400_ETMY.zip" },
                { name: "Kharga 624350 (ETMY)", file: "1_africa_wmo_region_1/EGY_Kharga.624350_ETMY.zip" },
                { name: "Luxor 624050 (ETMY)", file: "1_africa_wmo_region_1/EGY_Luxor.624050_ETMY.zip" }
              ]
            }
          },
          {
            "ETH": {
              name: "Ethiopia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "GHA": {
              name: "Ghana",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "KEN": {
              name: "Kenya",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "LBY": {
              name: "Libyan Arab Jamahiriya",
              values: [
                { name: "TBD", file: "TBD" }
              ]
             }
           },
          {
            "MAR": {
              name: "Morocco",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MDG": {
              name: "Madagascar",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SEN": {
              name: "Senegal",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "TUN": {
              name: "Tunisia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ZAF": {
              name: "South Africa",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ZWE": {
              name: "Zimbabwe",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BGD": {
              name: "Bangladesh",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CHN": {
              name: "China",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "IND": {
              name: "India",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "IRN": {
              name: "Iran - Islamic Republic of",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "JPN": {
              name: "Japan",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "KAZ": {
              name: "Kazakhstan",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "KOR": {
              name: "Korea - Republic of",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "KWT": {
              name: "Kuwait",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "LKA": {
              name: "Sri Lanka",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MAC": {
              name: "Macau",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MDV": {
              name: "Maldives",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MNG": {
              name: "Mongolia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "NPL": {
              name: "Nepal",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PAK": {
              name: "Pakistan",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PRK": {
              name: "Korea - Democratic People's Republic of",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "RUS": {
              name: "Russian Federation",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SAU": {
              name: "Saudi Arabia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "THA": {
              name: "Thailand",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "TWN": {
              name: "Taiwan",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "UZB": {
              name: "Uzbekistan",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "VNM": {
              name: "Viet Nam",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BOL": {
              name: "Bolivia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BRA": {
              name: "Brazil",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CHL": {
              name: "Chile",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "COL": {
              name: "Colombia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ECU": {
              name: "Ecuador",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PER": {
              name: "Peru",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PRY": {
              name: "Paraguay",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "URY": {
              name: "Uruguay",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "VEN": {
              name: "Venezuela",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CCZ": {
              name: "California Climate Zones",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CAN": {
              name: "Canada",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BLZ": {
              name: "Belize",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CUB": {
              name: "Cuba",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "GTM": {
              name: "Guatemala",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "HND": {
              name: "Honduras",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MEX": {
              name: "Mexico",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MTQ": {
              name: "Martinique",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "NIC": {
              name: "Nicaragua",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PRI": {
              name: "Puerto Rico",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SLV": {
              name: "El Salvador",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "VIR": {
              name: "Virgin Islands (U.S.)",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BRN": {
              name: "Brunei Darussalam",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "FJI": {
              name: "Fiji",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "GUM": {
              name: "Guam",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MHL": {
              name: "Marshall Islands",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "MYS": {
              name: "Malaysia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "NZL": {
              name: "New Zealand",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PHL": {
              name: "Philippines",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PLW": {
              name: "Palau",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SGP": {
              name: "Singapore",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "UMI": {
              name: "United States Minor Outlying Islands",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BEL": {
              name: "Belgium",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BGR": {
              name: "Bulgaria",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BIH": {
              name: "Bosnia and Herzegowina",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "BLR": {
              name: "Belarus",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CHE": {
              name: "Switzerland",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CYP": {
              name: "Cyprus",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "CZE": {
              name: "Czech Republic",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "DEU": {
              name: "Germany",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "DNK": {
              name: "Denmark",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ESP": {
              name: "Spain",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "FIN": {
              name: "Finland",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "FRA": {
              name: "France",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "GBR": {
              name: "United Kingdom",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "GRC": {
              name: "Greece",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "HUN": {
              name: "Hungary",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "IRL": {
              name: "Ireland",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ISL": {
              name: "Iceland",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ISR": {
              name: "Israel",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ITA": {
              name: "Italy",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "LTU": {
              name: "Lithuania",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "NLD": {
              name: "Netherlands",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "NOR": {
              name: "Norway",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "POL": {
              name: "Poland",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "PRT": {
              name: "Portugal",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "ROU": {
              name: "Romania",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "RUS": {
              name: "Russian Federation",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SRB": {
              name: "Serbia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SVK": {
              name: "Slovakia (Slovak Republic)",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SVN": {
              name: "Slovenia",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SWE": {
              name: "Sweden",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "SYR": {
              name: "Syrian Arab Republic",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "TUR": {
              name: "Turkey",
              values: [
                { name: "TBD", file: "TBD" }
              ]
            }
          },
          {
            "UKR": {
              name: "Ukraine",
              values: [
                { name: "TBD", file: "TBD" }
              ]
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