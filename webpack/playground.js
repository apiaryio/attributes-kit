import lodash from 'lodash';
import path from 'path';
import webpack from 'webpack';
import baseConfig from './base.config.babel';

const isProduction = process.env.NODE_ENV === 'production';

export default lodash.merge({}, baseConfig, {
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

  resolve: {
    alias: {
      brace: 'react-ace/node_modules/brace',
    },
  },

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
