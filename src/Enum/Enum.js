import React from 'react';

import EnumMember from 'EnumMember/EnumMember';
import Samples from 'Samples/Samples';
import Defaults from 'Defaults/Defaults';
import Row from 'Row/Row';
import Column from 'Column/Column';
import Array from 'Array/Array';

// class EnumComponent extends React.Component {
//   static propTypes = {
//     element: React.PropTypes.object,
//   };
//
//   constructor(props) {
//     super(props);
//
//     this.props.element.content = this.props.element.content || [];
//
//     this.state = {
//       isExpanded: true,
//     };
//   }
//
//   renderSamples() {
//     const attributes = this.props.element.attributes;
//     let samples = null;
//
//     if (attributes) {
//       samples = attributes.samples;
//     }
//
//     if (!samples) {
//       return false;
//     }
//
//     return (
//       <div className="attributeObjectSamplesContainer">
//         <Samples element={samples} />
//       </div>
//     );
//   }
//
//   renderDefaults() {
//     const attributes = this.props.element.attributes;
//     let defaults = null;
//
//     if (attributes) {
//       defaults = attributes.default;
//     }
//
//     if (!defaults) {
//       return false;
//     }
//
//     return (
//       <div className="attributeObjectDefaults">
//         <Defaults element={defaults} />
//       </div>
//     );
//   }
//
//   render() {
//     return (
//       <Row>
//         <Column>
//           {this.props.element.content.map((member, index) => {
//             return (
//               <row>
//                 <EnumMember element={member} />
//               </row>
//             );
//           })}
//
//           {this.renderDefaults()}
//           {this.renderSamples()}
//         </Column>
//       </Row>
//     );
//   }
// }

class EnumComponent extends Array {

};

export default EnumComponent;
