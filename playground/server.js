import express from 'express';
import bodyparser from 'body-parser';
import msonZoo from 'mson-zoo';
import async from 'async';
import path from 'path';
import dedent from 'dedent';

import parseMson from './parseMson';

// Starts server
const app = express();

app.use(bodyparser.json());

app.post('/parse', (req, res) => {
  parseMson(req.body.source, (err, attributes) => {
    return res.json({ errors: err, attributes });
  });
});

app.get('/fixtures', (req, res) => {
  async.map(msonZoo.samples, (sample, callback) => {
    const header = dedent`
      # Data Structures

      ## MSON Struct
    `;

    parseMson(`${header}\n${sample.code}`, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, { mson: sample.code, parsed: result, name: sample.name });
    });
  }, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    return res.json(result);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(9090, 'localhost', () => {});
