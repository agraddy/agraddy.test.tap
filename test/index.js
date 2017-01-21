// SHOULD OUTPUT SOMETHING LIKE:
/*
TAP version 13
not ok 1 - First should fail.
  ---
  operator: assert
  value: false
  at: Timeout._onTimeout ([...]/agraddy.test.tap/test/index.js:4:6)
  ...
not ok 2 - Second should fail.
  ---
  operator: equal
  actual: true
  expected: false
  at: Object.<anonymous> ([...]/agraddy.test.tap/test/index.js:7:12)
  ...
ok 3 - Third should pass.
ok 4 - Fourth should pass.
ok 5 - Fifth should pass.

1..5
# tests 5
# pass  3
# fail  2
*/

var tap = require('../')(__filename);

setTimeout(function() {
	tap.assert(false, 'First should fail.')
}, 100);

tap.assert.equal(true, false, 'Second should fail.');

tap.assert.equal(true, true, 'Third should pass.');

tap.assert.deepEqual(true, true, 'Fourth should pass.');

tap.assert.notDeepEqual(true, false, 'Fifth should pass.');

// Do not include commentted out asserts
//tap.assert(true, 'Should be skipped because commentted out.');

/*
tap.assert(true, 'Should be skipped because commentted out.');
*/


