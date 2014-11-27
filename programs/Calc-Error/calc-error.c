// Calc-Error - calc-error.c
// Written by John Lindgren <john.lindgren@tds.net>, July 10, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "date.h"
#include "file.h"
#include "parse.h"
#include "utils.h"

#define MAX_ITEMS 10
#define METER_UNIT JOULES
#define METER_SUFFIX ":Facility [J](Hourly)"

struct meter_hour {
   char valid;
   double values[MAX_ITEMS];
};

enum {JOULES, KWH, THERMS, UNITS};

static char * unit_names[UNITS] = {"Joules", "KWH", "Therms"};
static double unit_ratios[UNITS] = {1.0, 3600000.0, 105505600.0};

static char * error_context;

static int n_items;
static char * item_names[MAX_ITEMS];
static struct meter_hour meter[24 * 366];

static void error (char * message) {
   fprintf (stderr, "Error %s: %s.\n", error_context, message);
   exit (1);
}

static void assert_fields (int found, int expected) {
   if (found != expected)
      error (alloc_printf ("expected %d fields but found %d", expected, found));
}

static void assert_heading (char * found, char * expected) {
   if (strcmp (found, expected))
      error (alloc_printf ("expected heading \"%s\" but found \"%s\"", expected,
       found));
}

static double assert_value (char * string) {
  double value;
   if (sscanf (string, "%lf", & value) < 1)
      error (alloc_printf ("invalid decimal value \"%s\"", string));
   return value;
}

static struct date assert_date (char * string) {
  struct date date;
   if (sscanf (string, "%d/%d/%d", & date.month, & date.day, & date.year) < 3 ||
    ! is_date (date))
      error (alloc_printf ("invalid date \"%s\"", string));
   return date;
}

static int assert_unit (char * string) {
  int unit;
   for (unit = 0; unit < UNITS; unit ++) {
      if (! strcmp (string, unit_names[unit]))
         return unit;
   }
   error (alloc_printf ("invalid unit \"%s\"", string));
   return 0; // never reached
}

static double convert_units (double value, int old, int new) {
   return value * unit_ratios[old] / unit_ratios[new];
}

static char * get_meter_name (char * heading) {
  int offset = strlen (heading) - strlen (METER_SUFFIX);
   if (offset < 1 || strcmp (heading + offset, METER_SUFFIX))
      return NULL;
   heading[offset] = 0;
   return heading;
}

static char meter_read_header (char * header) {
  char * fields[1 + MAX_ITEMS];
  int n_fields = get_fields (header, fields, 1 + MAX_ITEMS);
   if (n_fields == 0)
      return 0;
   assert_heading (fields[0], "Date/Time");
   for (n_items = 0; n_items < n_fields - 1; n_items ++) {
     char * name = get_meter_name (fields[1 + n_items]);
      if (name == NULL)
         break;
      item_names[n_items] = strdup (name);
   }
   return 1;
}

static void meter_clear (void) {
  int index;
   for (index = 0; index < 24 * 366; index ++)
      meter[index].valid = 0;
}

static void meter_read_line (char * line) {
  char * fields[1 + MAX_ITEMS];
  int n_fields, hour, index, item;
  struct date date;
   n_fields = get_fields (line, fields, 1 + n_items);
   if (n_fields == 0)
      return;
   assert_fields (n_fields, 1 + n_items);
   date.year = 2000;
   if (sscanf (fields[0], "%d/%d %d", & date.month, & date.day, & hour) < 3 || !
    is_date (date) || hour < 1 || hour > 24)
      error (alloc_printf ("invalid date and time \"%s\"", fields[0]));
   index = 24 * date_to_day (date) + hour - 1;
   meter[index].valid = 1;
   for (item = 0; item < n_items; item ++)
      meter[index].values[item] = assert_value (fields[1 + item]);
}

static void meter_fill_leap_day (void) {
   if (! meter[24 * 59].valid)
      memcpy (meter + 24 * 59, meter + 24 * 58, sizeof meter[0] * 24);
}

