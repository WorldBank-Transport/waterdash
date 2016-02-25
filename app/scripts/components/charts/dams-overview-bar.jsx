import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import OpenClosed from '../../constants/open-closed';
import T from '../misc/t';
import * as m from '../../utils/metrics';
import { getNumberOr0 } from '../../utils/number';
import {FormattedNumber, IntlMixin} from 'react-intl';

require('stylesheets/charts/dams-overview-bar');

const getDamsMetricUnit = (metric) => {
  if (metric === 'DAM_HEIGHT') {
    return 'mts';
  } else if (metric === 'ELEVATION_') {
    return 'mts';
  } else if (metric === 'RESERVOIR_') {
    return (<span>M mts<sup>3</sup></span>);
  }
  return '';
};

const DamsOverviewBar = React.createClass({
  propTypes: {
    data: PropTypes.array,  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
  },

  mixins: [IntlMixin],

  renderMetrics(metrics) {
    return Object.keys(metrics).map(metric => {
      const f = m.getDamsMetricCalc(metric);
      const value = f(getNumberOr0(metrics[metric].data[metric]), metrics[metric].data.total || 1);
      return (
        <div className={`metric-status dams ${metrics[metric].className}`}>
          <div className="content">
            <div className="big-number">
            <img className="dams-dr" src="images/dams.png"/>

            <span className="number">
              <FormattedNumber maximumFractionDigits="2" value={value}/>
              <span className="unit">{getDamsMetricUnit(metric)}</span></span>
            </div>
            <div className="context">
              <T k={metrics[metric].title} />
            </div>
          </div>
        </div>);
    });
  },

  render() {
    const metrics = {
      RESERVOIR_: {
        className: 'dams-reservoir',
        data: func.Result.sumBy(this.props.data, 'RESERVOIR_'),
        title: 'chart.title.reservoir',
      },
      DAM_HEIGHT: {
        className: 'dams-height',
        data: func.Result.sumBy(this.props.data, 'DAM_HEIGHT'),
        title: 'chart.title.height',
      },
      ELEVATION_: {
        className: 'dams-elevation',
        data: func.Result.sumBy(this.props.data, 'ELEVATION_'),
        title: 'chart.title.elevation',
      },
    };
    return (
      <div className="charts-container-summary">
        <div>
          {this.renderMetrics(metrics)}
        </div>
      </div>
    );
  },
});

export default DamsOverviewBar;
