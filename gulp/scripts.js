const utils = require('./_utils');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');

module.exports = function scripts(gulp, config, bs) {
  gulp.task('scripts:lint', () => gulp.src(config.scripts.source)
    .pipe(utils.onDev(plumber({ errorHandler: utils.errorHandler })))
    .pipe(eslint(config.eslint.options))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(utils.onDev(plumber.stop())));

  gulp.task('scripts', () => gulp.src(config.scripts.source)
    .pipe(utils.onDev(plumber({ errorHandler: utils.errorHandler })))
    .pipe(utils.onDev(sourcemaps.init()))
    .pipe(babel(config.babel))
    .pipe(utils.onOther(uglify()))
    .pipe(utils.onDev(sourcemaps.write()))
    .pipe(utils.onDev(plumber.stop()))
    .pipe(gulp.dest(config.scripts.destination))
    .pipe(utils.onDev(bs.stream())));
};
