import lodash from 'lodash';
import merge from 'lodash/merge';
import keys from 'lodash/keys';
import each from 'lodash/each';

import clientWebpackConfig from './client';

const packageJson = require('../package.json');

let externals = {
  'abagnale/lib/abagnale': {
    root: 'abagnale',
    commonjs2: 'abagnale',
    commonjs: 'abagnale',
    amd: 'abagnale',
  },
};

each(keys(lodash), => {
  externals[`lodash/${method}`] = {
    root: `lodash/${method}`,
    commonjs2: `lodash/${method}`,
    commonjs: `lodash/${method}`,
    amd: `lodash/${method}`,
  };
});

each(keys(packageJson.devDependencies), (devDependency) => {
  externals[devDependency] = {
    root: devDependency,
    commonjs2: devDependency,
    commonjs: devDependency,
    amd: devDependency,
  };
});

export default merge({}, clientWebpackConfig, {
  output: {
    filename: 'attributes-kit-no-deps.js',
  },

  externals,

  devtool: 'source-map',
});
