const { execSync } = require('child_process');

module.exports = function main(gulp) {
  return gulp.task('patternlab', cb => {
    execSync(
      'php pattern-lab/core/console --generate',
      (err, stdout, stderr) => {
        if (err) {
          console.log('Error generating PL', err);
          cb(err);
          process.exit(1);
        }
        if (stdout) {
          console.log('Output from PL', stdout);
        }
        if (stderr) {
          console.log('Error generating PL', stderr);
          cb(stderr);
          process.exit(1);
        }
      }
    );
  });
};
