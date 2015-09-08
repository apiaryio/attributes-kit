import _ from 'underscore';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config';

export default _.extend({}, baseConfig, {
  entry: {
    playground: ['webpack/hot/dev-server', './playground/app'],
    'visual-testing': ['webpack/hot/dev-server', './playground/app']
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'source-map'
});
