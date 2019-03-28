import merge from 'lodash/merge';

import clientWebpackConfig from './client';

export default merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit-no-react-no-minim.js',
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
    'prop-types': {
      root: 'prop-types',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    },
    'minim': {
      root: 'minim',
      commonjs2: 'minim',
      commonjs: 'minim',
      amd: 'minim'
    },
  },

  devtool: 'source-map',
});
