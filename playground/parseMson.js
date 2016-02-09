import protagonist from 'protagonist';

export default function parseMson(mson, cb) {
  protagonist.parse(mson.trim(), (err, result) => {
    try {
      const api = result.content[0];
      if (api.content[0]) {
        const dataStructures = api.content[0];
        if (dataStructures.content.length) {
          // We return a list of data structures *without* the `dataStructure`
          // element. For example, you may get a plain array of refract
          // objects which each have a `meta.id`.
          return cb(err, dataStructures.content.map((item) => item.content[0]));
        }
      }

      return cb({
        code: 0,
        message: 'No data structures found in the payload.',
        location: [],
      });
    } catch (e) {
      return cb(err);
    }
  });
}
