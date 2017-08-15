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
    proxy: null,
    open: false,
    xip: false,
    logConnections: false
  },
  patternlab: {
    command: 'php patternlab/core/console --generate',
    source: 'patternlab/source/_patterns/**/*.twig'
  }
};
