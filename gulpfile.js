const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const inject = require('gulp-inject');
const clean = require('gulp-clean');
const ghPages = require('gulp-gh-pages');
const exec = require('gulp-exec');

gulp.task('lint-styles', function() {
  gulp.src([
    'app/stylesheets/**/*.scss',
    '!app/stylesheets/leaflet/prune-cluster.scss',  // vendor file
  ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('copy:index', function() {
  const cssStream = gulp
    .src('style.css', {read: false, cwd: __dirname + '/dist/'});
  gulp.src('app/index.html')
    .pipe(inject(cssStream, {addRootSlash: false}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean:dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('download', function() {
  var filesId = {
    'ckan-boreholes.json': 'c9843a61-eca6-47bb-971d-70bf9c0fe942',
    'ckan-dams.json': '5da4eb70-47a0-4694-b735-397bb3732b99',
    'ckan-population.json': 'ab84afa2-0afa-411e-9630-aeddc7bccb03',
    'ckan-waterpoints.json': 'a94b3653-55f4-4455-9bed-42b92d5c4370',
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err 
    stderr: true, // default = true, false means don't write stderr 
    stdout: true // default = true, false means don't write stdout 
  };
  gulp.src('app/data/**/*', {read: false})
    .pipe(exec('wget -O <%= file.path %>  "http://data.takwimu.org/api/action/datastore_search?resource_id=<%= options[file.path.substring(file.base.length, file.path.length)] %>&limit=100000"', filesId))
    .pipe(exec.reporter(reportOptions));
});

gulp.task('copy:static', function() {
  gulp.src(['app/images/**/*']).pipe(gulp.dest('dist/images'));
  gulp.src(['app/favicon.ico']).pipe(gulp.dest('dist'));
  gulp.src(['app/layers/**/*']).pipe(gulp.dest('dist/layers'));
  gulp.src(['app/data/**/*']).pipe(gulp.dest('dist/data'));
  gulp.src(['1.dist/**/*']).pipe(gulp.dest('dist/1.dist'));
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

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
