'use strict';

var util = require('util'),
	queryString =require('querystring'),
	Promise = require('promise'),
	fetch = require('node-fetch'),
	moment = require('moment'),
	config = require('../config');

fetch.Promise = Promise;

var getEndpoint = function(userId) {

	var url = config.api.base + '/users/' + userId + '/reputation?',
		baseParams = {
			site: 'stackoverflow',
			filter: '!-.rIQPq8UE8E',
			pagesize: 100
		};

	return {
		params: function(params) {
			return url + queryString.stringify(util._extend(baseParams, params));
		}
	};
};


fetch.Promise = Promise;

/**
 * @param options {Object}
 * @param options.userId {Number}
 * @param options.startDate {String}
 * @param [options.endDate] {String}
 * @param options.startReputation {Number}
 * @property endpoint {Object}
 * @constructor
 */
function Reputation(options) {
	this.options = options;
	this.endpoint = getEndpoint(options.userId);
}

Reputation.prototype.get = function () {

	var daysHash = {},
		page = 1,
		options = this.options,
		userId = options.userId,
		endpoint = this.endpoint;

	/**
	 * @param page
	 * @returns {Promise}
	 */
	function fetchPage(page) {

		var url = endpoint.params({
			page: page,
			fromdate: options.startDate,
			todate: options.endDate
		});

		return fetch(url).then(function(response) {
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

		// Reputation starts from some initial value
		days[0][1] += options.startReputation;

		for (var i = 1; i < days.length; i++) {
			days[i][1] += days[i - 1][1];
		}

		return {
			userId: userId,
			total: days[days.length - 1][1] - options.startReputation,
			startDate: {unix: days[0][0], formatted: days[0][2]},
			endDate: {unix: days[days.length - 1][0], formatted: days[days.length - 1][2]},
			days: days
		};
	});
};

module.exports = Reputation;
