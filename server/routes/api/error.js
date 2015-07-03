'use strict';

/**
 * Handle non-existent API call.
 */
function error(req, res) {
	res.sendStatus(404);
}

module.exports = function(app) {
	app.get('/api/*', error);
};