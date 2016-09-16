
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var uglifyCss = require('gulp-uglifycss');
var less = require('gulp-less');
var cliColor = require('cli-color');

// stream based rollup
var rollup = require('rollup-stream');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

var CLIENT_PATH_IN = './src/client';
var DEV_CLIENT_OUT = './dist/client/dev/js';
var PROD_CLIENT_OUT = './dist/client/prod/js';
var LESS_MAIN = './src/client/style/main.less';
var LESS_DEV_OUT = './dist/client/dev/css';
var LESS_PROD_OUT = './dist/client/prod/css';

gulp.task('default', ['develop']);
gulp.task('develop', ['build_dev', 'watchClient', 'watchServer']);
gulp.task('build_dev', ['rollup_server', 'build_less_dev']);
gulp.task('build_prod', ['rollup_server', 'rollup_migrate', 'build_less_prod']);

gulp.task('watchServer', function () {
  return nodemon({
    script: 'dist/server/main.js',
    watch: 'src/server/',
    tasks: ['rollup_server'],
    ext: 'js hbs',
    ignore: ['./dist/**/*', './node_modules/**']
  });
});

gulp.task('watchClient', function () {
  livereload.listen();
  gulp.watch('./src/client/style/**/*.less', ['build_less_dev']);
});

gulp.task('build_less_dev', function () {
  gulp.src(LESS_MAIN)
    .pipe(less())
    .pipe(gulp.dest(LESS_DEV_OUT))
    .pipe(livereload());
});
gulp.task('build_less_prod', function () {
  gulp.src(LESS_MAIN)
    .pipe(less())
    .pipe(uglifyCss())
    .pipe(gulp.dest(LESS_PROD_OUT))
});

gulp.task('rollup_server', function () {
  var pathIn = './src/server';
  var pathOut = './dist/server';
  var stream = rollup({
    format: 'cjs',
    entry: pathIn + '/main.js'
  })
  .on('error', function (err) { console.error(cliColor.red(err.stack)); stream.end(); })
  .pipe(source('main.js', pathIn))
  .pipe(gulp.dest(pathOut))
  return stream;
});

gulp.task('rollup_migrate', function () {
  var pathIn = './src/server/db';
  var pathOut = './dist/server';
  var stream = rollup({
    format: 'cjs',
    entry: pathIn + '/migrate.js'
  })
  .on('error', function (err) { console.error(cliColor.red(err.stack)); stream.end(); })
  .pipe(source('migrate.js', pathIn))
  .pipe(gulp.dest(pathOut))
  return stream;
});

gulp.task('watchMigrate', function () {
  gulp.watch(['./src/server/db/migrate.js'], ['rollup_migrate']);
});
