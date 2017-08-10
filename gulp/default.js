module.exports = function (gulp, config) {
  'use strict';

  gulp.task('default', gulp.series(
    gulp.parallel('styles-lint', 'scripts-lint'),
    gulp.parallel('styles', 'scripts')
  ));
};
