import React, { PropTypes } from 'react';

import Header from './boilerplate/header';
import Divider from './boilerplate/divider';

require('stylesheets/layout.scss');

const Root = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div>
        <Header />
        <Divider />
        {this.props.children}
      </div>
    );
  },
});

export default Root;
