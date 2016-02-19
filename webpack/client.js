import lodash from 'lodash';
import path from 'path';

import baseWebpackConfig from './base';

export default lodash.extend({}, baseWebpackConfig, {
  entry: './src/index',

  output: {
    library: 'AttributesKit',
    libraryTarget: 'umd',
    path: path.join(__dirname, '../dist'),
  },
});
