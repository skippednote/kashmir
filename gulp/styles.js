const utils = require('./_utils');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const stylelint = require('gulp-stylelint');
const autoprefixer = require('autoprefixer');
const sassVariables = require('gulp-sass-variables');

module.exports = function styles(gulp, config, bs) {
  const processors = [
    autoprefixer(config.autoprefixer),
  ];

  gulp.task('styles:lint', () => gulp.src(config.styles.source)
    .pipe(utils.onDev(plumber({ errorHandler: utils.errorHandler })))
    .pipe(gutil.env.type === config.env.dev
      ? stylelint(config.stylelint.options)
      : stylelint(config.stylelint.optionsTest))
    .pipe(utils.onDev(plumber.stop())));

  gulp.task('styles:ltr', () => gulp.src(config.styles.source)
    .pipe(utils.onDev(sourcemaps.init()))
    .pipe(utils.onDev(plumber({ errorHandler: utils.errorHandler })))
    .pipe(sassGlob())
    .pipe(sass(config.styles.options).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(utils.onDev(plumber.stop()))
    .pipe(utils.onDev(sourcemaps.write()))
    .pipe(gulp.dest(config.styles.destination))
    .pipe(utils.onDev(bs.stream())));

  gulp.task('styles:rtl', () => gulp.src(config.styles.directionalSource)
    .pipe(utils.onDev(sourcemaps.init()))
    .pipe(utils.onDev(plumber({ errorHandler: utils.errorHandler })))
    .pipe(sassGlob())
    .pipe(sassVariables(config.styles.variables))
    .pipe(sass(config.styles.options).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(utils.renameRTL())
    .pipe(utils.onDev(plumber.stop()))
    .pipe(utils.onDev(sourcemaps.write()))
    .pipe(gulp.dest(config.styles.destination))
    .pipe(utils.onDev(bs.stream())));

  gulp.task('styles', gulp.series('styles:ltr', 'styles:rtl'));
};

