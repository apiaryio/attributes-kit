import merge from 'lodash/merge';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import webpackClientNoReactConfig from '../webpack/clientNoReact';

export default merge({}, webpackClientNoReactConfig, {
  output: {
    filename: 'attributes-kit-no-react.min.js',
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
