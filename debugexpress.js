#!/usr/bin/env node

var express = require('express');
var app = express();
app.use(function(req, res, next) {
	console.log('%s : %s', req.method, req.url);
	next();
});

app.use(function(req, res, next) {
        res.send(200, {'hit' : 'www.shiyanjun.cn'});
});

app.listen(8080)