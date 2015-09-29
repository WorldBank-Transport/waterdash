import React,  { PropTypes } from 'react';
import T from '../misc/t';
import WaterPoints from './waterpoints';

const WaterPoint = React.createClass({
  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  },
  render() {
    return (
      <WaterPoints>
        <h1>
          <T k="dash.waterpoint" />
          {' '}
          <small>{this.props.params.id}</small>
        </h1>
      </WaterPoints>
    );
  },
});

export default WaterPoint;
