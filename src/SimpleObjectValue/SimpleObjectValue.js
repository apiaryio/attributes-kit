import React from 'react';

import SimpleValue from 'SimpleValue/SimpleValue';

class SimpleObjectValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  render() {
    return (
      <div className="attributeSimpleObjectValue">
        {this.props.data.content.map((member, index) => {
          return (
            <SimpleValue key={index} data={member} />
          );
        })}
      </div>
    );
  }
}

export default SimpleObjectValue;
