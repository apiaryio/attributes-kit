import isArray from 'lodash/isArray';
import protagonist from 'protagonist';

export default function parseMson(mson, cb) {
  protagonist.parse(mson.trim(), (err, parseResult) => {
    let dataStructureElements = [];

    if (err) {
      return cb(err);
    }

    if (
      parseResult.content &&
      parseResult.content[0] &&
      parseResult.content[0].content &&
      parseResult.content[0].content[0] &&
      parseResult.content[0].content[0].content
    ) {
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
