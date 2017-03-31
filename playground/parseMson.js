import get from 'lodash/get';
import isArray from 'lodash/isArray';
import drafterjs from 'drafter.js';

export default function parseMson(mson, cb) {
  drafterjs.parse(mson.trim(), {}, (err, parseResult) => {
    let dataStructureElements = [];

    if (err) {
      return cb(err);
    }

    if (get(parseResult, 'content[0].content[0].content')) {
      dataStructureElements = parseResult.content[0].content[0].content;
    }

    if (!isArray(dataStructureElements)) {
      return cb(null, []);
    }

    dataStructureElements = dataStructureElements.map((element) =>
      element.content[0]
    );

    return cb(null, dataStructureElements);
  });
}
