import protagonist from 'protagonist';
import dedent from 'dedent';

export default function parseMson (mson, cb) {
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
