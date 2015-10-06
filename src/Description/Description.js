import React from 'react';
import marked from 'marked';

import './description.styl';

class Description extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
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

    const markdownMarkup = {__html: marked(description)};
    return (
      <div className="attributeDescription"
            dangerouslySetInnerHTML={markdownMarkup} />
    );
  }
}

export default Description;
