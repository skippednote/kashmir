module.exports = function (gulp, config) {
  'use strict';

  gulp.task('lint', gulp.parallel('styles-lint', 'scripts-lint'));
};
