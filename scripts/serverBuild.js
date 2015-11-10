import Webpack from 'webpack';
import path from 'path';

import serverConfig from '../webpack/server.config';

const compiler = Webpack(serverConfig, (err, stat) => {});
