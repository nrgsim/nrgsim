// Get-Weather - parse.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <string.h>

#include "parse.h"

char * delimit (char * string, char c) {
  char * found;
   found = strchr (string, c);
   if (! found)
      return 0;
   * found = 0;
   return found + 1;
}

void trim (char * string) {
  char c, white;
  char * set;
   set = string;
   while (* string && strchr (" \t\r\n", * string))
      string ++;
   white = 0;
   while (* string) {
      c = * string ++;
      if (strchr (" \t\r\n", c))
         white = 1;
      else {
         if (white) {
            * set ++ = ' ';
            white = 0;
         }
         * set ++ = c;
      }
   }
   * set = 0;
}

int get_fields (char * string, char * * fields, int number) {
  int count;
  char * next;
   for (count = 0; string && count < number; count ++) {
      next = delimit (string, ',');
      trim (string);
      fields[count] = string;
      string = next;
   }
   if (count == 1 && ! fields[0][0])
      return 0;
   return count;
}