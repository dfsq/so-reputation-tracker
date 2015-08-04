'use strict';

var util = require('util'),
	fetch = require('node-fetch'),
	moment = require('moment'),
	config = require('../config'),
	urlPattern = config.api.base + '/users/%d/reputation?fromdate=%s&page=%d&pagesize=100&site=stackoverflow&filter=!-.rIQPq8UE8E';

/**
 * @param options {Object}
 * @property userId {Number}
 * @property startDate {String}
 * @property startReputation {Number}
 * @constructor
 */
function Reputation(options) {
	this.options = options;
}

Reputation.prototype.get = function () {

	var daysHash = {},
		page = 1,
		options = this.options;

	/**
	 * @param page
	 * @returns {Promise}
	 */
	function fetchPage(page) {
		return fetch(util.format(urlPattern, options.userId, options.startDate, page))
			.then(function(response) {
				return response.json();
			});
	}

	return fetchPage(page).then(function nextPage(data) {

		/**
		 * @name item
		 * @property on_date Number
		 * @property has_more Boolean
		 * @property reputation_change Number
		 */

		data.items.forEach(function(item) {

			var date = moment(item.on_date * 1000).format('DD MMM YYYY'),
				timestamp = Date.parse(date);

			if (!daysHash[timestamp]) {
				daysHash[timestamp] = [timestamp, 0, date, 0];
			}

			// If no reputation earned on this day
			if (typeof item.reputation_change === 'undefined') {
				item.reputation_change = 0;
			}

			// Store reputation gained by this day (since $start_date)
			daysHash[timestamp][1] += item.reputation_change;

			// Store reputation gained on this day
			daysHash[timestamp][3] += item.reputation_change;
		});

		if (data.has_more) {
			return fetchPage(++page).then(nextPage);
		}
	}).then(function() {

		var days = Object.keys(daysHash).map(function(key) {
			return daysHash[key];
		}).sort(function(a, b) {
			return a[0] - b[0];
		});

		// Reputation start from some initial value
		days[0][1] += options.startReputation;

		for (var i = 1; i < days.length; i++) {
			days[i][1] += days[i - 1][1];
		}

		return days;
	});
};

module.exports = Reputation;
