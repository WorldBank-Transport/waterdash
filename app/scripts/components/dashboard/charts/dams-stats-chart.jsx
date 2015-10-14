import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';


require('stylesheets/dashboard/charts/dams-stats-chart');

const DamsStatsChart = React.createClass({
  propTypes: {
    dams: PropTypes.array.isRequired,
  },

  getRegions(data) {
    return Object.keys(data);
  },

  parseData(data, sumaries) {
    const regions = this.getRegions(sumaries);
    const response = Object.keys(data)
          .map(key => {
            return {
              label: key,
              values: regions.map(region => {
                return {
                  x: region,
                  y: data[key][region] ? data[key][region] : 0,
                };
              }),
            };
          });
    const responseTwo = {};
    const getAvg = (key, obj) => obj[key]/obj.total;
    Object.keys(sumaries).forEach(region => {
      sumaries[region].forEach(sum => {
        Object.keys(sum)
          .filter(key => key !== 'total')
          .forEach(key => {
            if(!responseTwo[key]) {
              responseTwo[key] = [];
            }
            if (key === 'DAM_HEIGHT') responseTwo[key].push({x: region, y: getAvg(key, sum)});
            else if (key === 'ELEVATION_') responseTwo[key].push({x: region, y: getAvg(key, sum)});
            else if (key === 'RESERVOIR_') responseTwo[key].push({x: region, y: sum[key]});
            else throw Error(`not expected key, actual: ${key}`);
          });
      }); 
    });

    Object.keys(responseTwo).forEach(key => {
      response.push({
        label: key,
        values: responseTwo[key],
      });
    });
    return response;
  },

  render() {
    const dataRes = func.Result.countByGroupBy(this.props.dams, 'BASIN', 'REGION');
    const sumaries = func.Result.sumByGroupBy(this.props.dams, 'REGION', ['DAM_HEIGHT', 'ELEVATION_', 'RESERVOIR_'])
    return (
      <div className="dams-chart">
        <TSetChildProps>
          <BarChart
              data={this.parseData(dataRes, sumaries)}
              height={200}
              margin={{top: 10, bottom: 50, left: 50, right: 10}}
              width={500} />
        </TSetChildProps>
      </div>);
  },
});

export default DamsStatsChart;