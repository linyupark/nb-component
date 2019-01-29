import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { stylus } from '@stencil/stylus';
import cssnext from 'postcss-preset-env';

export const config: Config = {
  namespace: 'nb-component',
  outputTargets: [
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      dir: 'docs',
      serviceWorker: null // disable service workers
    }
  ],
  // enableCache: false,
  globalStyle: 'src/global/main.styl',
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
  excludeSrc: ['/test/', '**/.spec.', '**/playground/**']
};
