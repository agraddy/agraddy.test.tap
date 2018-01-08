// TODO: Make assert an emitter so that console logs can be emitted

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var asserts = [];
var fail = 0;
var index = 0;
var outputted = [];
var pass = 0;

var filename_passed_in = false;
var single_file = true;
var file_count = 0;
var ended = false;
var files = [];
var originals = [];
var includes = [];
var current_count = 0;
var include_index = 0;

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
	data.filename = holder.stack[0].getFileName();

	Error.prepareStackTrace = original;

	return data;
}

// Sets up the tap output (finds out how many asserts there are)
function main(input) {
	if(includes.length) {
		current_count = 0;
	}

	// Eventually use a preprocessor for more robust parsing
	var lines = fs.readFileSync(input).toString().split(/\r?\n/);
	var comment_started = false;
	files.push(input);
	lines.forEach(function(item, line_number) {
		line_number += 1;
		if(item.indexOf('.assert') !== -1) {
			if(item.trim().slice(0, 2) == '//') {
				// Skip commentted out
			} else {
				if(!comment_started) {
					//asserts[line_number + 1] = false;
					asserts.push(input + '-' + line_number);
					outputted.push(input + '-' + line_number);
					originals.push(input + '-' + line_number);
					if(includes.length) {
						current_count++;
					}
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
	if(single_file) {
		console.log('TAP version 13');
	}
}

function output(input, line) {
	var i;
	input = input.replace('?', asserts.indexOf(line) + 1);
	outputted[outputted.indexOf(line)] = input;

	for(i = 0; i < outputted.length; i++) {
		if(originals.indexOf(outputted[i]) != -1) {
			// if it hasn't been processed stop the loop
			break;
		} else if(typeof outputted[i] === 'string') {
			// if it's not a boolean then it has been processed
			console.log(outputted[i]);
			outputted[i] = true;
			index++;
		}
	}

	if(single_file && asserts.length == index) {
		console.log('');
		console.log('1..' + asserts.length);
		console.log('# test ' + asserts.length);
		console.log('# pass ' + pass);
		console.log('# fail ' + fail);
	} else if(ended && asserts.length == index) {
		console.log('');
		console.log('1..' + asserts.length);
		console.log('# test ' + asserts.length);
		console.log('# pass ' + pass);
		console.log('# fail ' + fail);
	}

	/*
	if(includes.length) {
		current_count--;
		if(current_count == 0) {
			includeNext();
		}
	}
	*/
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
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
		output(msg, data.filename + '-' + data.line_number);
	}
};

mod.start = function() {
	single_file = false;
};

// Alias
mod.begin = mod.start;

mod.end = function() {
	ended = true;
	if(ended && asserts.length == index) {
		console.log('');
		console.log('1..' + asserts.length);
		console.log('# test ' + asserts.length);
		console.log('# pass ' + pass);
		console.log('# fail ' + fail);
	}
};
// Alias
mod.finish = mod.end;

mod.include = function(item) {
	if(includes.length == 0) {
		process.on('beforeExit', beforeExit);
	}


	if(item.slice(0, 2) == './') {
		includes.push(path.join(process.cwd(), item.slice(2)));
	} else {
		includes.push(item);
	}

};

function beforeExit() {
	if(include_index == 0) {
		mod.start();
	}
	if(include_index < includes.length) {
		console.log('require');
		// Update the index before running the require but make sure to use the right index in the require
		include_index++;

		// Make sure the require comes at the nextTick
		setTimeout(function() {
			require(includes[include_index - 1]);
		}, 0);
	} else {
		mod.end();
		process.removeListener('beforeExit', beforeExit);
	}
}

function includeNext() {
	console.log('here');
	if(include_index < includes.length) {
		console.log('includeNext');
		// Update the index before running the require but make sure to use the right index in the require
		include_index++;
		require(includes[include_index - 1]);
	} else {
		console.log('end');
		mod.end();
		////process.removeListener('beforeExit', includeNext);
	}
}


/*
process.on('uncaughtException', function(err) {
	console.log(err);
	console.log(err.stack);
});
*/

module.exports = function(input) {
	filename_passed_in = true;
	process.chdir(path.dirname(input));
	main(input);
	return mod;
};

process.on('uncaughtException', function(err) {
	if(!filename_passed_in) {
		console.log("You must pass in a filename to tap. It is usually required like this:\nvar tap = require('agraddy.test.tap')(__filename);");
		process.exit();
	} else {
		console.error(err);
	}
});

setTimeout(function() {
if(!filename_passed_in) {
	console.log("You must pass in a filename to tap. It is usually required like this:\nvar tap = require('agraddy.test.tap')(__filename);");
}
}, 100);
