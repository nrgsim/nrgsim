import sys
import os
import json
import csv

def convertDataToCSV(jsonData):
  # This would take the json object passed in and convert it to CSV data.
  # The format of the data is specified in public/transport.json
  csvdata = []
  print(jsondata["zone"][0]["vertices"][0]["x"])
  print({"test": [1,2,3]})
  csvdata.append([jsondata["zone"][0]["vertices"][0]["x"], jsondata["zone"][0]["vertices"][0]["y"], jsondata["zone"][0]["vertices"][0]["z"]])
  return csvdata


print(sys.argv[1])
#print(sys.argv[2])

simulationid = sys.argv[1]
jsondata = json.JSONDecoder().decode(sys.argv[2])

directory = 'simulations/{0}'.format(simulationid)
outputfile = directory + '/parameters.csv'

if not os.path.exists(directory):
    os.makedirs(directory)

with open(outputfile, 'w', newline='') as csvfile:
    csvfile = csv.writer(csvfile, delimiter=',', quotechar='\'', quoting=csv.QUOTE_MINIMAL)
    csvfile.writerows(convertDataToCSV(jsondata))
