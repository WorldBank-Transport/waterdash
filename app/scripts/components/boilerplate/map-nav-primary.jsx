import React, { PropTypes } from 'react';
import OpenClosed from '../../constants/open-closed';

require('stylesheets/boilerplate/map-nav-primary');

const MapNavPrimary = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    extraClasses: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
  },
  getDefaultProps() {
    return { extraClasses: '' };
  },
  render() {
    const { children, extraClasses, onToggle, openClosed } = this.props;
    return (
      <button
          className={`map-nav-primary ${openClosed.getId()} ${extraClasses}`}
          onClick={onToggle}
          type="button">
        {children}
      </button>
    );
  },
});

export default MapNavPrimary;
