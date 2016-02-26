import merge from 'lodash/merge';

import clientWebpackConfig from './client';

export default merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit-no-deps.js',
  },

  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'react-dom',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'marked': {
      root: 'marked',
      commonjs2: 'marked',
      commonjs: 'marked',
      amd: 'marked',
    },
    'lodash': {
      root: 'lodash',
      commonjs2: 'lodash',
      commonjs: 'lodash',
      amd: 'lodash',
    },
    'eidolon': {
      root: 'eidolon',
      commonjs2: 'eidolon',
      commonjs: 'eidolon',
      amd: 'eidolon',
    },
  },

  devtool: 'source-map',
});
