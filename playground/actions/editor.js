import request from 'superagent';

import dispatcher from '../dispatcher';
import types from './types';

export default {
  parse(source) {
    request
      .post('/parse')
      .send({ source })
      .set('Accept', 'application/json')
      .end((err, res) => {
        dispatcher.dispatch({
          type: types.MSON_PARSED,
          dataStructures: res.body.dataStructures,
          errors: res.body.errors,
        });
      });
  },
};
