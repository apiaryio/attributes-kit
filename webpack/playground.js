import merge from 'lodash/merge';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

export default merge({}, baseConfig, {
  entry: './playground/app.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'playground.js',
  },

  plugins: (function () {
    const pluginsArray = [];
    if (!isProduction) {
      pluginsArray.push(new webpack.HotModuleReplacementPlugin());
    } else {
      pluginsArray.push(new UglifyJsPlugin());
    }

    return pluginsArray;
  })(),

  devtool: 'source-map',
});
