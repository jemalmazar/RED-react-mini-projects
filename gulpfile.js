'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');


gulp.task('compile-react', function() {
	return gulp.src('main.jsx')
    .pipe(plumber())
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(browserify({
			insertGlobals: true,
			debug: true
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('browser-sync', ['compile-react'], function() {

	browserSync.init({
		server: './'
	});

	gulp.watch(['main.jsx'], ['compile-react']);
	gulp.watch(['main.js', 'index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
