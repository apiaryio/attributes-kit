import Webpack from 'webpack';
import path from 'path';

import clientConfig from '../webpack/client.config';

const isProduction = process.env.NODE_ENV === 'production';

if (process.argv.length > 3 ) {
  if (process.argv[3] === 'full') {
    clientConfig.externals = {};
    clientConfig.output.filename = isProduction ? 'attributes-kit.min.js' : 'attributes-kit.js';
  }
  else if (process.argv[3] === 'noDep') {
    clientConfig.output.filename = isProduction ? 'attributes-kit-no-deps.min.js' : 'attributes-kit-no-deps.js';
    clientConfig.externals = {
     'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
     'react-dom': {
      root: 'react-dom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
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
  if (err)
    console.log(err);
});
