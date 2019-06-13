module.exports = {
  rtl: true,
  styles: {
    source: ['sass/**/*.scss'],
    destination: 'dist/css/',
    options: {
      outputStyle: 'expanded',
      includePaths: ['./node_modules']
    }
  },
  scripts: {
    source: ['js/**/*.ts'],
    destination: 'dist/js/'
  },
  svg: {
    source: 'images/svg/**/*.svg',
    destination: 'dist/images/svg/'
  },
  stylelint: {
    options: {
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ]
    },
    optionsTest: {
      reporters: [
        {
          formatter: 'string',
          console: true,
          failAfterError: true
        }
      ]
    }
  },
  eslint: {
    options: {
      fix: false
    }
  },
  browserSync: {
    proxy: null,
    open: true,
    xip: false,
    logConnections: false
  }
};
