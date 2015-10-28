import React, { PropTypes } from 'react';
import OpenClosed from '../../constants/open-closed';
import PointTypes from '../../constants/point-types';
import ViewModes from '../../constants/view-modes';
import T from '../misc/t';
import ViewMode from '../boilerplate/view-mode';

require('stylesheets/dashboard/charts-container');

const ChartsContainer = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
    dataType: PropTypes.instanceOf(PointTypes.OptionClass).isRequired,
    onToggle: PropTypes.func.isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass).isRequired,
    points: PropTypes.array.isRequired,
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass).isRequired,
  },
  toggle(e) {
    e.preventDefault();
    this.props.onToggle();
  },
  render() {
    const [ openClosedClass, below ] = OpenClosed.match(this.props.openClosed, {
      Open: () => [ 'open', this.props.children ],
      Closed: () => [ 'closed', []],
    });
    // const data = func.Result.countBy(this.props.waterpoints, 'STATUS');
    return (
      <div className={`charts-container ${openClosedClass}`}>
        <div className="above">
          <div className="charts-container-nav">
            <a
                className="tab-label"
                href="#"
                onClick={this.toggle}
                role="button">
              <T k="charts.toggle.activate" />
            </a>
            <ViewMode dataType={this.props.dataType} />
          </div>
          <div className="charts-container-summary">
            <div>
              {/*
              <MetricStatus metric="FUNCTIONAL" sumProps={data} title="chart.title.functional" />
              <MetricStatus metric="FUNCTIONAL NEEDS REPAIR" sumProps={data} title="chart.title.repair"/>
              <MetricStatus metric="NON FUNCTIONAL" sumProps={data} title="chart.title.non-functional"/>
              */}
            </div>
          </div>
        </div>
        <div className="below">
          {below}
        </div>
      </div>
    );
  },
});

export default ChartsContainer;
