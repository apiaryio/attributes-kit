import React from 'react';

import ArrayItemComponent from 'ArrayItem/ArrayItem';

import './array.styl';

class ArrayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.data = this.props.data || [];
  }

  render() {
    return (
      <ul className="attributeArray">
        {this.props.data.map((member, index) => {
          return (
            <li key={index} className="attributeArrayItemContainer">
              <ArrayItemComponent index={index} data={member} />
            </li>
          );
        })}
      </ul>
    );
  }
}

ArrayComponent.propTypes = {
  data: React.PropTypes.object,
};

export default ArrayComponent;
