import React, { PropTypes } from 'react';

import Header from './boilerplate/header.jsx';
import Divider from './boilerplate/divider.jsx';
import Footer from './boilerplate/footer.jsx';

require('stylesheets/layout.scss');

const Rootstatic = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div>
        <Header />
        <Divider />
        <Footer />
      </div>
    );
  },
});

export default Rootstatic;
