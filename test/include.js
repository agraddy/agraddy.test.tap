// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// MULTIPLE FILES SHOULD REQUIRE IN SERIES WHEN USING tap.include
// tap.include REQUIRES ONE FILE AT A TIME
//
// SHOULD OUTPUT SOMETHING LIKE THIS:
/*
TAP version 13
ONE START
ok 1 - One should pass.
ONE END
TWO START
ok 2 - Two should pass.
TWO END
THREE START
not ok 3 - Three should fail.
  ---
  operator: equal
  actual: three
  expected: THREE
  at: Object.<anonymous> (/var/www/projects/os/agraddy.test.tap/test/three.js:8:12)
  ...
THREE END

1..3
# tests 3
# pass  2
# fail  1
*/

var tap = require('../')(__filename);
tap.include('./one.js');
tap.include('./two.js');
tap.include('./three.js');

