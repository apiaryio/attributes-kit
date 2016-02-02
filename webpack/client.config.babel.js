import lodash from 'lodash';
import path from 'path';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DeduplePlugin from 'webpack/lib/optimize/DedupePlugin';

import baseConfig from './base.config.babel';

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

export default lodash.extend({}, baseConfig, {
  entry: './src/index',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: isProduction ? 'attributes-kit-no-react.min.js' : 'attributes-kit-no-react.js',
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
    },
    'react-dom': {
      root: 'react-dom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }

  }
});
