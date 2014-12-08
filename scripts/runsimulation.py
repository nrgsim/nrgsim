import sys
import os
import json
import csv
import shutil
import subprocess

def createSimulationDirectory(simulationid):
  directory = 'simulations/{0}'.format(simulationid)
  if not os.path.exists(directory):
      os.makedirs(directory)
  return os.path.abspath(directory)

def convertDataToCSV(jsondata):
  # This would take the json object passed in and convert it to CSV data.
  # The format of the data is as follows:
  '''
  {
    "weatherFile": "<string>",
    "length": "<number>",
    "width": "<number>",
    "height": "<number>",
    "northWindow" : "null or <number>",
    "eastWindow" : "null or <number>",
    "southWindow" : "null or <number>",
    "westWindow" : "null or <number>",
    "insulationLevel" : "<number>",
    "ventilationRate" : "<number>"
  }
  '''

  # This is a kludge for now. It just writes out the parameters on 3 lines to test that we received them correctly
  csvdata = []
  csvdata.append([jsondata["length"], jsondata["width"], jsondata["height"]])
  csvdata.append([jsondata["Window"]])
  csvdata.append([jsondata["insulationLevel"], jsondata["ventilationRate"]])
  return csvdata

def createParametersFile(directory, jsondata):
  outputfile = directory + '/parameters.csv'
  with open(outputfile, 'w', newline='') as csvfile:
      csvfile = csv.writer(csvfile, delimiter=',', quotechar='\'', quoting=csv.QUOTE_MINIMAL)
      csvfile.writerows(convertDataToCSV(jsondata))

def copySupportingFiles(simulationDirectory, jsondata):
  # TODO: check jsondata.weatherFile to determin which weather file to copy
  shutil.copyfile('../weather/test.epw', simulationDirectory + os.sep + 'in.epw')
  #TODO: I think in version 1 we will always use the same idf file but it will get it's data from the parameter file.
  #      We need to replace the one that is currently there with the correct one that takes a parameter file.
  shutil.copyfile('../idf/Geometry.idf', simulationDirectory + os.sep + 'in.idf')

def executeSimulation(simulationDirectory, resultsDirectory):
  olddir = os.getcwd()
  os.chdir('../jess_client')
  subprocess.call(['java', '-jar', '../jess_client/JESS_Client.jar',
    '-cfg', '../jess_client/client.cfg',
    '-job', simulationDirectory,
    '-type', 'STD_SINGLE_JOB',
    '-output', resultsDirectory])
  os.chdir(olddir)

def runSimulation(simulationid, jsondata):
  directory = createSimulationDirectory(simulationid)
  resultsDirectory = directory + os.sep + 'output'
  resultsFile = resultsDirectory + os.sep + 'eplustbl.csv'

  createParametersFile(directory, jsondata)
  copySupportingFiles(directory, jsondata)
  executeSimulation(directory, resultsDirectory)

  # Send the directory that the simulation results are in and the file to stream back to the client to the caller.
  print(resultsDirectory)
  print(resultsFile)

runSimulation(sys.argv[1], json.JSONDecoder().decode(sys.argv[2]))
