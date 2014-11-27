// Get-Weather - date.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

struct date {
   int year, month, day;
};

// returns non-zero if <year> is a leap year
char is_leap_year (int year);

// returns the number of days in <year>/<month>
int days_in_month (int year, int month);

// returns non-zero if <date> is valid
char is_date (struct date date);

// converts <date> to number of days since 1/1/2000
int date_to_day (struct date date);

// converts <day> (number of days since 1/1/2000) to date
struct date day_to_date (int day);