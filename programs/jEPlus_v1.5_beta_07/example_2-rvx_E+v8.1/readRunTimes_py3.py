# Example python script: This script reads from RunTimes.csv, calculates CPU time used in 
# seconds, and then write to different table specified by the user.
# Arguments:
#   sys.argv[1]  -  output folder of the project where the RunTimes.csv is located
#   sys.argv[2]  -  the list of jobs have been executed in the project
#   sys.argv[3]  -  user-defined output table name + .csv
#   sys.argv[4..] - Other arguments specified in the RVX file
# This version is for running with Python3

import sys
import csv
import math

ifile  = open(sys.argv[1] + "RunTimes.csv", "rt")
reader = csv.reader(ifile)
ofile = open(sys.argv[1] + sys.argv[3], "w", newline='')
writer = csv.writer(ofile)

rownum = 0
timelist = []
for row in reader:
    # Save header row.
    if rownum == 0:
        header = row[0:3]
        header.append("CpuTime[s]")
        writer.writerow(header)
    else:
        time = [float(t) for t in row[5:]]
        seconds = time[0]*3600+time[1]*60+time[2]
        timelist.append(seconds)
        temprow = row[0:3]
        temprow.append(seconds)
        writer.writerow(temprow)
    rownum += 1

ifile.close()
ofile.close()

n = len(timelist)
mean = sum(timelist) / n
sd = math.sqrt(sum((x-mean)**2 for x in timelist) / n)

print ('{0:10d} jobs done, mean simulation time = {1:.2f}s, stdev = {2:.2f}s'.format(n, mean, sd))