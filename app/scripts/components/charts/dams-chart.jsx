import React, { PropTypes } from 'react';
import ClickBarChart from './react-3d-component/click-bar-chart';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import * as c from '../../utils/colours';
import T from '../misc/t';
import WaterpointstatusOptions from './waterpoint-status-options';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import * as metricUtil from '../../utils/metrics';

require('stylesheets/charts/dams-chart');

const DamsChart = React.createClass({
  propTypes: {
    children: PropTypes.node,
    data: PropTypes.array,  // injected
    dataType: PropTypes.instanceOf(DataTypes.OptionClass),  // injected
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),  // injected
  },

  mixins: [Resize, ShouldRenderMixin],

  getInitialState() {
    return {
      metrics: {
        DAM_HEIGHT: true,
        ELEVATION_: true,
        RESERVOIR_: true,
      },
    };
  },

  parseData(data) {
    const metricCal = metricUtil.metricCal;
    return Object.keys(metricCal)
          .filter(metric => this.state.metrics[metric])
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

  tooltipHtml(x, y0, y, dataRes) {
    const totals = Object.keys(dataRes).reduce((agg, key) => {
      dataRes[key].forEach(metric => {
        Object.keys(metric).filter(m => m !== 'total').forEach(m => {
          agg[m] = (agg[m] || 0) + (metric[m] || 0);
          if (key === x) {
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

  toogleMetric(e, metric) {
    const newState = {
      ...this.state,
      metrics: {
        ...this.state.metrics,
        [metric]: !this.state.metrics[metric],
      },
    };
    this.replaceState(newState);
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    if (this.props.data.length === 0 || !this.props.data[0].hasOwnProperty('DAM_NAME')) {
      return false;
    }
    const dataRes = func.Result.sumByGroupBy(this.props.data, 'REGION', Object.keys(this.state.metrics));
    return (
      <div className="container">
        <div className="secondaryCharts">
          <div className="dams-col-left">
            <div className="mainChart">
              <div className="dams-chart">
                <h3 className="main-chart-title"><T k="chart.title-dams" /> - <span className="chart-helptext"><T k="chart.title-dams-status-helptext" /></span></h3>
                <WaterpointstatusOptions onclick={this.toogleMetric} state={this.state.metrics} values={Object.keys(this.state.metrics)}/>
                <div className="chart-container">
                  <TSetChildProps>
                    <ClickBarChart
                        colorScale={c.Color.getDamsColor}
                        data={this.parseData(dataRes)}
                        groupedBars={true}
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
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default DamsChart;
