import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import path from 'path';

import webpackConfig from '../webpack/playground';
import '../playground/server';

const compiler = webpack(webpackConfig);
const webpackServer = new WebpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../dist'),

  hot: true,
  quiet: false,
  noInfo: false,
  open: true,
  public: process.env.WEBPACK_PUBLIC_URL,

  proxy: {
    '*': 'http://localhost:9090',
  },
});

webpackServer.listen(process.env.PORT || 8080, () => {
  console.log('+--------------------------------------------+');
  console.log(`|Server is listening on http://localhost:8080|`);
  console.log('+--------------------------------------------+');
});
