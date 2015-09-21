import _ from 'underscore';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

import webpackConfig from './webpack.config';

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
    filename: 'server.js',
  },
  entry: [path.join(__dirname, '../scripts/generateFixtures')],
  externals: nodeModules,
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(css|styl)$/, 'node-noop'),
    new webpack.IgnorePlugin(/\.(css|styl)$/)
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
