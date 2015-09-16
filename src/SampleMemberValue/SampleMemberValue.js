import React from 'react';

import SampleEntry from 'SampleEntry/SampleEntry';

class SampleMemberValue extends React.Component {

  renderValue() {
    let value = this.props.data.content.value;
    if (typeof value === 'object') {
      return (<SampleEntry data={value} />)
    }

    return value;
  }

  render() {
    let content = this.props.data.content;
    return (
      <div>
        <div className="key">
          {content.key.content}
        </div>
        <div className="value">
          {this.renderValue()}
        </div>
      </div>
    );
  }
}

export default SampleMemberValue;
