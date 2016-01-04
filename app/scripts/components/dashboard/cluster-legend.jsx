import React from 'react';
import T from '../misc/t';
import colours from '../../utils/colours';

require('../../../stylesheets/dashboard/legend.scss');

const statusCategory = {
  'FUNCTIONAL': 'good',
  'FUNCTIONAL NEEDS REPAIR': 'medium',
  'NON FUNCTIONAL': 'poor',
  'UNKNOWN': 'unknown',
};

const ClusterLegend = React.createClass({
  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
            <div className="row">
                <div className="legend-mark">123</div>
                <T k="legend.points" />
            </div>
            {
              Object.keys(statusCategory).map(key =>
                (
                  <div className="row">
                    <div className="legend-block" style={{'background': colours[statusCategory[key]]}}></div>
                    <T k={`legend.${key}`} />
                  </div>
                )
              )
            }
          </div>
    );
  },
});

export default ClusterLegend;
