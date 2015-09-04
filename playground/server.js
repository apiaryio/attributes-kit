import Express from 'express';
import BodyParser from 'body-parser';
import Protagonist from 'protagonist';
import Dedent from 'dedent'
import mson_zoo from 'mson-zoo'

// Starts server
const app = Express();

app.use(BodyParser.json());
app.use(Express.static('dist'));
app.use('/', Express.static(__dirname + '/views'));

app.post('/parse', (req, res) => {

  const attributes = parseMson(req.body.source, (err, attributes) => {
    if (err) {
      return res.status(400).json({error: err});
    } else {
      return res.json(attributes);
    }
  });
});

app.get('/visual-data', (req, res) => {
  res.json(mson_zoo.samples);
})

const server = app.listen(9090, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is listening on ${host}:${port}`);
});


const parseMson = (mson, cb) => {
  const lines = mson.split('\n');
  let source = Dedent`
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

  source += Dedent`
    ### Retrieve [GET]
  `;

  Protagonist.parse(source.trim(), function(err, result) {
    if (err) {
      return cb(err);
    }

    let attributes = null;

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
