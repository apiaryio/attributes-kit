import merge from 'lodash/merge';

import clientWebpackConfig from './client';

export default merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit.js',
  },

  devtool: 'source-map',
});
