
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
  "WMO_1_Africa": {
    name: "Africa",
    values: [
      {
        "Algiers": {
          name: "Algiers",
        }
      },
      {
        "Egypt": {
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
  "WMO_2_Asia": {
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
  "WMO_3_SouthAmerica": {
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
  "WMO_4_NorthAndCentralAmerica": {
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
  "WMO_5_SouthwestPacific": {
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
  "WMO_6_Europe": {
    name: "Europe",
    values: [
      {
        "Austria": {
          name: "Austria",
        }
      },
      {
        "Belgium": {
          name: "Belgium",
        }
      },
      {
        "Bulgaria": {
          name: "Bulgaria",
        }
      },
      {
        "Bosnia_and_Herzegowina": {
          name: "Bosnia and Herzegowina",
        }
      },
      {
        "Belarus": {
          name: "Belarus",
        }
      },
      {
        "Cyprus": {
          name: "Cyprus",
        }
      },
      {
        "Czech_Republic": {
          name: "Czech Republic",
        }
      },
      {
        "Germany": {
          name: "Germany",
        }
      },
      {
        "Denmark": {
          name: "Denmark",
        }
      },
      {
        "Spain": {
          name: "Spain",
        }
      },
      {
        "Finland": {
          name: "Finland",
        }
      },
      {
        "France": {
          name: "France",
        }
      },
      {
        "United_Kingdom": {
          name: "United Kingdom",
        }
      },
      {
        "Greece": {
          name: "Greece",
        }
      },
      {
        "Hungary": {
          name: "Hungary",
        }
      },
      {
        "Ireland": {
          name: "Ireland",
        }
      },
      {
        "Iceland": {
          name: "Iceland",
        }
      },
      {
        "Israel": {
          name: "Israel",
        }
      },
      {
        "Italy": {
          name: "Italy",
        }
      },
      {
        "Lithuania": {
          name: "Lithuania",
        }
      },
      {
        "Netherlands": {
          name: "Netherlands",
        }
      },
      {
        "Norway": {
          name: "Norway",
        }
      },
      {
        "Poland": {
          name: "Poland",
        }
      },
      {
        "Portugal": {
          name: "Portugal",
        }
      },
      {
        "Romania": {
          name: "Romania",
        }
      },
      {
        "Russian_Federation": {
          name: "Russian Federation",
        }
      },
      {
        "Serbia": {
          name: "Serbia",
        }
      },
      {
        "Slovakia_(Slovak_Republic)": {
          name: "Slovakia (Slovak Republic)",
        }
      },
      {
        "Slovenia": {
          name: "Slovenia",
        }
      },
      {
        "Sweden": {
          name: "Sweden",
        }
      },
      {
        "Switzerland": {
          name: "Switzerland",
        }
      },
      {
        "Syrian_Arab_Republic": {
          name: "Syrian Arab Republic",
        }
      },
      {
        "Turkey": {
          name: "Turkey",
        }
      },
      {
        "Ukraine": {
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
  console.log('CONTINENT: ' + continent);
  console.log(WEATHER_DATA[continent]);
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
