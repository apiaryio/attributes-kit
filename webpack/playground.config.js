import _ from 'underscore';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

const isProduction = process.env.NODE_ENV === 'production';

export default _.extend({}, baseConfig, {
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
    }

    return pluginsArray;
  })(),

  devtool: 'source-map'
});
