// Get-Weather - utils.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <assert.h>
#include <stdarg.h>
#include <stdio.h>
#include <stdlib.h>

#include "utils.h"

void * safe_realloc (void * mem, int size) {
   mem = realloc (mem, size);
   assert (! size || mem);
   return mem;
}

char * alloc_printf (char * format, ...) {
  va_list args;
  int size;
  char * buffer;
   va_start (args, format);
   size = vsnprintf (0, 0, format, args) + 1;
   assert (size > 0);
   buffer = safe_realloc (0, size);
   size -= vsnprintf (buffer, size, format, args) + 1;
   assert (size == 0);
   va_end (args);
   return buffer;
}