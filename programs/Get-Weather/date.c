// Get-Weather - date.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include "date.h"

char is_leap_year (int year) {
   if (year % 4)
      return 0;
   if (year % 100)
      return 1;
   if (year % 400)
      return 0;
   return 1;
}   

int days_in_month (int year, int month) {
  static int table[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
   if (month == 2 && is_leap_year (year))
      return 29;
   return table[month - 1];
}

char is_date (struct date date) {
   if (date.year < 1 || date.month < 1 || date.month > 12)
      return 0;
   if (date.day < 1 || date.day > days_in_month (date.year, date.month))
      return 0;
   return 1;
}

int date_to_day (struct date date) {
   date.day --;
   while (date.month > 1) {
      date.month --;
      date.day += days_in_month (date.year, date.month);
   }
   while (date.year < 2000) {
      date.day -= 365;
      if (is_leap_year (date.year))
         date.day --;
      date.year ++;
   }
   while (date.year > 2000) {
      date.year --;
      date.day += 365;
      if (is_leap_year (date.year))
         date.day ++;
   }
   return date.day;
}

struct date day_to_date (int day) {
  struct date date;
  int temp;
   date.year = 2000;
   while (day < 0) {
      date.year --;
      day += 365;
      if (is_leap_year (date.year))
         day ++;
   }
   while (1) {
      temp = 365;
      if (is_leap_year (date.year))
         temp ++;
      if (day < temp)
         break;
      day -= temp;
      date.year ++;
   }
   date.month = 1;
   while (1) {
      temp = days_in_month (date.year, date.month);
      if (day < temp)
         break;
      day -= temp;
      date.month ++;
   }
   date.day = 1 + day;
   return date;
}