import React from 'react';

import BaseCyclingComponent from 'BaseCyclingComponent/BaseCyclingComponent';
import ArrayItemComponent from 'ArrayItem/ArrayItem';

import './array.styl';

class ArrayComponent extends BaseCyclingComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="object">
        {this.props.data.map((member, index) => {
          return (
            <li key={index}><ArrayItemComponent data={member} /></li>
          );
        })}
      </ul>
    );
  }
}

export default ArrayComponent;
