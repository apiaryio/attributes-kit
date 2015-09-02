import React from 'react';
import ObjectMemberComponent from '../ObjectMember/ObjectMember';

class ObjectComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="object">
        {this.props.data.map((member, index) => {
          return (
            <li key={index}><ObjectMemberComponent data={member} /></li>
          );
        })}
      </ul>
    );
  }
}

export default ObjectComponent;
