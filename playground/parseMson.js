import get from 'lodash/get';
import drafterjs from 'drafter.js';

export default function parseMson(mson, cb) {
  drafterjs.parse(mson.trim(), {}, (err, parseResult = {}) =>
    cb(err, get(parseResult, 'content[0].content[0].content', []).map(el => el.content[0]))
  );
}
