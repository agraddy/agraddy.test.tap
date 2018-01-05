// SINCE THIS IS A TESTING LIBRARY THE TESTS ARE SETUP A LITTLE DIFFERENT THAN NORMAL
// OUTPUT SHOULD BE MANUALLY COMPARED TO EXPECTED OUTPUT THAT IS COMMENTED OUT AT 
// THE TOP OF EACH TEST FILE
//
// USED IN multiple.js
var tap = require('../')(__filename);

setTimeout(function() {
	tap.assert.equal('one', 'one', 'One should pass.');
}, 300);
