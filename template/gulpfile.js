var gulp = require('gulp');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
let uglify = require('gulp-uglify-es');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var del = require('del');
 
var paths = {
  scripts: ['js/**/*.js'],
  styles: ['css/**/*.css']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('css', function() {
    return gulp.src(paths.styles)
      .pipe(concat('main.min.css'))
      .pipe(sourcemaps.init())
      .pipe(cssmin())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function() { 
  return gulp.src(paths.scripts)
    .pipe(uglify()) 
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js')) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['css']);
});