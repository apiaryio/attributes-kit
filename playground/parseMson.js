import protagonist from 'protagonist';

export default function parseMson(mson, cb) {
  protagonist.parse(mson.trim(), (err, parseResult) => {
    if (err) {
      return cb(err);
    }

    var dataStructureElements = parseResult.content[0].content;

    dataStructureElements = dataStructureElements.map((element) =>
      element.content[0].content[0]
    );

    cb(null, dataStructureElements);
  });
}
