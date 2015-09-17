import React from 'react';

import SimpleValue from 'SimpleValue/SimpleValue';

class SimpleArrayValue extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  }

  render() {
    const content = this.props.data.content;
    return (
      <div className="attributeSimpleArrayValue">
        {content.map((item, index) => {
          return (
            <SimpleValue key={index} data={item} />
          );
        })}
      </div>
    );
  }
}

export default SimpleArrayValue;
