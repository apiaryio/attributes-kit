import React from 'react';

import Attribute from 'Attribute/Attribute';

class Attributes extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    theme: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Attributes</h1>
        </div>

        <div>
          <Attribute
            element={this.props.element}
            theme={this.props.theme}
          />
        </div>
      </div>
    );
  }
}

export default Attributes;
