
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Simulation =  mongoose.model('Simulation'),
    os = require('os'),
    pyShell = require('python-shell'),
    fs = require('fs');

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
  console.log(options.args);
  if (os.platform() === 'linux') {
    options.pythonPath = '/usr/bin/python3';
  }

  pyShell.run('runsimulation.py', options, function (err, results) {
    if (err) {
      // TODO: probably need to set an error on the simulation object
      console.log("Error running python script: " + err);
    }
    // results is the full path to the directory where the simulation results are stored
    var resultsDir = results[results.length-2];
    var resultsFile = results[results.length-1];
    simulation.set({ resultsDirectory: resultsDir, resultsFile: resultsFile, finished: true });
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

    var finished = simulation.get('finished');
    if (finished) {
      var resultsFile = simulation.get('resultsFile');
      res.status(200).sendfile(resultsFile);
    } else {
      // Send a 203 (not finished yet)
      res.status(203).json({ jobId: id, finished: false });
    }
  });
};

exports.getCountries = function(req, res) {
  var continent = req.params.continent;
  res.json(WEATHER_DATA[continent]);
};

exports.getWeatherFiles = function(req, res) {
  var continent = req.params.continent;
  var country = req.params.country;
  var weatherDir = process.cwd()+'\\..\\weather\\'+continent+'\\'+country;
  console.log('WEATHER DIR: ' + weatherDir);
  fs.readdir(weatherDir, function(err, files) {
    if (!err) {
      res.json(files);
    } else {
      console.log("Failed to get weather files for " + continent + ' ' + country + ': ' + err.message);
    }
  });
};
