import React, { PropTypes } from 'react';
import ClickBarChart from './react-3d-component/click-bar-chart';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import * as c from '../../utils/colours';
import T from '../misc/t';
import WaterpointstatusOptions from './waterpoint-status-options';
import Resize from '../../utils/resize-mixin';
import ViewModes from '../../constants/view-modes';
import { chartDrilldown } from '../../actions/select';
import { getNumberOr0 } from '../../utils/number';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import Checkbox from '../misc/checkbox';

require('stylesheets/charts/waterpoints-status-chart');

const WaterpointStatusChart = React.createClass({
  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
    waterpoints: PropTypes.array.isRequired,
  },

  mixins: [Resize, ShouldRenderMixin],

  getInitialState() {
    return {
      status: {
        FUNCTIONAL: true,
        'FUNCTIONAL NEEDS REPAIR': true,
        'NON FUNCTIONAL': true,
      },
      groupedBars: true,
    };
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
    return Object.keys(this.state.status)
          .filter(s => this.state.status[s])
          .map(status => {
            return {
              label: status,
              values: regions.map(region => {
                let value = 0;
                if (status === 'NON FUNCTIONAL') { // we need to group all non functional
                  value = Object.keys(data)
                            .filter(key => key.startsWith(status))
                            .reduce((ret, key) => {
                              ret.value += getNumberOr0(data[key][region]);
                              return ret;
                            }, {value: 0})
                            .value;
                } else {
                  value = getNumberOr0(data[status][region]);
                }
                return {
                  x: region,
                  y: value,
                };
              }),
            };
          }).sort(labelComparator);
  },

  doubleClick(e, data) {
    chartDrilldown(data.x);
  },

  tooltip(x, dataRes) {
    const total = Object.keys(dataRes).reduce((agg, key) => {
      agg.value += getNumberOr0(dataRes[key][x]);
      return agg;
    }, {value: 0}).value;
    const subItems = Object.keys(dataRes).map(key => {
      const percentage = (getNumberOr0(dataRes[key][x]) / total * 100).toFixed(2);
      return (<li>
                <spam className="metric-title">{{key}}:</spam>
                <div className="waterpoint-tooltip-stat-wrapper">
                  <span className="number">{getNumberOr0(dataRes[key][x])}</span> of <span className="number">{total}</span><span className="percent-value-wrapper">(<span className="number">{percentage}</span> %)</span>
                </div>
              </li>);
    });
    return (<div>
              <h3 className="chart-title row">Region: {{x}}</h3>
                <ul className="items">
                {{subItems}}
              </ul>
            </div>);
  },

  toogleStatus(e, s) {
    const newState = {
      ...this.state,
      status: {
        ...this.state.status,
        [s]: !this.state.status[s],
      },
    };
    this.replaceState(newState);
  },

  toogleGrouped() {
    const newState = {
      ...this.state,
      groupedBars: !this.state.groupedBars,
    };
    this.replaceState(newState);
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const drillDown = ViewModes.getDrillDown(this.props.viewMode);
    const dataRes = func.Result.countByGroupBy(this.props.waterpoints, 'STATUS', drillDown);
    if (Object.keys(dataRes).length === 0) {
      return false;
    }
    return (
      <div className="stack-bar-chart">
        <h3 className="main-chart-title"><T k="chart.title-waterpoints-status" /> - <span className="chart-helptext"><T k="chart.title-waterpoints-status-helptext" /></span></h3>
        <WaterpointstatusOptions onclick={this.toogleStatus} state={this.state.status} values={Object.keys(this.state.status)} />
        <div><p>Double click on the bar to drill down</p><p><Checkbox action={this.toogleGrouped} checked={this.state.groupedBars} label="chart.grouped"/></p></div>
        <div className="chart-container">
          <TSetChildProps>
            <ClickBarChart
                colorScale={c.Color.getWaterpointColor}
                data={this.parseData(dataRes)}
                groupedBars={this.state.groupedBars}
                height={400}
                margin={{top: 20, bottom: 100, left: 40, right: 10}}
                onDoubleClick={this.doubleClick}
                tooltipContained="true"
                tooltipHtml={(x) => this.tooltip(x, dataRes)}
                tooltipMode="mouse"
                tooltipOffset={{top: -300, left: 0}}
                width={this.state.size.width * 0.55}
                xAxis={{innerTickSize: 1, label: {k: `chart.status-waterpoints.x-axis-${drillDown}`}}}
                yAxis={{innerTickSize: 1, label: {k: 'chart.status-waterpoints.y-axis'}}} />
            </TSetChildProps>
        </div>
      </div>
    );
  },
});

export default WaterpointStatusChart;
