'use strict';

var moment = require('moment'),
	Reputation = require('../../models/Reputation');

function reputationRoute(req, res) {

	var userId = req.params.userId,
		startDate = req.params.startDate,
		startReputation = Number(req.params.startReputation),
		reputation;

	reputation = new Reputation({
		userId: userId,
		startDate: moment(new Date(startDate)).unix(),
		startReputation: startReputation
	});

	reputation.get().then(function(data) {
		res.header('Content-Type', 'application/json');
		res.send(data);
	});
}

module.exports = function (app) {
	app.get('/api/reputation/:userId/:startDate/:startReputation', reputationRoute);
};
