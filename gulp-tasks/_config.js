module.exports = {
  styles: {
    source: ['components/_patterns/sass/**/*.scss'],
    destination: 'dist/css/',
    options: {
      outputStyle: 'expanded',
      includePaths: ['./node_modules']
    }
  },
  scripts: {
    source: ['components/_patterns/**/*.ts'],
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
  browserSync: {
    proxy: null,
    open: true,
    xip: false,
    logConnections: false
  }
};
