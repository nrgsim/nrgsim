// Get-Weather - parse.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

// replaces the first occurence of <c> in <string> with a null character
// returns the address of the character after <c>
// returns null if <c> is not found
char * delimit (char * string, char c);

// removes leading and trailing whitespace from <string>
// replaces whitespace between words with a single space character
void trim (char * string);

// reads the first <number> comma-delimited fields of <string>
// separates fields by replacing commas with null characters
// removes leading and trailing whitespace from each field
// replaces whitespace between words with a single space character
// fills in <fields> with the address of each field
// returns the number of fields actually read
int get_fields (char * string, char * * fields, int number);