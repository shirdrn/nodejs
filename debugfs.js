#!/usr/bin/env node

var fs = require('fs');
var file = '/etc/passwd';
var encoding = 'UTF-8';
fs.readFile(file, encoding, function(err, data) {
	if(err) {
		console.error(err);
	} else {
		console.log(data);
	}
});