'use strict';

/**
 * Route for the main index.html path.
 * @param req
 * @param res
 */
var config = require('../config');

function site(req, res) {
	res.sendFile(config.server.appPath + '/index.html');
}

module.exports = function(app) {
	app.get('/*', site);
};