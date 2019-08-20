import merge from 'lodash/merge';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

import webpackConfig from './base';

export default merge({}, webpackConfig, {
  target: 'node',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  entry: {
    'attributes-kit-server': path.join(__dirname, '../src/index'),
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.(svg|css|styl)$/, 'node-noop'),
    new webpack.IgnorePlugin(/\.(svg|css|styl)$/),
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
});
