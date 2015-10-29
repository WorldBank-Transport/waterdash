import React, { PropTypes } from 'react';
import {BarChart} from 'react-d3-components';
import * as func from '../../../utils/functional';
import TSetChildProps from '../../misc/t-set-child-props';
import * as c from '../../../utils/colours';
import T from '../../misc/t';
import WaterpointstatusOptions from './waterpoint-status-options';

require('stylesheets/dashboard/charts/stack-bar-chart');


const WaterpointStatusChart = React.createClass({
  propTypes: {
    waterpoints: PropTypes.array.isRequired,
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    const newState = {
      ...this.state,
      size: {
        width: this.getDOMNode().offsetWidth - 30,
        height: this.getDOMNode().offsetHeight - 30,
      }
    };
    this.replaceState(newState); 
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
    if(!this.state.size) {
      return (<div>empty</div>);
    }
    const dataRes = func.Result.countByGroupBy(this.props.waterpoints, 'STATUS', 'REGION');
    return (
      <div className="stack-bar-chart">
        <h3 className="main-chart-title"><T k="chart.title-waterpoints-status" /> - <span className="chart-helptext"><T k="chart.title-waterpoints-status-helptext" /></span></h3>
        <WaterpointstatusOptions />
      <div className="chart-container">
        <TSetChildProps>
          <BarChart
              colorScale={c.Color.getWaterpointColor}
              data={this.parseData(dataRes)}
              height={400}
              margin={{top: 30, bottom: 100, left: 40, right: 20}}
              width={this.state.size.width}
              xAxis={{innerTickSize: 1, label: {k: 'chart.status-waterpoints.x-axis'}}}
              yAxis={{innerTickSize: 1, label: {k: 'chart.status-waterpoints.y-axis'}}} />
          </TSetChildProps>
      </div>
      </div>

    );
  },
});

export default WaterpointStatusChart;
