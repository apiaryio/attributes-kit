import 'colors';
import path from 'path';
import Table from 'cli-table';
import webpack from 'webpack';

import webpackServerConfig from '../webpack/server';

process.env.NODE_ENV = 'production';

console.log('\nCreating the server build…\n'.white.bold);

var table = new Table();

table.push(
    [
      'File Name'.grey.bold,
      'attributes-kit-server.js'.white
    ],
    [
      'Environment'.grey.bold,
      (process.env.NODE_ENV).white
    ]
);

console.log(table.toString())

const compiler = webpack(webpackServerConfig, (err, stat) => {
  if (err) {
    console.error('\nAn error occured, unable to create a server build.'.red.bold);
    throw err;
  }

  console.log(
    '\nSuccess!'.green.bold,
    `(${((stat.endTime - stat.startTime) / 1000)} seconds)\n`.grey
  );
});
