'use strict';

var cssOutputStyle = 'compressed';
var stylesPath = 'scss';
var stylesMain = 'scss/styles.scss';
var stylesDest = 'css';

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

gulp.task('browser-sync', function() {
  bsync({
    server: {
      baseDir: './'
    },
    ghostMode: false,
    notify: false
  });
});

var build = gulp.parallel('styles',);
gulp.task('build', build);

gulp.task('watch', gulp.series('build', function() {
  gulp.watch(stylesPath, gulp.series('styles'));
}));

gulp.task('default',
	gulp.series('build',
		gulp.parallel('watch', 'browser-sync')));
