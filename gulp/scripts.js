module.exports = function (gulp, config, bs) {
  'use strict';

  var utils = require('./_utils');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');
  var plumber = require('gulp-plumber');
  var eslint = require('gulp-eslint');
  var babel = require('gulp-babel');

  gulp.task('scripts-lint', function () {
    return gulp.src(config.scripts.source)
      .pipe(utils.onDev(plumber({errorHandler: utils.errorHandler})))
      .pipe(eslint(config.eslint.options))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(utils.onDev(plumber.stop()));
  });

  gulp.task('scripts', function () {
    return gulp.src(config.scripts.source)
      .pipe(utils.onDev(plumber({errorHandler: utils.errorHandler})))
      .pipe(utils.onDev(sourcemaps.init()))
      .pipe(babel(config.babel))
      .pipe(utils.onOther(uglify()))
      .pipe(utils.onDev(sourcemaps.write()))
      .pipe(utils.onDev(plumber.stop()))
      .pipe(gulp.dest(config.scripts.destination))
      .pipe(utils.onDev(bs.stream()));
  });
};
