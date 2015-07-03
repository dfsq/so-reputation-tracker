'use strict';

/**
 * Load user profile with current reputation.
 */
function profile(req, res) {
	res.send('User id: ' + req.params.userId);
}

module.exports = function(app) {
	app.get('/api/profile/:userId', profile);
};