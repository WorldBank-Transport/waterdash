import React, { PropTypes } from 'react';
import T from '../misc/t';
import OpenClosed from '../../constants/open-closed';

require('stylesheets/boilerplate/charts-toggle');

const ChartsToggle = React.createClass({
  propTypes: {
    onToggle: PropTypes.func.isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
  },
  render() {
    return (
      <T k="charts.toggle.open" />
    );
  },
});

export default ChartsToggle;
