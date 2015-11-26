'use strict';

var Promise = require('promise'),
	fetch = require('node-fetch'),
	config = require('../config');

fetch.Promise = Promise;

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
