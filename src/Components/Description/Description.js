import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import marked from 'marked';
import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_FONT_FAMILY } from '../../Constants/fonts';
import { isMember } from '../../Modules/ElementUtils/type';

marked.setOptions({
  sanitize: true,
});

@Radium
class Description extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    style: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static getDescription(element) {
    if (element.meta && element.meta.description) {
      if (isString(element.meta.description)) {
        return element.meta.description;
      }

      if (isObject(element.meta.description)) {
        return element.meta.description.content;
      }
    }

    return null;
  };

  get style() {
    const { DESCRIPTION_COLOR } = this.context.theme;

    const style = {
      base: {
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: '13px',
        color: DESCRIPTION_COLOR,
        lineHeight: '150%',
        fontWeight: 'regular',
      },
    };

    return merge(style, this.props.style || {});
  };

  render() {
    let description = Description.getDescription(this.props.element);

    if (!description && isMember(this.props.element)) {
      const content = this.props.element.content;
      if (content && content.value) {
        description = Description.getDescription(content.value);
      }
    }

    if (!description) {
      return false;
    }

    const markdownMarkup = { __html: marked(description) };

    return (
      <div>
        <div
          style={this.style.base}
          dangerouslySetInnerHTML={markdownMarkup}
        />
      </div>
    );
  }
}

export default Description;
