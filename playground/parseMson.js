import protagonist from 'protagonist';

export default function parseMson(mson, cb) {
  protagonist.parse(mson.trim(), (err, result) => {
    try {
      const categories = result.content[0];
      if (categories.content[0]) {
        const category = categories.content[0];
        if (category.content[0]) {
          const resource = category.content[0];
          if (resource.content[0]) {
            const dataStructure = resource.content[0];
            return cb(err, dataStructure);
          }
        }
      }

      return cb({
        code: 0,
        message: 'No attributes found in the payload.',
        location: [],
      });
    } catch (e) {
      return cb(err);
    }
  });
}
