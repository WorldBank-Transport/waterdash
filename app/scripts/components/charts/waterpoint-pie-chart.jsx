import React, { PropTypes } from 'react';
import * as func from '../../utils/functional';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import {PieChart} from 'react-d3-components';
import T from '../misc/t';
import { getNumberOr0 } from '../../utils/number';

require('stylesheets/charts/waterpoint-pie-chart');

const WaterpointPieChart = React.createClass({
  propTypes: {
    column: PropTypes.string,
    data: PropTypes.array,  // injected
  },

  mixins: [ShouldRenderMixin],

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

  tooltip(x, dataRes) {
    // const subItems = Object.keys(dataRes)
    //                         .filter(key => key !== x && key !== 'total')
    //                         .map(key => {
    //   const percentage = (getNumberOr0(dataRes[key]) / dataRes.total * 100).toFixed(2);
    //   return (<li>
    //             <spam className="metric-title">{{key}}:</spam>
    //             <div className="waterpoint-tooltip-stat-wrapper">
    //               <span className="number">{getNumberOr0(dataRes[key])}</span><span className="percent-value-wrapper">(<span className="number">{percentage}</span> %)</span>
    //             </div>
    //           </li>);
    // });
    const percentage = (getNumberOr0(dataRes[x]) / dataRes.total * 100).toFixed(2);
    return (<div>
                <ul className="items">
                  <li>
                    <spam className="metric-title selected">{x}:</spam>
                    <div className="waterpoint-tooltip-stat-wrapper">
                      <span className="number">{getNumberOr0(dataRes[x])}</span><span className="percent-value-wrapper">(<span className="number">{percentage}</span> %)</span>
                    </div>
                  </li>
              </ul>
            </div>);
  },

  render() {
    const data = func.Result.countBy(this.props.data, this.props.column);
    return (
      <div className="waterpoint-pie-chart">
        <h3 className="chart-title"><T k={`chart.pie.${this.props.column}`} /></h3>
        <PieChart
            data={this.parseData(data)}
            height={400}
            labelRadius={130}
            margin={{top: 50, bottom: 50, left: 50, right: 50}}
            tooltipContained="true"
            tooltipHtml={(x) => this.tooltip(x, data)}
            tooltipMode="mouse"
            tooltipOffset={{top: -60, left: 0}}
            width={400}/>
      </div>
    );
  },
});

export default WaterpointPieChart;
