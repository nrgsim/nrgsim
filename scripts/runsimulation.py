import sys
import os
import json
import csv

def createSimulationDirectory(simulationid):
  directory = 'simulations/{0}'.format(simulationid)
  if not os.path.exists(directory):
      os.makedirs(directory)
  return directory

def convertDataToCSV(jsondata):
  # This would take the json object passed in and convert it to CSV data.
  # The format of the data is specified in public/transport.json
  csvdata = []
  csvdata.append([jsondata["zone"][0]["vertices"][0]["x"], jsondata["zone"][0]["vertices"][0]["y"], jsondata["zone"][0]["vertices"][0]["z"]])
  return csvdata

def createParametersFile(directory, jsondata):
  outputfile = directory + '/parameters.csv'
  with open(outputfile, 'w', newline='') as csvfile:
      csvfile = csv.writer(csvfile, delimiter=',', quotechar='\'', quoting=csv.QUOTE_MINIMAL)
      csvfile.writerows(convertDataToCSV(jsondata))

def runSimulation(simulationid, jsondata):
  directory = createSimulationDirectory(simulationid)
  createParametersFile(directory, jsondata)

  # TODO: copy a weather file and idf file to the directory and run the simulation
  results = [{ 'result': 'fake result'}]
  strResults = str(results).replace("'", '"')
  print(strResults)

runSimulation(sys.argv[1], json.JSONDecoder().decode(sys.argv[2]))
