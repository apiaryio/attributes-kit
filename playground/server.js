import express from 'express';
import bodyparser from 'body-parser';
import protagonist from 'protagonist';
import dedent from 'dedent';
import mson_zoo from 'mson-zoo';
import async from 'async';

// Starts server
const app = express();

app.use(bodyparser.json());
app.use(express.static('dist'));
app.use('/', express.static(__dirname + '/views'));

app.post('/parse', (req, res) => {

  const attributes = parseMson(req.body.source, (err, attributes) => {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.json(attributes);
    }
  });
});

app.get('/fixtures', (req, res) => {
  async.map(mson_zoo.samples, (sample, callback) => {
    parseMson(sample.code, (err, result) => {
      if (err) {
        return callback(err);
      }

      return callback(null, {mson: sample.code, parsed: result, name: sample.name});
    });
  }, (err, result) => {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.json(result);
    }
  });
});

const server = app.listen(9090, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is listening on ${host}:${port}`);
});

const parseMson = (mson, cb) => {
  const lines = mson.split('\n');
  let source = dedent`
    FORMAT: 1A
    # Attributes
    # Group Test
    ## Test [/test]
    + Attributes
    `;

  lines.forEach((item) => {
    source += `
    ${item}`;
  });

  source += dedent`
    ### Retrieve [GET]
  `;

  protagonist.parse(source.trim(), function(err, result) {
    if (err) {
      return cb(err);
    }

    const categories = result.content[0];
    if (categories.content[0]) {
      const category = categories.content[0];
      if (category.content[0]) {
        const resource = category.content[0];
        if (resource.content[0]) {
          const dataStructure = resource.content[0];
          if (dataStructure.content[0]) {
            return cb(err, dataStructure.content[0]);
          }
        }
      }
    }

    return cb('No attribute parsed');
  });
};
