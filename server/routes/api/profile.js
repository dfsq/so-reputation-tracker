'use strict';

var Profile = require('../../models/Profile');

/**
 * Load user profile with current reputation.
 * /users/949476?site=stackoverflow
 */
function profileRoute(req, res) {

	var userId = req.params.userId,
		profile = new Profile(userId);

	profile.get().then(function(data) {
		res.header('Content-Type', 'application/json');
		res.send(data);
	});
}

module.exports = function(app) {
	app.get('/api/profile/:userId', profileRoute);
};
