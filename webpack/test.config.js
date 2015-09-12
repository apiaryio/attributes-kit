import _ from 'underscore';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './playground/app'
  ],

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'test.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'source-map'
});
