
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var cliColor = require('cli-color');

// stream based rollup
var rollup = require('rollup-stream');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

// plugins
var buble = require('rollup-plugin-buble');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonJs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');

gulp.task('default', ['develop']);
gulp.task('develop', ['build', 'watchClient', 'watchServer']);

gulp.task('watchServer', function () {
  return nodemon({
    script: 'build/server/main.js',
    watch: 'src/server/',
    tasks: ['rollup_server'],
    ext: 'js hbs',
    ignore: ['./build/**/*', './node_modules/**']
  });
});

gulp.task('watchClient', function () {
  livereload.listen();
  gulp.watch(['./src/client/**/*.js', './src/node_modules/**/*'], ['rollup_client']);
  gulp.watch('./src/client/style/**/*.less', ['build_less']);
});

gulp.task('build', ['rollup_server', 'rollup_client', 'build_less']);

gulp.task('rollup_client', function () {
  var pathIn = './src/client';
  var pathOut = './build/client/js';
  var stream = rollup({
    format: 'umd',
    entry: pathIn + '/main.js',
    sourceMap: true,
    plugins: [
      buble({
        transforms: {
          modules: false,
          generator: false
        }
      }),
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        browser: true
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      commonJs()
    ]
  })
  .on('error', function (err) { console.error(cliColor.red(err.stack)); stream.end(); })
  .pipe(source('main.js', pathIn))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(pathOut))
  .pipe(livereload());
  return stream;
});

gulp.task('rollup_server', function () {
  var pathIn = './src/server';
  var pathOut = './build/server';
  return rollup({
    format: 'cjs',
    entry: pathIn + '/main.js'
  })
  .on('error', function (err) { console.error(cliColor.red(err.stack)); stream.end(); })
  .pipe(source('main.js', pathIn))
  .pipe(gulp.dest(pathOut))
});

gulp.task('build_less', function () {
  gulp.src('./src/client/style/main.less')
    .pipe(less())
    .pipe(gulp.dest('./build/client/css'))
    .pipe(livereload());
});
