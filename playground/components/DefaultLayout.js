import React from 'react';
import { Link } from 'react-router';

class DefaultLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  };

  render() {
    return (
      <div>
        <div className="header">
        <div className="leftSide">
          <span className="headerTitle">Attributes Kit</span>
          <span><Link activeClassName="selected" to="/playground">Playground</Link></span>
          <span><Link activeClassName="selected" to="/examples">Examples</Link></span>
        </div>
        <div className="rightSide">
          <span>
            <a target="_blank" className="gitHubIco" href="https://github.com/apiaryio/attributes-kit">Attributes Kit Repository</a>
          </span>
          <span>
            <a target="_blank" className="documentationIco" href="https://github.com/apiaryio/mson">Mson Documentation</a>
          </span>
        </div>
        </div>
        <div className="body">
          {this.props.children}
      </div>
    </div>
    );
  }
}

export default DefaultLayout;
