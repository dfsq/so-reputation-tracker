var cli = require('aurelia-cli');
var bundleConfig = {
	js: {
		"dist/app-bundle": {
			modules: [
				'*',
				'aurelia-bootstrapper',
				'aurelia-fetch-client',
				'github:aurelia/templating-binding',
				'github:aurelia/templating-resources',
				'github:aurelia/templating-router',
				'github:aurelia/loader-default'
			],
			options: {
				inject: true,
				minify: true
			}
		}
	},
	template: {
		"dist/app-bundle": {
			pattern: 'dist/*.html',
			options: {
				inject: true
			}
		}
	}
};

cli.command('bundle', bundleConfig);
cli.command('unbundle', bundleConfig);
