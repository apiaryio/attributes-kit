import merge from 'lodash/merge';
import radium from 'radium';
import React from 'react';

import ObjectProperties from '../ObjectProperties/ObjectProperties';
import ObjectHeader from '../ObjectHeader/ObjectHeader';
import ObjectSamples from '../ObjectSamples/ObjectSamples';
import ObjectDefaults from '../ObjectDefaults/ObjectDefaults';
import Ruler from '../Ruler/Ruler';
import Row from '../Row/Row';
import Column from '../Column/Column';

import {
  hasDefaults,
  hasSamples,
  hasMembers,
} from '../elements/element';

class ObjectComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.props.element.content = this.props.element.content || [];

    this.state = {
      isExpanded: true,
    };
  }

  get style() {
    const style = {
      ruler: {
        root: {
          paddingBottom: '0px',
        },
      },
      objectPropertiesRow: {
      },
    };

    if (this.props.expandableCollapsible) {
      style.objectPropertiesRow.paddingLeft = '6px';
    }

    return merge(style, this.props.style || {});
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderObjectProperties() {
    if (!hasMembers(this.props.element)) {
      return null;
    }

    if (!this.state.isExpanded) {
      return null;
    }

    if (this.props.expandableCollapsible) {
      return (
        <Row style={this.style.objectPropertiesRow}>
          <Ruler style={this.style.ruler}>
            <ObjectProperties
              element={this.props.element}
              collapseByDefault={this.props.collapseByDefault}
            />
          </Ruler>
        </Row>
      );
    }

    return (
      <Row style={this.style.objectPropertiesRow}>
        <ObjectProperties
          element={this.props.element}
          collapseByDefault={this.props.collapseByDefault}
        />
      </Row>
    );
  }

  renderObjectSamplesAndDefaults() {
    const doesHaveSamples = hasSamples(this.props.element);
    const doesHaveDefaults = hasDefaults(this.props.element);

    if (!doesHaveSamples && !doesHaveDefaults) {
      return null;
    }

    return (
      <Row>
        {
          doesHaveSamples &&
            <ObjectSamples element={this.props.element} />
        }

        {
          doesHaveDefaults &&
            <ObjectDefaults element={this.props.element} />
        }
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Column>
          <Row>
            <ObjectHeader
              onToggleClick={this.handleExpandCollapse}
              onSampleToggleClick={this.handleExpandCollapse}
              onTypeClick={this.handleExpandCollapse}
              isExpanded={this.state.isExpanded}
              element={this.props.element}
              parentElement={this.props.parentElement}
              expandableCollapsible={this.props.expandableCollapsible}
            />
          </Row>

          {
            this.renderObjectProperties()
          }

          {
            this.renderObjectSamplesAndDefaults()
          }
        </Column>
      </Row>
    );
  }
}

export default radium(ObjectComponent);
