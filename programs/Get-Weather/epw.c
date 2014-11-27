#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <windows.h>

#include "date.h"
#include "parse.h"
#include "utils.h"
#include "weather.h"

// work around broken .epw files
#define IGNORE_ERRORS
#define CRITICAL_FIELDS (EPW_OPAQUE_COVER + 1)

#define HEADINGS 8

enum {EPW_YEAR, EPW_MONTH, EPW_DAY, EPW_HOUR, EPW_MINUTE, EPW_UNCERTAINTY,
 EPW_TEMPERATURE, EPW_DEWPOINT, EPW_HUMIDITY, EPW_PRESSURE, EPW_EH_RADIATION,
 EPW_EDN_RADIATION, EPW_HI_RADIATION, EPW_GH_RADIATION, EPW_DN_RADIATION,
 EPW_DH_RADIATION, EPW_GH_ILLUMINANCE, EPW_DN_ILLUMINANCE, EPW_DH_ILLUMINANCE,
 EPW_Z_LUMINANCE, EPW_WIND_DIR, EPW_WIND_SPEED, EPW_TOTAL_COVER,
 EPW_OPAQUE_COVER, EPW_VISIBILITY, EPW_CEILING, EPW_WEATHER_FLAGS, EPW_WEATHER,
 EPW_PRECIPITABLE, EPW_AEROSOL, EPW_SNOW, EPW_LAST_SNOWFALL, EPW_ALBEDO,
 EPW_PRECIPITATION, EPW_PRECIPITATION_TIME, EPW_FIELDS};

static char * headings[HEADINGS] = {"LOCATION", "DESIGN CONDITIONS", "TYPICAL/"
 "EXTREME PERIODS", "GROUND TEMPERATURES", "HOLIDAYS/DAYLIGHT SAVING",
 "COMMENTS 1", "COMMENTS 2", "DATA PERIODS"};

// not finished yet
void merge_epw_data (char * file, int year, int start_day, int end_day, struct
 weather * weather) {
  char * data, * line, * next, * temp;
  int heading, fields_read, year2, month, month_day, day;
  char merging;
  char * fields[EPW_FIELDS];
#ifdef IGNORE_ERRORS
  char ignore;
   ignore = 0;
#endif
   data = load (file);
   if (! data)
      return;
   line = data;
   for (heading = 0; heading < HEADINGS; heading ++) {
      if (! line) {
         fprintf (stderr, "Reached end of file; expected heading \"%s\".\n",
          headings[heading]);
         goto FREE;
      }
      next = parse (line, '\n');
      temp = parse (line, ',');
      if (! temp) {
         fprintf (stderr, "Invalid heading line starting with \"%s\".\n", line);
         goto FREE;
      }
      if (strcmp (line, headings[heading])) {
         fprintf (stderr, "Found heading \"%s\"; expected \"%s\".\n", line,
          headings[heading]);
#ifdef IGNORE_ERRORS
         if (! ignore) {
            fprintf (stderr, "\n *** HIDING FURTHER ERRORS *** \n\n");
            ignore = 1;
         }
#else
         goto FREE;
#endif
      }
      printf ("%s,%s\n", headings[heading], temp);
      line = next;
   }
   merging = 1;
   while (line) {
      next = parse (line, '\n');
      fields_read = parse_fields (line, fields, EPW_FIELDS);
      if (fields_read != EPW_FIELDS) {
#ifdef IGNORE_ERRORS
         if (fields_read < CRITICAL_FIELDS)
            goto NEXT;
         else if (! ignore) {
            fprintf (stderr, "Found %d data fields; expected %d.\n",
             fields_read, EPW_FIELDS);
            fprintf (stderr, "\n *** HIDING FURTHER ERRORS *** \n\n");
            ignore = 1;
         }
#else
         fprintf (stderr, "Invalid data line starting with \"%s\".\n", line);
         goto NEXT;
#endif
      }
      if (! parse_integer (fields[EPW_YEAR], & year2, 1000, 3000) || !
       parse_integer (fields[EPW_MONTH], & month, 1, 12) || ! parse_integer
       (fields[EPW_DAY], & month_day, 1, days_in_month (year2, month))) {
         fprintf (stderr, "Invalid data line starting with \"%s\".\n", line);
         goto NEXT;
      }
      if (month == 2 && month_day == 29 && ! is_leap_year (year))
         month_day = 28;
      day = month_day_to_year_day (year, month, month_day);
      if (day < start_day || day > end_day) {
         if (merging) {
            fprintf (stderr, "Not changing from %d/%d onward.\n", month, month_day);
            merging = 0;
         }
         goto NEXT;
      } else {
         if (! merging) {
            fprintf (stderr, "Changing from %d/%d onward.\n", month, month_day);
            merging = 1;
         }
      }
      
     NEXT:
      line = next;
   }
  FREE:
   free (data);
   return;
}