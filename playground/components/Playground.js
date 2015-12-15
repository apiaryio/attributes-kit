import React from 'react';
import { Link } from 'react-router';

import EditorComponent from './Editor';
import actionTypes from '../actions/types';
import dispatcher from '../dispatcher';

class Playground extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  constructor(props) {
    super(props);

    this.state = {
      parseResult: {
        errors: [],
      },
    };

    this.dispatcherIds = [];
  }

  componentDidMount() {
    this.dispatcherIds.push(dispatcher.register(this._onChange));
  }

  componentWillUnmount() {
    this.dispatcherIds.forEach((id) => dispatcher.unregister(id));
  }

  _onChange = (payload) => {
    if (payload.type === actionTypes.MSON_PARSED) {
      this.setState({parseResult: payload});
    }
  }

  render() {
    return (
      <div className="playgroundContainer">
        <div className="column">
          <EditorComponent errors={this.state.parseResult.errors} />
        </div>

        <div className="column">
          {React.cloneElement(this.props.children, {element: this.state.parseResult.attributes})}
        </div>

        <Link activeStyle={{display: 'none'}} to="/playground/attributes">Show Attributes Kit</Link>
        <Link activeStyle={{display: 'none'}} to="/playground/refract">Show Refract</Link>
      </div>
    );
  }
}

export default Playground;
