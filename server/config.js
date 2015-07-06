var path = require('path');

module.exports = {
	server: {
		port: process.env.PORT || 9000,
		appPath: path.join(__dirname, '..', 'app'),
		assetsPath: path.join(__dirname, '..', '.tmp')
	},
	api: {
		base: 'https://api.stackexchange.com/2.2'
	}
};