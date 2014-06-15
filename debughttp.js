#!/usr/bin/env node

var port = 8080;
var host = '192.168.1.115';
console.log('Confiugre: host=' + host + ', port=' + port);

var http = require('http');
var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.end('Welcome to our site!!!');
});
console.log('Server created: ' + server);

server.listen(port, host);