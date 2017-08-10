var config = require('./gulp/_config');
var gulp = require('gulp');

require('./gulp/styles')(gulp, config);
require('./gulp/scripts')(gulp, config);
require('./gulp/watch')(gulp, config);
require('./gulp/default')(gulp, config);

