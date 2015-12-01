/*eslint-disable react/no-set-state */
import React, { PropTypes } from 'react';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import T from '../misc/t';
import { disableDrillDown } from '..././actions/select';

require('stylesheets/dashboard/drill-down-viewer');


const DrillDownViewer = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    drillDown: PropTypes.object.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  renderDrillDownViewer() {
    return (
      <div className="drill-down-viewer">
        <div className="display-name">
          <T k={`drilldown.${this.props.viewMode.toParam()}`} />: <span className="name-text">{this.props.drillDown.name}</span>
        </div>
        <a onClick={disableDrillDown}><T k="drilldown.back" /></a>
      </div>
    );
  },

  render() {
    if (this.props.drillDown.enable) {
      return this.renderDrillDownViewer();
    } else {
      return (<div style={{display: 'none'}}></div>);
    }
  },
});

export default DrillDownViewer;
