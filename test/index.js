var tap = require('../')(__filename);

setTimeout(function() {
	tap.assert(false, 'First should fail.')
}, 100);

tap.assert.equal(true, false, 'Second should fail.');

tap.assert.equal(true, true, 'Third should pass.');

tap.assert.deepEqual(true, true, 'Fourth should pass.');


/* Should output something like:
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

1..4
# tests 4
# pass  2
# fail  2
*/
