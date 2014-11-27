// Get-Weather - utils.h
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

// same as realloc, but exits on failure
void * safe_realloc (void * mem, int size);

// same as sprintf, but allocates a string large enough
// returned string must be freed
char * alloc_printf (char * format, ...);