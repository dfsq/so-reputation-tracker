var path = require('path');

module.exports = {
	server: {
		hostname: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
		port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
		appPath: path.join(__dirname, '..', 'app'),
		assetsPath: path.join(__dirname, '..', '.tmp')
	},
	api: {
		base: 'https://api.stackexchange.com/2.2'
	}
};