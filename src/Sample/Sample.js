import React from 'react';

import SampleEntry from 'SampleEntry/SampleEntry';

class Sample extends React.Component {

  static propTypes = {
    data: React.PropTypes.node
  }

  renderSampleEntries() {
    let data = this.props.data;
    if (Array.isArray(data)) {
      return data.map((entry, index) => {
        return (
          <SampleEntry key={index} data={entry} />
        );
      })
    }

    return data;
  }

  render() {
    return (
      <div className="attributeSample">
        <div className="attributeSampleEntries">
          {this.renderSampleEntries()}
        </div>
      </div>
    );
  }
}

export default Sample;
