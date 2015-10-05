import Webpack from 'webpack';
import path from 'path';

import clientConfig from '../webpack/client.config';
if (process.argv.length > 3 ) {
  if (process.argv[3] == 'full') {
    console.info("Performing a full dep client build.")
    clientConfig.externals = {};
  }
  else if (process.argv[3] == 'none') {
    console.info("Performing a no dep client build.")
   clientConfig.externals = {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'classnames': {
      root: 'classnames',
      commonjs2: 'classnames',
      commonjs: 'classnames',
      amd: 'classnames'
    },
    'marked': {
      root: 'marked',
      commonjs2: 'marked',
      commonjs: 'marked',
      amd: 'marked'
    },
   };
  }
}

const compiler = Webpack(clientConfig, (err, stat) => {
  console.info('Webpack client build done.');
});
