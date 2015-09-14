import React from 'react';

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

    return (
      <div className="attributeDescription">
        {description}
      </div>
    );
  }
}

export default Description;
