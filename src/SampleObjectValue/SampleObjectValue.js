import React from 'react';

import SampleEntry from 'SampleEntry/SampleEntry';

class SampleObjectValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  render() {
    return (
      <div className="attributeSampleObjectValue">
        {this.props.data.content.map((member, index) => {
          return (
            <SampleEntry key={index} data={member} />
          );
        })}
      </div>
    );
  }
}

export default SampleObjectValue;
