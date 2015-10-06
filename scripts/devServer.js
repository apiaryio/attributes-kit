import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import path from 'path';

import webpackConfig from '../webpack/playground.config';
import '../playground/server';

const compiler = Webpack(webpackConfig);
const webpackServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../dist'),

  hot: true,
  quiet: false,
  noInfo: false,

  proxy: {
    '*': 'http://localhost:9090'
  }
});

webpackServer.listen(process.env.PORT || 8080, () => {
  console.log('Webpack server is running');
});
