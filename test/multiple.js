// CONSIDERING DEPRECATING tap.start() AND tap.end() FOR tap.include()
// ALTHOUGH tap.start() AND tap.end() are used in tap.include()
//
// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// MULTIPLE FILES SHOULD OUTPUT SOMETHING LIKE:
/*
TAP version 13
ONE START
TWO START
TWO END
THREE START
THREE END
ok 1 - One should pass.
ok 2 - Two should pass.
not ok 3 - Three should fail.
  ---
  operator: equal
  actual: three
  expected: THREE
  at: Object.<anonymous> (/var/www/projects/os/agraddy.test.tap/test/three.js:8:12)
  ...

1..3
# tests 3
# pass  2
# fail  1
ONE END
*/

var tap = require('../')(__filename);
tap.start();
require('./one.js');
require('./two.js');
require('./three.js');
tap.end();
