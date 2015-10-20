import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';
import * as c from '../../../utils/colours';

require('stylesheets/dashboard/charts/stack-bar-chart');

const WaterpointStatusChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },

  getRegionsOrderByFunctional(data) {
    const returnValue = [];
    const seen = {total: true};
    const unique = (item) => seen.hasOwnProperty(item) ? false : (seen[item] = true);
    Object.keys(data)
      .forEach(item => {
        Object.keys(data[item])
          .filter(unique)
          .forEach(key => returnValue.push({name: key, functional: data.FUNCTIONAL[key] ? data.FUNCTIONAL[key] : 0}));
      });
    const ordered = returnValue
      .sort( (a, b) => b.functional - a.functional)
      .map(item => item.name);
    return ordered;
  },

  parseData(data) {
    const regions = this.getRegionsOrderByFunctional(data);
    const labelComparator = (a, b) => {
      if (a.label < b.label) {
        return -1;
      } else if (a.label > b.label) {
        return 1;
      } else {
        return 0;
      }
    };
    return Object.keys(data)
          .map(status => {
            return {
              label: status,
              values: regions.map(region => {
                return {
                  x: region,
                  y: data[status][region] ? data[status][region] : 0,
                };
              }),
            };
          }).sort(labelComparator);
  },

  render() {
    const dataRes = func.Result.countByGroupBy(this.props.waterpoints, 'STATUS', 'REGION');
    return (
      <div className="stack-bar-chart">
        <h3 className="main-chart-title">Waterpoints Status- <span className="chart-helptext">Ordered by % of Functional</span></h3>
      <div className="chart-container">
        <TSetChildProps>
          <BarChart
              colorScale={c.Color.getWaterpointColor}
              data={this.parseData(dataRes)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={600}
              xAxis={{innerTickSize: 6, label: {k: 'chart.status-waterpoints.x-axis'}}}
              yAxis={{innerTickSize: 6, label: {k: 'chart.status-waterpoints.y-axis'}}} />
          </TSetChildProps>
      </div>
      </div>

    );
  },
});

export default WaterpointStatusChart;
