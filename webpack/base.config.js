import path from 'path';
import nib from 'nib';

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
      '.styl',
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
        loaders: ['react-hot', 'babel-loader?stage=0']
      },
      {
        test: /json-formatter-js\/src\/\w+.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
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

  stylus: {
    use: [nib()],
    import: ['nib']
  }
};
