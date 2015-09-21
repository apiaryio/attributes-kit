import _ from 'underscore';
import path from 'path';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
  entry: {
    attributes: './src/index'
  },

  // TODO: add support to minified version and .min.js filename
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    library: 'Attributes',
  },

  externals: {
    'react': 'react'
  }
});
