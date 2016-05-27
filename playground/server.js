import express from 'express';
import bodyparser from 'body-parser';

import async from 'async';
import path from 'path';
import dedent from 'dedent';

import msonZoo from 'mson-zoo';

import parseMson from './parseMson';

// Starts server
const app = express();

app.use(bodyparser.json());

app.post('/parse', (req, res) => {
  parseMson(req.body.source, (err, dataStructures) =>
    res.json({ errors: err, dataStructures })
  );
});

app.get('/fixtures', (req, res) => {
  return res.json(msonZoo.samples);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(9090, 'localhost');
