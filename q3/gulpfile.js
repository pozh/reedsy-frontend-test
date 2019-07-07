'use strict';

var cssOutputStyle = 'compressed';
var stylesPath = 'src/scss';
var stylesMain = 'src/scss/styles.scss';
var stylesDest = 'build/css';
var htmlPath = 'src';
var htmlDest = 'build';
var imagePath = 'src/images';
var imageDest = 'build/images';

var gulp = require('gulp');
var bsync = require('browser-sync');
var autoprefixer = require('autoprefixer');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');


gulp.task('styles', function () {
  var browserslist = [
    '> 1%',
    'last 2 versions',
    'Firefox ESR',
    'Opera 12.1'
  ];
  var sassOptions = {
    outputStyle: cssOutputStyle
  };
  var plugins = [
    autoprefixer({overrideBrowserslist: browserslist}),
    cssnano({preset: 'default'})
  ];
  return gulp.src(stylesMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(stylesDest))
    .pipe(bsync.stream({match: "**/*.css"}));
});

// To be run only once,
// we are not going to change html file
gulp.task('html', function () {
  return gulp.src(htmlPath+'/*.*')
  .pipe(gulp.dest(htmlDest));
});

// To be run only once,
// we are not going to change html file
gulp.task('images', function () {
  return gulp.src(imagePath+'/*.*')
  .pipe(gulp.dest(imageDest));
});

gulp.task('browser-sync', function() {
  bsync({
    server: {
      baseDir: './build/'
    },
    ghostMode: false,
    notify: false
  });
});

var build = gulp.parallel('styles');
gulp.task('build', build);

gulp.task('watch', gulp.series('build', function() {
  gulp.watch(stylesPath, gulp.series('styles'));
}));

gulp.task('default',
	gulp.series('html', 'images', 'build',
		gulp.parallel('watch', 'browser-sync')));
