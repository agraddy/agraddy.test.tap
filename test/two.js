// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// USED IN multiple.js
var tap = require('../')(__filename);

console.log('TWO START');
tap.assert.equal('two', 'two', 'Two should pass.');
console.log('TWO END');
