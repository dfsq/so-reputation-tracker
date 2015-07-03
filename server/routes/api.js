'use strict';

/**
 * API routes.
 */

/**
 * From country information.
 */
 exports.profile = function(req, res) {
 	res.send('User id: ' + req.params.userId);
 };

/**
 * Unknown API requests respond with 404.
 */
exports.error = function(req, res) {
	res.sendStatus(404);
};