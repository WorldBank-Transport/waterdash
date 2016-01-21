import React, { PropTypes } from 'react';


const StaticLayout = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div className="main static-layout">
        {this.props.children}
      </div>
    );
  },
});

export default StaticLayout;
