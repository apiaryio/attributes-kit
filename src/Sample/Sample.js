import React from 'react';

import SampleEntry from 'SampleEntry/SampleEntry';

class Sample extends React.Component {

  static propTypes = {
    data: React.PropTypes.array
  }

  render() {
    console.log('Sample.render', this.props.data);
    return (
      <div className="attributeSample">
        <div className="attributeSampleEntries">
        {this.props.data.map((entry, index) => {
          return (
            <SampleEntry key={index} data={entry} />
          );
        })}
        </div>
      </div>
    );
  }
}

export default Sample;
