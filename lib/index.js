// TODO: Get a list of asserts
// TODO: Make assert an emitter

var assert = require('assert');
var fs = require('fs');

var asserts = [];
var fail = 0;
var index = 0;
var outputted = [];
var pass = 0;

function info(fn) {
	var data = {};
	var original = Error.prepareStackTrace;
	var holder = {};
	Error.prepareStackTrace = function(holder, stack) {
		return stack;
	};
	Error.captureStackTrace(holder, fn);

	// https://github.com/v8/v8/wiki/Stack-Trace-API
	data.line_number = holder.stack[0].getLineNumber();

	Error.prepareStackTrace = original;

	return data;
}

function main(input) {
	// Eventually use a preprocessor for more robust parsing
	var lines = fs.readFileSync(input).toString().split(/\r?\n/);
	var comment_started = false;
	lines.forEach(function(item, line_number) {
		if(item.indexOf('.assert') !== -1) {
			if(item.trim().slice(0, 2) == '//') {
				// Skip commentted out
			} else {
				if(!comment_started) {
					//asserts[line_number + 1] = false;
					asserts.push(line_number + 1);
					outputted.push(line_number + 1);
				}
			}
		} else if(item.indexOf('/*') !== -1) {
			  comment_started = true;
		} else if(item.indexOf('*/') !== -1) {
			  comment_started = false;
		}

	});
	//console.log(asserts);
	// Map asserts
	console.log('TAP version 13');
}

function output(input, line) {
	var i;
	input = input.replace('?', asserts.indexOf(line) + 1);
	outputted[outputted.indexOf(line)] = input;

	for(i = 0; i < outputted.length; i++) {
		if(typeof outputted[i] === 'number') {
			// if it's a number it hasn't been processed so stop the loop
			break;
		} else if(typeof outputted[i] === 'string') {
			// if it's a string it has been processed but not passed to stdout
			console.log(outputted[i]);
			outputted[i] = true;
			index++;
		}
	}

	if(asserts.length == index) {
		console.log('');
		console.log('1..' + asserts.length);
		console.log('# test ' + asserts.length);
		console.log('# pass ' + pass);
		console.log('# fail ' + fail);
	}
}

var mod = {};

mod.assert = function(value, message) {
	var data = info(mod.assert);
	var msg = '';
	var operator = 'assert';

	try {
		assert(value, message);

		pass++;
		msg = 'ok ' + '?' + ' - ' + message;
		output(msg, data.line_number);
	} catch(e) {
		fail++;
		msg = 'not ok ' + '?' + ' - ' + message;
		msg += '\n  ';
		msg += '---';
		msg += '\n  ';
		msg += 'operator: ' + operator;
		msg += '\n  ';
		msg += 'value: ' + value;
		msg += '\n  ';
		// at: is the 3rd line - strip of the beging "at "
		msg += 'at: ' + e.stack.split(/\r?\n/)[2].trim().slice(3);
		msg += '\n  ';
		msg += '...';
		output(msg, data.line_number);
	}
};

mod.assert.equal = function(actual, expected, message) {
	var data = info(mod.assert.equal);
	var msg = '';
	var operator = 'equal';

	try {
		assert.equal(actual, expected, message);

		pass++;
		msg = 'ok ' + '?' + ' - ' + message;
		output(msg, data.line_number);
	} catch(e) {
		fail++;
		msg = 'not ok ' + '?' + ' - ' + message;
		msg += '\n  ';
		msg += '---';
		msg += '\n  ';
		msg += 'operator: ' + operator;
		msg += '\n  ';
		msg += 'actual: ' + actual;
		msg += '\n  ';
		msg += 'expected: ' + expected;
		msg += '\n  ';
		// at: is the 3rd line - strip of the beging "at "
		msg += 'at: ' + e.stack.split(/\r?\n/)[2].trim().slice(3);
		msg += '\n  ';
		msg += '...';
		output(msg, data.line_number);
	}
};

mod.assert.deepEqual = function(actual, expected, message) {
	var data = info(mod.assert.deepEqual);
	var msg = '';
	var operator = 'deepEqual';

	try {
		assert.deepEqual(actual, expected, message);

		pass++;
		msg = 'ok ' + '?' + ' - ' + message;
		output(msg, data.line_number);
	} catch(e) {
		fail++;
		msg = 'not ok ' + '?' + ' - ' + message;
		msg += '\n  ';
		msg += '---';
		msg += '\n  ';
		msg += 'operator: ' + operator;
		msg += '\n  ';
		msg += 'actual: ' + actual;
		msg += '\n  ';
		msg += 'expected: ' + expected;
		msg += '\n  ';
		// at: is the 3rd line - strip of the beging "at "
		msg += 'at: ' + e.stack.split(/\r?\n/)[2].trim().slice(3);
		msg += '\n  ';
		msg += '...';
		output(msg, data.line_number);
	}
};

mod.assert.notDeepEqual = function(actual, expected, message) {
	var data = info(mod.assert.notDeepEqual);
	var msg = '';
	var operator = 'notDeepEqual';

	try {
		assert.notDeepEqual(actual, expected, message);

		pass++;
		msg = 'ok ' + '?' + ' - ' + message;
		output(msg, data.line_number);
	} catch(e) {
		fail++;
		msg = 'not ok ' + '?' + ' - ' + message;
		msg += '\n  ';
		msg += '---';
		msg += '\n  ';
		msg += 'operator: ' + operator;
		msg += '\n  ';
		msg += 'actual: ' + actual;
		msg += '\n  ';
		msg += 'expected: ' + expected;
		msg += '\n  ';
		// at: is the 3rd line - strip of the beging "at "
		msg += 'at: ' + e.stack.split(/\r?\n/)[2].trim().slice(3);
		msg += '\n  ';
		msg += '...';
		output(msg, data.line_number);
	}
};


/*
process.on('uncaughtException', function(err) {
	console.log(err);
	console.log(err.stack);
});
*/

module.exports = function(input) {
	main(input);
	return mod;
};
