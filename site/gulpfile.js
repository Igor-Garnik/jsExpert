const gulp = require('gulp');
let dest = require('gulp-dest');
let concat = require('gulp-concat');
let concatJs = require('gulp-concat-js');
let uglify = require('gulp-uglify-es').default;
let rollup = require('gulp-better-rollup');
let babel = require('rollup-plugin-babel');
let sourcemaps = require('gulp-sourcemaps');
let cssmin = require('gulp-cssmin');
let del = require('del');
var gutil = require('gulp-util');

let paths = {
    vendor: [
        'public/libraries/*.js'
    ],
    scripts: [
        'public/js/app.js',
        'public/js/router.js',
        'public/js/utils.js',
        'public/js/gallery/gallery.controller.js',
        'public/js/gallery/gallery.model.js',
        'public/js/gallery/gallery.view.js',
        'public/js/gallery/observer.js',
        'public/js/home/home.controller.js', 
        'public/js/home/home.model.js', 
        'public/js/home/home.view.js', 
        'public/js/profile/profile.controller.js',
        'public/js/profile/profile.model.js',
        'public/js/profile/profile.view.js',
        'public/js/login/login.controller.js',
        'public/js/login/login.model.js',
        'public/js/login/login.view.js'
        ],
    styles: ['public/css/*.css'],
    fonts: ['public/fonts/*{ttf,woff,woff2,svg,eot}'],
    img: ['public/img/*{jpg,png}']
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('css', function() {
    return gulp.src(paths.styles)
        .pipe(concat('css.min.css'))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(rollup({plugins: [babel()]}, 'iife'))
        .pipe(concat('app.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js/'))
});

gulp.task('vendor', function() {
    return gulp.src(paths.vendor)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/build/js/vendor'))
});

gulp.task('fonts', function () {
    return gulp.src('public/fonts/*{ttf,woff,woff2,svg,eot}')
        .pipe(gulp.dest('public/build/fonts'))
});
gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest('public/img/*{jpg,png}'))
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['css']);
});

gulp.task('default', ['watch', 'css', 'scripts', 'vendor', 'fonts', 'img']);