static void meter_check_complete (void) {
  int index;
   for (index = 0; index < 24 * 366; index ++) {
      if (! meter[index].valid)
         error ("missing data");
   }
}

static void load_meter (char * project) {
  char * file, * data, * parse, * line;
   file = alloc_printf ("%sMeter.csv", project);
   error_context = alloc_printf ("loading \"%s\"", file);
   data = load_file (file);
   if (data == NULL)
      error ("read error");
   parse = data;
   do {
      if (parse == NULL)
         error ("missing header");
      line = parse;
      parse = delimit (line, '\n');
   } while (! meter_read_header (line));
   meter_clear ();
   while (parse) {
      line = parse;
      parse = delimit (line, '\n');
      meter_read_line (line);
   }
   meter_fill_leap_day ();
   meter_check_complete ();
   free (data);
   free (error_context);
   free (file);
}

static char bill_read_header (char * header, int * unit) {
  char * fields[3];
  int n_fields = get_fields (header, fields, 3);
   if (n_fields == 0)
      return 0;
   assert_fields (n_fields, 3);
   assert_heading (fields[0], "Start date");
   assert_heading (fields[1], "End date");
   * unit = assert_unit (fields[2]);
   return 1;
}

static char bill_read_line (char * line, struct date * start, struct date * end,
 double * value) {
  char * fields[3];
  int n_fields = get_fields (line, fields, 3);
   if (n_fields == 0)
      return 0;
   assert_fields (n_fields, 3);
   * start = assert_date (fields[0]);
   * end = assert_date (fields[1]);
   * value = assert_value (fields[2]);
   return 1;
}

static double bill_predict (int item, int unit, struct date start, struct date
 end) {
  int start_day = date_to_day (start);
  int end_day = date_to_day (end);
  double sum = 0.0;
  int day;
   if (end_day < start_day)
      error (alloc_printf ("period end %d/%d/%d is earlier than period start %d"
       "/%d/%d", end.month, end.day, end.year, start.month, start.day,
       start.year));
   for (day = start_day; day <= end_day; day ++) {
     struct date new_date = day_to_date (day);
     int index, hour;
      new_date.year = 2000;
      index = date_to_day (new_date);
      for (hour = 0; hour < 24; hour ++)
         sum += meter[24 * index + hour].values[item];
   }
   return convert_units (sum, METER_UNIT, unit);
}

static void compare_bill (char * project, int item) {
  char * file = alloc_printf ("%s bills.csv", item_names[item]);
  char * data = load_file (file);
  char * parse = data;
  char * line;
  int unit;
  double total;
   error_context = alloc_printf ("loading \"%s\"", file);
   if (parse == NULL)
      error ("read error");
   do {
      if (parse == NULL)
         error ("missing header");
      line = parse;
      parse = delimit (line, '\n');
   } while (! bill_read_header (line, & unit));
   printf ("Start date,End date,%s predicted (%s),%s actual (%s), %s error "
    "(%s)\n", item_names[item], unit_names[unit], item_names[item],
    unit_names[unit], item_names[item], unit_names[unit]);
   total = 0;
   while (parse) {
     struct date start, end;
     double actual, predicted;
      line = parse;
      parse = delimit (line, '\n');
      if (! bill_read_line (line, & start, & end, & actual))
         continue;
      predicted = bill_predict (item, unit, start, end);
      printf ("%d/%d/%d,%d/%d/%d,%.2lf,%.2lf,%.2lf\n", start.month, start.day,
       start.year, end.month, end.day, end.year, predicted, actual, actual -
       predicted);
      total += (actual > predicted) ? actual - predicted : predicted - actual;
   }
   printf ("\n%s total error (%s),%.2lf\n\n", item_names[item],
    unit_names[unit], total);
   free (error_context);
   free (data);
   free (file);
}

int main (int n_args, char * * args) {
  int item;
   if (n_args != 2) {
      fprintf (stderr, "Usage: calc-error PROJECT-NAME\n");
      return 1;
   }
   load_meter (args[1]);
   for (item = 0; item < n_items; item ++)
      compare_bill (args[1], item);
   return 0;
}