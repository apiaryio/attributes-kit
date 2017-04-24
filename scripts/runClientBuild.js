import 'colors';
import Table from 'cli-table';
import webpack from 'webpack';

import webpackClientFullConfig from '../webpack/clientFull';
import webpackClientFullMinConfig from '../webpack/clientFullMin';
import webpackClientNoReactConfig from '../webpack/clientNoReact';
import webpackClientNoReactMinConfig from '../webpack/clientNoReactMin';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

function createClientBuild(webpackConfig) {
  const table = new Table();

  table.push(
    [
      'File Name'.grey.bold,
      (webpackConfig.output.filename).white,
    ],
    [
      'Environment'.grey.bold,
      (process.env.NODE_ENV).white,
    ],
    [
      'Externals'.grey.bold,
      (Object.keys(webpackConfig.externals || {}).join('\n')).white,
    ],
    [
      'Library Target'.grey.bold,
      (webpackConfig.output.libraryTarget).white,
    ],
    [
      'Dev Tools'.grey.bold,
      (webpackConfig.devtool || '').white,
    ],
  );

  console.log();
  console.log(table.toString());

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stat) => {
      if (err || stat.errors) {
        console.error('\nAn error occured, unable to build.'.red.bold);
        console.error(err, stat.errors);
        return reject(err);
      }

      console.log(
        '\nSuccess!'.green.bold,
        `(${((stat.endTime - stat.startTime) / 1000)} seconds)\n`.grey
      );

      Object.keys(stat.compilation.assets).forEach((asset) => {
        console.log('+'.grey, (asset).white);
      });

      return resolve();
    });
  });
};

console.log('Creating the client builds…'.white.bold);

Promise.resolve()
  .then(() => createClientBuild(webpackClientFullConfig))
  .then(() => createClientBuild(webpackClientFullMinConfig))
  .then(() => createClientBuild(webpackClientNoReactConfig))
  .then(() => createClientBuild(webpackClientNoReactMinConfig))
  .then(() => { console.log('\nAll good!\n'.green.bold); })
  .catch((error) => {
    console.error('\nAn error occured, unable to build.'.red.bold, error);
    process.exit(1);
  });
