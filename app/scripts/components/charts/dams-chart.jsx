import React, { PropTypes } from 'react';
import ClickBarChart from './react-3d-component/click-bar-chart';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import * as c from '../../utils/colours';
import T from '../misc/t';
import WaterpointstatusOptions from './waterpoint-status-options';
import Resize from '../../utils/resize-mixin';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';

require('stylesheets/charts/dams-chart');

const DamsChart = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [Resize],

  getInitialState() {
    return {};
  },

  parseData(data) {
    const metricCal = {
      'DAM_HEIGHT': (value, total) => value / total,
      'ELEVATION_': (value, total) => value / total,
      'RESERVOIR_': (value) => value / 1000000,
    };
    return Object.keys(metricCal)
          .map(metric => {
            return {
              label: metric,
              values: Object.keys(data).map(poly => {
                const f = metricCal[metric];
                const m = data[poly].filter(item => item.hasOwnProperty(metric));
                const y = f(m[0][metric], m[0].total);
                return {
                  x: poly,
                  y: y,
                };
              }),
            };
          });
  },

  doubleClick(e, data, props) {
    // TODO drill down me
    const doStuff = () => {

    };
    doStuff(e, data, props);
  },

  tooltipHtml(x, y0, y, dataRes){
    const totals = Object.keys(dataRes).reduce((agg, key) => {
      dataRes[key].forEach(metric => {
        Object.keys(metric).filter(m => m !== 'total').forEach(m => {
          agg[m] = (agg[m] || 0) + (metric[m] || 0);
          if(key === x) {
            agg.selected = agg.selected || {};
            agg.selected[m] = (metric[m] || 0);
          }
        });
      });
      return agg;
    }, {});
    const subItems = Object.keys(totals).filter(metric => metric !== 'selected').map(metric => {
      const value = totals.selected[metric] || 0;
      const percentage = (value / totals[metric] * 100).toFixed(2);
      return (<li>
                <spam className="metric-title">{{metric}}:</spam>
                <div className="medium-number">
                  <span className="number">{value}</span> of <span className="number">{totals[metric]}</span> (<span className="number">{percentage}</span> %)
                </div>
              </li>);
    });
    return (<div>
              <h3 className="chart-title row">Region: {{x}}</h3>
              <ul className="items row">
                {{subItems}}
              </ul>
            </div>);
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const dataRes = func.Result.sumByGroupBy(this.props.data, 'REGION', ['DAM_HEIGHT', 'ELEVATION_', 'RESERVOIR_']);
    return (
      <div className="dams-chart">
        <h3 className="main-chart-title"><T k="chart.title-dams" /> - <span className="chart-helptext"><T k="chart.title-dams-status-helptext" /></span></h3>
        <WaterpointstatusOptions values={['DAM_HEIGHT', 'ELEVATION_', 'RESERVOIR_']}/>
        <div className="chart-container">
          <TSetChildProps>
            <ClickBarChart
                groupedBars
                colorScale={c.Color.getDamsColor}
                data={this.parseData(dataRes)}
                height={400}
                margin={{top: 30, bottom: 100, left: 100, right: 20}}
                onDoubleClick={this.doubleClick}
                tooltipHtml={(x, y0, y) => this.tooltipHtml(x, y0, y, dataRes)}
                tooltipMode="element"
                width={this.state.size.width * 0.80}
                xAxis={{innerTickSize: 1, label: {k: 'chart.dams.x-axis'}}}
                yAxis={{innerTickSize: 1, label: {k: 'chart.dams.y-axis'}}} />
            </TSetChildProps>
        </div>
      </div>
    );
  },
});

export default DamsChart;
