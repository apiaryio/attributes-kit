import React from 'react';

import SimpleValue from 'SimpleValue/SimpleValue';

class Sample extends React.Component {

  static propTypes = {
    data: React.PropTypes.node,
  }

  renderSampleEntries() {
    const data = this.props.data;
    if (Array.isArray(data)) {
      return data.map((entry, index) => {
        return (
          <SimpleValue key={index} data={entry} />
        );
      });
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
