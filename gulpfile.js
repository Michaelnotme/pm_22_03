const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require ('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include'); // підключаємо

// HTML
function htmlTask() {
    return src('src/app/html/index.html')
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// SCSS
function scssTask() {
    return src('src/app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(dest('dist/css', { sourcemaps: '.' }))
        .pipe(browserSync.stream());
}

// JS
function jsTask() {
    return src('src/app/js/**/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Images
function imgTask() {
    return src('src/app/img/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}
// Reloading
function serve() {
    browserSync.init( { server: { baseDir: 'dist' } });
    watch('src/app/html/**/*.html', htmlTask).on('change', browserSync.reload);
    watch('src/app/scss/**/*.scss', scssTask);
    watch('src/app/html/**/*.scss', scssTask);
    watch('src/app/js/**/*.js', jsTask).on('change', browserSync.reload);
    watch('src/app/img/**/*', imgTask).on('change', browserSync.reload);
}

exports.default = parallel(htmlTask, scssTask, jsTask, imgTask, serve);
