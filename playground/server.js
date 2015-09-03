import Express from 'express';
import BodyParser from 'body-parser';
import Protagonist from 'protagonist';

// Starts server
const app = Express();

app.use(BodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/parse', function(req, res) {

  const lines = req.body.source.split('\n');
  let source =`
FORMAT: 1A
# Attributes

# Group Test

## Test [/test]

+ Attributes
`
  lines.forEach((item) => {
    source += `
    ${item}`
  });

source += `

### Retrieve [GET]
  `;

  Protagonist.parse(source.trim(), function(err, result) {
    if (err) {
      return res.status(400).json({error: err})
    }

    var attributes = null;

    const categories = result.content[0];
    if (categories.content[0]) {
      const category = categories.content[0];
      if (category.content[0]) {
        const resource = category.content[0];
        if (resource.content[0]) {
          const dataStructure = resource.content[0];
          if (dataStructure.content[0]) {
            attributes = dataStructure.content[0];
          }
        }
      }
    }

    if (attributes) {
      res.json(attributes);
    } else {
      res.status(400).json({error: 'No attribute parsed'});
    }
  });
});

const server = app.listen(9090, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Server is listening on ${host}:${port}`);
});
