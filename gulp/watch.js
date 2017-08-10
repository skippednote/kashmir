module.exports = function (gulp, config) {
  'use strict';

  gulp.task('watch', function () {
    var browserSync = require('browser-sync').create();
    browserSync.init({
      proxy: {
        target: 'http://localhost:8080'
      },
      open: 'external',
      xip: true,
      logConnections: true
    });

    gulp.watch(
      [config.styles.source, config.scripts.source],
      gulp.series(
        gulp.parallel('styles-lint', 'scripts-lint'),
        gulp.parallel('styles', 'scripts')
      )
    );
  });
};
