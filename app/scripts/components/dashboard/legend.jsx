import React from 'react';
import T from '../misc/t';

require('../../../stylesheets/dashboard/legend.scss');

const Legend = React.createClass({
  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
            <div>
              <div className="legend-block" style={{'background': '#f1eef6'}}></div>
                <T k="legend.nodata" />
            </div>
            <div>
              <div className="legend-block" style={{'background': '#bdc9e1'}}></div>
              <T k="legend.lessthan50" />
            </div>
            <div>
              <div className="legend-block" style={{'background': '#74a9cf'}}></div>
              <T k="legend.greaterhan50" />
            <div>
              <div className="legend-block" style={{'background': '#0570b0'}}></div>
              <T k="legend.greaterhan75" />
            </div>
          </div>
        </div>
    );
  },
});

export default Legend;

