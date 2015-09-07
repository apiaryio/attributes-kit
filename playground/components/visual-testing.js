import React from 'react';

import EditorComponent from './editor';
import RefractPreviewComponent from './refractPreview';
import {AttributesComponent} from '../../src';
import actionTypes from '../actions/types';

class VisualTestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: null,
    };
  }

  render() {
    return (
      <div className="playgrund-app">
        <div className="column">
          <EditorComponent />
        </div>

        <div className="column">
          <RefractPreviewComponent />
        </div>

        <div className="column">
          <AttributesComponent data={this.state.attributes} />
        </div>
      </div>
    );
  }
}

export default VisualTestComponent;
