import React from 'react';
import MarkdownIt from 'markdown-it/dist/markdown-it';

import './description.styl';

class Description extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.md = new MarkdownIt('default', {
      html: true,
      linkify: true,
      typographer: true,
    });
  }

  render() {
    let description = null;

    if (this.props.data.meta) {
      if (this.props.data.meta.description) {
        description = this.props.data.meta.description;
      }
    }

    if (!description) {
      return false;
    }

    const markdownMarkup = {__html: this.md.render(description)};
    return (
      <div className="attributeDescription"
            dangerouslySetInnerHTML={markdownMarkup} />
    );
  }
}

export default Description;
