#!/usr/bin/env node

var mysql = require('mysql');
var util = require('util');
var dateFormat = require('dateformat');

var config = {
		'host' : '192.168.1.105',
		'port' : '3306',
		'user' : 'shirdrn',
		'password' : 'shiyanjun'
};

var connect = function() {
	var connection = mysql.createConnection(config);
	if(connection) {
		console.log('Succeed to connected: ' + util.inspect(connection));
	} else {
		throw new Error('Fail to connect MySQL database!');
	}
	return connection;
}

var query = function(sql, callback) {
	// connect to MySQL
	try {
		var connection = connect();
	} catch(err) {
		console.error(util.inspect(err));
		throw err;
	}
	// execute SQL queries
	connection.query(sql, callback);
	connection.end();
	console.log('Connection closed!');
}

// query example
var querySQL = 'SELECT id, host, port, updated_at FROM domain_db.traffic_proxy LIMIT 0,10';

query(querySQL, function(err, rows, fields) {
	if(err) {
		throw err;
	}
	for(var i=0; i<rows.length; i++) {
		var row = rows[i];
		var host = row['host'];
		var port = row['port'];
		var updatedAt = dateFormat(row['updated_at'], 'yyyy-MM-dd hh:mm:ss');
		console.log('Record: host=' + host + ', port=' + port + ', updatedAt=' + updatedAt);
	}
});

