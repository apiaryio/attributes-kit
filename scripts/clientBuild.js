import Webpack from 'webpack';
import path from 'path';

import clientConfig from '../webpack/client.config';

const compiler = Webpack(clientConfig, (err, stat) => {
  console.info('Webpack client build done.');
});
