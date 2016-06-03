import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import marked from 'marked';
import merge from 'lodash/merge';
import Radium, { Style } from 'radium';
import React from 'react';

@Radium
class Description extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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
        fontFamily: 'Source Sans Pro',
        fontSize: '13px',
        color: DESCRIPTION_COLOR,
        lineHeight: '150%',
        fontWeight: 'regular',
      },
    };

    return merge(style, this.props.style || {});
  };

  render() {
    const { DESCRIPTION_COLOR } = this.context.theme;
    const description = this.getDescription(this.props.element);

    if (!description) {
      return false;
    }

    const markdownMarkup = { __html: marked(description) };

    return (
      <div>
        <Style
          scopeSelector=".attributesKit"
          rules={{
            p: {
              marginBottom: '4px',
              fontFamily: 'Source Sans Pro',
              fontSize: '14px',
              color: DESCRIPTION_COLOR,
              lineHeight: '21px',
              fontWeight: 'regular',
            },
            'p:last-child': {
              marginBottom: '0px',
            },
            ul: {
              marginLeft: '20px',
            },
            a: {
              color: '#747E8E',
              textDecoration: 'none',
              borderBottom: '1px solid #DCE0E8',
            },
            'a:hover': {
              borderBottom: 'none',
            },
          }}
        />
        <div
          style={this.style.base}
          dangerouslySetInnerHTML={markdownMarkup}
        />
      </div>
    );
  }
}

export default Description;
