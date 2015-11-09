import React from 'react';

import Attribute from 'Attribute/Attribute';

import './attributes.styl';

class Attributes extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
  }

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
          <Attribute element={this.props.element} />
        </div>
      </div>
    );
  }
}

export default Attributes;
