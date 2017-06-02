import bodyparser from 'body-parser';
import express from 'express';
import msonZoo from 'mson-zoo';
import path from 'path';

import parseMson from './parseMson';
import parseJSONSchema from './schema';

// Starts server
const app = express();

app.use(bodyparser.json());

app.post('/parse', (req, res) => {
  // Attempt to JSON parse the req body to check if its a JSON schema
  try {
    const schema = JSON.parse(req.body.source);
    const dataStructures = parseJSONSchema(schema);
    return res.json({ dataStructures });
  } catch(error) {}

  parseMson(req.body.source, (err, dataStructures) =>
    res.json({ errors: err, dataStructures })
  );
});

app.get('/fixtures', (req, res) => res.json(msonZoo.samples));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(9090, 'localhost');
