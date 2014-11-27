GFORTRAN module version '10' created from .\HeatBalanceConvectionCoeffs.f90
MD5:e21d067dd26622d5294432f0be1d7bfc -- If you edit this, you'll get what you deserve.

(() () () () () () () () () () () () () () () () () () () () () () ()
() () () ())

()

()

()

()

()

(2 'calcashraesimpextconvectcoeff' 'convectioncoefficients' '' 1 ((
PROCEDURE UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 FUNCTION
IMPLICIT_PURE) (REAL 8 0 0 0 REAL ()) 3 0 (4 5) () 2 () () () 0 0)
6 'calcdetailedhcinfordvmodel' 'convectioncoefficients' '' 1 ((
PROCEDURE UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 SUBROUTINE
ALWAYS_EXPLICIT) (UNKNOWN 0 0 0 0 UNKNOWN ()) 7 0 (8 9 10 11) () 0 () ()
() 0 0)
12 'calciso15099windowintconvcoeff' 'convectioncoefficients' '' 1 ((
PROCEDURE UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 SUBROUTINE) (
UNKNOWN 0 0 0 0 UNKNOWN ()) 13 0 (14 15 16) () 0 () () () 0 0)
17 'initexteriorconvectioncoeff' 'convectioncoefficients' '' 1 ((
PROCEDURE UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 SUBROUTINE) (
UNKNOWN 0 0 0 0 UNKNOWN ()) 18 0 (19 20 21 22 23 24 25 26 27) () 0 () ()
() 0 0)
28 'initinteriorconvectioncoeffs' 'convectioncoefficients' '' 1 ((
PROCEDURE UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 SUBROUTINE
ALWAYS_EXPLICIT) (UNKNOWN 0 0 0 0 UNKNOWN ()) 29 0 (30 31) () 0 () () ()
0 0)
32 'setextconvectioncoeff' 'convectioncoefficients' '' 1 ((PROCEDURE
UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 FUNCTION) (REAL 8 0 0 0 REAL
()) 33 0 (34) () 32 () () () 0 0)
35 'setintconvectioncoeff' 'convectioncoefficients' '' 1 ((PROCEDURE
UNKNOWN-INTENT MODULE-PROC DECL UNKNOWN 0 0 FUNCTION) (REAL 8 0 0 0 REAL
()) 36 0 (37) () 35 () () () 0 0)
4 'roughness' '' '' 3 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
5 'surfwindspeed' '' '' 3 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
8 'surfnum' '' '' 7 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0 DUMMY)
(INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
9 'surfacetemperatures' '' '' 7 ((VARIABLE IN UNKNOWN-PROC UNKNOWN
UNKNOWN 0 0 DIMENSION DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () (1 0
ASSUMED_SHAPE (CONSTANT (INTEGER 4 0 0 0 INTEGER ()) 0 '1') ()) 0 () ()
() 0 0)
10 'hcin' '' '' 7 ((VARIABLE INOUT UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DIMENSION DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () (1 0 ASSUMED_SHAPE (
CONSTANT (INTEGER 4 0 0 0 INTEGER ()) 0 '1') ()) 0 () () () 0 0)
11 'vhc' '' '' 7 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DIMENSION OPTIONAL DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () (1 0
ASSUMED_SHAPE (CONSTANT (INTEGER 4 0 0 0 INTEGER ()) 0 '1') ()) 0 () ()
() 0 0)
14 'surfnum' '' '' 13 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
15 'surfacetemperature' '' '' 13 ((VARIABLE IN UNKNOWN-PROC UNKNOWN
UNKNOWN 0 0 DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
16 'airtemperature' '' '' 13 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN
0 0 DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
19 'surfnum' '' '' 18 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
20 'hmovinsul' '' '' 18 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
21 'roughness' '' '' 18 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
22 'absext' '' '' 18 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
23 'tempext' '' '' 18 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
24 'hext' '' '' 18 ((VARIABLE OUT UNKNOWN-PROC UNKNOWN UNKNOWN 0 0 DUMMY)
(REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
25 'hsky' '' '' 18 ((VARIABLE OUT UNKNOWN-PROC UNKNOWN UNKNOWN 0 0 DUMMY)
(REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
26 'hground' '' '' 18 ((VARIABLE OUT UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
27 'hair' '' '' 18 ((VARIABLE OUT UNKNOWN-PROC UNKNOWN UNKNOWN 0 0 DUMMY)
(REAL 8 0 0 0 REAL ()) 0 0 () () 0 () () () 0 0)
30 'surfacetemperatures' '' '' 29 ((VARIABLE IN UNKNOWN-PROC UNKNOWN
UNKNOWN 0 0 DIMENSION DUMMY) (REAL 8 0 0 0 REAL ()) 0 0 () (1 0
ASSUMED_SHAPE (CONSTANT (INTEGER 4 0 0 0 INTEGER ()) 0 '1') ()) 0 () ()
() 0 0)
31 'zonetoresimulate' '' '' 29 ((VARIABLE IN UNKNOWN-PROC UNKNOWN
UNKNOWN 0 0 OPTIONAL DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 ()
() () 0 0)
34 'surfnum' '' '' 33 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
37 'surfnum' '' '' 36 ((VARIABLE IN UNKNOWN-PROC UNKNOWN UNKNOWN 0 0
DUMMY) (INTEGER 4 0 0 0 INTEGER ()) 0 0 () () 0 () () () 0 0)
)

('calcashraesimpextconvectcoeff' 0 2 'calcdetailedhcinfordvmodel' 0 6
'calciso15099windowintconvcoeff' 0 12 'initexteriorconvectioncoeff' 0 17
'initinteriorconvectioncoeffs' 0 28 'setextconvectioncoeff' 0 32
'setintconvectioncoeff' 0 35)
