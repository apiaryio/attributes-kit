import request from 'superagent';

import dispatcher from '../dispatcher';
import types from './types';

export default {
  parse(source) {
    request
      .post('/parse')
      .send({source})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          return console.error(res.text);
        }

        dispatcher.dispatch({
          type: types.MSON_PARSED,
          attributes: res.body,
        });
      });
  },
};
