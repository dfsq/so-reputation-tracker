var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon'),
	paths = require('../paths'),
	config = require('../../server/config');

// Run development server
gulp.task('serve', ['browser-sync'], function() {});

// Browsersync plugin reload UI
gulp.task('browser-sync', ['nodemon', 'watch'], function() {
	browserSync.init({
		proxy: config.server.hostname + ':' + config.server.port,
		port: '9000',
		files: [paths.app + '**/*.*']
	});
});

// Watch for changes in js and html files and report changes to browser-sync
gulp.task('watch', function() {
	gulp.watch(paths.source, ['build-js', browserSync.reload]);
	gulp.watch(paths.html, ['build-html', browserSync.reload]);
});

// Express server restart
gulp.task('nodemon', function(callback) {
	var called = false;
	return nodemon({
		script: paths.server + 'index.js',
		watch: [paths.server + 'index.js']
	})
	.on('start', function onStart() {
		// ensure start only got called once
		if (!called) callback();
		called = true;
	})
	.on('restart', function onRestart() {
		// reload connected browsers after a slight delay
		setTimeout(function() {
			browserSync.reload({
				stream: false
			});
		}, 500);
	});
});
