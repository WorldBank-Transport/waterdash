import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import * as c from '../../utils/colours';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import PieChart from './react-3d-component/pie-chart';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';

require('stylesheets/charts/waterpoint-pie-chart');

const WaterpointPieChart = React.createClass({
  propTypes: {
    column: PropTypes.string,
    data: PropTypes.array,  // injected
  },

  mixins: [Resize, ShouldRenderMixin],

  getInitialState() {
    const allValues = Object.keys(c.Color[this.props.column]).reduce((agg, k) => {
      agg[k] = true;
      return agg;
    }, {});
    return {
      values: allValues,
    };
  },

  parseData(data) {
    const values = Object.keys(data)
                    .filter(key => key !== 'total')
                    .map(key => {
                      return {
                        x: key,
                        y: data[key],
                      };
                    });
    return {
      label: 'Some Label',
      values: values,
    };
  },

  renderTooltip(x, y, data) {
    const perc = (y / data.total * 100).toFixed(2);
    return (<div>
              <h3 className="chart-title">{x}: {y} - {perc} %</h3>
            </div>);
  },

  renderLegend(data) {
    const children = Object.keys(data).filter(key => key !== 'total').map(key => {
      return (
        <li>
          <div className="checkbox">
            <div className="selectable" style={{background: c.Color[this.props.column][key]}}></div>
            <T k={`chart.option.${key}`} />
          </div>
        </li>);
    });
    return (
      <div className="legend-container">
        <div clasName="pie-legend-position">
          <ul>
            {children}
          </ul>
        </div>
      </div>);
  },

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const data = func.Result.countBy(this.props.data, this.props.column);
    return (
      <div className="waterpoint-pie-chart">
      <h3><T k={`chart.pie.${this.props.column}`} /></h3>
        {this.renderLegend(data)}
        <div className="pie-chart-container">
          <div className="pie-chart">
            <PieChart
                colorScale={(x) => c.Color[this.props.column][x]}
                data={this.parseData(data)}
                height={this.state.size.width * 0.20}
                margin={{top: 0, bottom: 0, left: 0, right: 0}}
                tooltipHtml={(x, y) => this.renderTooltip(x, y, data)}
                tooltipMode="mouse"
                tooltipOffset={{top: -100, left: 0}}
                width={this.state.size.width * 0.70}/>
            </div>
            </div>
      </div>
    );
  },
});

export default WaterpointPieChart;
