var gulp = require('gulp'),
	del = require('del'),
	paths = require('../paths');

gulp.task('clean', function (callback) {
	del([paths.target], callback);
});
