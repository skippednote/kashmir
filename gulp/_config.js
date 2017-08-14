module.exports = {
  rtl: true,
  styles: {
    source: 'sass/**/*.scss',
    directionalSource: 'sass/**/*.ltr.scss',
    destination: 'dist/css/',
    options: {
      outputStyle: 'expanded'
    },
    variables: {
      $dir: 'rtl'
    }
  },
  scripts: {
    source: 'js/**/*.js',
    destination: 'dist/js/'
  },
  env: {
    prod: 'production',
    test: 'test',
    dev: 'development'
  },
  autoprefixer: {
    browsers: ['last 2 versions']
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
  babel: {
    presets: [
      'es2015',
      ['env', {
        targets: {
          browsers: ['last 2 versions']
        }
      }]
    ]
  },
  browserSync: {
    proxy: 'http://0.0.0.0:8080',
    open: 'external',
    xip: false,
    logConnections: false
  }
};
