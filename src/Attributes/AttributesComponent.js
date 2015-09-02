import React from 'react';
import Minim from 'minim';

import AttributeComponent from '../Attribute/AttributeComponent';

// Styles
//import 'styles/base.css';

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
