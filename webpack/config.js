import path from 'path';

export default {
  context: path.join(__dirname, '../'),

  entry: {
    attributes: './src/Attributes/Attributes',
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },

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

  // Instruct webpack how to handle each file type that it might encounter
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
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
        loader: 'file-loader'
      },
      {
        test: /\.(md)$/,
        loader: 'raw-loader'
      }

    ]
  },

  devtool: 'source-map',

  stylus: {
    use: [require('nib')()],
    import: ['nib']
  },
};
