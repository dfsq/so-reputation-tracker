
var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('es6', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.es5.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/scripts/'));
});

// Start development server
gulp.task('server', function () {
	nodemon({
		script: './server/index.js',
		ext: 'js html'
	});
});
