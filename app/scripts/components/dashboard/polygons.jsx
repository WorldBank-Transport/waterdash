'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import T from '../utils/t.jsx';
import ChartsContainer from './charts-container.jsx';


export default class Polygons extends Component {
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
}
