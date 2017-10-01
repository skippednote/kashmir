const config = require('./_config');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const rename = require('gulp-rename');

module.exports = {
  errorHandler(err) {
    if (gutil.env.type === 'production') {
      throw new Error(`Gulp error in ${err.plugin}`);
    }
    notify.onError({
      title: `Gulp error in ${err.plugin}`,
      message: err.message,
    })(err);
    gutil.beep();
  },
  onDev(task, other) {
    if (!other) {
      other = gutil.noop();
    }
    if (gutil.env.type === 'undefined') {
      gutil.env.type = 'development';
    }
    return (gutil.env.type !== config.env.prod)
      ? task : other;
  },
  onOther(task, other) {
    if (!other) {
      other = gutil.noop();
    }
    return gutil.env.type !== config.env.dev ? task : gutil.noop();
  },
  renameRTL() {
    return rename((path) => {
      path.basename = path.basename.replace('.ltr', '.rtl');
    });
  },
};
