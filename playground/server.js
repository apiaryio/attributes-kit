import express from 'express';
import bodyparser from 'body-parser';
import msonZoo from 'mson-zoo';
import async from 'async';
import path from 'path';

import parseMson from './parseMson';

// Starts server
const app = express();

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/', express.static(path.join(__dirname, '/views')));

app.post('/parse', (req, res) => {
  parseMson(req.body.source, (err, attributes) => {
    if (err) {
      return res.status(400).json({error: err});
    }

    return res.json(attributes);
  });
});

app.get('/examples', (req, res) => {
  return res.sendFile(path.join(__dirname, '/views/examples.html'));
});

app.get('/fixtures', (req, res) => {
  async.map(msonZoo.samples, (sample, callback) => {
    parseMson(sample.code, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, {mson: sample.code, parsed: result, name: sample.name});
    });
  }, (err, result) => {
    if (err) {
      return res.status(400).json({error: err});
    }

    return res.json(result);
  });
});

const server = app.listen(9090, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is listening on ${host}:${port}`);
});
