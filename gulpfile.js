const config = require('./gulp/_config');
const gulp = require('gulp');
const bs = require('browser-sync').create();

require('./gulp/styles')(gulp, config, bs);
require('./gulp/scripts')(gulp, config, bs);
require('./gulp/patternlab')(gulp, config, bs);
require('./gulp/svg')(gulp, config, bs);
require('./gulp/stats')(gulp, config, bs);
require('./gulp/watch')(gulp, config, bs);
require('./gulp/lint')(gulp, config);
require('./gulp/default')(gulp, config);

