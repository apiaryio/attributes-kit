import request from 'superagent';

import dispatcher from '../dispatcher';
import types from './types';

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
    } else if (drafter !== undefined) {
      let attributes = {};
      let errors = '';
      try {
        const result = drafter.parse(source);
        const categories = result.content[0];
        if (categories.content[0]) {
          const category = categories.content[0];
          if (category.content[0]) {
            const resource = category.content[0];
            if (resource.content[0]) {
              attributes = resource.content[0];
            }
          }
        }
      } catch (e) {
        errors = e.message;
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
