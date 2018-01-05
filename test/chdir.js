// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// RUN THIS FILE FROM TOP DIRECTORY:
// node test/chdir.js 
//
// SHOULD CHANGE THE CURRENT DIRECTORY TO THE DIRECTORY OF THE PASSED IN __filename
var tap = require('../')(__filename);
var path = require('path');

tap.assert.equal(process.cwd(), path.dirname(__filename), 'Should change directory to current directory of passed in file');
