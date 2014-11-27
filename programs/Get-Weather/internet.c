// Get-Weather - internet.c
// Written by John Lindgren <john.lindgren@tds.net>, June 17, 2009
// Copyright 2009 The Building Performance Team
// All rights reserved

#include <stdio.h>
#include <stdlib.h>
#include <wchar.h>
#include "file.h"
#include <windows.h>
#include <wininet.h>

#include "internet.h"
#include "utils.h"

static HINTERNET session;

static wchar_t * to_utf16 (char * string) {
  wchar_t * buffer;
  int length;
   length = MultiByteToWideChar (CP_UTF8, 0, string, -1, 0, 0);
   buffer = safe_realloc (0, sizeof buffer[0] * length);
   MultiByteToWideChar (CP_UTF8, 0, string, -1, buffer, length);
   return buffer;
}

char internet_connect (void) {
  wchar_t * converted;
   fprintf (stderr, "Connecting to the internet ... ");
   fflush (stderr);
   converted = to_utf16 ("");
   session = InternetOpen (converted, INTERNET_OPEN_TYPE_DIRECT, 0, 0, 0);
   free (converted);
   if (! session) {
      fprintf (stderr, "error %d.\n", (int) GetLastError ());
      return 0;
   }
   fprintf (stderr, "done.\n");
   return 1;
}

void internet_disconnect (void) {
   InternetCloseHandle (session);
}

char * download (char * url) {
  wchar_t * converted;
  HINTERNET handle;
  char * buffer;
  int size, downloaded, readed, error;
   fprintf (stderr, "Downloading %s ... ", url);
   fflush (stderr);
   converted = to_utf16 (url);
   handle = InternetOpenUrl (session, converted, 0, 0, INTERNET_FLAG_RELOAD |
    INTERNET_FLAG_NO_CACHE_WRITE, 0);
   free (converted);
   if (! handle) {
      fprintf (stderr, "error %d.\n", (int) GetLastError ());
      return 0;
   }
   size = 1024;
   buffer = safe_realloc (0, size);
   downloaded = 0;
   while (1) {
      while (! InternetReadFile (handle, buffer + downloaded, size - downloaded,
       & readed)) {
         error = GetLastError ();
         if (error != ERROR_INSUFFICIENT_BUFFER) {
            fprintf (stderr, "error %d.\n", error);
            InternetCloseHandle (handle);
            InternetCloseHandle (session);
            free (buffer);
            return 0;
         }
         size *= 2;
         buffer = safe_realloc (buffer, size);
      }
      if (! readed)
         break;
      downloaded += readed;
      if (downloaded > size / 2) {
         size *= 2;
         buffer = safe_realloc (buffer, size);
      }
   }
   fprintf (stderr, "%d bytes.\n", downloaded);
   InternetCloseHandle (handle);
   buffer = safe_realloc (buffer, downloaded + 1);
   buffer[downloaded] = 0;
   return buffer;
}