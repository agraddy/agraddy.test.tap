# agraddy.test.tap

An easy to use testing library that outputs [TAP](https://testanything.org/). It does not require any special command line programs.

## Installation

```
npm install --save-dev agraddy.test.tap
```

## Why

A testing library that focuses on simplicity. I was running into issues with [tape](https://github.com/substack/tape) and [mocha](https://github.com/mochajs/mocha) was too complex for my needs. I wanted a testing library that I could call using node that didn't require any boilerplate code.

## Basic Example

First, create a file named `test1.js`:
```
// You have to pass in __filename to be able to run the test.
var tap = require('agraddy.test.tap')(__filename);

// Try a simple test.
tap.assert.equal('actual', 'expected', 'First test for equality should fail.');

tap.assert.equal('pass', 'pass', 'Second test for equality should pass.');

```

Now, run the file using node.
```
node test1.js
```

It should output:
```
TAP version 13
not ok 1 - First test for equality should fail.
  ---
  operator: equal
  actual: actual
  expected: expected
  at: Object.<anonymous> (test1.js:5:12)
  ...

1..2
# test 2
# pass 1
# fail 1
```

## Notes

* Each tap.assert call is considered a test. Each of the default [node assert methods](https://nodejs.org/api/assert.html) should be available. If you need one that is not implemented, just open an issue.
* If you comment out a tap.assert call, it will be ignored.

## Advanced Example

### Example 2
Create a file named `test2.js`:
```
// You have to pass in __filename to be able to run the test.
var tap = require('agraddy.test.tap')(__filename);

// Try a simple test.
tap.assert.equal('actual', 'expected', 'First test for equality should fail.');

// Works with async functions too
setTimeout(function() {
    tap.assert.equal('pass', 'pass', 'Second test for equality should pass.');
}, 1000);

// Commented out tests are ignored
// tap.assert(true, 'Not checked because it is commented out.');

/*
tap.assert(true, 'Not checked because it is commented out.');
*/

// Any typical assert function should work (if you find one that doesn't, just open an issue)
tap.assert.deepEqual({"deep": true}, {"deep": true}, 'Third test for equality should pass.');
```

Now, run the file using node.
```
node test2.js
```

It should output:
```
TAP version 13
not ok 1 - First test for equality should fail.
  ---
  operator: equal
  actual: actual
  expected: expected
  at: Object.<anonymous> (test2.js:5:12)
  ...
ok 2 - Second test for equality should pass.
ok 3 - Third test for equality should pass.

1..3
# test 3
# pass 2
# fail 1
```


## FAQ

Coming soon.

## License

MIT
