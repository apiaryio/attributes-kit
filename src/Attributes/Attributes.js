import React from 'react';

import AttributeComponent from 'Attribute/Attribute';

import './attributes.styl'

class AttributesComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="attributes">
        <div className="attributesTitle">
          <h3 className="attributesTitleText">Attributes</h3>
        </div>

        <div className="attributesList">
          <AttributeComponent data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default AttributesComponent;
