import _ from 'underscore';
import path from 'path';
import baseConfig from './base.config';

const isProduction = process.env.NODE_ENV === 'production';

export default _.extend({}, baseConfig, {
  entry: './src/seed',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: isProduction ? 'attributes-kit.min.js' : 'attributes-kit.js',
    library: 'AttributesKit',
    libraryTarget: 'umd'
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
});
