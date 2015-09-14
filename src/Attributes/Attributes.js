import React from 'react';

import Attribute from 'Attribute/Attribute';

import './attributes.styl';

class Attributes extends React.Component {
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
          <Attribute data={this.props.data} />
        </div>
      </div>
    );
  }
}

Attributes.propTypes = {
  data: React.PropTypes.object,
};

export default Attributes;
