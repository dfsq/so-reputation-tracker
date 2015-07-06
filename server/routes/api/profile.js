'use strict';

var fetch = require('node-fetch'),
	config = require('../../config');

/**
 * Load user profile with current reputation.
 * /users/949476?site=stackoverflow
 */
function profile(req, res) {

	var userId = req.params.userId;

	fetch(config.api.base + '/users/' + userId + '?site=stackoverflow')
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		res.header('Content-Type', 'application/json');
		res.send(data);
	});
}

module.exports = function(app) {
	app.get('/api/profile/:userId', profile);
};