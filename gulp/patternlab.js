const exec = require('child_process').exec;
const utils = require('./_utils');

module.exports = function patternlab(gulp, config, bs) {
  gulp.task('patternlab', (done) => {
    exec(config.patternlab.command, (err) => {
      if (err) {
        err.message = err.message.split('\n').slice(1).join('\n');
        err.plugin = 'gulp-patternlab';
        utils.errorHandler(err);
        done();
      }

      bs.reload();
      done();
    });
  });
};
