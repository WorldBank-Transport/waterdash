import React, { PropTypes } from 'react';

require('stylesheets/boilerplate/map-nav');

const MapNav = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    primary: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div className="map-nav">
        {this.props.primary}
        {this.props.children}
      </div>
    );
  },
});

export default MapNav;
