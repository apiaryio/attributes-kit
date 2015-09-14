import React from 'react';

import './value.styl';


class Value extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.value) {
      return false;
    }

    return (
      <div className="attributeValue">
        {this.props.value}
      </div>
    );
  }
}

Value.propTypes = {
  value: React.PropTypes.string,
};

export default Value;
