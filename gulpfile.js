var coffee, gulp, gutil;

gulp = require('gulp');

gutil = require('gulp-util');

coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  return gulp.src('coffee/*.coffee').pipe(coffee({
    bare: true
  }).on('error', gutil.log)).pipe(gulp.dest(''));
});
