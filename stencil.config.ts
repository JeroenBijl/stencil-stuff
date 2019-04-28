import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'cw-components',
  srcDir: './src',
  outputTargets: [
    {
      dir: 'dist',
      type: 'dist',
    }
  ],
  plugins: [
    sass()
  ],
};
