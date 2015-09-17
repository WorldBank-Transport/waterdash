'use strict';

import React, {Component} from 'react';
import T from '../utils/t.jsx';
import ViewMode from '../boilerplate/view-mode.jsx';


export default class ChartsContainer extends Component {
  render() {
    return (
      <div className="charts-container">
        <div className="charts-container-header">
          <T k="charts.toggle.activate" />
          <ViewMode />
        </div>
        {this.props.children}
      </div>
    );
  }
}
