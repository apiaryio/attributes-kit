import path from 'path';
import nib from 'nib';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  context: path.join(__dirname, '../'),

  entry: undefined,
  output: undefined,

  // Resolve the `./src` directory so we can avoid writing
  // ../../styles/base.css
  resolve: {
    modulesDirectories: [
      'node_modules',
      './src'
    ],

    extensions: [
      '',
      '.js',
      '.jsx',
      '.svg'
    ]
  },

  resolveLoader: {
    modulesDirectories: [
      'node_modules',
      './webpack/loaders'
    ]
  },

  // Instruct webpack how to handle each file type that it might encounter
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: (function() {
          const loaders = ['babel-loader'];
          if (!isProduction) {
            loaders.unshift('react-hot');
          }
          return loaders;
        })()
      },
      {
        test: /json-formatter-js\/src\/\w+.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-loader'
      }
    ]
  },
};
