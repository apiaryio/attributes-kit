import React from 'react';
import dispatcher from '../dispatcher';
import actionTypes from '../actions/types';

class RefractPreviewComponent extends React.Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this)

    this.state = {
      attributes: null
    };
  }

  render() {
    if (!this.state.attributes) {
      return false;
    }

    return (
      <div className="refract-preview">
        <pre>
          {JSON.stringify(this.state.attributes, null, 2)}
        </pre>
      </div>
    );
  }

  componentDidMount() {
    dispatcher.register(this._onChange);
  }

  componentWillUnmount() {
    dispatcher.unregister(this._onChange);
  }

  _onChange(payload) {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({attributes: payload.attributes});
    }
  }
}

export default RefractPreviewComponent;
