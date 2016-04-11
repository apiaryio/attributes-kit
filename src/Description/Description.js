import React from 'react';
import merge from 'lodash/merge';
import marked from 'marked';
import radium, { Style } from 'radium';

class Description extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    style: React.PropTypes.object,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
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
        marginTop: '10px',
      },
    };

    return merge(style, this.props.style || {});
  };

  render() {
    const { DESCRIPTION_COLOR } = this.context.theme;

    let description = null;

    if (this.props.element.meta) {
      if (this.props.element.meta.description) {
        description = this.props.element.meta.description;
      }
    }

    if (!description) {
      return false;
    }

    const markdownMarkup = { __html: marked(description) };

    return (
      <div>
        <Style
          scopeSelector=".attributeDescription"
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
          }}
        />
        <div
          style={this.style.base}
          className="attributeDescription"
          dangerouslySetInnerHTML={markdownMarkup}
        />
      </div>
    );
  }
}

export default radium(Description);
