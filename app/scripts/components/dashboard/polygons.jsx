'use strict';

import React from 'react';
import {Link} from 'react-router';
import T from '../utils/t.jsx';
import ChartsContainer from './charts-container.jsx';


const Polygons = React.createClass({
  render() {
    let {polytype} = this.props.params;
    return (
      <div className="main polygons">
        <h1>
          <T k={`dash.${polytype}`} />
        </h1>
        <Link to={`/${polytype}/some-id`}>to some-id</Link>
        {this.props.children}
        <ChartsContainer>
          charts for polygons...
        </ChartsContainer>
      </div>
    );
  }
});

export default Polygons;
