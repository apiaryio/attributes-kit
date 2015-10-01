import _ from 'underscore';
import path from 'path';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DeduplePlugin from 'webpack/lib/optimize/DedupePlugin';

import baseConfig from './base.config';

const isProduction = process.env.NODE_ENV === 'production';
const plugins = [];

if (isProduction) {
  plugins.push(new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  plugins.push(new DeduplePlugin());
  plugins.push(new UglifyJsPlugin());
}

export default _.extend({}, baseConfig, {
  entry: './src/index',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: isProduction ? 'attributes-kit.min.js' : 'attributes-kit.js',
    library: 'AttributesKit',
    libraryTarget: 'umd'
  },

  plugins: plugins,

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
});
