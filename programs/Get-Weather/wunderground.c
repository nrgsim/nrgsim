// Get-Weather - wunderground.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "date.h"
#include "internet.h"
#include "parse.h"
#include "utils.h"
#include "weather.h"
#include "wunderground.h"

static char parse_temperature (char * string, double * value) {
   if (sscanf (string, "%lf", value) < 1 || * value < -50 || * value > 150) {
      fprintf (stderr, "Invalid temperature \"%s\".\n", string);
      return 0;
   }
   * value = (* value - 32) * 5 / 9;
   return 1;
}

static char parse_humidity (char * string, double * value) {
   if (sscanf (string, "%lf", value) < 1 || * value < 0 || * value > 100) {
      fprintf (stderr, "Invalid humidity \"%s\".\n", string);
      return 0;
   }
   * value /= 100;
   return 1;
}

static char parse_wind_dir (char * string, double * value) {
  static char * names [16] = {"North", "NNE", "NE", "ENE", "East", "ESE", "SE",
   "SSE", "South", "SSW", "SW", "WSW", "West", "WNW", "NW", "NNW"};
  int dir;
   if (! strcmp (string, "Calm")) {
      * value = 0;
      return 1;
   }
   for (dir = 0; dir < 16; dir ++) {
      if (! strcmp (string, names[dir])) {
         * value = 22.5 * dir;
         return 1;
      }
   }
   fprintf (stderr, "Invalid wind direction \"%s\".\n", string);
   return 0;
}

static char parse_wind_speed (char * string, double * value) {
   if (! strcmp (string, "Calm")) {
      * value = 0;
      return 1;
   }
   if (sscanf (string, "%lf", value) < 1 || * value < 0 || * value > 100) {
      fprintf (stderr, "Invalid wind speed \"%s\".\n", string);
      return 0;
   }
   * value *= 0.44704;
   return 1;
}

// converts wunderground.com "conditions" to cloud cover ratio, based on values
// from http://www.ofcm.gov/fmh-1/pdf/FMH1.pdf and some guesswork:
//    "Clear" = 0.0
//    "Haze" = 0.1
//    "Partly Cloudy" = 0.2
//    "Scattered Clouds" = 0.4
//    "Mostly Cloudy" = 0.7
//    "Overcast" = 1.0
//    any precipitation = 1.0
static char parse_cover (char * string, double * cover) {
   if (! strcmp (string, "Clear"))
      * cover = 0;
   else if (! strcmp (string, "Haze"))
      * cover = 0.1;
   else if (! strcmp (string, "Partly Cloudy"))
      * cover = 0.2;
   else if (! strcmp (string, "Scattered Clouds"))
      * cover = 0.4;
   else if (! strcmp (string, "Mostly Cloudy"))
      * cover = 0.7;
   else if (! strcmp (string, "Overcast") || ! strcmp (string, "Thunderstorm")
    || strstr (string, "Fog") || strstr (string, "Drizzle") || strstr (string,
    "Rain") || strstr (string, "Sleet") || strstr (string, "Snow") || strstr
    (string, "Hail") || strstr (string, "Ice Pellets"))
      * cover = 1;
   else {
      fprintf (stderr, "Unknown conditions \"%s\".\n", string);
      return 0;
   }
   return 1;
}

enum {WG_TIME, WG_TEMPERATURE, WG_DEWPOINT, WG_HUMIDITY, WG_PRESSURE,
 WG_VISIBILITY, WG_WIND_DIR, WG_WIND_SPEED, WG_GUST_SPEED, WG_RAINFALL,
 WG_EVENTS, WG_CONDITIONS, WG_FIELDS};

static char * wg_names[WG_FIELDS] = {0, "TemperatureF", "Dew PointF",
 "Humidity", "Sea Level PressureIn", "VisibilityMPH", "Wind Direction",
 "Wind SpeedMPH", "Gust SpeedMPH", "PrecipitationIn", "Events", "Conditions"};
static int sources[ITEMS] = {WG_TEMPERATURE, WG_DEWPOINT, WG_HUMIDITY,
 WG_WIND_SPEED, WG_WIND_DIR, WG_CONDITIONS};
static char (* parsers[ITEMS]) (char * string, double * value) =
 {parse_temperature, parse_temperature, parse_humidity, parse_wind_speed,
 parse_wind_dir, parse_cover};

static char check_header (char * line) {
  char * headings[WG_FIELDS];
  int field;
   if (get_fields (line, headings, WG_FIELDS) < WG_FIELDS) {
      fprintf (stderr, "Invalid wunderground.com header starting with "
       "\"%s\".\n", line);
      return 0;
   }
   for (field = 0; field < WG_FIELDS; field ++) {
      if (wg_names[field] && strcmp (headings[field], wg_names[field])) {
         fprintf (stderr, "Found heading \"%s\"; expected \"%s\".\n",
          headings[field], wg_names[field]);
         return 0;
      }
   }
   return 1;
}

int parse_hour (char * string) {
  int hour, minute;
  char ampm;
   if (sscanf (string, "%d:%d %cM", & hour, & minute, & ampm) < 3)
      goto ERROR;
   if (hour == 12)
      hour = 0;
   if (ampm == 'P') {
      hour += 12;
      ampm = 'A';
   }
   if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 && ampm == 'A')
      return hour;
  ERROR:
   fprintf (stderr, "Invalid time \"%s\".\n", string);
   return -1;
}

static void parse_line (char * line, struct weather * weather) {
  char * fields[WG_FIELDS];
  int hour, item;
  double value;
   if (get_fields (line, fields, WG_FIELDS) < WG_FIELDS) {
      fprintf (stderr, "Invalid wunderground.com data line starting with "
       "\"%s\".\n", line);
      return;
   }
   hour = parse_hour (fields[WG_TIME]);
   if (hour == -1)
      return;
   for (item = 0; item < ITEMS; item ++) {
      if (parsers[item] (fields[sources[item]], & value)) {
         weather[hour].valid[item] = 1;
         weather[hour].values[item] = value;
      }
   }
}

static void parse_data (char * data, struct weather * weather) {
  char found;
  char * next;
   found = 0;
   while (data && ! found) {
      next = delimit (data, '\n');
      delimit (data, '<');
      if (data[0]) {
         if (! check_header (data))
            return;
         found = 1;
      }
      data = next;
   }
   while (data) {
      next = delimit (data, '\n');
      delimit (data, '<');
      if (data[0])
         parse_line (data, weather);
      data = next;
   }
}

void get_weather_day (char * airport, int day, struct weather * weather) {
  int hour;
  struct date date;
  char * url, * data;
   for (hour = 0; hour < 24; hour ++)
      memset (weather[hour].valid, 0, sizeof weather[hour].valid);
   date = day_to_date (day);
   url = alloc_printf ("http://www.wunderground.com/history/airport/K%s/%d/%d/"
    "%d/DailyHistory.html?format=1", airport, date.year, date.month, date.day);
   data = download (url);
   free (url);
   if (! data)
      return;
   parse_data (data, weather);
   free (data);
}