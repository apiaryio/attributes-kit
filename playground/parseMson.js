const fury = require('fury');
const apibParser = require('fury-adapter-apib-parser');

fury.use(apibParser);


export default function parseMson(mson, cb) {
  fury.parse({ source: mson, mediaType: 'text/vnd.apiblueprint' }, (err, parseResult = {}) => {
    cb(err, fury.minim.toRefract(parseResult.api.dataStructures.first));
  });
}
