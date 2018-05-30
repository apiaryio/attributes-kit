import React from 'react';
import PropTypes from 'prop-types';
import Column from '../Column/Column';
import Sample from '../Sample/Sample';

class ObjectPropertySamples extends React.Component {
  static propTypes = {
    element: PropTypes.object,
    collapseByDefault: PropTypes.bool,
  };

  get style() {
    return {
      sample: {
        row: {
          marginTop: '6px',
        },
      },
    };
  }

  render() {
    if (!this.props.element) {
      return false;
    }

    if (!this.props.element.content) {
      return false;
    }

    const value = this.props.element.content.value;

    if (!value || !value.attributes || !value.attributes.default) {
      return false;
    }

    return (
      <Column>
        <Sample
          sample={value.attributes.default}
          style={this.style.sample}
          title="Default"
          collapseByDefault={this.props.collapseByDefault}
        />
      </Column>
    );
  }
}

export default ObjectPropertySamples;
