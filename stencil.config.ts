import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { stylus } from '@stencil/stylus';
import cssnext from 'postcss-preset-env';

let config: Config = {
  namespace: 'nb-component',
  outputTargets: [
    { 
      type: 'dist',
      dir: process.env.CLIENT || 'dist'
    },
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
  globalStyle: process.env.NODE_ENV === 'production' ? null : 'src/global/main.styl',
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
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.excludeSrc = [];
  if (process.env.DEMO !== 'yes') {
    config.excludeSrc = ['/test/', '**/.spec.', '**/playground/**', '**/code/**'];
  }
  if (process.env.CLIENT === 'zyb') {
    config.excludeSrc = config.excludeSrc.concat([
      '**/ht-richtext/**', 
      '**/roll-picker/**', 
      '**/roll-picker/**', 
      '**/svg-icon/**',
      '**/pagination/**', 
      '**/canvas-radar/**'
    ]);
  }
  if (process.env.CLIENT === 'ht') {
    config.excludeSrc = config.excludeSrc.concat([
      '**/pull-to-do/**', 
      '**/marquee/**', 
      '**/affix/**', 
      '**/badge/**', 
      '**/roll-picker/**', 
      '**/switch/**', 
      '**/roll-picker/**', 
      '**/svg-icon/**', 
      '**/pagination/**', 
      '**/actionsheet/**', 
      '**/canvas-radar/**'
    ]);
  }
}

export { config };
