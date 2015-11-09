import React from 'react';
import _ from 'lodash';
import marked from 'marked';

import './description.styl'


class Description extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  renderStyles() {
    let styles = {
      root: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#8A93A3',
        lineHeight: '150%',
      }
    };

    return _.merge(styles, this.props.style || {});
  }

  render() {
    const styles = this.renderStyles();

    let description = null;

    if (this.props.element.meta) {
      if (this.props.element.meta.description) {
        description = this.props.element.meta.description;
      }
    }

    if (!description) {
      return false;
    }

    const markdownMarkup = {__html: marked(description)};

    return (
      <div
        style={styles.root}
        className="attributeDescription"
        dangerouslySetInnerHTML={markdownMarkup} />
    );
  }
}

export default Description;
