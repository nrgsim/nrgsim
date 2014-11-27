// Get-Weather - weather.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

enum {TEMPERATURE, DEWPOINT, HUMIDITY, WIND_SPEED, WIND_DIR, COVER, ITEMS};

struct weather {
   char valid[ITEMS];
   double values[ITEMS];
};

extern char * names[ITEMS], * long_names[ITEMS];