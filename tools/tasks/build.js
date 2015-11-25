var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel'),
	changed = require('gulp-changed'),
	runSequence = require('run-sequence'),
	babelOptions = require('../babel-options'),
	paths = require('../paths');

// Build tasks
gulp.task('build', function(callback) {
	return runSequence('clean', ['build-js', 'build-html'], callback);
});

gulp.task('build-js', function() {
	return gulp.src(paths.source)
		.pipe(sourcemaps.init())
		.pipe(babel(babelOptions))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.target));
});

gulp.task('build-html', function () {
	return gulp.src(paths.html)
		.pipe(changed(paths.target, {extension: '.html'}))
		.pipe(gulp.dest(paths.target));
});
