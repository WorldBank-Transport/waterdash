import React, { PropTypes } from 'react';

import Header from './boilerplate/header.jsx';
import Filters from './filters/filters.jsx';
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
        <Filters />
        {this.props.children}
        <Footer />
      </div>
    );
  },
});

export default Root;
