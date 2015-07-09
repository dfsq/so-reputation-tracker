
var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.es5.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/scripts/'));
});
