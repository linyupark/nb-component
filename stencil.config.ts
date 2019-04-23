import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { stylus } from '@stencil/stylus';
import cssnext from 'postcss-preset-env';
import fs from 'fs';
import path from 'path';

/**
 * 包含哪些组件
 * @param names 组件目录名数组
 */
const excludeSrcExcept = (names: string[]) => {
  const dirs = fs.readdirSync(path.resolve('src/components'));
  const excludeDirs = dirs.filter(dir => {
    return !~names.indexOf(dir);
  });
  return excludeDirs.map(dir => {
    return `**/${dir}/**`;
  });
};

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
  globalStyle:
    process.env.NODE_ENV === 'production' ? null : 'src/global/main.styl',
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
    config.excludeSrc = [
      '/test/',
      '**/.spec.',
      '**/playground/**',
      '**/code/**'
    ];
  }
  if (process.env.CLIENT === 'zyb') {
    config.excludeSrc = excludeSrcExcept([
      'actionsheet',
      'affix',
      'badge',
      'list',
      'list-item',
      'marquee',
      'switch'
    ]);
  }
  if (process.env.CLIENT === 'ht') {
    config.excludeSrc = excludeSrcExcept(['affix', 'ht-richtext', 'list', 'list-item']);
  }
}

export { config };
