import request from 'superagent';

import dispatcher from '../dispatcher';
import types from './types';
import drafter from 'drafter.js';

export default {
  parse(source, clientSideParsing) {
    if (clientSideParsing === false) {
      request
        .post('/parse')
        .send({source})
        .set('Accept', 'application/json')
        .end((err, res) => {
          dispatcher.dispatch({
            type: types.MSON_PARSED,
            attributes: res.body.attributes,
            errors: res.body.errors,
          });
        });
    } else {
      let attributes = '';
      let errors = '';
      try {
        attributes = drafter.parse(source);
      } catch (e) {
        errors = e.toString();
      } finally {
        dispatcher.dispatch({
          type: types.MSON_PARSED,
          attributes: attributes,
          errors: errors,
        });
      }
    }
  },
};
