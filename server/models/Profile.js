'use strict';

var fetch = require('node-fetch'),
	config = require('../config');

function Profile(userId) {
	this.userId = userId;
}

Profile.prototype.get = function() {
	return fetch(config.api.base + '/users/' + this.userId + '?site=stackoverflow')
		.then(function(response) {
			return response.json();
		});
};

module.exports = Profile;
