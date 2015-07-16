
var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var config = require('./server/config');

// ?? do I need it or jspm syster loader
gulp.task('es6', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.es5.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/scripts/'));
});

// Run development server
gulp.task('serve', ['browser-sync'], function() {});

// Browsersync plugin reload UI
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
		proxy: config.server.hostname + ':' + config.server.port,
		port: '9000',
		files: ['app/**/*.*']
	});
});

// Start/restart development server
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
	var called = false;
	return nodemon({
		script: './server/index.js',
		watch: ['./server/index.js']
	})
    .on('start', function onStart() {
		// ensure start only got called once
		if (!called) { cb(); }
		called = true;
    })
    .on('restart', function onRestart() {
		// reload connected browsers after a slight delay
		setTimeout(function reload() {
			browserSync.reload({
				stream: false
			});
		}, BROWSER_SYNC_RELOAD_DELAY);
    });
});
