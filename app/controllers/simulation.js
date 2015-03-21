
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
        "Ethiopia": {
          name: "Ethiopia",
        }
      },
      {
        "Ghana": {
          name: "Ghana",
        }
      },
      {
        "Kenya": {
          name: "Kenya",
        }
      },
      {
        "Libyan_Arab_Jamahiriya": {
          name: "Libyan Arab Jamahiriya",
         }
       },
      {
        "Morocco": {
          name: "Morocco",
        }
      },
      {
        "Madagascar": {
          name: "Madagascar",
        }
      },
      {
        "Senegal": {
          name: "Senegal",
        }
      },
      {
        "Tunisia": {
          name: "Tunisia",
        }
      },
      {
        "South_Africa": {
          name: "South Africa",
        }
      },
      {
        "Zimbabwe": {
          name: "Zimbabwe",
        }
      }
    ]
  },
  "WMO_2_Asia": {
    name: "Asia",
    values: [
      {
        "United_Arab_Emirates": {
          name: "United Arab Emirates",
        }
      },
      {
        "Bangladesh": {
          name: "Bangladesh",
        }
      },
      {
        "China": {
          name: "China",
        }
      },
      {
        "India": {
          name: "India",
        }
      },
      {
        "Iran_Islamic_Republic_of": {
          name: "Iran - Islamic Republic of",
        }
      },
      {
        "Japan": {
          name: "Japan",
        }
      },
      {
        "Kazakhstan": {
          name: "Kazakhstan",
        }
      },
      {
        "Korea_Republic_of": {
          name: "Korea - Republic of",
        }
      },
      {
        "Kuwait": {
          name: "Kuwait",
        }
      },
      {
        "Sri_Lanka": {
          name: "Sri Lanka",
        }
      },
      {
        "Macau": {
          name: "Macau",
        }
      },
      {
        "Maldives": {
          name: "Maldives",
        }
      },
      {
        "Mongolia": {
          name: "Mongolia",
        }
      },
      {
        "Nepal": {
          name: "Nepal",
        }
      },
      {
        "Pakistan": {
          name: "Pakistan",
        }
      },
      {
        "Korea_Democratic_People's_Republic_of": {
          name: "Korea - Democratic People's Republic of",
        }
      },
      {
        "Russian_Federation": {
          name: "Russian Federation",
        }
      },
      {
        "Saudi_Arabia": {
          name: "Saudi Arabia",
        }
      },
      {
        "Thailand": {
          name: "Thailand",
        }
      },
      {
        "Taiwan": {
          name: "Taiwan",
        }
      },
      {
        "Uzbekistan": {
          name: "Uzbekistan",
        }
      },
      {
        "Viet_Nam": {
          name: "Viet Nam",
        }
      },
    ]
  },
  "WMO_3_South_America": {
    name: "South America",
    values: [
      {
        "Argentina": {
          name: "Argentina",
        }
      },
      {
        "Bolivia": {
          name: "Bolivia",
        }
      },
      {
        "Brazil": {
          name: "Brazil",
        }
      },
      {
        "Chile": {
          name: "Chile",
        }
      },
      {
        "Colombia": {
          name: "Colombia",
        }
      },
      {
        "Ecuador": {
          name: "Ecuador",
        }
      },
      {
        "Peru": {
          name: "Peru",
        }
      },
      {
        "Paraguay": {
          name: "Paraguay",
        }
      },
      {
        "Uruguay": {
          name: "Uruguay",
        }
      },
      {
        "Venezuela": {
          name: "Venezuela",
        }
      },
    ]
  },
  "WMO_4_North_And_Central_America": {
    name: "North and Central America",
    values: [
      {
        "United_States": {
          name: "United States",
        }
      },
      {
        "California_Climate_Zones": {
          name: "California Climate Zones",
        }
      },
      {
        "Canada": {
          name: "Canada",
        }
      },
      {
        "Belize": {
          name: "Belize",
        }
      },
      {
        "Cuba": {
          name: "Cuba",
        }
      },
      {
        "Guatemala": {
          name: "Guatemala",
        }
      },
      {
        "Honduras": {
          name: "Honduras",
        }
      },
      {
        "Mexico": {
          name: "Mexico",
        }
      },
      {
        "Martinique": {
          name: "Martinique",
        }
      },
      {
        "Nicaragua": {
          name: "Nicaragua",
        }
      },
      {
        "Puerto_Rico": {
          name: "Puerto Rico",
        }
      },
      {
        "El_Salvador": {
          name: "El Salvador",
        }
      },
      {
        "Virgin_Islands": {
          name: "Virgin Islands (U.S.)",
        }
      },
    ]
  },
  "WMO_5_Southwest_Pacific": {
    name: "Southwest Pacific",
    values: [
      {
        "Australia": {
          name: "Australia",
        }
      },
      {
        "Brunei_Darussalam": {
          name: "Brunei Darussalam",
        }
      },
      {
        "Fiji": {
          name: "Fiji",
        }
      },
      {
        "Guam": {
          name: "Guam",
        }
      },
      {
        "Marshall_Islands": {
          name: "Marshall Islands",
        }
      },
      {
        "Malaysia": {
          name: "Malaysia",
        }
      },
      {
        "New_Zealand": {
          name: "New Zealand",
        }
      },
      {
        "Philippines": {
          name: "Philippines",
        }
      },
      {
        "Palau": {
          name: "Palau",
        }
      },
      {
        "Singapore": {
          name: "Singapore",
        }
      },
      {
        "United_States_Minor_Outlying_Islands": {
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
        "Slovakia_Slovak_Republic": {
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
  var weatherDir = process.cwd()+'/../weather/'+continent+'/'+country;
  console.log('WEATHER DIR: ' + weatherDir);
  fs.readdir(weatherDir, function(err, files) {
    if (!err) {
      res.json(files);
    } else {
      console.log("Failed to get weather files for " + continent + ' ' + country + ': ' + err.message);
    }
  });
};
