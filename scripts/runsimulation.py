import sys
import os
import json
import csv
import shutil
import subprocess

def createSimulationDirectory(simulationid):
  # TODO: This directory needs to be a full copy of the 'Facade' folder in the jEPlus repository
  directory = 'simulations/{0}'.format(simulationid)
  if not os.path.exists(directory):
      os.makedirs(directory)
  return os.path.abspath(directory)

def convertDataToCSV(jsondata):
  # This would take the json object passed in and convert it to CSV data.
  # The format of the data is as follows:
  '''
  {
    "jobID": "<string>",  <-- can be any text that identifies this case
    "weatherFile": 0,  <-- should always be 0
    "modelFile": 0,    <-- should always be 0
    "Terrain": "<string>",
    "orientation" : "<number>",
    "width": "<number>",
    "height": "<number>",
    "depth": "<number>",
    "OccupancyType": "<string>",
    "window" : "null or <number>",
    "CoolingSP" : "<number>",
    "HeatingSP" : "<number>"
    "insulationLevel" : "<number>",
    "infiltration-rate" : "<number>",
    "mvalue" : "<number>",
    "qvalue" : "<number>",
    "WindowType": "<string>",
    "WallType": "<string>",
    "fin" : "<number>",
    "overhang" : "<number>",
  }
  '''
 # "ventilationRate" : "<number>"


  # This is a kludge for now. It just writes out the parameters on 3 lines to test that we received them correctly
  # TODO: When it is implemented, it should be one line with values appearing in the same order as the parameters in the project.
  csvdata = []
  csvdata.append([jsondata["length"], jsondata["width"], jsondata["height"]])
  csvdata.append([jsondata["Window"]])
  csvdata.append([jsondata["insulationLevel"], jsondata["ventilationRate"]])
  return csvdata

def createJobListFile(directory, jsondata):
  outputfile = directory + '/joblist.csv'
  with open(outputfile, 'w', newline='') as csvfile:
      csvfile = csv.writer(csvfile, delimiter=',', quotechar='\'', quoting=csv.QUOTE_MINIMAL)
      csvfile.writerows(convertDataToCSV(jsondata))

def copySupportingFiles(simulationDirectory, jsondata):
  # TODO: check jsondata.weatherFile to determin which weather file to copy
  shutil.copyfile('../weather/test.epw', simulationDirectory + os.sep + 'in.epw')
  #TODO: I think in version 1 we will always use the same idf file but it will get it's data from the parameter file.
  #      We need to replace the one that is currently there with the correct one that takes a parameter file.
  # shutil.copyfile('../idf/Geometry.idf', simulationDirectory + os.sep + 'in.idf')  <-- No need to copy in.idf. The project folder contains the correct model file.

def executeSimulation(simulationDirectory, resultsDirectory):
  olddir = os.getcwd()
  os.chdir('../jess_client')
  # Call JESS client to run a single case defined in the joblist.csv file
  subprocess.call(['java', '-jar', '../jess_client/JESS_Client.jar',
    '-cfg', '../jess_client/client.cfg',
    '-log', '../jess_client/log4j.cfg',
    '-job', simulationDirectory,
    '-type', 'JEPLUS_PROJECT',
    '-subset', 'LIST_FILE',
    '-subset_param', 'joblist.csv',
    '-output', resultsDirectory])
  os.chdir(olddir)

def runSimulation(simulationid, jsondata):
  directory = createSimulationDirectory(simulationid)
  resultsDirectory = directory + os.sep + 'output'
  resultsFile = resultsDirectory + os.sep + 'eplustbl.csv'  # <-- pick a different result file to report, maybe AllCombinedResults.csv?

  createJobListFile(directory, jsondata)
  copySupportingFiles(directory, jsondata)
  executeSimulation(directory, resultsDirectory)

  # Send the directory that the simulation results are in and the file to stream back to the client to the caller.
  print(resultsDirectory)
  print(resultsFile)

runSimulation(sys.argv[1], json.JSONDecoder().decode(sys.argv[2]))
