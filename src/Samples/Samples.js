import React from 'react';
import classNames from 'classnames';

import Sample from 'Sample/Sample';
import Toggle from 'Toggle/Toggle';

import './samples.styl';

class Samples extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  }

  constructor(props) {
    super(props);

    // State hasn't been set; tree hidden by default
    // after a click, it collapses.
    this.state = {
      isExpanded: false,
    };
  }

  getClassNames() {
    return classNames('attributeSamples', {
      'isExpanded': this.state.isExpanded,
      'isCollapsed': !this.state.isExpanded,
    });
  }

  handleExpandCollapseEvent = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <div className="attributeSamplesToggle">
          <Toggle
            expandCollapseEventHandler={this.handleExpandCollapseEvent}
            isExpanded={this.state.isExpanded}
          />
        </div>
        <div className="attributeSamplesHeader">
          Samples
        </div>

        {this.props.data.map((sample, index) => {
          return (
            <Sample key={index} data={sample} />
          );
        })}
      </div>
    );
  }
}

export default Samples;
