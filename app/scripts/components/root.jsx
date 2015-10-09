import React, { PropTypes } from 'react';

import Header from './boilerplate/header.jsx';
import Footer from './boilerplate/footer.jsx';

require('stylesheets/layout.scss');

const Root = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  },
});

export default Root;
