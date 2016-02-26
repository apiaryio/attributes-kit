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
      root: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: DESCRIPTION_COLOR,
        lineHeight: '150%',
      },
    };

    return merge(style, this.props.style || {});
  };

  render() {
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
          style={this.style.root}
          className="attributeDescription"
          dangerouslySetInnerHTML={markdownMarkup}
        />
      </div>
    );
  }
}

export default radium(Description);
