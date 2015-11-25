// http://blog.durandal.io/2015/09/11/bundling-aurelia-apps/

var gulp = require('gulp'),
	bundler = require('aurelia-bundler'),
	aureliaLibs;

aureliaLibs = [
	"aurelia-framework",
    "aurelia-bootstrapper",
    "aurelia-fetch-client",
    "aurelia-router",
    "aurelia-templating-binding",
    "aurelia-templating-resources",
    "aurelia-templating-router",
    "aurelia-loader-default",
    "aurelia-history-browser",
    "aurelia-logging-console"
];

var config = {
	force: true,
	packagePath: '.',
	bundles: {
		"dist/app-build": {
			includes: [
				// TODO: set up glob pattern
				'app.js', 'main.js', 'common/*', 'common/datepicker/*', 'stats/*', 'stats/chart/*', 'config/*',
			    '**/*.html!text',
			    '**/*.css!text'
			],
			excludes: aureliaLibs,
			options: {
				inject: true,
				minify: true
			}
		},
		"dist/aurelia": {
			includes: aureliaLibs,
			options: {
				inject: true,
				minify: true
			}
		}
	}
};

gulp.task('bundle', function() {
	return bundler.bundle(config);
});

gulp.task('unbundle', function() {
	return bundler.unbundle(config);
});
