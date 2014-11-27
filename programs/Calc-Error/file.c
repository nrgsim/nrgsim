// Calc-Error - file.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <stdio.h>
#include <stdlib.h>

#include "file.h"
#include "utils.h"

char * load_file (char * file) {
  FILE * handle;
  int size, loaded;
  char * buffer;
   handle = fopen (file, "rb");
   if (! handle)
      return 0;
   size = 1024;
   buffer = safe_realloc (0, size);
   loaded = 0;
   while (1) {
      loaded += fread (buffer + loaded, 1, size - loaded, handle);
      if (ferror (handle)) {
         free (buffer);
         fclose (handle);
         return 0;
      }
      if (feof (handle))
         break;
      if (loaded > size / 2) {
         size = loaded * 2;
         buffer = safe_realloc (buffer, size);
      }
   }
   fclose (handle);
   buffer = safe_realloc (buffer, loaded + 1);
   buffer[loaded] = 0;
   return buffer;
}