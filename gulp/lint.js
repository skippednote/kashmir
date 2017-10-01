module.exports = function lint(gulp) {
  gulp.task('lint', gulp.parallel('styles:lint', 'scripts:lint'));
};
