'use strict';

var moment = require('moment'),
	Reputation = require('../../models/Reputation');

function reputationRoute(req, res) {

	var params = req.query,
		reputation;

	if (!params.userId || !params.startDate) {
		res.status(400);
		res.header('Content-Type', 'application/json');
		res.send({error: 'Invalid parameters: userId and startDate are required.', status: 400});
		return;
	}

	reputation = new Reputation({
		userId: params.userId,
		startDate: moment(new Date(params.startDate)).unix(),
		endDate: params.endDate ? moment(new Date(params.endDate)).add(1, 'day').unix() : '',
		startReputation: Number(params.startReputation || 0)
	});

	reputation.get().then(function(data) {
		res.header('Content-Type', 'application/json');
		res.send(data);
	});
}

module.exports = function (app) {
	app.get('/api/reputation', reputationRoute);
};
