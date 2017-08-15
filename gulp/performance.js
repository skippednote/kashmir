module.exports = function (gulp, config, bs) {
  'use strict';

  var parker = require('gulp-parker');

  gulp.task('performance', function () {
    return gulp.src(config.styles.destination + '**/*.css')
      .pipe(parker());
  });
};
