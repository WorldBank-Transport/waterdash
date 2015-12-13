import isUndefined from 'lodash/lang/isUndefined';
import React, { PropTypes } from 'react';
import { connect } from 'reflux';
import ClickBarChart from './react-3d-component/click-bar-chart';
import PopulationStore from '../../stores/population';
import * as func from '../../utils/functional';
import TSetChildProps from '../misc/t-set-child-props';
import {load} from '../../actions/population';
import T from '../misc/t';
import Resize from '../../utils/resize-mixin';
import ShouldRenderMixin from '../../utils/should-render-mixin';
import ViewModes from '../../constants/view-modes';
import { chartDrilldown } from '../../actions/select';

require('stylesheets/charts/waterpoint-population-serve-chart');

const WaterpointPopulationServeChart = React.createClass({
  propTypes: {
    viewMode: PropTypes.instanceOf(ViewModes.OptionClass),
    waterpoints: PropTypes.array.isRequired,
  },
  mixins: [
    connect(PopulationStore, 'population'),
    Resize,
    ShouldRenderMixin,
  ],

  getInitialState() {
    load();
    return {};
  },

  parseData(waterpoints, population) {
    const response = {
      label: 'People Waterpoint Ratio',
      values: [],
    };
    const comparator = (a, b) => b.y - a.y;
    response.values = Object.keys(waterpoints)
                        .filter(key => key !== 'total')
                        .map(key => {
                          const regPopulation = isUndefined(population[key]) ? 0 : population[key][0].TOTAL; // if we don't have the population we show the real number
                          return {
                            x: key,
                            y: (regPopulation / waterpoints[key]),
                          };
                        }).sort(comparator);
    return response;
  },

  doubleClick(e, data) {
    chartDrilldown(data.x);
  },

  tooltip(x, y0, y, drilldown) {
    return (<div>
              <h3 className="chart-title">
                <T k={`chart.tooltip.title.${drilldown}`} /> {x}: {(y).toFixed(2)} <T k="chart.tooltip.sufix.population-served" /></h3>
            </div>);
  },

  render() {
    if (isUndefined(this.state.size)) {
      return (<div>empty</div>);
    }
    const drillDown = ViewModes.getDrillDown(this.props.viewMode);
    const waterpointsRes = func.Result.countBy(this.props.waterpoints, drillDown);
    if (Object.keys(waterpointsRes).length === 0) {
      return false;
    }
    const popAgg = func.Result.sumByGroupBy(this.state.population, drillDown, ['TOTAL']);
    return (
      <div className="waterpoint-population-serve-chart">
        <h3><T k="chart.title-population-served" /> - <span className="chart-helptext"><T k="chart.title-title-population-served-helptext" /></span></h3>
        <div><p><T k="chart.doubleClick.help" /></p></div>
        <div className="chart-container ">
          <TSetChildProps>
            <ClickBarChart
                data={this.parseData(waterpointsRes, popAgg)}
                height={360}
                margin={{top: 20, bottom: 120, left: 45, right: 10}}
                onDoubleClick={this.doubleClick}
                tooltipContained="true"
                tooltipHtml={(x, y0, y) => this.tooltip(x, y0, y, drillDown)}
                tooltipMode="mouse"
                tooltipOffset={{top: -100, left: 0}}
                width={this.state.size.width * 0.55}
                xAxis={{label: {k: `chart.waterpoints-people-ratio.x-axis-${drillDown}`}}}
                yAxis={{label: {k: 'chart.waterpoints-people-ratio.y-axis'}}} />
          </TSetChildProps>
        </div>
      </div>);
  },
});

export default WaterpointPopulationServeChart;
