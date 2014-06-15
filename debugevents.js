#!/usr/bin/env node

var process = require('process');
var taskShell =  require('task-shell');
var events = require('events');
var bash = '/bin/bash';

// create event emitter
var emitter = new events.EventEmitter();
// register event: 'parseCommand'
emitter.on('parseCommand', function(argv) {
	var shell = '';
	console.log('argv.length=' + argv.length);
	if(argv.length >= 2) {
		for(var i=2; i<argv.length; i++) {
			shell += ' ' + argv[i];
			console.log('shell=' + shell);
		}
	}
	console.log('Parsed shell cmd: ' + shell);
	// emit
	emitter.emit('executeCommand', shell);
});

//register event: 'executeCommand'
emitter.on('executeCommand', function(shellCmd) {
	console.log('Execute shell cmd: ' + shellCmd);
	if(shellCmd != '') {
		shellCmd = bash + ' ' + shellCmd;
		var shell = new taskShell();
		shell.run([], {command : shellCmd}, console);
		console.log('Shell cmd executed.');
	}
});

console.log('Passed cmd line: ' + process.argv);
emitter.emit('parseCommand', process.argv);
