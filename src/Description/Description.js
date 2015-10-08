import React from 'react';
import marked from 'marked';

import './description.styl';

class Description extends React.Component {
  static propTypes = {
    description: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.description) {
      return false;
    }

    const markdownMarkup = {__html: marked(this.props.description)};
    return (
      <div className="attributeDescription"
            dangerouslySetInnerHTML={markdownMarkup} />
    );
  }
}

export default Description;
