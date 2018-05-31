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
    'minim/lib/serialisers/json-0.6': {
      root: 'minim/lib/serialisers/json-0.6',
      commonjs2: 'minim/lib/serialisers/json-0.6',
      commonjs: 'minim/lib/serialisers/json-0.6',
      amd: 'minim/lib/serialisers/json-0.6'
    },
    'minim-parse-result': {
      root: 'minim-parse-result',
      commonjs2: 'minim-parse-result',
      commonjs: 'minim-parse-result',
      amd: 'minim-parse-result'
    },
  },

  devtool: 'source-map',
});
