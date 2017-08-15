module.exports = function (gulp, config, bs) {
  'use strict';

  gulp.task('watch', function () {
    bs.init(config.browserSync);

    gulp.watch(
      [config.styles.source, config.scripts.source, config.patternlab.source],
      gulp.series(
        gulp.parallel('styles-lint', 'scripts-lint'),
        gulp.parallel('styles', 'scripts', 'patternlab')
      )
    );
  });
};
