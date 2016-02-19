import lodash from 'lodash';

import clientWebpackConfig from './client';

export default lodash.merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit.js',
  },

  devtool: 'source-map',
});
