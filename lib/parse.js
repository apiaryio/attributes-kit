import drafter from 'drafter.js';
import get from 'lodash/get';

export default (mson) => {
  const header = '# Data Structures\n';
  if (!mson.startsWith(header)) {
    mson = header + mson;
  }
  return get(drafter.parse(mson, { generateSourceMap: true }), 'content[0].content[0].content', [])
      .map(e => e.content[0]);
};
