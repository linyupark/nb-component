import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { stylus } from '@stencil/stylus';
import cssnext from 'postcss-preset-env';

let config: Config = {
  namespace: 'nb-component',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      dir: 'docs',
      baseUrl: '/nb-component/',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    {
      src: 'index.md'
    },
    {
      src: '_config.yml'
    }
  ],
  // enableCache: false,
  // globalStyle: 'src/global/main.styl',
  // globalScript: 'src/global/main.ts',
  plugins: [
    stylus({
      injectGlobalPaths: [
        'src/global/variables.styl',
        'src/global/functions.styl'
      ]
    }),
    postcss({
      plugins: [
        cssnext({
          browsers: ['iOS >= 8', 'Android >= 4']
        })
      ]
    })
  ],
};

if (process.env.NODE_ENV === 'production' && process.env.DEMO !== 'yes') {
  config.excludeSrc = ['/test/', '**/.spec.', '**/playground/**', '**/code/**']
}

export { config };