import merge from 'lodash/merge';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import webpackClientNoReactNoMinimConfig from '../webpack/clientNoReactNoMinim';

export default merge({}, webpackClientNoReactNoMinimConfig, {
  output: {
    filename: 'attributes-kit-no-react-no-minim.min.js',
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
