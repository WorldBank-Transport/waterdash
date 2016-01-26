import React, { PropTypes } from 'react';
import T from '../misc/t';
import colours from '../../utils/colours';
import DataTypes from '../../constants/data-types';

require('../../../stylesheets/dashboard/legend.scss');

const statusCategory = {
  'FUNCTIONAL': 'good',
  'FUNCTIONAL NEEDS REPAIR': 'medium',
  'NON FUNCTIONAL': 'poor',
  'UNKNOWN': 'unknown',
};

const ClusterLegend = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
  },

  renderWaterpoint() {
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

  renderDams() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
          <div className="row">
              <div className="legend-dam-mark"></div>
              <T k="legend.simple-points" />
          </div>
        </div>
    );
  },

  render() {
    return DataTypes.match(this.props.dataType, {
      Waterpoints: () => this.renderWaterpoint(),
      Dams: () => this.renderDams(),
      Boreholes: () => (<div style={{display: 'none'}}></div>),
    });
  },
});

export default ClusterLegend;
