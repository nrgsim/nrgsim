// Get-Weather - internet.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

// connects to the internet
// must be called before download
// returns 1 on success, 0 on error
// prints diagnostic message on error
char internet_connect (void);

// disconnects from the internet
void internet_disconnect (void);

// downloads a file from the internet
// returned string must be freed
// returns null on error
// prints diagnostic message on error
char * download (char * url);