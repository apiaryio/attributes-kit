import merge from 'lodash/merge';
import path from 'path';

import baseWebpackConfig from './base';

export default merge({}, baseWebpackConfig, {
  entry: './src/index',

  output: {
    library: 'AttributesKit',
    libraryTarget: 'umd',
    path: path.join(__dirname, '../dist'),
  },
});
