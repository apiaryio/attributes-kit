import get from 'lodash/get';

const fury = require('fury');
const apibParser = require('fury-adapter-apib-parser');
const minim = require('minim');
const parseResultNamespace = require('minim-parse-result');

const minimNamespace = minim.namespace();

fury.use(parseResultNamespace);
fury.use(apibParser);


export default function parseMson(mson, cb) {
  fury.parse({ source: `FORMAT: 1A\n${mson.trim()}` }, (err, parseResult = {}) => {
    let dataStructures;
    dataStructures = minimNamespace.toRefract(parseResult.api.dataStructures.first);
    dataStructures = dataStructures.content;
    cb(err, dataStructures);
  });
}
