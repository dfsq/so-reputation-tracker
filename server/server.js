'use strict';

/**
 * Simple Express server for the application.
 */
var express = require('express'),
	config = require('./config'),
	site = require('./routes/site'),
	api = require('./routes/api'),
	app = express();


// Static assets
app.use(express.static(config.server.appPath));
//app.use(express.static(config.server.assetsPath));


// API routes
app.get('/api/profile/:userId', api.profile);

// All undefined api routes should return a 404
app.get('/api/*', api.error);

// For all other requests serve index.html
app.get('/*', site.index);


// Run server
app.listen(config.server.port);
console.log('Server listening on port ' + config.server.port);