const parker = require('gulp-parker');

module.exports = function stats(gulp, config) {
  gulp.task('stats', () => gulp.src(`${config.styles.destination}**/*.css`)
    .pipe(parker()));
};
