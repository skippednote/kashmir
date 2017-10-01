module.exports = {
  rtl: true,
  styles: {
    source: [
      'sass/**/*.scss',
      'components/**/*.scss',
    ],
    directionalSource: [
      'sass/**/*.ltr.scss',
      'components/**/*.ltr.scss',
    ],
    destination: 'dist/css/',
    options: {
      outputStyle: 'expanded',
      includePaths: [
        './node_modules',
      ],
    },
    variables: {
      $direction: 'rtl',
    },
  },
  scripts: {
    source: [
      'js/**/*.js',
      'components/_patterns/**/*.js',
    ],
    destination: 'dist/js/',
  },
  svg: {
    source: 'images/icons/svg/**/*.svg',
    destination: 'dist/images/icons/svg/',
  },
  env: {
    prod: 'production',
    test: 'test',
    dev: 'development',
  },
  autoprefixer: {
    browsers: ['last 2 versions'],
  },
  stylelint: {
    options: {
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    },
    optionsTest: {
      reporters: [
        {
          formatter: 'string',
          console: true,
          failAfterError: true,
        },
      ],
    },
  },
  eslint: {
    options: {
      fix: false,
    },
  },
  babel: {
    presets: [
      'es2015',
      ['env', {
        targets: {
          browsers: ['last 2 versions'],
        },
      }],
    ],
  },
  browserSync: {
    proxy: null,
    open: true,
    xip: false,
    logConnections: false,
  },
  patternlab: {
    command: 'php patternlab/core/console --generate',
    source: [
      'components/**/*.twig',
      'components/**/*.yml',
    ],
  },
};
