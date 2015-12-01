import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
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
    return {};
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

  render() {
    if (!this.state.size) {
      return (<div>empty</div>);
    }
    const sort = () => 1;
    const data = func.Result.countBy(this.props.data, this.props.column);
    return (
      <div className="waterpoint-pie-chart">
        <h3 className="chart-title"><T k={`chart.pie.${this.props.column}`} /></h3>
        <PieChart
            data={this.parseData(data)}
            height={this.state.size.width * 0.20}
            margin={{top: 0, bottom: 5, left: 80, right: 80}}
            sort={sort}
            tooltipHtml={(x, y) => this.renderTooltip(x, y, data)}
            tooltipMode="mouse"
            tooltipOffset={{top: -100, left: 0}}
            width={this.state.size.width * 0.30}/>
      </div>
    );
  },
});

export default WaterpointPieChart;
