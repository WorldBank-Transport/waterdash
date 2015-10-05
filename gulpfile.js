const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const inject = require('gulp-inject');

gulp.task('lint-styles', function() {
  gulp.src('app/stylesheets/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('copy:index', function() {
  const cssStream = gulp
    .src('style.css', {read: false, cwd: __dirname + '/dist/'});
  gulp.src('app/index.html')
    .pipe(inject(cssStream, {removeTags: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('slack-notify', function() {
  var fs = require('fs');
  try {
    var SLACK_URL = fs.readFileSync('slackHookURL.txt','utf8');
  } catch (err) {
    console.log(err);
    return
  }
  var slack = require('slack-notify')(SLACK_URL);
  slack.alert({
    channel: '#tanzania-dashboards',
      icon_emoji: ':sweat_drops:',
      text: 'http://maji.takwimu.org/'
    });
});
