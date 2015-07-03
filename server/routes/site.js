'use strict';

/**
 * Route for the main index.html path.
 * @param req
 * @param res
 */
var config = require('../config');

exports.index = function(req, res) {
	res.sendFile(config.server.appPath + '/index.html')
};