import lodash from 'lodash';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DeduplePlugin from 'webpack/lib/optimize/DedupePlugin';

import clientWebpackConfig from './client';

export default lodash.merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit.min.js',
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new DeduplePlugin(),
    new UglifyJsPlugin(),
  ],

  devtool: null,
});
