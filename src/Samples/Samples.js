import React from 'react';

import Sample from 'Sample/Sample';

class Samples extends React.Component {
  static propTypes = {
    data: React.PropTypes.array
  }

  render() {
    return (
      <div className="attributeSamples">
        {this.props.data.map((sample, index) => {
          return (
            <Sample key={index} data={sample} />
          );
        })}
      </div>
    );
  }
}

export default Samples;
