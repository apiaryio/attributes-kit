import merge from 'lodash/merge';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import DeduplePlugin from 'webpack/lib/optimize/DedupePlugin';

import webpackClientNoReactNoMinimConfig from '../webpack/clientNoReactNoMinim';

export default merge({}, webpackClientNoReactNoMinimConfig, {
  output: {
    filename: 'attributes-kit-no-react-no-minim.min.js',
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

  devtool: false,
});
