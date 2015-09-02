import React from 'react';

import AttributeComponent from '../Attribute/AttributeComponent';

class AttributesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="">
        <div className="attributesTitle">
          <h3 className="attributesTitleText">Attributes</h3>
        </div>

        <AttributeComponent data={this.props.data} />
      </div>
    );
  }
}

export default AttributesComponent;
