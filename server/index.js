'use strict';

/**
 * Simple Express server for the application.
 */
var express = require('express'),
	config = require('./config'),
	app = express();

// Static assets
app.use(express.static(config.server.appPath));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Routes
[
	'api/profile',
	'api/reputation',
	'api/error',
	'site'
].forEach(function(path) {
	require('./routes/' + path)(app);
});

// Run server
app.listen(config.server.port, config.server.hostname, function() {
	console.log("Listening on " + config.server.hostname + ":" + config.server.port)
});
