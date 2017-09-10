var config = require('./_config');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

module.exports = {
  errorHandler: function (err) {
    'use strict';
    if (gutil.env.type === 'production') {
      throw new Error('Gulp error in ' + err.plugin);
    }
    notify.onError({
      title: 'Gulp error in ' + err.plugin,
      message: err.message
    })(err);
    gutil.beep();
  },
  onDev: function (task, other) {
    'use strict';
    if (!other) {
      other = gutil.noop();
    }
    if (gutil.env.type === 'undefined') {
      gutil.env.type = 'development';
    }
    return (gutil.env.type !== config.env.prod)
      ? task : other;
  },
  onOther: function (task, other) {
    'use strict';
    if (!other) {
      other = gutil.noop();
    }
    return gutil.env.type !== config.env.dev ? task : gutil.noop();
  },
  renameRTL: function (path) {
    'use strict';
    return rename(function (path) {
      path.basename = path.basename.replace('.ltr', '.rtl');
    });
  }
};
