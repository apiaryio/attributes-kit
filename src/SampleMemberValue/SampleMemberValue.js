import React from 'react';

class SampleMemberValue extends React.Component {
  render() {
    let content = this.props.data.content;
    return (
      <div>
        <div className="key">
          {content.key.content}
        </div>
        <div className="value">
          {content.value.content}
        </div>
      </div>
    );
  }
}

export default SampleMemberValue;
