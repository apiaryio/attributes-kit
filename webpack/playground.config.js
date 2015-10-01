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
    filename: 'playground.js'
  },

  plugins: (function(){
    if (process.env.NODE_ENV !== 'production')
      return [new webpack.HotModuleReplacementPlugin()]
  })(),

  devtool: 'source-map'
});
