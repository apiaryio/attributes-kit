import React from 'react';

import SampleEntry from 'SampleEntry/SampleEntry';

class SampleArrayValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  render() {
    const content = this.props.data.content;
    return (
      <div className="attributeSampleArrayValue">
        {content.map((item, index) => {
          return (
            <SampleEntry key={index} data={item} />
          );
        })}
      </div>
    );
  }
}

export default SampleArrayValue;
