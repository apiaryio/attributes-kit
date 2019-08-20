import merge from 'lodash/merge';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import clientWebpackConfig from './client';

export default merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit.min.js',
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsPlugin(),
  ],

  devtool: false,
});
