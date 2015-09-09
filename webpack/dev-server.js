import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import path from 'path';

import playgroundConfig from './playground.config';
import testConfig from './test.config';
import '../playground/server';

// Starts webpack-dev-server
var webpackConfig = playgroundConfig;
if (process.env.NODE_ENV === 'test') {
  webpackConfig = testConfig;
}

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

webpackServer.listen(8080, 'localhost', () => {
  console.log('Webpack server is running');
});
