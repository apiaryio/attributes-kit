import path from 'path';

export default {
  context: path.join(__dirname, '../'),

  entry: undefined,
  output: undefined,

  // Resolve the `./src` directory so we can avoid writing
  // ../../styles/base.css
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.svg',
    ],
  },

  // Instruct webpack how to handle each file type that it might encounter
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=images/[name].[ext]',
      },
      {
        test: /\.(svg)$/,
        loader: 'svg-url-loader',
      },
    ],
  },
};
