
import sys
import os
import json
import csv
import shutil
import subprocess

def createSimulationDirectory(simulationid):
  # YZ: This directory is created by making a full copy of the 'Facade' folder in the jEPlus repository
  directory = 'simulations/{0}'.format(simulationid)
  if os.path.exists(directory):
      shutil.rmtree (directory)
  shutil.copytree("../jEPlus/Box", directory)  # YZ: check if it should "../../jEPlus/Facade"
  return os.path.abspath(directory)

def convertDataToCSV(jsondata):
  # This would take the json object passed in and convert it to CSV data.
  # The format of the data is as follows:
  '''
  {
    "JobID": "<string>",  <-- can be any text that identifies this case
    "WeatherFile": 0,  <-- should always be 0
    "ModelFile": 0,    <-- should always be 0
    "Terrain": "<string>",
    "Orientation" : "<number>",
    "Width": "<number>",
    "Height": "<number>",
    "Depth": "<number>",
    "OccupancyType": "<string>",
    "Window" : "null or <number>",
    "CoolingSP" : "<number>",
    "HeatingSP" : "<number>"
    "InsulationLevel" : "<number>",
    "InfiltrationRate" : "<number>",
    "Mvalue" : "<number>",
    "Qvalue" : "<number>",
    "WindowType": "<string>",
    "WallType": "<string>",
    "FinLeft" : "<number>",
    "FinRight" : "<number>",
    "Overhang" : "<number>",
  }
  '''
 # "ventilationRate" : "<number>" jsondata["ventilationRate"]])


  # This is a kludge for now. It just writes out the parameters on 3 lines to test that we received them correctly
  # TODO: When it is implemented, it should be one line with values appearing in the same order as the parameters in the project.
  csvdata = [[ 'job1',  # jsondata["JobID"], 
              0, 
              0, 

#Row 0 BioPCM case 
#Geometry tab (P1,P2,P3,P4,P5,P6,P7,P8)
              jsondata["Height"],
              jsondata["Depth"],
              jsondata["Width"],
              jsondata["WinGR"],
              jsondata["Overhang"],
              jsondata["LFin"],
              jsondata["RFin"],
              jsondata["Orientation"],
#Facade tab (P9,P10,P11,P12,P13)
              jsondata["WallType"],
              jsondata["WindowType"],
              jsondata["InfiltrationRate"],
              jsondata["InsulationLevel"],
        "M" + jsondata["Mvalue"] + "Q"  + jsondata["Qvalue"],
#Activity tab (P14,P15,P16)
              jsondata["OccupancyType"],
              jsondata["CoolingSP"],
              jsondata["HeatingSP"],
#Site tab (P17)
              'City'
              # jsondata["Terrain"]
              ],

# Row 2 NoPCM This is a kludge for now used to add a noPCM run.
              ['job0',  # jsondata["JobID"], 
              0, 
              0,
#Geometry tab (P1,P2,P3,P4,P5,P6,P7,P8)
              jsondata["Height"],
              jsondata["Depth"],
              jsondata["Width"],
              jsondata["WinGR"],
              jsondata["Overhang"],
              jsondata["LFin"],
              jsondata["RFin"],
              jsondata["Orientation"],
#Facade tab (P9,P10,P11,P12,P13)
              jsondata["WallType"],
              jsondata["WindowType"],
              jsondata["InfiltrationRate"],
              jsondata["InsulationLevel"],
              #This is a kludge for now used to add a noPCM run.
                       "WallAirGap", 
#Activity tab (P14,P15,P16)
              jsondata["OccupancyType"],
              jsondata["CoolingSP"],
              jsondata["HeatingSP"],
#Site tab (P17)
              'City'
             # jsondata["Terrain"]
              ] 
            ]

  return csvdata

def createJobListFile(directory, jsondata):
  outputfile = directory + '/joblist.csv'
  with open(outputfile, 'w', newline='') as csvfile:
      csvfile = csv.writer(csvfile, delimiter=',', quotechar='\'', quoting=csv.QUOTE_MINIMAL)
      csvfile.writerows(convertDataToCSV(jsondata))

# Main purpose of this function is to copy the selected weather file to in.epw in the simulation folder
def copySupportingFiles(simulationDirectory, jsondata):
  # YZ: is the value in jsondata.weatherFile containing the full path to the weather file to copy?
  shutil.copyfile(jsondata['WeatherFile'], simulationDirectory + os.sep + 'in.epw')
  # YZ: no need to copy the geometry file unless it has been altered for this case.
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

# This is the main entry to execute simulation. Simulationid is used to name the working directory, and 
# jsondata should contain all parameter values for the cases
def runSimulation(simulationid, jsondata):
  # create simulation directory "simulations/[simulationid]" by copying from the template folder ("jEPlus/Facade/")
  directory = createSimulationDirectory(simulationid)
  resultsDirectory = directory + os.sep + 'output'
  resultsFile = resultsDirectory + os.sep + 'AllDerivedResults.csv'  

  # copy selected weather file to the simulation directory
  copySupportingFiles(directory, jsondata)
  # create job list file from jsondata
  createJobListFile(directory, jsondata)
  # run simulation
  executeSimulation(directory, resultsDirectory)

  # Send the directory that the simulation results are in and the file to stream back to the client to the caller.
  print(resultsDirectory)
  print(resultsFile)

runSimulation(sys.argv[1], json.JSONDecoder().decode(sys.argv[2]))
