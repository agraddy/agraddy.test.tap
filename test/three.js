// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// USED IN multiple.js
var tap = require('../')(__filename);

console.log('THREE START');
tap.assert.equal('three', 'THREE', 'Three should fail.');
console.log('THREE END');
