import merge from 'lodash/merge';
import Radium from 'radium';
import React from 'react';

import ObjectProperties from '../ObjectProperties/ObjectProperties';
import ObjectHeader from '../ObjectHeader/ObjectHeader';
import ObjectSamples from '../ObjectSamples/ObjectSamples';
import ObjectDefaults from '../ObjectDefaults/ObjectDefaults';
import Ruler from '../Ruler/Ruler';
import Row from '../Row/Row';
import Column from '../Column/Column';

import {
  hasDefault,
  hasSamples,
  hasProperties,
  isArray,
} from '../../Modules/ElementUtils/ElementUtils';

@Radium
class ObjectComponent extends React.Component {
  static propTypes = {
    element: React.PropTypes.object,
    expandableCollapsible: React.PropTypes.bool,
    parentElement: React.PropTypes.object,
    style: React.PropTypes.object,
    collapseByDefault: React.PropTypes.bool,
    isSample: React.PropTypes.bool,
  };

  static contextTypes = {
    theme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.props.element.content = this.props.element.content || [];

    this.state = {
      isExpanded: true,
    };
  }

  get style() {
    const { ALTERNATE_BORDER_COLOR } = this.context.theme;

    const style = {
      base: {

      },
      ruler: {
        root: {
          paddingBottom: '0px',
        },
      },
    };

    // Only if it's a top-level element.
    if (!this.props.parentElement && !this.props.isSample) {
      style.base.borderTop = `1px solid ${ALTERNATE_BORDER_COLOR}`;
    }

    return merge(style, this.props.style || {});
  }

  handleExpandCollapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };

  renderObjectProperties() {
    if (!hasProperties(this.props.element)) {
      return null;
    }

    if (!this.state.isExpanded) {
      return null;
    }

    if (isArray(this.props.parentElement)) {
      return (
        <Row>
          <ObjectProperties
            element={this.props.element}
            collapseByDefault={this.props.collapseByDefault}
          />
        </Row>
      );
    }

    if (this.props.expandableCollapsible) {
      return (
        <Row>
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
      <Row>
        <ObjectProperties
          element={this.props.element}
          collapseByDefault={this.props.collapseByDefault}
        />
      </Row>
    );
  }

  renderObjectSamplesAndDefaults() {
    const doesHaveSamples = hasSamples(this.props.element);
    const doesHaveDefaults = hasDefault(this.props.element);

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
      <Row style={this.style.base}>
        <Column>
          <Row>
            {
              this.props.parentElement &&
                <ObjectHeader
                  onToggleClick={this.handleExpandCollapse}
                  onSampleToggleClick={this.handleExpandCollapse}
                  onTypeClick={this.handleExpandCollapse}
                  isExpanded={this.state.isExpanded}
                  element={this.props.element}
                  parentElement={this.props.parentElement}
                  expandableCollapsible={this.props.expandableCollapsible}
                />
            }
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

export default ObjectComponent;
