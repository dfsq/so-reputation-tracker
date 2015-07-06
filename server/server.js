'use strict';

/**
 * Simple Express server for the application.
 */
var express = require('express'),
	config = require('./config'),
	app = express();

// Static assets
app.use(express.static(config.server.appPath));

// Routes
[
	'api/profile',
	'api/error',
	'site'
].forEach(function(path) {
	require('./routes/' + path)(app);
});

// Run server
app.listen(config.server.port);
console.log('Server listening on port ' + config.server.port);