import protagonist from 'protagonist';

export default function parseMson(mson, cb) {
  protagonist.parse(mson.trim(), (err, parseResult) => {
    let dataStructureElements;

    if (err) {
      return cb(err);
    }


    dataStructureElements = parseResult.content[0].content[0].content;

    dataStructureElements = dataStructureElements.map((element) =>
      element.content[0]
    );

    return cb(null, dataStructureElements);
  });
}
