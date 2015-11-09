import _ from 'underscore';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import webpackConfig from './base.config';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

export default _.extend({}, webpackConfig, {
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  entry: {
    'attributes-kit-server': path.join(__dirname, '../src/index'),
  },
  externals: nodeModules,
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(svg|css|styl)$/, 'node-noop'),
    new webpack.IgnorePlugin(/\.(svg|css|styl)$/)
  ],
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
    ]
  },
  node: {
    __filename: "true",
    __dirname: "true",
  },
});
