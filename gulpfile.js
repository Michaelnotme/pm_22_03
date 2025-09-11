// gulpfile.js

const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

// HTML
function htmlTask() {
    return src('app/html/**/*.html')
        .pipe(dest('dist/html'));
}

// SCSS
function scssTask() {
    return src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
}

// JS
function jsTask() {
    return src('app/js/**/*.js')
        .pipe(dest('dist/js'));
}

// Images
function imgTask() {
    return src('app/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

exports.default = parallel(htmlTask, scssTask, jsTask, imgTask);
