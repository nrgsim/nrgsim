// Get-Weather - weather.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "weather.h"

char * names[ITEMS] = {
   "temperature",
   "dewpoint",
   "humidity",
   "wind direction",
   "wind speed",
   "cloud cover"
};

char * long_names[ITEMS] = {
   "Temperature (C)",
   "Dewpoint (C)",
   "Relative humidity (0-1)",
   "Wind direction (degrees CW from N)",
   "Wind speed (meters per second)",
   "Cloud cover (0-1)"
};