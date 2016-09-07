
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

// plugins
var buble = require('rollup-plugin-buble');
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonJs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');

var CLIENT_PATH_IN = './src/client';
var CLIENT_PATH_OUT = './build/client/js';
var LESS_MAIN = './src/client/style/main.less';
var LESS_OUT = './build/client/css';

gulp.task('default', ['develop']);
gulp.task('develop', ['build_dev', 'watchClient', 'watchServer']);
gulp.task('build_dev', ['rollup_server', 'rollup_client_dev', 'build_less_dev']);
gulp.task('build_prod', ['rollup_server', 'rollup_client_prod', 'build_less_prod']);

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
  gulp.watch(['./src/client/**/*.js', './src/node_modules/**/*'], ['rollup_client_dev']);
  gulp.watch('./src/client/style/**/*.less', ['build_less_dev']);
});


function rollupClient(env) {
  return rollup({
    format: 'umd',
    entry: CLIENT_PATH_IN + '/main.js',
    sourceMap: true,
    plugins: [
      commonJs(),
      buble({
        transforms: {
          modules: false,
          generator: false
        }
      }),
      // babel(),
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        browser: true,
        skip: [
          // 'core-js',
          // 'regenerator-runtime',
          // 'symbol-observable'
        ]
      }),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) })
    ]
  })
  .pipe(source('main.js', CLIENT_PATH_IN))
}
gulp.task('rollup_client_dev', function () {
  return rollupClient('development')
  .on('error', function (err) { console.error(cliColor.red(err.stack)); stream.end(); })
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(CLIENT_PATH_OUT))
  .pipe(livereload());
});
gulp.task('rollup_client_prod', function () {
  return rollupClient('production')
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest(CLIENT_PATH_OUT));
})

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

gulp.task('build_less_dev', function () {
  gulp.src(LESS_MAIN)
    .pipe(less())
    .pipe(gulp.dest(LESS_OUT))
    .pipe(livereload());
});
gulp.task('build_less_prod', function () {
  gulp.src(LESS_MAIN)
    .pipe(less())
    .pipe(uglifyCss())
    .pipe(gulp.dest(LESS_OUT))
})
