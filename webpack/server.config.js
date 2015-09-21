import _ from 'underscore';
import path from 'path';
import webpackConfig from './webpack.config';

export default _.extend({}, webpackConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
    library: 'server',
    libraryTarget: 'var'
  },
  target: 'node',
  externals: {},
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.styl$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
    ]
  },

});
