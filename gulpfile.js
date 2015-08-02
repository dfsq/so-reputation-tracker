var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var del = require('del');

var config = require('./server/config');

// Run development server
gulp.task('serve', ['browser-sync'], function() {});

// Browsersync plugin reload UI
gulp.task('browser-sync', ['nodemon', 'build'], function() {
	browserSync.init({
		proxy: config.server.hostname + ':' + config.server.port,
		port: '9000',
		files: ['app/**/*.*']
	});
});

// Express server restart
gulp.task('nodemon', function(callback) {
    var called = false;
    return nodemon({
        script: './server/index.js',
        watch: ['./server/index.js']
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


// Build tasks
gulp.task('build', function(callback) {
    return runSequence(
            'clean',
            ['build-js', 'build-html'],
            callback
    );
});

gulp.task('build-js', function() {
    return gulp.src('app/scripts/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel())
            //.pipe(concat('bundle.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('app/dist/'));
});

gulp.task('build-html', function () {
    return gulp.src('app/scripts/**/*.html')
            .pipe(changed('app/dist', {extension: '.html'}))
            .pipe(gulp.dest('app/dist/'));
});


// Clean task
gulp.task('clean', function (callback) {
    del(['app/dist/**/*'], callback);
});
