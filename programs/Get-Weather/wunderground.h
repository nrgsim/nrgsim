// Get-Weather - wunderground.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

// downloads weather data for a given location and day (from January 1, 2000)
// fills in weather[0] to weather[23]
void get_weather_day (char * airport, int day, struct weather * weather);