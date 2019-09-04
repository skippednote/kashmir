const utils = require('./_utils');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');

module.exports = function scripts(gulp, config, bs) {
  gulp.task('scripts', () =>
    gulp
      .src(config.scripts.source)
      .pipe(utils.onDev(plumber()))
      .pipe(sourcemaps.init())
      .pipe(typescript())
      .pipe(sourcemaps.write())
      .pipe(utils.onDev(plumber.stop()))
      .pipe(gulp.dest(config.scripts.destination))
      .pipe(utils.onDev(bs.stream()))
  );
};
