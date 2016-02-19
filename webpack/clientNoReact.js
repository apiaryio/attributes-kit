import lodash from 'lodash';

import clientWebpackConfig from './client';

export default lodash.merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit-no-react.js',
  },

  externals: {
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
  },

  devtool: 'source-map',
});
