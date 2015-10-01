import _ from 'underscore';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

const isProduction = process.env.NODE_ENV === 'production';

export default _.extend({}, baseConfig, {
  entry: (function() {
    let array = [
      './playground/app'
    ];

    if (!isProduction) {
      array.unshift('webpack/hot/only-dev-server');
      array.unshift('webpack-dev-server/client?http://0.0.0.0:8080');
    }

    return array;

  })(),

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'playground.js'
  },

  plugins: (function() {
    if (!isProduction) {
      return [new webpack.HotModuleReplacementPlugin()];
    }

    return [];
  })(),

  devtool: 'source-map'
});
