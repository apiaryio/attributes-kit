import async from 'async';
import colors from 'colors';
import path from 'path';
import Table from 'cli-table';
import webpack from 'webpack';
import lodash from 'webpack';

import webpackClientFullConfig from '../webpack/clientFull';
import webpackClientFullMinConfig from '../webpack/clientFullMin';
import webpackClientNoReactConfig from '../webpack/clientNoReact';
import webpackClientNoReactMinConfig from '../webpack/clientNoReactMin';
import webpackClientNoDepsConfig from '../webpack/clientNoDeps';
import webpackClientNoDepsMinConfig from '../webpack/clientNoDepsMin';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

function createClientBuild(webpackConfig, cb) {
  var table = new Table();

  table.push(
    [
      'File Name'.grey.bold,
      (webpackConfig.output.filename).white
    ],
    [
      'Environment'.grey.bold,
      (process.env.NODE_ENV).white
    ],
    [
      'Externals'.grey.bold,
      (Object.keys(webpackConfig.externals || {}).join(', ')).white
    ],
    [
      'Library Target'.grey.bold,
      (webpackConfig.output.libraryTarget).white
    ],
    [
      'Dev Tools'.grey.bold,
      (webpackConfig.devtool || '').white
    ],
  );

  console.log();
  console.log(table.toString());

  const compiler = webpack(webpackConfig, (err, stat) => {
    if (err) {
      console.error('\nAn error occured, unable to create a server build.'.red.bold);
      console.error(err);
      cb(err);
    }
    console.log(
      '\nSuccess!'.green.bold,
      `(${((stat.endTime - stat.startTime) / 1000)} seconds)\n`.grey
    );


    Object.keys(stat.compilation.assets).forEach(function(asset) {
      console.log('+'.grey, (asset).white);
    })

    cb();
  });
};

console.log('Creating the client builds…'.white.bold);

async.series([
  function(next) {
    createClientBuild(webpackClientFullConfig, next);
  },
  function(next) {
    createClientBuild(webpackClientFullMinConfig, next);
  },
  function(next) {
    createClientBuild(webpackClientNoReactConfig, next);
  },
  function(next) {
    createClientBuild(webpackClientNoReactMinConfig, next);
  },
  function(next) {
    createClientBuild(webpackClientNoDepsConfig, next);
  },
  function(next) {
    createClientBuild(webpackClientNoDepsMinConfig, next);
  },
], function(error) {
  if (error) {
    console.error('\nAn error occured, unable to create a server build.'.red.bold);
    throw error;
  }

  console.log('\nAll good!\n'.green.bold);
});
