import React from 'react';
import ArrayItemComponent from '../ArrayItem/ArrayItemComponent';

class ArrayComponent extends React.Component {
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
