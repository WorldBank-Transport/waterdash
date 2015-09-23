const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');

gulp.task('lint-styles', function() {
  gulp.src('app/stylesheets/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});
