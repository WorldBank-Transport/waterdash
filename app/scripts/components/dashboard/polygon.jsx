import React, { PropTypes } from 'react';

const Polygon = React.createClass({
  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  },
  render() {
    return (
      <h1>
        Polygon
        {' '}
        <small>({this.props.params.id})</small>
      </h1>
    );
  },
});

export default Polygon;
