import React, { PropTypes } from 'react';
import Footer from '../boilerplate/footer';


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
