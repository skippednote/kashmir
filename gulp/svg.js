module.exports = function (gulp, config, bs) {
  'use strict';

  var svgStore = require('gulp-svgstore');

  gulp.task('svg', function () {
    return gulp.src(config.svg.source)
      .pipe(svgStore())
      .pipe(gulp.dest(config.svg.destination));
  });
};
