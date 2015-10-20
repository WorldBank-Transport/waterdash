import React,  { PropTypes } from 'react';
import WaterPoints from './waterpoints';
import drillDownAction from '../../actions/drilldown';

const DrillDown = React.createClass({
  propTypes: {
    field: PropTypes.string,
    id: PropTypes.string,
  },

  componentDidMount() {
    const { query } = this.props.location
    drillDownAction(query);
  },

  render() {
    return (
      <WaterPoints />
    );
  },
});

export default DrillDown;