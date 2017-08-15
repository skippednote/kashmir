module.exports = function (gulp, config, bs) {
  'use strict';

  var exec = require('child_process').exec;
  var utils = require('./_utils');

  gulp.task('patternlab', function (done) {
    exec(config.patternlab.command, function (err, stdout, stderr) {
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
