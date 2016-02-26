import eidolon from 'eidolon';
import React from 'react';

import Attribute from '../Attribute/Attribute';

class Attributes extends React.Component {
  static propTypes = {
    dataStructures: React.PropTypes.array,
    element: React.PropTypes.object,
    theme: React.PropTypes.object,
  };

  render() {
    let element = this.props.element;

    if (element && this.props.dataStructures) {
      // Convert the list into a map of id -> structure.
      const structures = {};
      for (const item of this.props.dataStructures) {
        structures[item.meta.id] = item;
      }

      // Dereference the element. This overwrites the original
      // value with the normalized result. Reference information
      // is still available in the `meta.ref` properties.
      element = JSON.parse(JSON.stringify(element));
      element = eidolon.dereference(element, structures);
    }

    return (
      <div>
        <div>
          <h1>Attributes</h1>
        </div>

        <div>
          <Attribute
            element={element}
            theme={this.props.theme}
          />
        </div>
      </div>
    );
  }
}

export default Attributes;
