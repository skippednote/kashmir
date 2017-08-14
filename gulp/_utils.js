var config = require('./_config');
var notify = require('gulp-notify');
var gutil = require('gulp-util');

module.exports = {
  errorHandler: function (err) {
    'use strict';

    notify.onError({
      title: 'Gulp error in ' + err.plugin,
      message: err.message
    })(err);
    gutil.beep();
    this.emit('end');
  },
  onDev: function (task, other) {
    'use strict';
    if (!other) {
      other = gutil.noop();
    }
    return gutil.env.type === config.env.dev ? task : other;
  },
  onOther: function (task, other) {
    'use strict';
    if (!other) {
      other = gutil.noop();
    }
    return gutil.env.type !== config.env.dev ? task : gutil.noop();
  },
  renameFile: function (path, search, replace) {
    'use strict';
    path.basename = path.basename.replace(search, replace);
  }
};
