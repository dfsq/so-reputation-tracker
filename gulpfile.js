
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
gulp.task('browser-sync', ['nodemon'], function(done) {
	browserSync({
		proxy: config.server.hostname + ':' + config.server.port,
		port: '9000',
		files: ['app/**/*.*']
	}, done);
});

// Start/restart development server
gulp.task('nodemon', function () {
	nodemon({
		script: './server/index.js',
		ext: 'js html'
	});
});
