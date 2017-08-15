var config = require('./gulp/_config');
var gulp = require('gulp');
var bs = require('browser-sync').create();

require('./gulp/styles')(gulp, config, bs);
require('./gulp/scripts')(gulp, config, bs);
require('./gulp/watch')(gulp, config, bs);
require('./gulp/default')(gulp, config);
require('./gulp/patternlab')(gulp, config);

