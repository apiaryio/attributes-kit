import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import path from 'path';

import '../playground/server';
import webpackConfig from './playground.config';

// Starts webpack-dev-server
const compiler = Webpack(webpackConfig);
const webpackServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, './dist'),

  hot: true,
  inline: true,
  quiet: false,
  noInfo: false,

});

webpackServer.listen(8080, 'localhost', () => {
  console.log('Webpack server is running');
});
