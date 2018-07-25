import merge from 'lodash/merge';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';

const isProduction = process.env.NODE_ENV === 'production';

export default merge({}, baseConfig, {
  entry: (function() {
    let entryArray = [
      './playground/app'
    ];

    if (!isProduction) {
      entryArray.unshift('webpack/hot/only-dev-server');
      entryArray.unshift('webpack-dev-server/client?http://0.0.0.0:8080');
    }

    return entryArray;

  })(),

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'playground.js'
  },

  plugins: (function() {
    let pluginsArray = [];
    if (!isProduction) {
      pluginsArray.push(new webpack.HotModuleReplacementPlugin());
    } else {
      pluginsArray.push(new UglifyJsPlugin());
    }

    return pluginsArray;
  })(),

  devtool: 'source-map',
});
